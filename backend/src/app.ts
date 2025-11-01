import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Importar rotas
import empresaRoutes from './controllers/empresa.controller';
import competenciaRoutes from './controllers/competencia.controller';
import etapaRoutes from './controllers/etapa.controller';
import obrigacaoRoutes from './controllers/obrigacao.controller';
import usuarioRoutes from './controllers/usuario.controller';
import problemaRoutes from './controllers/problema.controller';
import dashboardRoutes from './controllers/dashboard.controller';
import relatorioRoutes from './controllers/relatorio.controller';

// Carregar variáveis de ambiente
dotenv.config();

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

// Rotas da API
app.use('/api/empresas', empresaRoutes);
app.use('/api/competencias', competenciaRoutes);
app.use('/api/etapas', etapaRoutes);
app.use('/api/obrigacoes', obrigacaoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/problemas', problemaRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Rota de health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Rota de documentação da API
app.get('/api/docs', (req: Request, res: Response) => {
  res.json({
    message: 'Sistema de Gestão Contábil - API Documentation',
    version: '1.0.0',
    endpoints: {
      empresas: '/api/empresas',
      competencias: '/api/competencias',
      etapas: '/api/etapas',
      obrigacoes: '/api/obrigacoes',
      usuarios: '/api/usuarios',
      problemas: '/api/problemas',
      dashboard: '/api/dashboard',
      relatorios: '/api/relatorios',
    },
  });
});

// Rota principal - servir o frontend
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Rota do dashboard
app.get('/dashboard', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'dashboard.html'));
});

// Tratamento de erro 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
  });
});

// Tratamento de erros global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erro:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro ao processar requisição',
  });
});

export default app;
