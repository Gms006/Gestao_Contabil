-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "regime" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,
    "periodicidadeIrpjCsll" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" TEXT NOT NULL,
    "telefone" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioEmpresa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "papel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UsuarioEmpresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UsuarioEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Competencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "mesAno" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Nao Iniciado',
    "dataInicio" DATETIME,
    "dataConclusao" DATETIME,
    "tempoTotalMin" INTEGER NOT NULL DEFAULT 0,
    "houveMovimento" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Competencia_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Etapa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competenciaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sistema" TEXT,
    "tipo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Nao Iniciado',
    "inicioAt" DATETIME,
    "fimAt" DATETIME,
    "duracaoMin" INTEGER NOT NULL DEFAULT 0,
    "efetividade" INTEGER,
    "observacao" TEXT,
    "dadosEspecificos" TEXT,
    "manualFlag" BOOLEAN NOT NULL DEFAULT false,
    "manualMin" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Etapa_competenciaId_fkey" FOREIGN KEY ("competenciaId") REFERENCES "Competencia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Timer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "etapaId" TEXT NOT NULL,
    "inicioAt" DATETIME NOT NULL,
    "fimAt" DATETIME,
    "pausadoAt" DATETIME,
    "duracaoSeg" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Timer_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "Etapa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Problema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "etapaId" TEXT,
    "empresaId" TEXT,
    "competenciaId" TEXT,
    "local" TEXT,
    "tipo" TEXT NOT NULL,
    "categoria" TEXT,
    "descricao" TEXT NOT NULL,
    "impacto" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aberto',
    "resolucao" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvidoEm" DATETIME,
    "tempoEsperaMin" INTEGER,
    "tempoTotalMin" INTEGER,
    CONSTRAINT "Problema_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "Etapa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Obrigacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competenciaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "esfera" TEXT NOT NULL,
    "vencimentoBase" DATETIME NOT NULL,
    "vencimentoFinal" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Nao Iniciada',
    "preparadorId" TEXT,
    "entregadorId" TEXT,
    "preparadaEm" DATETIME,
    "entregueEm" DATETIME,
    "comprovadaEm" DATETIME,
    "emRisco" BOOLEAN NOT NULL DEFAULT false,
    "diasParaVenc" INTEGER,
    "emCimaPrazo" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Obrigacao_competenciaId_fkey" FOREIGN KEY ("competenciaId") REFERENCES "Competencia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Obrigacao_preparadorId_fkey" FOREIGN KEY ("preparadorId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Obrigacao_entregadorId_fkey" FOREIGN KEY ("entregadorId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feriado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "uf" TEXT,
    "municipio" TEXT,
    "recorrente" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "AcaoLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidadeId" TEXT,
    "detalhes" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AcaoLog_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Configuracao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Conversa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "usuarioId" TEXT,
    "empresaId" TEXT,
    "competenciaId" TEXT,
    "etapaAtual" TEXT NOT NULL,
    "estadoJson" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MensagemLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "direction" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "messageId" TEXT,
    "payload" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FeriadoNacional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "UsuarioEmpresa_usuarioId_idx" ON "UsuarioEmpresa"("usuarioId");

-- CreateIndex
CREATE INDEX "UsuarioEmpresa_empresaId_idx" ON "UsuarioEmpresa"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioEmpresa_usuarioId_empresaId_key" ON "UsuarioEmpresa"("usuarioId", "empresaId");

-- CreateIndex
CREATE INDEX "Competencia_empresaId_idx" ON "Competencia"("empresaId");

-- CreateIndex
CREATE INDEX "Competencia_mesAno_idx" ON "Competencia"("mesAno");

-- CreateIndex
CREATE INDEX "Competencia_status_idx" ON "Competencia"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Competencia_empresaId_mesAno_key" ON "Competencia"("empresaId", "mesAno");

-- CreateIndex
CREATE INDEX "Etapa_competenciaId_idx" ON "Etapa"("competenciaId");

-- CreateIndex
CREATE INDEX "Etapa_status_idx" ON "Etapa"("status");

-- CreateIndex
CREATE INDEX "Timer_etapaId_idx" ON "Timer"("etapaId");

-- CreateIndex
CREATE INDEX "Timer_ativo_idx" ON "Timer"("ativo");

-- CreateIndex
CREATE INDEX "Problema_status_idx" ON "Problema"("status");

-- CreateIndex
CREATE INDEX "Problema_tipo_idx" ON "Problema"("tipo");

-- CreateIndex
CREATE INDEX "Problema_criadoEm_idx" ON "Problema"("criadoEm");

-- CreateIndex
CREATE INDEX "Obrigacao_competenciaId_idx" ON "Obrigacao"("competenciaId");

-- CreateIndex
CREATE INDEX "Obrigacao_status_idx" ON "Obrigacao"("status");

-- CreateIndex
CREATE INDEX "Obrigacao_vencimentoFinal_idx" ON "Obrigacao"("vencimentoFinal");

-- CreateIndex
CREATE INDEX "Obrigacao_emRisco_idx" ON "Obrigacao"("emRisco");

-- CreateIndex
CREATE INDEX "Feriado_data_idx" ON "Feriado"("data");

-- CreateIndex
CREATE INDEX "Feriado_tipo_idx" ON "Feriado"("tipo");

-- CreateIndex
CREATE INDEX "AcaoLog_usuarioId_idx" ON "AcaoLog"("usuarioId");

-- CreateIndex
CREATE INDEX "AcaoLog_timestamp_idx" ON "AcaoLog"("timestamp");

-- CreateIndex
CREATE INDEX "AcaoLog_entidade_idx" ON "AcaoLog"("entidade");

-- CreateIndex
CREATE UNIQUE INDEX "Configuracao_chave_key" ON "Configuracao"("chave");

-- CreateIndex
CREATE INDEX "Conversa_phone_idx" ON "Conversa"("phone");

-- CreateIndex
CREATE INDEX "MensagemLog_messageId_idx" ON "MensagemLog"("messageId");

-- CreateIndex
CREATE INDEX "MensagemLog_phone_idx" ON "MensagemLog"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "FeriadoNacional_data_key" ON "FeriadoNacional"("data");
