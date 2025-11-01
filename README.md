# Sistema de Gestão de Procedimentos Contábeis

Sistema completo para mapear, padronizar e monitorar procedimentos contábeis de **Simples Nacional**, **Lucro Presumido** e **Lucro Real**, capturando passo a passo, tempo gasto, problemas enfrentados e pontos de melhoria.

## 📋 Características Principais

- ✅ **Gestão de Empresas** por regime tributário (SN, LP, LR)
- ✅ **Controle de Competências** mensais com status e progresso
- ✅ **Rastreamento de Etapas** com timer automático
- ✅ **"Hora Desabafo"** - registro de problemas e dificuldades
- ✅ **Sistema de Pular/Retomar** - salva o ponto onde parou
- ✅ **Geração de Obrigações** com ajuste automático por feriados
- ✅ **Alertas de Vencimento** (D-7, D-3, D-1)
- ✅ **Relatórios Gerenciais** completos
- ✅ **Dashboard Analítico** com gráficos
- ✅ **100% Offline** - funciona sem internet

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js 18+** com TypeScript
- **Express.js** - servidor web
- **Prisma ORM** - gerenciamento de banco de dados
- **SQLite** - banco de dados local
- **node-cron** - agendamento de tarefas

### Frontend
- **HTML5/CSS3/JavaScript** puro
- **Bootstrap 5** - interface responsiva
- **Chart.js** - gráficos e visualizações
- **Bootstrap Icons** - ícones

## 📦 Instalação no Windows

### Pré-requisitos
- **Node.js 18+** instalado ([Download](https://nodejs.org/))
- **Git** (opcional, para clonar o repositório)

### Passo a Passo

1. **Extrair o arquivo ZIP** em `C:\GestaoContabil\`

2. **Abrir o Prompt de Comando** (cmd) como Administrador

3. **Navegar até a pasta do backend:**
   ```cmd
   cd C:\GestaoContabil\gestao-contabil\backend
   ```

4. **Instalar dependências:**
   ```cmd
   npm install
   ```

5. **Gerar o Prisma Client:**
   ```cmd
   npm run prisma:generate
   ```

6. **Criar o banco de dados e popular com dados de exemplo:**
   ```cmd
   npm run prisma:migrate
   npm run prisma:seed
   ```

7. **Iniciar o servidor:**
   ```cmd
   npm start
   ```

8. **Abrir o navegador** e acessar:
   ```
   http://localhost:3000
   ```

## 🎯 Scripts Disponíveis

### Backend

```cmd
# Modo desenvolvimento (com hot-reload)
npm run dev

# Compilar TypeScript
npm run build

# Iniciar em produção
npm start

# Gerar Prisma Client
npm run prisma:generate

# Criar/atualizar banco de dados
npm run prisma:migrate

# Popular banco com dados de exemplo
npm run prisma:seed

# Abrir Prisma Studio (interface visual do banco)
npm run prisma:studio
```

## 📁 Estrutura do Projeto

```
gestao-contabil/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações
│   │   ├── controllers/     # Controllers da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── jobs/            # Jobs agendados
│   │   ├── models/          # Schema Prisma
│   │   └── utils/           # Utilitários
│   ├── prisma/
│   │   ├── schema.prisma    # Modelo do banco
│   │   └── seed.ts          # Dados iniciais
│   └── package.json
├── frontend/
│   ├── index.html           # Página principal
│   ├── dashboard.html       # Dashboard analítico
│   ├── css/                 # Estilos
│   └── js/                  # Scripts
├── data/
│   ├── gestao-contabil.db   # Banco SQLite (gerado)
│   └── feriados-nacionais.json
├── scripts/
│   ├── instalar.bat         # Script de instalação
│   ├── iniciar.bat          # Script para iniciar
│   └── backup.bat           # Script de backup
└── docs/
    ├── INSTALACAO.md        # Guia de instalação
    ├── MANUAL-USO.md        # Manual do usuário
    └── FLUXOS.md            # Documentação dos fluxos
```

## 🔐 Usuários Padrão

O sistema vem com usuários de exemplo:

| Email | Senha | Papel |
|-------|-------|-------|
| admin@contabil.com | admin123 | Admin |
| maria@contabil.com | senha123 | Preparador |
| joao@contabil.com | senha123 | Preparador |
| ana@contabil.com | senha123 | Entregador |
| carlos@contabil.com | senha123 | Gestor |

## 📊 Funcionalidades Detalhadas

### 1. Gestão de Empresas
- Cadastro completo com CNPJ, razão social, regime tributário
- Segmentação por tipo (Comércio, Serviços, Indústria)
- Associação de colaboradores por empresa

### 2. Controle de Competências
- Criação automática de etapas baseadas no regime
- Status: Não Iniciado, Em Andamento, Pausado, Concluído
- Cálculo automático de tempo total

### 3. Rastreamento de Etapas
- Timer automático por etapa
- Registro de sistema utilizado (Jettax, Domínio, Sittax, etc.)
- Avaliação de efetividade (1-5 estrelas)
- Campo de observação ("Hora Desabafo")

### 4. Sistema de Pular/Retomar
- Permite pular etapas temporariamente
- Salva o ponto exato onde parou
- Lista de pendências para retomar

### 5. Geração de Obrigações
- Cálculo automático de vencimentos
- Ajuste por feriados (nacionais, estaduais, municipais)
- Atribuição de preparador e entregador
- Controle de status (Não Iniciada → Preparada → Entregue → Comprovada)

### 6. Alertas e Notificações
- Verificação automática a cada hora
- Alertas em D-7, D-3 e D-1
- Notificação de obrigações em risco
- Resumo diário às 8h

### 7. Relatórios Gerenciais
- Produtividade por colaborador
- Tempo médio por processo
- Problemas mais frequentes
- Obrigações por empresa
- Relatório consolidado por período

### 8. Dashboard Analítico
- Gráficos de competências por status
- Obrigações por esfera (Federal, Estadual, Municipal)
- Problemas por tipo
- Tempo médio por regime
- Produtividade por usuário

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# Banco de Dados
DATABASE_URL="file:../../data/gestao-contabil.db"

# Servidor
PORT=3000
NODE_ENV=development

# Notificações
ENABLE_NOTIFICATIONS=true
NOTIFICATION_DAYS_BEFORE=7,3,1

# Backup
AUTO_BACKUP=true
BACKUP_INTERVAL_HOURS=24
```

## 📝 Fluxos de Trabalho

### Simples Nacional
1. Captura Empresa e Competência
2. Confirma Movimento
3. Download de NFs (Jettax)
4. Importação e Conferência (Domínio)
5. Apuração (Sittax)
6. Confronto Sittax x Domínio
7. Verificação de Sublimite
8. Verificação de DIFAL
9. Geração de Obrigações

### Lucro Presumido
1. Captura Empresa e Competência
2. Coleta e Importação
3. Conferência
4. PIS/COFINS
5. ICMS
6. DIFAL Consumo
7. REINF
8. IRPJ/CSLL
9. Geração de Obrigações

### Lucro Real
Similar ao Lucro Presumido + ECF (Escrituração Contábil Fiscal)

## 🛠️ Manutenção

### Backup do Banco de Dados

**Manual:**
```cmd
copy C:\GestaoContabil\gestao-contabil\data\gestao-contabil.db C:\GestaoContabil\backup\gestao-contabil-backup-%date%.db
```

**Automático:**
O sistema faz backup automático a cada 24 horas (configurável)

### Logs

Os logs do sistema ficam em:
```
C:\GestaoContabil\gestao-contabil\data\logs\app.log
```

## 🐛 Solução de Problemas

### Erro ao iniciar o servidor
- Verifique se o Node.js está instalado: `node --version`
- Verifique se as dependências foram instaladas: `npm install`
- Verifique se a porta 3000 está livre

### Banco de dados não encontrado
- Execute: `npm run prisma:migrate`
- Execute: `npm run prisma:seed`

### Erro ao gerar Prisma Client
- Delete a pasta `node_modules`
- Execute: `npm install`
- Execute: `npm run prisma:generate`

## 📞 Suporte

Para dúvidas ou problemas:
- Consulte a documentação em `/docs`
- Verifique os logs em `/data/logs`
- Abra uma issue no GitHub (se aplicável)

## 📄 Licença

Este projeto é de uso interno do escritório de contabilidade.

## 🎉 Créditos

Desenvolvido com base nas especificações de gestão de procedimentos contábeis, utilizando as melhores práticas de desenvolvimento web e gerenciamento de processos.

---

**Versão:** 1.0.0  
**Data:** Novembro 2025  
**Status:** Pronto para Produção
