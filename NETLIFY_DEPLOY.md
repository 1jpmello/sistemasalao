# Guia Completo: Netlify (Frontend) + Render (Backend)

Este guia ensina como hospedar a aplicação Andromeda Solutions usando Netlify para o frontend e Render para o backend com banco de dados.

---

## Parte 1: Configurar o Backend no Render

### Passo 1.1: Criar Conta no Render

1. Acesse [render.com](https://render.com)
2. Clique em **Get Started for Free**
3. Crie conta com GitHub (recomendado) ou email

### Passo 1.2: Criar Banco de Dados PostgreSQL

1. No dashboard do Render, clique em **New +** > **PostgreSQL**
2. Configure:
   - **Name**: andromeda-db
   - **Region**: Ohio (US East) ou mais próximo de você
   - **Plan**: Free (para testes) ou Starter ($7/mês para produção)
3. Clique em **Create Database**
4. Aguarde a criação (pode levar alguns minutos)
5. Copie a **External Database URL** - você vai precisar dela

### Passo 1.3: Criar o Serviço Web (Backend)

1. Clique em **New +** > **Web Service**
2. Conecte seu repositório GitHub
3. Selecione o repositório do projeto
4. Configure:
   - **Name**: andromeda-api
   - **Region**: Mesmo do banco de dados
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Clique em **Advanced** e adicione variáveis de ambiente:
   - `DATABASE_URL` = (cole a External Database URL do passo anterior)
   - `NODE_ENV` = production
6. Clique em **Create Web Service**

### Passo 1.4: Executar Migração do Banco

Após o deploy do backend:

1. No dashboard do Render, vá para o seu serviço web
2. Clique em **Shell** no menu lateral
3. Execute: `npm run db:push`
4. (Opcional) Para criar dados de exemplo: `npx tsx server/seed.ts`

### Passo 1.5: Copiar URL da API

1. Na página do seu serviço web no Render
2. Copie a URL (ex: `https://andromeda-api.onrender.com`)
3. Guarde essa URL para usar no Netlify

---

## Parte 2: Configurar o Frontend no Netlify

### Passo 2.1: Criar Conta no Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **Sign up**
3. Crie conta com GitHub (recomendado)

### Passo 2.2: Conectar o Repositório

1. No dashboard, clique em **Add new site** > **Import an existing project**
2. Selecione **GitHub** e conecte sua conta
3. Selecione o repositório do projeto

### Passo 2.3: Configurar o Build

Configure as opções de build:

| Campo | Valor |
|-------|-------|
| **Base directory** | (deixe vazio) |
| **Build command** | `npm run build` |
| **Publish directory** | `dist/public` |

### Passo 2.4: Adicionar Variáveis de Ambiente

Antes de fazer o deploy:

1. Clique em **Show advanced**
2. Em **Environment variables**, adicione:
   - **Key**: `VITE_API_URL`
   - **Value**: URL do seu backend no Render (ex: `https://andromeda-api.onrender.com`)

### Passo 2.5: Fazer Deploy

1. Clique em **Deploy site**
2. Aguarde o build (2-5 minutos)
3. Quando concluir, você terá uma URL como `https://random-name.netlify.app`

---

## Parte 3: Configurações Adicionais

### Configurar Domínio Personalizado (Opcional)

**No Netlify:**
1. Vá em **Site settings** > **Domain management**
2. Clique em **Add custom domain**
3. Digite seu domínio (ex: meusite.com.br)
4. Configure o DNS conforme instruções

**No Render (para API):**
1. Vá para seu serviço web
2. Em **Settings** > **Custom Domains**
3. Adicione um subdomínio (ex: api.meusite.com.br)

### Configurar CORS no Backend (Se Necessário)

Se houver erros de CORS, edite o arquivo `server/index.ts` e adicione:

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'https://seu-site.netlify.app',
  credentials: true
}));
```

---

## Parte 4: Credenciais de Teste

Após o deploy, use estas credenciais para testar:

| Login | Senha |
|-------|-------|
| andromedateste123 | andromedasolutions123 |
| giovannakilzerteste | gigi123 |

---

## Parte 5: Checklist Final

- [ ] Banco de dados PostgreSQL criado no Render
- [ ] Backend deployado no Render
- [ ] Migração do banco executada (`npm run db:push`)
- [ ] URL da API copiada
- [ ] Frontend deployado no Netlify
- [ ] Variável `VITE_API_URL` configurada no Netlify
- [ ] Teste de login funcionando
- [ ] Domínio personalizado configurado (opcional)

---

## Solução de Problemas

### Erro "Failed to fetch" ou "Network Error"

1. Verifique se o backend está rodando no Render
2. Confirme que a variável `VITE_API_URL` está correta no Netlify
3. Verifique se não há erros de CORS

### Login não funciona

1. Confirme que a migração foi executada (`npm run db:push`)
2. Execute o seed para criar usuários: `npx tsx server/seed.ts`
3. Verifique os logs do backend no Render

### Página em branco ou 404

1. Verifique se o arquivo `_redirects` existe em `client/public/`
2. Confirme que o **Publish directory** é `dist/public`

---

## Custos Estimados

| Serviço | Plano Gratuito | Plano Pago |
|---------|----------------|------------|
| **Netlify** | 100GB/mês, builds ilimitados | $19/mês (Pro) |
| **Render** | 750h/mês (backend dorme após 15min) | $7/mês (Starter) |
| **Render DB** | 90 dias, 1GB | $7/mês (Starter) |

**Recomendação para produção**: Plano Starter do Render ($14/mês total) para evitar que o backend "durma".

---

## Suporte

Se precisar de ajuda, entre em contato pelo WhatsApp da Andromeda Solutions.
