// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api';

// Funções auxiliares
function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="spinner-border text-light loading-spinner" role="status"></div>';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '10000';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// API de Empresas
const empresasAPI = {
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API_BASE_URL}/empresas?${params}`);
        if (!response.ok) throw new Error('Erro ao listar empresas');
        return await response.json();
    },

    async buscar(id) {
        const response = await fetch(`${API_BASE_URL}/empresas/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar empresa');
        return await response.json();
    },

    async criar(dados) {
        const response = await fetch(`${API_BASE_URL}/empresas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao criar empresa');
        return await response.json();
    },

    async atualizar(id, dados) {
        const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao atualizar empresa');
        return await response.json();
    },

    async desativar(id) {
        const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao desativar empresa');
        return await response.json();
    },

    async stats(id) {
        const response = await fetch(`${API_BASE_URL}/empresas/${id}/stats`);
        if (!response.ok) throw new Error('Erro ao buscar estatísticas');
        return await response.json();
    },
};

// API de Competências
const competenciasAPI = {
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API_BASE_URL}/competencias?${params}`);
        if (!response.ok) throw new Error('Erro ao listar competências');
        return await response.json();
    },

    async buscar(id) {
        const response = await fetch(`${API_BASE_URL}/competencias/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar competência');
        return await response.json();
    },

    async criar(dados) {
        const response = await fetch(`${API_BASE_URL}/competencias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao criar competência');
        return await response.json();
    },

    async atualizar(id, dados) {
        const response = await fetch(`${API_BASE_URL}/competencias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao atualizar competência');
        return await response.json();
    },

    async deletar(id) {
        const response = await fetch(`${API_BASE_URL}/competencias/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar competência');
        return await response.json();
    },

    async pendentes(usuarioId = null) {
        const params = usuarioId ? `?usuarioId=${usuarioId}` : '';
        const response = await fetch(`${API_BASE_URL}/competencias/pendentes/lista${params}`);
        if (!response.ok) throw new Error('Erro ao buscar pendentes');
        return await response.json();
    },

    async retomar(id) {
        const response = await fetch(`${API_BASE_URL}/competencias/${id}/retomar`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Erro ao retomar competência');
        return await response.json();
    },
};

// API de Etapas
const etapasAPI = {
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API_BASE_URL}/etapas?${params}`);
        if (!response.ok) throw new Error('Erro ao listar etapas');
        return await response.json();
    },

    async buscar(id) {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar etapa');
        return await response.json();
    },

    async iniciar(id) {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}/iniciar`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Erro ao iniciar etapa');
        return await response.json();
    },

    async pausar(id) {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}/pausar`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Erro ao pausar etapa');
        return await response.json();
    },

    async concluir(id, dados = {}) {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}/concluir`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao concluir etapa');
        return await response.json();
    },

    async pular(id, motivo = '') {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}/pular`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ motivo }),
        });
        if (!response.ok) throw new Error('Erro ao pular etapa');
        return await response.json();
    },

    async adicionarProblema(id, dados) {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}/problema`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao adicionar problema');
        return await response.json();
    },

    async atualizarDados(id, dadosEspecificos) {
        const response = await fetch(`${API_BASE_URL}/etapas/${id}/dados`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dadosEspecificos }),
        });
        if (!response.ok) throw new Error('Erro ao atualizar dados');
        return await response.json();
    },
};

// API de Obrigações
const obrigacoesAPI = {
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API_BASE_URL}/obrigacoes?${params}`);
        if (!response.ok) throw new Error('Erro ao listar obrigações');
        return await response.json();
    },

    async buscar(id) {
        const response = await fetch(`${API_BASE_URL}/obrigacoes/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar obrigação');
        return await response.json();
    },

    async criar(dados) {
        const response = await fetch(`${API_BASE_URL}/obrigacoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao criar obrigação');
        return await response.json();
    },

    async atualizarStatus(id, status) {
        const response = await fetch(`${API_BASE_URL}/obrigacoes/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Erro ao atualizar status');
        return await response.json();
    },

    async emRisco() {
        const response = await fetch(`${API_BASE_URL}/obrigacoes/em-risco/lista`);
        if (!response.ok) throw new Error('Erro ao buscar obrigações em risco');
        return await response.json();
    },
};

// API de Problemas
const problemasAPI = {
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API_BASE_URL}/problemas?${params}`);
        if (!response.ok) throw new Error('Erro ao listar problemas');
        return await response.json();
    },

    async buscar(id) {
        const response = await fetch(`${API_BASE_URL}/problemas/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar problema');
        return await response.json();
    },

    async criar(dados) {
        const response = await fetch(`${API_BASE_URL}/problemas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao criar problema');
        return await response.json();
    },

    async atualizar(id, dados) {
        const response = await fetch(`${API_BASE_URL}/problemas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!response.ok) throw new Error('Erro ao atualizar problema');
        return await response.json();
    },

    async resolver(id, resolucao) {
        const response = await fetch(`${API_BASE_URL}/problemas/${id}/resolver`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resolucao }),
        });
        if (!response.ok) throw new Error('Erro ao resolver problema');
        return await response.json();
    },

    async stats() {
        const response = await fetch(`${API_BASE_URL}/problemas/stats/geral`);
        if (!response.ok) throw new Error('Erro ao buscar estatísticas');
        return await response.json();
    },
};

// API de Dashboard
const dashboardAPI = {
    async geral() {
        const response = await fetch(`${API_BASE_URL}/dashboard`);
        if (!response.ok) throw new Error('Erro ao buscar dashboard');
        return await response.json();
    },

    async competenciasStatus() {
        const response = await fetch(`${API_BASE_URL}/dashboard/competencias-status`);
        if (!response.ok) throw new Error('Erro ao buscar status');
        return await response.json();
    },

    async obrigacoesEsfera() {
        const response = await fetch(`${API_BASE_URL}/dashboard/obrigacoes-esfera`);
        if (!response.ok) throw new Error('Erro ao buscar obrigações por esfera');
        return await response.json();
    },

    async proximosVencimentos() {
        const response = await fetch(`${API_BASE_URL}/dashboard/proximos-vencimentos`);
        if (!response.ok) throw new Error('Erro ao buscar vencimentos');
        return await response.json();
    },

    async empresasPendentes() {
        const response = await fetch(`${API_BASE_URL}/dashboard/empresas-pendentes`);
        if (!response.ok) throw new Error('Erro ao buscar empresas pendentes');
        return await response.json();
    },

    async resumoDia() {
        const response = await fetch(`${API_BASE_URL}/dashboard/resumo-dia`);
        if (!response.ok) throw new Error('Erro ao buscar resumo do dia');
        return await response.json();
    },
};

// API de Usuários
const usuariosAPI = {
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API_BASE_URL}/usuarios?${params}`);
        if (!response.ok) throw new Error('Erro ao listar usuários');
        return await response.json();
    },

    async buscar(id) {
        const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar usuário');
        return await response.json();
    },

    async login(email, senha) {
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });
        if (!response.ok) throw new Error('Credenciais inválidas');
        return await response.json();
    },
};

// Funções utilitárias
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function formatarDataHora(data) {
    return new Date(data).toLocaleString('pt-BR');
}

function formatarTempo(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}min`;
}

function getStatusBadge(status) {
    const classes = {
        'Nao Iniciado': 'bg-secondary',
        'Em Andamento': 'bg-warning text-dark',
        'Pausado': 'bg-info',
        'Concluido': 'bg-success',
        'Pulado': 'bg-danger',
        'Nao Iniciada': 'bg-secondary',
        'Em Preparacao': 'bg-info',
        'Preparada': 'bg-primary',
        'Entregue': 'bg-success',
        'Comprovada': 'bg-success',
    };

    const classe = classes[status] || 'bg-secondary';
    return `<span class="badge ${classe}">${status}</span>`;
}

function getImpactoBadge(impacto) {
    const classes = {
        'Baixo': 'bg-info',
        'Medio': 'bg-warning text-dark',
        'Alto': 'bg-danger',
        'Critico': 'bg-danger',
    };

    const classe = classes[impacto] || 'bg-secondary';
    return `<span class="badge ${classe}">${impacto}</span>`;
}
