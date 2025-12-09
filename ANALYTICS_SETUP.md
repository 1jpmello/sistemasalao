# 📊 Analytics Setup - Andromeda Solutions

Sistema de analytics integrado para rastrear ações dos usuários no site.

## 🚀 Como Configurar

### 1. Criar conta no Google Analytics 4

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma nova propriedade (Google Analytics 4)
3. Copie seu **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 2. Adicionar o Measurement ID ao projeto

Substitua `G-XXXXXXXXXX` pelo seu ID real em 2 lugares:

#### **Arquivo 1:** `client/index.html` (linha 26)
```html
<!-- Google Analytics 4 - Replace G-XXXXXXXXXX with your actual Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=SEU-ID-AQUI"></script>
```

#### **Arquivo 2:** `client/src/lib/analytics.ts` (linha 10)
```typescript
export const GA_MEASUREMENT_ID = 'SEU-ID-AQUI'; // Replace with your GA4 Measurement ID
```

### 3. Deploy no Netlify

Quando você fizer deploy no Netlify, o analytics vai funcionar automaticamente.

**Importante:** O analytics só funciona em produção (não em localhost), então você precisa fazer deploy para ver os dados.

## 📈 O que está sendo rastreado

### Eventos Automáticos
- Pageviews (visualizações de página)
- Tempo na página
- Taxa de rejeição

### Eventos Personalizados Implementados

#### 🎯 CTAs (Call to Actions)
- Botão "Experimentar Agora" (header)
- Botão "Testar demonstração agora" (hero)
- Botão "Ver demonstração funcionando"
- Botão "Testar agora"
- Botão "Quero testar gratuitamente" (oferta)

#### 🧭 Navegação
- Cliques nos links do menu (Benefícios, Recursos, Antes e depois, Oferta)
- Scroll entre seções

#### 💬 Interações
- Clique no botão WhatsApp (flutuante)
- Cliques em redes sociais (footer)

#### 🎓 Tour/Demo
- Início do tour guiado
- Conclusão do tour guiado
- Abertura da demo

#### ❓ FAQ
- Expansão de perguntas no FAQ

## 📊 Como ver os dados no Google Analytics

1. Acesse o Google Analytics
2. Vá em **Relatórios** → **Engajamento** → **Eventos**
3. Você verá todos os eventos rastreados:
   - `cta_click` - Cliques em CTAs
   - `section_navigation` - Navegação entre seções
   - `demo_opened` - Abertura da demo
   - `tour_started` / `tour_completed` - Tour guiado
   - `whatsapp_click` - Clique no WhatsApp
   - `social_click` - Cliques em redes sociais
   - `faq_expanded` - Perguntas expandidas no FAQ

## 🔍 Métricas Úteis para Acompanhar

### Taxa de Conversão
- Quantas pessoas clicaram em "Testar demonstração agora"
- Quantas pessoas completaram o tour
- Quantas pessoas clicaram no WhatsApp

### Engajamento
- Quais seções são mais visitadas
- Quantas perguntas do FAQ são abertas
- Tempo médio no site

### Funil de Conversão
1. Visualização da landing page
2. Clique em CTA
3. Acesso à demo
4. Conclusão do tour

## 💡 Dicas

- No Google Analytics, crie **conversões** para os eventos mais importantes (ex: `cta_click`)
- Configure **públicos-alvo** baseados nos eventos para remarketing
- Use o **Explorador** do Google Analytics para criar relatórios personalizados

## 🛠️ Desenvolvimento Local

Durante o desenvolvimento (localhost), os eventos são logados no console do navegador:
```
📊 Analytics Event: cta_click {location: "hero", button_text: "Testar demonstração agora"}
```

Isso permite debugar e verificar se os eventos estão sendo disparados corretamente.

## ✅ Checklist de Deploy

- [ ] Substituir `G-XXXXXXXXXX` pelo Measurement ID real
- [ ] Fazer build e deploy no Netlify
- [ ] Aguardar ~24h para dados aparecerem no Google Analytics
- [ ] Verificar eventos em Relatórios → Engajamento → Eventos

## 🆘 Suporte

Se os dados não aparecerem após 24-48 horas:
1. Verifique se o Measurement ID está correto
2. Abra o site em uma aba anônima e clique em alguns botões
3. Use a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) para verificar se os eventos estão sendo enviados
