import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.acaoLog.deleteMany();
  await prisma.timer.deleteMany();
  await prisma.problema.deleteMany();
  await prisma.obrigacao.deleteMany();
  await prisma.etapa.deleteMany();
  await prisma.competencia.deleteMany();
  await prisma.usuarioEmpresa.deleteMany();
  await prisma.empresa.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.feriado.deleteMany();
  await prisma.configuracao.deleteMany();

  console.log('✅ Dados antigos removidos');

  // Criar usuários
  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@contabil.com',
      senha: 'admin123', // Em produção, usar hash
      papel: 'Admin',
      ativo: true,
    },
  });

  const preparador1 = await prisma.usuario.create({
    data: {
      nome: 'Maria Silva',
      email: 'maria@contabil.com',
      senha: 'senha123',
      papel: 'Preparador',
      ativo: true,
    },
  });

  const preparador2 = await prisma.usuario.create({
    data: {
      nome: 'João Santos',
      email: 'joao@contabil.com',
      senha: 'senha123',
      papel: 'Preparador',
      ativo: true,
    },
  });

  const entregador = await prisma.usuario.create({
    data: {
      nome: 'Ana Costa',
      email: 'ana@contabil.com',
      senha: 'senha123',
      papel: 'Entregador',
      ativo: true,
    },
  });

  const gestor = await prisma.usuario.create({
    data: {
      nome: 'Carlos Oliveira',
      email: 'carlos@contabil.com',
      senha: 'senha123',
      papel: 'Gestor',
      ativo: true,
    },
  });

  console.log('✅ Usuários criados');

  // Criar empresas
  const empresaSN1 = await prisma.empresa.create({
    data: {
      cnpj: '12.345.678/0001-90',
      razaoSocial: 'Comércio de Alimentos Ltda',
      nomeFantasia: 'Mercadinho Bom Preço',
      regime: 'SN',
      segmento: 'Comercio',
      uf: 'SP',
      municipio: 'São Paulo',
      ativo: true,
    },
  });

  const empresaSN2 = await prisma.empresa.create({
    data: {
      cnpj: '23.456.789/0001-01',
      razaoSocial: 'Serviços de Consultoria Empresarial Ltda',
      nomeFantasia: 'Consultoria Excelência',
      regime: 'SN',
      segmento: 'Servicos',
      uf: 'RJ',
      municipio: 'Rio de Janeiro',
      ativo: true,
    },
  });

  const empresaLP1 = await prisma.empresa.create({
    data: {
      cnpj: '34.567.890/0001-12',
      razaoSocial: 'Indústria de Móveis São José S.A.',
      nomeFantasia: 'Móveis São José',
      regime: 'LP',
      segmento: 'Industria',
      uf: 'MG',
      municipio: 'Belo Horizonte',
      ativo: true,
    },
  });

  const empresaLP2 = await prisma.empresa.create({
    data: {
      cnpj: '45.678.901/0001-23',
      razaoSocial: 'Distribuidora de Produtos Eletrônicos Ltda',
      nomeFantasia: 'TechDistribuidora',
      regime: 'LP',
      segmento: 'Comercio',
      uf: 'SP',
      municipio: 'Campinas',
      ativo: true,
    },
  });

  const empresaLR1 = await prisma.empresa.create({
    data: {
      cnpj: '56.789.012/0001-34',
      razaoSocial: 'Construtora e Incorporadora Brasil S.A.',
      nomeFantasia: 'Construtora Brasil',
      regime: 'LR',
      segmento: 'Servicos',
      uf: 'SP',
      municipio: 'São Paulo',
      ativo: true,
    },
  });

  console.log('✅ Empresas criadas');

  // Associar usuários às empresas
  await prisma.usuarioEmpresa.createMany({
    data: [
      { usuarioId: preparador1.id, empresaId: empresaSN1.id, papel: 'Preparador' },
      { usuarioId: preparador1.id, empresaId: empresaLP1.id, papel: 'Preparador' },
      { usuarioId: preparador2.id, empresaId: empresaSN2.id, papel: 'Preparador' },
      { usuarioId: preparador2.id, empresaId: empresaLP2.id, papel: 'Preparador' },
      { usuarioId: preparador2.id, empresaId: empresaLR1.id, papel: 'Preparador' },
      { usuarioId: entregador.id, empresaId: empresaSN1.id, papel: 'Entregador' },
      { usuarioId: entregador.id, empresaId: empresaSN2.id, papel: 'Entregador' },
      { usuarioId: entregador.id, empresaId: empresaLP1.id, papel: 'Entregador' },
      { usuarioId: entregador.id, empresaId: empresaLP2.id, papel: 'Entregador' },
      { usuarioId: entregador.id, empresaId: empresaLR1.id, papel: 'Entregador' },
      { usuarioId: gestor.id, empresaId: empresaSN1.id, papel: 'Gestor' },
      { usuarioId: gestor.id, empresaId: empresaSN2.id, papel: 'Gestor' },
      { usuarioId: gestor.id, empresaId: empresaLP1.id, papel: 'Gestor' },
      { usuarioId: gestor.id, empresaId: empresaLP2.id, papel: 'Gestor' },
      { usuarioId: gestor.id, empresaId: empresaLR1.id, papel: 'Gestor' },
    ],
  });

  console.log('✅ Usuários associados às empresas');

  // Criar competências
  const competenciaSN1 = await prisma.competencia.create({
    data: {
      empresaId: empresaSN1.id,
      mesAno: '2025-03',
      status: 'Em Andamento',
      dataInicio: new Date('2025-04-01'),
      houveMovimento: true,
    },
  });

  const competenciaSN2 = await prisma.competencia.create({
    data: {
      empresaId: empresaSN2.id,
      mesAno: '2025-03',
      status: 'Nao Iniciado',
      houveMovimento: true,
    },
  });

  const competenciaLP1 = await prisma.competencia.create({
    data: {
      empresaId: empresaLP1.id,
      mesAno: '2025-03',
      status: 'Concluido',
      dataInicio: new Date('2025-04-01'),
      dataConclusao: new Date('2025-04-15'),
      tempoTotalMin: 180,
      houveMovimento: true,
    },
  });

  console.log('✅ Competências criadas');

  // Criar etapas para competência SN1
  const etapas = [
    {
      competenciaId: competenciaSN1.id,
      nome: 'Download de NFs',
      sistema: 'Jettax',
      tipo: 'Sistema',
      ordem: 1,
      status: 'Concluido',
      inicioAt: new Date('2025-04-01T09:00:00'),
      fimAt: new Date('2025-04-01T09:15:00'),
      duracaoMin: 15,
      efetividade: 5,
    },
    {
      competenciaId: competenciaSN1.id,
      nome: 'Importação e Conferência',
      sistema: 'Dominio',
      tipo: 'Sistema',
      ordem: 2,
      status: 'Concluido',
      inicioAt: new Date('2025-04-01T09:15:00'),
      fimAt: new Date('2025-04-01T09:45:00'),
      duracaoMin: 30,
      efetividade: 4,
      observacao: 'Algumas notas com divergência de CFOP, corrigido manualmente',
    },
    {
      competenciaId: competenciaSN1.id,
      nome: 'Apuração Sittax',
      sistema: 'Sittax',
      tipo: 'Sistema',
      ordem: 3,
      status: 'Em Andamento',
      inicioAt: new Date('2025-04-01T09:45:00'),
      duracaoMin: 0,
    },
  ];

  for (const etapa of etapas) {
    await prisma.etapa.create({ data: etapa });
  }

  console.log('✅ Etapas criadas');

  // Criar obrigações
  await prisma.obrigacao.createMany({
    data: [
      {
        competenciaId: competenciaSN1.id,
        tipo: 'DAS',
        esfera: 'Federal',
        vencimentoBase: new Date('2025-04-20'),
        vencimentoFinal: new Date('2025-04-22'), // Ajustado por feriado
        status: 'Em Preparacao',
        preparadorId: preparador1.id,
        entregadorId: entregador.id,
        diasParaVenc: 21,
      },
      {
        competenciaId: competenciaSN1.id,
        tipo: 'ICMS',
        esfera: 'Estadual',
        vencimentoBase: new Date('2025-04-15'),
        vencimentoFinal: new Date('2025-04-15'),
        status: 'Nao Iniciada',
        preparadorId: preparador1.id,
        entregadorId: entregador.id,
        diasParaVenc: 14,
      },
      {
        competenciaId: competenciaLP1.id,
        tipo: 'PIS/COFINS',
        esfera: 'Federal',
        vencimentoBase: new Date('2025-04-25'),
        vencimentoFinal: new Date('2025-04-25'),
        status: 'Entregue',
        preparadorId: preparador1.id,
        entregadorId: entregador.id,
        preparadaEm: new Date('2025-04-10'),
        entregueEm: new Date('2025-04-12'),
        diasParaVenc: 24,
      },
      {
        competenciaId: competenciaLP1.id,
        tipo: 'EFD Contribuições',
        esfera: 'Federal',
        vencimentoBase: new Date('2025-05-10'),
        vencimentoFinal: new Date('2025-05-12'),
        status: 'Comprovada',
        preparadorId: preparador1.id,
        entregadorId: entregador.id,
        preparadaEm: new Date('2025-04-15'),
        entregueEm: new Date('2025-04-15'),
        comprovadaEm: new Date('2025-04-15'),
        diasParaVenc: 41,
      },
    ],
  });

  console.log('✅ Obrigações criadas');

  // Criar problemas
  await prisma.problema.createMany({
    data: [
      {
        empresaId: empresaSN1.id,
        competenciaId: competenciaSN1.id,
        tipo: 'Sistema',
        categoria: 'Lentidão',
        descricao: 'Sistema Domínio muito lento hoje, demorou 3x mais que o normal',
        impacto: 'Medio',
        status: 'Aberto',
      },
      {
        empresaId: empresaSN1.id,
        competenciaId: competenciaSN1.id,
        tipo: 'Cliente',
        categoria: 'Documentação',
        descricao: 'Cliente não enviou XML de 5 notas fiscais, precisei solicitar novamente',
        impacto: 'Alto',
        status: 'Em Analise',
      },
    ],
  });

  console.log('✅ Problemas criados');

  // Criar feriados nacionais
  const feriadosNacionais = [
    { data: new Date('2025-01-01'), nome: 'Confraternização Universal', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-04-21'), nome: 'Tiradentes', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-05-01'), nome: 'Dia do Trabalho', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-09-07'), nome: 'Independência do Brasil', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-10-12'), nome: 'Nossa Senhora Aparecida', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-11-02'), nome: 'Finados', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-11-15'), nome: 'Proclamação da República', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-11-20'), nome: 'Consciência Negra', tipo: 'Nacional', recorrente: true },
    { data: new Date('2025-12-25'), nome: 'Natal', tipo: 'Nacional', recorrente: true },
  ];

  await prisma.feriado.createMany({ data: feriadosNacionais });

  // Feriados estaduais
  const feriadosEstaduais = [
    { data: new Date('2025-07-09'), nome: 'Revolução Constitucionalista', tipo: 'Estadual', uf: 'SP', recorrente: true },
    { data: new Date('2025-04-23'), nome: 'Dia de São Jorge', tipo: 'Estadual', uf: 'RJ', recorrente: true },
  ];

  await prisma.feriado.createMany({ data: feriadosEstaduais });

  console.log('✅ Feriados criados');

  // Criar configurações
  await prisma.configuracao.createMany({
    data: [
      { chave: 'NOME_ESCRITORIO', valor: 'Escritório de Contabilidade Exemplo', descricao: 'Nome do escritório' },
      { chave: 'SUBLIMITE_SN', valor: '3600000', descricao: 'Sublimite Simples Nacional em centavos (R$ 3.6mi)' },
      { chave: 'DIAS_ALERTA_VENCIMENTO', valor: '7,3,1', descricao: 'Dias antes do vencimento para alertas' },
      { chave: 'HORARIO_NOTIFICACAO', valor: '09:00', descricao: 'Horário para envio de notificações diárias' },
      { chave: 'BACKUP_AUTOMATICO', valor: 'true', descricao: 'Ativar backup automático' },
    ],
  });

  console.log('✅ Configurações criadas');

  console.log('🎉 Seed concluído com sucesso!');
  console.log('\n📊 Resumo:');
  console.log(`   - ${await prisma.usuario.count()} usuários`);
  console.log(`   - ${await prisma.empresa.count()} empresas`);
  console.log(`   - ${await prisma.competencia.count()} competências`);
  console.log(`   - ${await prisma.etapa.count()} etapas`);
  console.log(`   - ${await prisma.obrigacao.count()} obrigações`);
  console.log(`   - ${await prisma.problema.count()} problemas`);
  console.log(`   - ${await prisma.feriado.count()} feriados`);
  console.log(`   - ${await prisma.configuracao.count()} configurações`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
