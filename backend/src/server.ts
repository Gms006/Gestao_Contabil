import app from './app';
import { startCronJobs } from './jobs/reminder.job';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('🚀 Servidor iniciado com sucesso!');
  console.log(`📡 Rodando em: http://localhost:${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/docs`);
  console.log('\n✨ Sistema de Gestão Contábil pronto para uso!\n');

  // Iniciar jobs agendados
  startCronJobs();
  console.log('⏰ Jobs de notificação iniciados');
});

// Tratamento de erros
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Erro não tratado:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM recebido, encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});
