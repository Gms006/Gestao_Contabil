// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarResumoDia();
    carregarGraficos();
    carregarProdutividade();
    verificarUsuarioLogado();
});

function verificarUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        const usuarioObj = JSON.parse(usuario);
        document.getElementById('usuarioNome').textContent = usuarioObj.nome;
    }
}

// Carregar resumo do dia
async function carregarResumoDia() {
    try {
        const dados = await dashboardAPI.resumoDia();
        
        document.getElementById('etapasIniciadas').textContent = dados.etapasIniciadas;
        document.getElementById('etapasConcluidas').textContent = dados.etapasConcluidas;
        document.getElementById('problemasReportados').textContent = dados.problemasReportados;
        document.getElementById('obrigacoesVencemHoje').textContent = dados.obrigacoesVencemHoje;
    } catch (error) {
        console.error('Erro ao carregar resumo do dia:', error);
    }
}

// Carregar gráficos
async function carregarGraficos() {
    try {
        // Competências por Status
        const competenciasStatus = await dashboardAPI.competenciasStatus();
        criarGraficoCompetenciasStatus(competenciasStatus);

        // Obrigações por Esfera
        const obrigacoesEsfera = await dashboardAPI.obrigacoesEsfera();
        criarGraficoObrigacoesEsfera(obrigacoesEsfera);

        // Problemas por Tipo
        const problemasStats = await problemasAPI.stats();
        criarGraficoProblemasTipo(problemasStats.porTipo);

        // Tempo médio por regime
        const tempoRegime = await fetch(`${API_BASE_URL}/dashboard/tempo-medio-regime`).then(r => r.json());
        criarGraficoTempoRegime(tempoRegime);
    } catch (error) {
        console.error('Erro ao carregar gráficos:', error);
    }
}

// Criar gráfico de competências por status
function criarGraficoCompetenciasStatus(dados) {
    const ctx = document.getElementById('chartCompetenciasStatus');
    
    const labels = dados.map(d => d.status);
    const values = dados.map(d => d._count);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#6c757d', // Não Iniciado
                    '#ffc107', // Em Andamento
                    '#fd7e14', // Pausado
                    '#198754', // Concluído
                ],
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                }
            }
        }
    });
}

// Criar gráfico de obrigações por esfera
function criarGraficoObrigacoesEsfera(dados) {
    const ctx = document.getElementById('chartObrigacoesEsfera');
    
    const labels = dados.map(d => d.esfera);
    const values = dados.map(d => d._count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade',
                data: values,
                backgroundColor: [
                    '#0d6efd', // Federal
                    '#198754', // Estadual
                    '#ffc107', // Municipal
                ],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}

// Criar gráfico de problemas por tipo
function criarGraficoProblemasTipo(dados) {
    const ctx = document.getElementById('chartProblemasTipo');
    
    const labels = dados.map(d => d.tipo);
    const values = dados.map(d => d._count);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#0d6efd',
                    '#198754',
                    '#ffc107',
                    '#dc3545',
                    '#6c757d',
                ],
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Criar gráfico de tempo médio por regime
function criarGraficoTempoRegime(dados) {
    const ctx = document.getElementById('chartTempoRegime');
    
    const labels = dados.map(d => d.regime);
    const values = dados.map(d => d.tempoMedioMin);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tempo Médio (min)',
                data: values,
                backgroundColor: '#0dcaf0',
                borderColor: '#0aa2c0',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}

// Carregar produtividade
async function carregarProdutividade() {
    try {
        const dados = await fetch(`${API_BASE_URL}/dashboard/produtividade-usuario`).then(r => r.json());
        const tbody = document.getElementById('tabelaProdutividade');

        if (dados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted">
                        Nenhum dado de produtividade disponível
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = dados.map(user => `
            <tr>
                <td><strong>${user.usuario}</strong></td>
                <td><span class="badge bg-primary">${user.papel}</span></td>
                <td>${user.obrigacoesPreparadas}</td>
                <td>${user.obrigacoesEntregues}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar produtividade:', error);
        document.getElementById('tabelaProdutividade').innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    Erro ao carregar dados de produtividade
                </td>
            </tr>
        `;
    }
}

// Atualizar dados periodicamente
setInterval(() => {
    carregarResumoDia();
    carregarProdutividade();
}, 60000); // Atualizar a cada 1 minuto
