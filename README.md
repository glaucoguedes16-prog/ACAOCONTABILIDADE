# AÇÃO DIGITAL — Plataforma Web & PWA

**Inteligência, gestão e soluções para o seu negócio.**  
Produto digital complementar desenvolvido para a **Ação Contabilidade & Consultoria**.

---

## 1. Estrutura de Pastas

```text
acao-digital/
├── index.html                  # Aplicação principal (SPA + PWA)
├── offline.html                # Página dedicada de fallback offline
├── manifest.json               # Manifesto PWA (ícones, atalhos, tema, standalone)
├── service-worker.js           # Cache offline-first e estratégia de atualização
├── README.md                   # Documentação técnica e guia de publicação
├── css/
│   └── styles.css              # Design System Obsidian & Gold responsivo
├── js/
│   ├── data.js                 # Base estruturada e editável (serviços, glossário, artigos, reforma)
│   ├── ai-assistant.js         # Assistente Ação Inteligente (modo demonstrativo + hook para backend)
│   ├── tools.js                # Calculadoras financeiras, checklists (localStorage), glossário e simulador
│   └── app.js                  # Roteamento SPA, favoritos, triagem, PWA install e status offline
├── icons/
│   ├── icon-192.png            # Ícone PWA 192x192
│   ├── icon-512.png            # Ícone PWA 512x512
│   ├── icon-maskable-512.png   # Ícone PWA Maskable 512x512
│   ├── apple-touch-icon.png    # Ícone iOS 180x180
│   └── favicon-32.png          # Favicon 32x32
└── assets/
    ├── logo-acao-full.png      # Logotipo completo Ação Contabilidade & Consultoria
    └── simbolo-acao.png        # Símbolo oficial dourado
```

---

## 2. Publicação no GitHub Pages

1. Crie um repositório público no GitHub (ex.: `acao-digital`).
2. Envie todos os arquivos e pastas mantendo a estrutura raiz (`index.html`, `manifest.json`, `service-worker.js`, `css/`, `js/`, `icons/`, `assets/`).
3. Acesse **Settings → Pages** no repositório.
4. Em **Source**, selecione **Deploy from a branch**, escolha a branch `main` e a pasta `/ (root)`, e clique em **Save**.
5. Aguarde alguns instantes e acesse `https://SEU-USUARIO.github.io/acao-digital/` (HTTPS habilitado automaticamente).

Todos os caminhos do projeto são relativos (`./`), garantindo funcionamento tanto em subdiretórios do GitHub Pages quanto em domínio próprio.

---

## 3. Como Integrar uma IA Real com Segurança no Futuro

O arquivo `js/ai-assistant.js` já possui o método `queryRemoteBackend(prompt, sessionHistory)`.  
**Nunca insira chaves de API (OpenAI, Gemini, Anthropic etc.) diretamente no código front-end público.**

Para ativar IA generativa real:
1. Crie uma função serverless segura (Cloudflare Workers, Vercel Functions, Netlify Functions ou AWS Lambda) onde a `API_KEY` fique armazenada como variável de ambiente secreta no servidor.
2. Configure CORS permitindo apenas o domínio oficial da Ação Digital.
3. Em `js/data.js`, altere:
   ```js
   aiConfig: {
     mode: 'api',
     backendEndpoint: 'https://seu-worker-seguro.workers.dev/chat'
   }
   ```
