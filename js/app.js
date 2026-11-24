/* ==========================================================================
   AÇÃO DIGITAL — ORQUESTRADOR PRINCIPAL DA APLICAÇÃO (SPA + PWA)
   Navegação, Favoritos/Minha Central, Pré-Atendimento, Conteúdos, Chat e Offline
   ========================================================================== */

(function () {
  const DATA = window.ACAO_DATA;
  const aiEngine = new window.AcaoAIEngine(DATA.config.aiConfig);
  const sessionChatHistory = [];

  const FAV_STORAGE_KEY = 'acao_digital_favorites_v1';
  const RECENT_STORAGE_KEY = 'acao_digital_recent_tools_v1';

  let deferredInstallPrompt = null;
  let swRegistration = null;

  function clearEl(el) {
    while (el && el.firstChild) el.removeChild(el.firstChild);
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /* ------------------------------------------------------------------------
     TOAST NOTIFICATIONS
     ------------------------------------------------------------------------ */
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = el('div', 'toast', message);
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 200ms ease';
      setTimeout(() => toast.remove(), 220);
    }, 3400);
  }
  window.showAcaoToast = showToast;

  /* ------------------------------------------------------------------------
     FAVORITES & RECENTLY USED TOOLS ("MINHA CENTRAL")
     ------------------------------------------------------------------------ */
  function getFavorites() {
    try {
      const arr = JSON.parse(localStorage.getItem(FAV_STORAGE_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(list) {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function getRecents() {
    try {
      const arr = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function recordRecentTool(toolId) {
    if (!DATA.toolsCatalog[toolId]) return;
    const current = getRecents().filter((id) => id !== toolId);
    current.unshift(toolId);
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(current.slice(0, 5)));
    } catch (e) {}
    renderMinhaCentral();
  }

  function toggleFavorite(toolId) {
    const favs = getFavorites();
    const idx = favs.indexOf(toolId);
    if (idx >= 0) {
      favs.splice(idx, 1);
      showToast('Removido dos favoritos.');
    } else {
      favs.unshift(toolId);
      showToast('Adicionado a Minha Central (Favoritos).');
    }
    saveFavorites(favs);
    syncFavoriteButtons();
    renderMinhaCentral();
  }

  function syncFavoriteButtons() {
    const favs = getFavorites();
    document.querySelectorAll('.fav-btn').forEach((btn) => {
      const id = btn.dataset.favId;
      const isFav = favs.includes(id);
      btn.classList.toggle('is-fav', isFav);
      const star = btn.querySelector('.fav-star');
      const label = btn.querySelector('span:last-child');
      if (star) star.textContent = isFav ? '★' : '☆';
      if (label) label.textContent = isFav ? 'Favoritado' : 'Favoritar';
    });
  }

  function renderMinhaCentral() {
    const favContainer = document.getElementById('favorites-list');
    const recContainer = document.getElementById('recent-tools-list');
    if (!favContainer || !recContainer) return;

    const favs = getFavorites();
    const recents = getRecents();

    clearEl(favContainer);
    if (favs.length === 0) {
      favContainer.appendChild(el('span', 'empty-chip-msg', 'Nenhuma ferramenta favoritada ainda. Clique em "Favoritar" dentro de qualquer calculadora ou checklist.'));
    } else {
      favs.forEach((id) => {
        const meta = DATA.toolsCatalog[id];
        if (!meta) return;
        const chip = el('button', 'tool-chip', `★ ${meta.name}`);
        chip.type = 'button';
        chip.addEventListener('click', () => {
          navigateTo(meta.view, meta.type === 'tool' ? { tool: id } : { simTab: id });
        });
        favContainer.appendChild(chip);
      });
    }

    clearEl(recContainer);
    if (recents.length === 0) {
      recContainer.appendChild(el('span', 'empty-chip-msg', 'Suas ferramentas acessadas aparecerão aqui automaticamente.'));
    } else {
      recents.forEach((id) => {
        const meta = DATA.toolsCatalog[id];
        if (!meta) return;
        const chip = el('button', 'tool-chip', meta.name);
        chip.type = 'button';
        chip.addEventListener('click', () => {
          navigateTo(meta.view, meta.type === 'tool' ? { tool: id } : { simTab: id });
        });
        recContainer.appendChild(chip);
      });
    }
  }

  /* ------------------------------------------------------------------------
     SPA NAVIGATION & SUB-TABS
     ------------------------------------------------------------------------ */
  const VALID_VIEWS = ['inicio', 'assistente', 'ferramentas', 'simuladores', 'reforma', 'conteudos', 'servicos', 'contato'];

  function activateToolTab(toolId) {
    if (!toolId) return;
    const tabs = document.querySelectorAll('.tool-tab');
    const panels = document.querySelectorAll('.tool-panel');
    tabs.forEach((t) => {
      const match = t.dataset.toolTarget === toolId;
      t.classList.toggle('active', match);
      t.setAttribute('aria-selected', match ? 'true' : 'false');
    });
    panels.forEach((p) => {
      p.classList.toggle('active', p.id === `tool-${toolId}`);
    });
    recordRecentTool(toolId);
  }

  function activateSimTab(simId) {
    if (!simId) return;
    const tabs = document.querySelectorAll('.sim-tab');
    const panels = document.querySelectorAll('.sim-panel');
    tabs.forEach((t) => {
      const match = t.dataset.simTarget === simId;
      t.classList.toggle('active', match);
      t.setAttribute('aria-selected', match ? 'true' : 'false');
    });
    panels.forEach((p) => {
      p.classList.toggle('active', p.id === `panel-${simId}`);
    });
    if (simId === 'sim-impostos') {
      recordRecentTool('sim-impostos');
    }
  }

  function navigateTo(viewName, options = {}) {
    const target = VALID_VIEWS.includes(viewName) ? viewName : 'inicio';

    document.querySelectorAll('.view-section').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `view-${target}`);
    });

    document.querySelectorAll('[data-nav]').forEach((navEl) => {
      navEl.classList.toggle('active', navEl.dataset.nav === target);
    });

    if (options.tool) {
      activateToolTab(options.tool);
    } else if (target === 'ferramentas') {
      const activeTool = document.querySelector('.tool-tab.active');
      if (activeTool) recordRecentTool(activeTool.dataset.toolTarget);
    }

    if (options.simTab) {
      activateSimTab(options.simTab);
    } else if (target === 'simuladores') {
      recordRecentTool('sim-impostos');
    }

    if (window.location.hash !== `#${target}`) {
      history.replaceState(null, '', `#${target}`);
    }

    closeMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ------------------------------------------------------------------------
     MOBILE DRAWER & MODALS
     ------------------------------------------------------------------------ */
  const drawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');

  function openMobileDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.classList.remove('hidden');
    document.getElementById('mobile-menu-toggle').setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.classList.add('hidden');
    document.getElementById('mobile-menu-toggle').setAttribute('aria-expanded', 'false');
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  }

  /* ------------------------------------------------------------------------
     AI ASSISTANT UI ("AÇÃO INTELIGENTE")
     ------------------------------------------------------------------------ */
  function initChatInterface() {
    const messagesBox = document.getElementById('chat-messages');
    const suggestionsBox = document.getElementById('chat-suggestions');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const typingEl = document.getElementById('chat-typing');
    const clearBtn = document.getElementById('ai-clear-btn');
    if (!messagesBox || !chatForm) return;

    function appendWelcomeMessage() {
      clearEl(messagesBox);
      sessionChatHistory.length = 0;
      renderBotBubble({
        category: 'Ação Inteligente • Modo Demonstrativo',
        title: 'Olá! Como posso ajudar a sua empresa hoje?',
        paragraphs: [
          'Sou o assistente orientativo da Ação Contabilidade & Consultoria. Posso explicar conceitos sobre abertura de CNPJ, MEI, Simples Nacional, Lucro Presumido, folha de pagamento, obrigações fiscais e Reforma Tributária.',
          'Escolha uma das perguntas sugeridas abaixo ou digite sua dúvida.'
        ],
        bullets: [],
        whatsappUrl: aiEngine.buildWhatsAppUrl('', 'Atendimento Geral')
      }, true);
    }

    function renderUserBubble(text) {
      const wrap = el('div', 'chat-msg chat-msg--user');
      const meta = el('div', 'chat-msg__meta', 'Você');
      const bubble = el('div', 'chat-bubble', text);
      wrap.appendChild(meta);
      wrap.appendChild(bubble);
      messagesBox.appendChild(wrap);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function renderBotBubble(response, isWelcome = false) {
      const wrap = el('div', 'chat-msg chat-msg--bot');
      const meta = el('div', 'chat-msg__meta');
      meta.appendChild(el('span', 'badge badge-gold', response.category));
      wrap.appendChild(meta);

      const bubble = el('div', 'chat-bubble');
      bubble.appendChild(el('h4', '', response.title));

      (response.paragraphs || []).forEach((p) => {
        bubble.appendChild(el('p', '', p));
      });

      if (response.bullets && response.bullets.length > 0) {
        const ul = document.createElement('ul');
        response.bullets.forEach((b) => ul.appendChild(el('li', '', b)));
        bubble.appendChild(ul);
      }

      if (!isWelcome) {
        const disc = el(
          'div',
          'chat-bubble-disclaimer',
          'Nota: Orientação educativa em modo demonstrativo. Não substitui avaliação individual do contador.'
        );
        bubble.appendChild(disc);

        const actions = el('div', 'chat-bubble-actions');
        const waLink = el('a', 'btn btn-primary btn-sm external-online-link', 'Solicitar análise de um especialista');
        waLink.href = response.whatsappUrl;
        waLink.target = '_blank';
        waLink.rel = 'noopener noreferrer';
        actions.appendChild(waLink);
        bubble.appendChild(actions);
      }

      wrap.appendChild(bubble);
      messagesBox.appendChild(wrap);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    async function handleSend(rawText) {
      const text = String(rawText || '').trim();
      if (!text) return;

      renderUserBubble(text);
      sessionChatHistory.push({ role: 'user', content: text });
      chatInput.value = '';
      chatInput.style.height = 'auto';

      typingEl.classList.remove('hidden');
      messagesBox.scrollTop = messagesBox.scrollHeight;

      await new Promise((r) => setTimeout(r, 340));
      const reply = await aiEngine.sendMessage(text, sessionChatHistory);
      typingEl.classList.add('hidden');

      sessionChatHistory.push({ role: 'assistant', content: reply.title });
      renderBotBubble(reply, false);
    }

    // Render suggestion chips
    clearEl(suggestionsBox);
    aiEngine.getOpeningSuggestions().forEach((q) => {
      const chip = el('button', 'suggestion-chip', q);
      chip.type = 'button';
      chip.addEventListener('click', () => handleSend(q));
      suggestionsBox.appendChild(chip);
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSend(chatInput.value);
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(chatInput.value);
      }
    });

    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + 'px';
    });

    clearBtn.addEventListener('click', () => {
      appendWelcomeMessage();
      showToast('Conversa reiniciada.');
    });

    // Quick-ask triggers from Home FAQ card
    document.querySelectorAll('.quick-ask-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const question = btn.dataset.question;
        navigateTo('assistente');
        setTimeout(() => handleSend(question), 180);
      });
    });

    appendWelcomeMessage();
  }

  /* ------------------------------------------------------------------------
     PRÉ-ATENDIMENTO INTELIGENTE (TRIAGE WIZARD)
     ------------------------------------------------------------------------ */
  function initSmartTriage() {
    const clientEl = document.getElementById('triage-client');
    const topicEl = document.getElementById('triage-topic');
    const needEl = document.getElementById('triage-need');
    const goalEl = document.getElementById('triage-goal');
    if (!clientEl) return;

    const deptTitle = document.getElementById('triage-dept-title');
    const deptDesc = document.getElementById('triage-dept-desc');
    const summaryList = document.getElementById('triage-summary-list');
    const nextStep = document.getElementById('triage-next-step');
    const waBtn = document.getElementById('triage-whatsapp-btn');

    const SECTOR_MAP = {
      'Abertura de empresa': {
        sector: 'Setor Societário e Constituição de Empresas',
        desc: 'Responsável por análise de viabilidade, definição de CNAE, contrato social, registro na Junta Comercial e emissão do CNPJ.',
        step: 'Envie o resumo pelo WhatsApp para agendar uma conversa inicial sobre atividades, sócios e melhor regime tributário.'
      },
      'Contábil': {
        sector: 'Setor de Gestão Contábil',
        desc: 'Responsável por escrituração contábil, balancetes, DRE, Balanço Patrimonial e análise de indicadores financeiros.',
        step: 'Compartilhe sua necessidade com nossa equipe contábil para alinhar demonstrativos e relatórios da empresa.'
      },
      'Fiscal': {
        sector: 'Setor Fiscal e Tributário',
        desc: 'Responsável por apuração de tributos, declarações acessórias, emissão fiscal e planejamento tributário.',
        step: 'Inicie o contato informando o regime atual ou faturamento estimado para direcionamento técnico.'
      },
      'Societário': {
        sector: 'Setor de Consultoria Societária',
        desc: 'Responsável por alterações contratuais, alvarás de funcionamento, certidões e baixa/encerramento de empresas.',
        step: 'Informe o tipo de alteração ou regularização desejada pelo WhatsApp para conferência documental.'
      },
      'Departamento Pessoal': {
        sector: 'Setor Trabalhista e Previdenciário (DP)',
        desc: 'Responsável por folha de pagamento, admissões, férias, rescisões, encargos sociais e transmissão no eSocial.',
        step: 'Envie sua demanda ao Departamento Pessoal para orientação sobre prazos legais e documentação.'
      },
      'Financeiro/empresarial': {
        sector: 'Consultoria Empresarial e Serviços Personalizados',
        desc: 'Apoio estratégico em organização financeira, auditoria interna, due diligence e estruturação de processos.',
        step: 'Converse com nossos consultores para apresentar o momento atual da sua empresa.'
      },
      'Outros': {
        sector: 'Atendimento Integrado Ação Contabilidade',
        desc: 'Nossa equipe de triagem encaminhará sua demanda diretamente ao coordenador da área correspondente.',
        step: 'Clique abaixo para iniciar o atendimento com nossa equipe.'
      }
    };

    function updateTriage() {
      const client = clientEl.value;
      const topic = topicEl.value;
      const need = (needEl.value || '').trim();
      const goal = goalEl.value;

      const info = SECTOR_MAP[topic] || SECTOR_MAP['Outros'];
      deptTitle.textContent = info.sector;
      deptDesc.textContent = info.desc;
      nextStep.textContent = info.step;

      clearEl(summaryList);
      [
        `Perfil: ${client}`,
        `Assunto principal: ${topic}`,
        `Necessidade: ${need || 'Não detalhada (a explicar no atendimento)'}`,
        `Objetivo: ${goal}`
      ].forEach((line) => summaryList.appendChild(el('li', '', line)));

      const waText = [
        'Olá! Fiz o Pré-Atendimento na plataforma Ação Digital:',
        `• Perfil: ${client}`,
        `• Setor sugerido: ${info.sector}`,
        `• Assunto: ${topic}`,
        need ? `• Necessidade: ${need}` : null,
        `• Objetivo: ${goal}`
      ].filter(Boolean).join('
');

      waBtn.href = `https://wa.me/${DATA.config.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    }

    [clientEl, topicEl, needEl, goalEl].forEach((node) => {
      node.addEventListener('input', updateTriage);
      node.addEventListener('change', updateTriage);
    });

    updateTriage();
  }

  /* ------------------------------------------------------------------------
     CENTRAL DA REFORMA TRIBUTÁRIA
     ------------------------------------------------------------------------ */
  function initReformaSection() {
    const cardsGrid = document.getElementById('reform-cards-grid');
    const timelineEl = document.getElementById('reform-timeline');
    const glossaryEl = document.getElementById('reform-glossary');
    const faqsEl = document.getElementById('reform-faqs');
    const searchEl = document.getElementById('reform-search');
    if (!cardsGrid) return;

    const rData = DATA.reformaData;

    function render(query = '') {
      const q = query.toLowerCase().trim();

      clearEl(cardsGrid);
      const filteredCards = rData.cards.filter((c) =>
        !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
      if (filteredCards.length === 0) {
        cardsGrid.appendChild(el('p', 'muted-text', 'Nenhum tópico encontrado para o termo pesquisado.'));
      } else {
        filteredCards.forEach((c) => {
          const card = el('article', 'card reform-card');
          card.appendChild(el('span', 'badge badge-gold', c.badge));
          card.appendChild(el('h3', '', c.title));
          card.appendChild(el('p', '', c.description));
          cardsGrid.appendChild(card);
        });
      }

      clearEl(timelineEl);
      rData.timeline.forEach((step) => {
        const item = el('div', 'timeline-item');
        item.appendChild(el('strong', '', step.period));
        item.appendChild(el('p', '', step.detail));
        timelineEl.appendChild(item);
      });

      clearEl(glossaryEl);
      rData.glossary
        .filter((g) => !q || g.term.toLowerCase().includes(q) || g.meaning.toLowerCase().includes(q))
        .forEach((g) => {
          const box = el('div', 'reform-term-item');
          box.appendChild(el('strong', '', g.term));
          box.appendChild(el('p', '', g.meaning));
          glossaryEl.appendChild(box);
        });

      clearEl(faqsEl);
      rData.faqs
        .filter((f) => !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
        .forEach((f, idx) => {
          const det = document.createElement('details');
          det.className = 'faq-item';
          if (idx === 0) det.open = true;
          det.appendChild(el('summary', '', f.question));
          det.appendChild(el('p', '', f.answer));
          faqsEl.appendChild(det);
        });
    }

    searchEl.addEventListener('input', () => render(searchEl.value));
    render();
  }

  /* ------------------------------------------------------------------------
     PORTAL DE CONTEÚDOS E INFORMAÇÕES
     ------------------------------------------------------------------------ */
  function initContentPortal() {
    const articlesGrid = document.getElementById('articles-grid');
    const categoriesBox = document.getElementById('articles-categories');
    const searchEl = document.getElementById('articles-search');
    const homeRecentBox = document.getElementById('home-recent-articles');
    if (!articlesGrid) return;

    const articles = DATA.articlesData;
    const categories = ['Todos', 'Notícias', 'Contabilidade', 'Fiscal e Tributário', 'Departamento Pessoal', 'Empresarial', 'Reforma Tributária', 'MEI', 'Gestão'];
    let activeCat = 'Todos';
    let currentArticle = null;

    function openArticleModal(article) {
      currentArticle = article;
      document.getElementById('modal-article-cat').textContent = article.category;
      document.getElementById('modal-article-meta').textContent = `${article.date} • ${article.readTime}`;
      document.getElementById('modal-article-title').textContent = article.title;

      const contentBox = document.getElementById('modal-article-content');
      clearEl(contentBox);
      article.paragraphs.forEach((p) => contentBox.appendChild(el('p', '', p)));

      if (article.bullets && article.bullets.length > 0) {
        contentBox.appendChild(el('h4', '', 'Pontos-chave para atenção:'));
        const ul = document.createElement('ul');
        article.bullets.forEach((b) => ul.appendChild(el('li', '', b)));
        contentBox.appendChild(ul);
      }

      const waBtn = document.getElementById('article-whatsapp-btn');
      const waMsg = `Olá, li o material "${article.title}" na plataforma Ação Digital e gostaria de conversar com um especialista.`;
      waBtn.href = `https://wa.me/${DATA.config.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

      const relatedBox = document.getElementById('modal-related-articles');
      clearEl(relatedBox);
      articles
        .filter((a) => a.id !== article.id)
        .slice(0, 2)
        .forEach((rel) => {
          const btn = el('button', 'mini-article-item');
          btn.type = 'button';
          btn.appendChild(el('span', '', rel.category));
          btn.appendChild(el('strong', '', rel.title));
          btn.addEventListener('click', () => openArticleModal(rel));
          relatedBox.appendChild(btn);
        });

      openModal('article-modal');
    }

    const shareBtn = document.getElementById('share-article-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        if (!currentArticle) return;
        const shareData = {
          title: `${currentArticle.title} — Ação Digital`,
          text: currentArticle.summary,
          url: window.location.href
        };
        if (navigator.share) {
          try {
            await navigator.share(shareData);
            return;
          } catch (e) {}
        }
        try {
          await navigator.clipboard.writeText(`${shareData.title}
${shareData.text}
${shareData.url}`);
          showToast('Link e resumo do conteúdo copiados para a área de transferência.');
        } catch (e) {
          showToast('Compartilhamento pronto: copie o endereço do navegador.');
        }
      });
    }

    function renderCategories() {
      clearEl(categoriesBox);
      categories.forEach((cat) => {
        const btn = el('button', 'filter-pill' + (cat === activeCat ? ' active' : ''), cat);
        btn.type = 'button';
        btn.addEventListener('click', () => {
          activeCat = cat;
          renderCategories();
          renderArticles();
        });
        categoriesBox.appendChild(btn);
      });
    }

    function renderArticles() {
      const q = (searchEl.value || '').toLowerCase().trim();
      const filtered = articles.filter((art) => {
        const matchCat = activeCat === 'Todos' || art.category === activeCat;
        if (!matchCat) return false;
        if (!q) return true;
        return (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
        );
      });

      clearEl(articlesGrid);
      if (filtered.length === 0) {
        articlesGrid.appendChild(el('p', 'muted-text', 'Nenhum conteúdo encontrado para o filtro selecionado.'));
        return;
      }

      filtered.forEach((art) => {
        const card = el('article', 'card article-card');
        const top = el('div');
        const meta = el('div', 'article-card__meta');
        meta.appendChild(el('span', 'badge badge-gold', art.category));
        meta.appendChild(el('span', '', art.readTime));
        top.appendChild(meta);
        top.appendChild(el('h3', '', art.title));
        top.appendChild(el('p', '', art.summary));
        card.appendChild(top);

        const btn = el('button', 'btn btn-secondary btn-sm', 'Ler orientação completa');
        btn.type = 'button';
        btn.addEventListener('click', () => openArticleModal(art));
        card.appendChild(btn);

        articlesGrid.appendChild(card);
      });
    }

    // Populate Home Recent Articles preview
    if (homeRecentBox) {
      clearEl(homeRecentBox);
      articles.slice(0, 3).forEach((art) => {
        const btn = el('button', 'mini-article-item');
        btn.type = 'button';
        btn.appendChild(el('span', '', `${art.category} • ${art.readTime}`));
        btn.appendChild(el('strong', '', art.title));
        btn.addEventListener('click', () => openArticleModal(art));
        homeRecentBox.appendChild(btn);
      });
    }

    searchEl.addEventListener('input', renderArticles);
    renderCategories();
    renderArticles();
  }

  /* ------------------------------------------------------------------------
     CENTRAL DE SERVIÇOS DA AÇÃO
     ------------------------------------------------------------------------ */
  function initServicesSection() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    clearEl(grid);
    DATA.servicesData.forEach((srv) => {
      const card = el('article', 'card service-card');
      card.id = `service-card-${srv.id}`;

      const top = el('div');
      const iconBox = el('div', 'service-card__icon');
      iconBox.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
      top.appendChild(iconBox);
      top.appendChild(el('h3', '', srv.title));
      top.appendChild(el('p', 'mt-1', srv.description));

      const ul = el('ul', 'service-sublist mt-1');
      srv.items.forEach((it) => ul.appendChild(el('li', '', it)));
      top.appendChild(ul);

      const exBox = el('div', 'service-example-box mt-1');
      exBox.appendChild(el('strong', '', 'Quando solicitar: '));
      exBox.appendChild(document.createTextNode(srv.example));
      top.appendChild(exBox);

      card.appendChild(top);

      const cta = el('a', 'btn btn-primary btn-block external-online-link', 'Solicitar atendimento');
      cta.href = `https://wa.me/${DATA.config.whatsappNumber}?text=${encodeURIComponent(srv.whatsappText)}`;
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
      card.appendChild(cta);

      grid.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------------
     CONTACT FORM BUILDER & OFFICE HOURS INDICATOR
     ------------------------------------------------------------------------ */
  function initContactSection() {
    const form = document.getElementById('contact-builder-form');
    const emailBtn = document.getElementById('cb-email-btn');
    const hoursBadge = document.getElementById('office-hours-badge');

    if (hoursBadge) {
      const now = new Date();
      const day = now.getDay(); // 1..5 Mon-Fri
      const hour = now.getHours();
      const isOpen = day >= 1 && day <= 5 && hour >= 7 && hour < 18;
      hoursBadge.textContent = isOpen
        ? 'Atendimento disponível agora (07:00 às 18:00)'
        : 'Horário comercial: Seg a Sex, 07:00 às 18:00';
    }

    if (!form) return;

    function validateAndBuild() {
      const name = (document.getElementById('cb-name').value || '').trim();
      const company = (document.getElementById('cb-company').value || '').trim();
      const sector = document.getElementById('cb-sector').value;
      const message = (document.getElementById('cb-message').value || '').trim();
      const errBox = document.getElementById('cb-error');

      if (!name || !message) {
        errBox.textContent = 'Por favor, preencha seu nome e a mensagem antes de continuar.';
        errBox.classList.remove('hidden');
        return null;
      }

      errBox.classList.add('hidden');
      const fullText = [
        `Olá, equipe da Ação Contabilidade!`,
        `Nome: ${name}`,
        company ? `Empresa/Perfil: ${company}` : null,
        `Área de interesse: ${sector}`,
        `Mensagem: ${message}`
      ].filter(Boolean).join('
');

      return { name, sector, fullText };
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!navigator.onLine) {
        showToast('Você está offline. Conecte-se à internet para abrir o WhatsApp.');
        return;
      }
      const payload = validateAndBuild();
      if (!payload) return;
      const url = `https://wa.me/${DATA.config.whatsappNumber}?text=${encodeURIComponent(payload.fullText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        const payload = validateAndBuild();
        if (!payload) return;
        const subject = `Atendimento Ação Digital — ${payload.sector} (${payload.name})`;
        window.location.href = `mailto:${DATA.config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(payload.fullText)}`;
      });
    }
  }

  /* ------------------------------------------------------------------------
     PWA INSTALL, SERVICE WORKER & ONLINE/OFFLINE MONITOR
     ------------------------------------------------------------------------ */
  function initPWAAndConnectivity() {
    const offlineBanner = document.getElementById('offline-banner');
    const statusChip = document.getElementById('connection-status-chip');
    const installBtn = document.getElementById('install-app-btn');
    const mobileInstallBtn = document.getElementById('mobile-install-btn');
    const nativeArea = document.getElementById('native-install-trigger-area');
    const nativeTriggerBtn = document.getElementById('trigger-native-install');
    const updateBanner = document.getElementById('sw-update-banner');
    const reloadBtn = document.getElementById('sw-reload-btn');

    function updateOnlineStatus() {
      const online = navigator.onLine;
      if (offlineBanner) offlineBanner.classList.toggle('hidden', online);
      if (statusChip) {
        statusChip.textContent = online ? 'Online' : 'Offline';
        statusChip.classList.toggle('offline', !online);
      }
    }

    window.addEventListener('online', () => {
      updateOnlineStatus();
      showToast('Conexão com a internet restabelecida.');
    });

    window.addEventListener('offline', () => {
      updateOnlineStatus();
    });

    updateOnlineStatus();

    // Intercept external online-only links (WhatsApp, Instagram, Maps) when offline
    document.addEventListener('click', (e) => {
      const extLink = e.target.closest('a.external-online-link');
      if (extLink && !navigator.onLine) {
        e.preventDefault();
        showToast('Você está offline. Este recurso externo requer conexão com a internet.');
      }
    });

    // Capture beforeinstallprompt for native install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (nativeArea) nativeArea.classList.remove('hidden');
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      if (nativeArea) nativeArea.classList.add('hidden');
      closeModal('install-modal');
      showToast('Aplicativo Ação Digital instalado com sucesso!');
    });

    async function handleInstallClick() {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          deferredInstallPrompt = null;
        }
      } else {
        openModal('install-modal');
      }
    }

    if (installBtn) installBtn.addEventListener('click', handleInstallClick);
    if (mobileInstallBtn) {
      mobileInstallBtn.addEventListener('click', () => {
        closeMobileDrawer();
        handleInstallClick();
      });
    }
    if (nativeTriggerBtn) nativeTriggerBtn.addEventListener('click', handleInstallClick);

    // Register Service Worker with relative path for GitHub Pages compatibility
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .then((reg) => {
            swRegistration = reg;
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (!newWorker) return;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (updateBanner) updateBanner.classList.remove('hidden');
                }
              });
            });
          })
          .catch(() => {
            // Fails gracefully on non-HTTPS local file:// preview
          });
      });
    }

    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => {
        if (swRegistration && swRegistration.waiting) {
          swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
      });
    }
  }

  /* ------------------------------------------------------------------------
     INITIALIZE EVERYTHING ON DOM READY
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    window.AcaoTools.initAll();
    initChatInterface();
    initSmartTriage();
    initReformaSection();
    initContentPortal();
    initServicesSection();
    initContactSection();
    initPWAAndConnectivity();

    syncFavoriteButtons();
    renderMinhaCentral();

    // Global navigation delegation
    document.addEventListener('click', (e) => {
      const navTrigger = e.target.closest('[data-nav]');
      if (navTrigger) {
        e.preventDefault();
        navigateTo(navTrigger.dataset.nav, {
          tool: navTrigger.dataset.tool || null,
          simTab: navTrigger.dataset.simTab || null
        });
        return;
      }

      const toolTab = e.target.closest('.tool-tab');
      if (toolTab) {
        activateToolTab(toolTab.dataset.toolTarget);
        return;
      }

      const simTab = e.target.closest('.sim-tab');
      if (simTab) {
        activateSimTab(simTab.dataset.simTarget);
        return;
      }

      const favBtn = e.target.closest('.fav-btn');
      if (favBtn) {
        toggleFavorite(favBtn.dataset.favId);
        return;
      }

      const closeModalBtn = e.target.closest('[data-close-modal]');
      if (closeModalBtn) {
        closeModal(closeModalBtn.dataset.closeModal);
        return;
      }

      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
      }
    });

    // Mobile drawer controls
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');
    if (menuToggle) menuToggle.addEventListener('click', openMobileDrawer);
    if (menuClose) menuClose.addEventListener('click', closeMobileDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

    // Privacy modal
    const privacyBtn = document.getElementById('footer-privacy-btn');
    if (privacyBtn) privacyBtn.addEventListener('click', () => openModal('privacy-modal'));

    // Escape key closes drawer and modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileDrawer();
        document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.add('hidden'));
      }
    });

    // Back to top visibility
    const backTopBtn = document.getElementById('back-to-top');
    if (backTopBtn) {
      window.addEventListener('scroll', () => {
        backTopBtn.classList.toggle('hidden', window.scrollY < 320);
      }, { passive: true });
      backTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Handle initial hash route (including PWA shortcuts!)
    const initialHash = window.location.hash.replace('#', '');
    if (VALID_VIEWS.includes(initialHash)) {
      navigateTo(initialHash);
    }
  });
})();
