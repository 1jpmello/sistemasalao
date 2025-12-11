# Guia de Hospedagem no Netlify - Andromeda Solutions

Este guia ensina como hospedar o frontend da aplicação no Netlify.

## Aviso Importante

O Netlify hospeda apenas sites estáticos (frontend). Como esta aplicação possui um backend com banco de dados, você precisará:
1. Hospedar o frontend no Netlify
2. Hospedar o backend separadamente (Render, Railway, Heroku, etc.)

## Passo 1: Preparar o Projeto

1. No terminal, execute o comando para criar o build:
```bash
npm run build
```

2. Isso criará uma pasta `dist/public` com os arquivos do frontend.

## Passo 2: Criar Conta no Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **Sign up** (Criar conta)
3. Você pode criar conta com:
   - GitHub
   - GitLab
   - Bitbucket
   - Email

## Passo 3: Fazer Deploy (Opção A - Arrastar e Soltar)

1. Após fazer login, vá para a página inicial do Netlify
2. Localize a área que diz **"Drag and drop your site folder here"**
3. Arraste a pasta `dist/public` para essa área
4. Aguarde o upload e pronto!

## Passo 3: Fazer Deploy (Opção B - Conectar com Git)

1. Faça push do código para GitHub/GitLab/Bitbucket
2. No Netlify, clique em **"Add new site"** > **"Import an existing project"**
3. Conecte sua conta do GitHub
4. Selecione o repositório do projeto
5. Configure o build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/public`
6. Clique em **Deploy site**

## Passo 4: Configurar Redirecionamentos

Para que as rotas do React funcionem, crie um arquivo `_redirects`:

1. Crie o arquivo `client/public/_redirects` com o conteúdo:
```
/*    /index.html   200
```

2. Faça rebuild e redeploy

## Passo 5: Configurar Domínio Personalizado (Opcional)

1. Vá em **Site settings** > **Domain management**
2. Clique em **Add custom domain**
3. Digite seu domínio (ex: meusite.com.br)
4. Siga as instruções para configurar o DNS

## Configurando o Backend

Como o Netlify não suporta backend Node.js, você precisa:

### Opção 1: Usar Netlify Functions (Serverless)

1. Adapte seu backend para Netlify Functions
2. Crie pasta `netlify/functions`
3. Cada rota vira uma função separada

### Opção 2: Hospedar Backend Separadamente

Serviços recomendados para o backend:

- **Render.com** (gratuito para projetos pequenos)
- **Railway.app** (fácil de usar)
- **Heroku** (popular e confiável)
- **Fly.io** (bom desempenho)

### Opção 3: Usar Replit para Tudo

A forma mais simples é publicar diretamente no Replit:
1. Clique no botão **Deploy** no canto superior direito
2. Siga as instruções para publicar
3. Seu site estará disponível em um domínio `.replit.app`

## Variáveis de Ambiente no Netlify

1. Vá em **Site settings** > **Environment variables**
2. Adicione suas variáveis:
   - `VITE_API_URL` - URL do seu backend

## Resumo

| Etapa | Ação |
|-------|------|
| 1 | Rodar `npm run build` |
| 2 | Criar conta no Netlify |
| 3 | Arrastar pasta `dist/public` ou conectar Git |
| 4 | Adicionar arquivo `_redirects` |
| 5 | Configurar domínio (opcional) |

## Dicas Importantes

- Sempre teste localmente antes de publicar
- Mantenha as variáveis de ambiente seguras
- Use HTTPS sempre que possível
- Configure cache corretamente para melhor performance

## Suporte

Se precisar de ajuda, entre em contato pelo WhatsApp da Andromeda Solutions.
