# Manual de Instalação - Sistema de Gestão Contábil

## 📋 Requisitos do Sistema

### Hardware Mínimo
- **Processador:** Intel Core i3 ou equivalente
- **Memória RAM:** 4 GB
- **Espaço em Disco:** 500 MB livres
- **Sistema Operacional:** Windows 10 ou superior

### Software Necessário
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Navegador Web:** Chrome, Firefox, Edge ou Safari (versões recentes)

## 🚀 Instalação Passo a Passo

### Método 1: Instalação Automática (Recomendado)

1. **Extrair o arquivo ZIP**
   - Extraia o conteúdo do arquivo `gestao-contabil.zip` em `C:\GestaoContabil\`
   - Certifique-se de que a estrutura de pastas está correta

2. **Executar o instalador**
   - Navegue até `C:\GestaoContabil\gestao-contabil\scripts\`
   - Clique duas vezes em `instalar.bat`
   - Aguarde a instalação concluir (pode levar alguns minutos)

3. **Iniciar o sistema**
   - Clique duas vezes em `iniciar.bat`
   - Aguarde a mensagem "Servidor iniciado com sucesso!"
   - Abra o navegador e acesse: `http://localhost:3000`

### Método 2: Instalação Manual

1. **Instalar Node.js**
   - Baixe o instalador em [nodejs.org](https://nodejs.org/)
   - Execute o instalador e siga as instruções
   - Reinicie o computador após a instalação

2. **Verificar instalação do Node.js**
   - Abra o Prompt de Comando (cmd)
   - Digite: `node --version`
   - Deve aparecer algo como: `v18.x.x`

3. **Extrair o projeto**
   - Extraia o arquivo ZIP em `C:\GestaoContabil\`

4. **Instalar dependências**
   ```cmd
   cd C:\GestaoContabil\gestao-contabil\backend
   npm install
   ```

5. **Configurar banco de dados**
   ```cmd
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

6. **Iniciar o servidor**
   ```cmd
   npm start
   ```

7. **Acessar o sistema**
   - Abra o navegador
   - Acesse: `http://localhost:3000`

## 🔧 Configuração Inicial

### 1. Verificar Porta

Se a porta 3000 já estiver em uso, você pode alterá-la:

1. Abra o arquivo `C:\GestaoContabil\gestao-contabil\backend\.env`
2. Altere a linha `PORT=3000` para outra porta (ex: `PORT=3001`)
3. Salve o arquivo
4. Reinicie o servidor

### 2. Configurar Banco de Dados

O banco de dados SQLite é criado automaticamente em:
```
C:\GestaoContabil\gestao-contabil\data\gestao-contabil.db
```

**Importante:** Faça backup regular deste arquivo!

### 3. Dados de Exemplo

O sistema vem com dados de exemplo pré-carregados:
- 5 empresas (SN, LP e LR)
- 5 usuários (Admin, Preparadores, Entregador, Gestor)
- Competências de exemplo
- Obrigações e problemas de teste

Para limpar os dados de exemplo e começar do zero:
```cmd
cd C:\GestaoContabil\gestao-contabil\backend
npm run prisma:migrate -- --force
```

## 🎯 Primeiro Acesso

### Login no Sistema

Use um dos usuários padrão:

| Email | Senha | Papel |
|-------|-------|-------|
| admin@contabil.com | admin123 | Administrador |
| maria@contabil.com | senha123 | Preparador |
| joao@contabil.com | senha123 | Preparador |
| ana@contabil.com | senha123 | Entregador |
| carlos@contabil.com | senha123 | Gestor |

**⚠️ IMPORTANTE:** Altere as senhas padrão após o primeiro acesso!

### Navegação Inicial

1. **Dashboard Principal**
   - Visão geral do sistema
   - Competências pendentes
   - Próximos vencimentos

2. **Empresas**
   - Cadastre suas empresas
   - Configure regime tributário
   - Associe colaboradores

3. **Competências**
   - Crie competências mensais
   - Inicie os processos
   - Acompanhe o progresso

## 🛠️ Solução de Problemas

### Erro: "Node.js não encontrado"

**Solução:**
1. Instale o Node.js de [nodejs.org](https://nodejs.org/)
2. Reinicie o computador
3. Tente novamente

### Erro: "Porta 3000 já em uso"

**Solução:**
1. Feche outros programas que possam estar usando a porta
2. Ou altere a porta no arquivo `.env` (veja seção "Configuração Inicial")

### Erro: "Banco de dados não encontrado"

**Solução:**
```cmd
cd C:\GestaoContabil\gestao-contabil\backend
npm run prisma:migrate
npm run prisma:seed
```

### Erro: "Erro ao instalar dependências"

**Solução:**
1. Verifique sua conexão com a internet
2. Delete a pasta `node_modules`
3. Execute novamente: `npm install`

### Erro: "Página não carrega no navegador"

**Solução:**
1. Verifique se o servidor está rodando (veja o Prompt de Comando)
2. Verifique se está acessando `http://localhost:3000` (não `https`)
3. Tente outro navegador
4. Limpe o cache do navegador

## 📞 Suporte Adicional

### Logs do Sistema

Os logs ficam em:
```
C:\GestaoContabil\gestao-contabil\data\logs\app.log
```

Consulte este arquivo para detalhes sobre erros.

### Verificar Status do Sistema

Acesse no navegador:
```
http://localhost:3000/api/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-11-01T...",
  "uptime": 123.45,
  "environment": "development"
}
```

### Prisma Studio (Interface Visual do Banco)

Para visualizar e editar dados diretamente:
```cmd
cd C:\GestaoContabil\gestao-contabil\backend
npm run prisma:studio
```

Abrirá automaticamente em: `http://localhost:5555`

## 🔄 Atualizações Futuras

Para atualizar o sistema:

1. Faça backup do banco de dados
2. Extraia a nova versão em uma pasta temporária
3. Copie o arquivo `gestao-contabil.db` da pasta antiga para a nova
4. Execute `npm install` na pasta backend
5. Execute `npm run prisma:generate`
6. Inicie o sistema

## ✅ Checklist de Instalação

- [ ] Node.js instalado e funcionando
- [ ] Projeto extraído em `C:\GestaoContabil\`
- [ ] Dependências instaladas (`npm install`)
- [ ] Prisma Client gerado (`npm run prisma:generate`)
- [ ] Banco de dados criado (`npm run prisma:migrate`)
- [ ] Dados de exemplo carregados (`npm run prisma:seed`)
- [ ] Servidor iniciado (`npm start`)
- [ ] Sistema acessível em `http://localhost:3000`
- [ ] Login realizado com sucesso
- [ ] Backup configurado

## 🎉 Próximos Passos

Após a instalação bem-sucedida:

1. Leia o [Manual do Usuário](MANUAL-USO.md)
2. Configure suas empresas
3. Cadastre seus colaboradores
4. Inicie suas primeiras competências
5. Configure backups automáticos

---

**Versão:** 1.0.0  
**Última Atualização:** Novembro 2025
