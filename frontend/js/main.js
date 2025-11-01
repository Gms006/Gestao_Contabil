// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDashboard();
    carregarCompetenciasPendentes();
    carregarProximosVencimentos();
    verificarUsuarioLogado();
});

// Verificar usuário logado
function verificarUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        const usuarioObj = JSON.parse(usuario);
        document.getElementById('usuarioNome').textContent = usuarioObj.nome;
    } else {
        document.getElementById('usuarioNome').textContent = 'Visitante';
    }
}

// Carregar dashboard
async function carregarDashboard() {
    try {
        const dados = await dashboardAPI.geral();

        document.getElementById('totalEmpresas').textContent = dados.empresas.ativas;
        document.getElementById('competenciasAndamento').textContent = dados.competencias.emAndamento;
        document.getElementById('obrigacoesRisco').textContent = dados.obrigacoes.emRisco;
        document.getElementById('competenciasConcluidas').textContent = dados.competencias.concluidas;
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        showAlert('Erro ao carregar dados do dashboard', 'danger');
    }
}

// Carregar competências pendentes
async function carregarCompetenciasPendentes() {
    try {
        const competencias = await competenciasAPI.pendentes();
        const tbody = document.getElementById('tabelaPendentes');

        if (competencias.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                        <i class="bi bi-check-circle fs-1"></i><br>
                        Nenhuma competência pendente
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = competencias.map(comp => {
            const proximaEtapa = comp.etapas[0] || { nome: 'Nenhuma' };
            return `
                <tr onclick="abrirCompetencia('${comp.id}')">
                    <td>
                        <strong>${comp.empresa.nomeFantasia || comp.empresa.razaoSocial}</strong><br>
                        <small class="text-muted">${comp.empresa.cnpj}</small>
                    </td>
                    <td><span class="badge bg-primary">${comp.empresa.regime}</span></td>
                    <td>${comp.mesAno}</td>
                    <td>${getStatusBadge(comp.status)}</td>
                    <td>${proximaEtapa.nome}</td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); retomarCompetencia('${comp.id}')">
                            <i class="bi bi-play-fill"></i> Retomar
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao carregar pendentes:', error);
        document.getElementById('tabelaPendentes').innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Erro ao carregar competências pendentes
                </td>
            </tr>
        `;
    }
}

// Carregar próximos vencimentos
async function carregarProximosVencimentos() {
    try {
        const vencimentos = await dashboardAPI.proximosVencimentos();
        const tbody = document.getElementById('tabelaVencimentos');

        if (vencimentos.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        <i class="bi bi-check-circle fs-1"></i><br>
                        Nenhum vencimento próximo
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = vencimentos.map(obr => {
            const diasClass = obr.diasParaVenc <= 1 ? 'text-danger fw-bold' : 
                              obr.diasParaVenc <= 3 ? 'text-warning fw-bold' : '';
            
            return `
                <tr>
                    <td>
                        <strong>${obr.competencia.empresa.nomeFantasia || obr.competencia.empresa.razaoSocial}</strong><br>
                        <small class="text-muted">${obr.competencia.mesAno}</small>
                    </td>
                    <td>${obr.tipo}</td>
                    <td><span class="badge bg-info">${obr.esfera}</span></td>
                    <td>${formatarData(obr.vencimentoFinal)}</td>
                    <td class="${diasClass}">${obr.diasParaVenc} dias</td>
                    <td>${getStatusBadge(obr.status)}</td>
                    <td>${obr.preparador?.nome || '-'}</td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao carregar vencimentos:', error);
        document.getElementById('tabelaVencimentos').innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    Erro ao carregar vencimentos
                </td>
            </tr>
        `;
    }
}

// Ações rápidas
function novaEmpresa() {
    window.location.href = 'empresas.html?acao=nova';
}

function novaCompetencia() {
    window.location.href = 'competencias.html?acao=nova';
}

function retomarPendentes() {
    window.location.href = 'competencias.html?filtro=pendentes';
}

function verRelatorios() {
    window.location.href = 'relatorios.html';
}

// Abrir competência
function abrirCompetencia(id) {
    window.location.href = `competencia-detalhes.html?id=${id}`;
}

// Retomar competência
async function retomarCompetencia(id) {
    try {
        showLoading();
        await competenciasAPI.retomar(id);
        hideLoading();
        showAlert('Competência retomada com sucesso!', 'success');
        window.location.href = `competencia-detalhes.html?id=${id}`;
    } catch (error) {
        hideLoading();
        console.error('Erro ao retomar competência:', error);
        showAlert('Erro ao retomar competência', 'danger');
    }
}

// Atualizar dados periodicamente
setInterval(() => {
    carregarDashboard();
    carregarCompetenciasPendentes();
    carregarProximosVencimentos();
}, 60000); // Atualizar a cada 1 minuto
