import dotenv from 'dotenv';

dotenv.config();

const requiredVars = ['APP_BASE_URL'];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️  Variável de ambiente não definida: ${key}`);
  }
});

export const env = {
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
  whatsappToken: process.env.WHATSAPP_TOKEN || '',
  phoneNumberId: process.env.PHONE_NUMBER_ID || '',
  wabaId: process.env.WABA_ID || '',
  verifyToken: process.env.VERIFY_TOKEN || '',
};

export default env;
