/* ==========================================================================
   AÇÃO DIGITAL — MÓDULO DE FERRAMENTAS E SIMULADORES INTERATIVOS
   Calculadoras, Checklists (localStorage), Glossário e Simulador Tributário
   ========================================================================== */

(function () {
  const DATA = window.ACAO_DATA;

  function formatBRL(value) {
    const num = Number.isFinite(value) ? value : 0;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function formatPct(value, decimals = 1) {
    const num = Number.isFinite(value) ? value : 0;
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + '%';
  }

  function sanitizeNumber(inputEl, fallback = 0) {
    if (!inputEl) return fallback;
    const val = parseFloat(String(inputEl.value).replace(',', '.'));
    return Number.isFinite(val) && val >= 0 ? val : fallback;
  }

  function clearChildren(el) {
    while (el && el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  /* ------------------------------------------------------------------------
     FERRAMENTA 1: CALCULADORA DE CUSTO DE FUNCIONÁRIO
     ------------------------------------------------------------------------ */
  function initEmployeeCalculator() {
    const form = document.getElementById('form-calc-funcionario');
    if (!form) return;

    const salaryEl = document.getElementById('emp-salary');
    const regimeEl = document.getElementById('emp-regime');
    const vaEl = document.getElementById('emp-va');
    const vtTotalEl = document.getElementById('emp-vt-total');
    const vtDiscEl = document.getElementById('emp-vt-discount');
    const otherEl = document.getElementById('emp-other');

    const cfgFgts = document.getElementById('cfg-fgts');
    const cfg13 = document.getElementById('cfg-13');
    const cfgFerias = document.getElementById('cfg-ferias');
    const cfgRescisao = document.getElementById('cfg-rescisao');
    const cfgPatronal = document.getElementById('cfg-patronal');

    const resMonthly = document.getElementById('res-emp-monthly');
    const resFactor = document.getElementById('res-emp-factor');
    const resAnnual = document.getElementById('res-emp-annual');
    const resCharges = document.getElementById('res-emp-charges');
    const breakdownBox = document.getElementById('res-emp-breakdown');

    regimeEl.addEventListener('change', () => {
      if (regimeEl.value === 'simples_geral') {
        cfgPatronal.value = '0';
      } else if (regimeEl.value === 'simples_anexo4') {
        cfgPatronal.value = '20.0';
      } else {
        cfgPatronal.value = '27.8';
      }
      calculate();
    });

    function calculate() {
      const salary = sanitizeNumber(salaryEl, 0);
      const va = sanitizeNumber(vaEl, 0);
      const vtTotal = sanitizeNumber(vtTotalEl, 0);
      const vtDiscPct = Math.min(6, sanitizeNumber(vtDiscEl, 6));
      const other = sanitizeNumber(otherEl, 0);

      const fgtsPct = sanitizeNumber(cfgFgts, 8);
      const p13Pct = sanitizeNumber(cfg13, 8.33);
      const feriasPct = sanitizeNumber(cfgFerias, 11.11);
      const rescisaoPct = sanitizeNumber(cfgRescisao, 3.2);
      const patronalPct = sanitizeNumber(cfgPatronal, 0);

      const fgtsVal = salary * (fgtsPct / 100);
      const p13Val = salary * (p13Pct / 100);
      const feriasVal = salary * (feriasPct / 100);
      const rescisaoVal = salary * (rescisaoPct / 100);
      const patronalVal = salary * (patronalPct / 100);

      const totalCharges = fgtsVal + p13Val + feriasVal + rescisaoVal + patronalVal;

      const vtEmployeeDiscount = Math.min(vtTotal, salary * (vtDiscPct / 100));
      const vtEmployerCost = Math.max(0, vtTotal - vtEmployeeDiscount);
      const totalBenefits = va + vtEmployerCost + other;

      const monthlyTotal = salary + totalCharges + totalBenefits;
      const annualTotal = monthlyTotal * 12;
      const multiplier = salary > 0 ? monthlyTotal / salary : 0;

      resMonthly.textContent = formatBRL(monthlyTotal);
      resFactor.textContent = `Equivale a ${multiplier.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x o salário bruto informado`;
      resAnnual.textContent = formatBRL(annualTotal);
      resCharges.textContent = formatBRL(totalCharges);

      clearChildren(breakdownBox);
      const rows = [
        ['Salário Bruto Base', formatBRL(salary)],
        [`FGTS (${formatPct(fgtsPct, 1)})`, formatBRL(fgtsVal)],
        [`Provisão 13º Salário (${formatPct(p13Pct, 2)})`, formatBRL(p13Val)],
        [`Provisão Férias + 1/3 (${formatPct(feriasPct, 2)})`, formatBRL(feriasVal)],
        [`Provisão Rescisória / Multa FGTS (${formatPct(rescisaoPct, 1)})`, formatBRL(rescisaoVal)],
        [`INSS Patronal / RAT / Terceiros (${formatPct(patronalPct, 1)})`, formatBRL(patronalVal)],
        ['Vale-Transporte (custo líquido empresa)', formatBRL(vtEmployerCost)],
        ['Vale-Alimentação e Outros Benefícios', formatBRL(va + other)]
      ];

      rows.forEach(([label, val]) => {
        const row = createEl('div', 'breakdown-row');
        row.appendChild(createEl('span', '', label));
        row.appendChild(createEl('strong', '', val));
        breakdownBox.appendChild(row);
      });
    }

    form.addEventListener('input', calculate);
    calculate();
  }

  /* ------------------------------------------------------------------------
     FERRAMENTA 3: CALCULADORA DE FATURAMENTO E METAS
     ------------------------------------------------------------------------ */
  function initRevenueCalculator() {
    const form = document.getElementById('form-calc-faturamento');
    if (!form) return;

    const prevEl = document.getElementById('rev-prev');
    const currEl = document.getElementById('rev-curr');
    const goalEl = document.getElementById('rev-goal');
    const monthsEl = document.getElementById('rev-months');

    const resDiff = document.getElementById('res-rev-diff');
    const resStatus = document.getElementById('res-rev-status');
    const resAvg = document.getElementById('res-rev-avg');
    const resProj = document.getElementById('res-rev-proj');
    const resGoalPct = document.getElementById('res-rev-goal-pct');
    const resGoalBar = document.getElementById('res-rev-goal-bar');
    const resGoalRem = document.getElementById('res-rev-goal-remaining');

    function calculate() {
      const prev = sanitizeNumber(prevEl, 0);
      const curr = sanitizeNumber(currEl, 0);
      const goal = sanitizeNumber(goalEl, 0);
      const months = Math.max(1, Math.min(60, Math.round(sanitizeNumber(monthsEl, 12))));

      const diff = curr - prev;
      const pct = prev > 0 ? (diff / prev) * 100 : (curr > 0 ? 100 : 0);
      const sign = diff >= 0 ? '+' : '-';
      const absDiff = Math.abs(diff);
      const pctSign = pct >= 0 ? '+' : '';

      resDiff.textContent = `${sign} ${formatBRL(absDiff)} (${pctSign}${formatPct(pct, 1)})`;

      if (diff > 0) {
        resStatus.textContent = 'Crescimento em relação ao período anterior';
      } else if (diff < 0) {
        resStatus.textContent = 'Redução em relação ao período anterior';
      } else {
        resStatus.textContent = 'Estabilidade entre os períodos comparados';
      }

      const avg = (prev + curr) / 2;
      const proj = curr * months;
      resAvg.textContent = formatBRL(avg);
      resProj.textContent = formatBRL(proj);

      if (goal > 0) {
        const goalPct = (curr / goal) * 100;
        const clampedWidth = Math.min(100, Math.max(0, goalPct));
        resGoalPct.textContent = formatPct(goalPct, 1);
        resGoalBar.style.width = `${clampedWidth}%`;

        if (curr >= goal) {
          const extra = curr - goal;
          resGoalRem.textContent = extra > 0
            ? `Meta atingida com superávit de ${formatBRL(extra)}!`
            : 'Meta atingida exatamente conforme planejado!';
        } else {
          resGoalRem.textContent = `Faltam ${formatBRL(goal - curr)} para alcançar a meta definida.`;
        }
      } else {
        resGoalPct.textContent = '0,0%';
        resGoalBar.style.width = '0%';
        resGoalRem.textContent = 'Informe uma meta de faturamento acima de zero para acompanhar o progresso.';
      }
    }

    form.addEventListener('input', calculate);
    calculate();
  }

  /* ------------------------------------------------------------------------
     FERRAMENTA 4: CALCULADORA DE PREÇO DE VENDA
     ------------------------------------------------------------------------ */
  function initPriceCalculator() {
    const form = document.getElementById('form-calc-preco');
    if (!form) return;

    const costEl = document.getElementById('price-cost');
    const packEl = document.getElementById('price-pack');
    const shipEl = document.getElementById('price-shipping');
    const otherEl = document.getElementById('price-other');
    const taxEl = document.getElementById('price-taxes');
    const marginEl = document.getElementById('price-margin');
    const errorBox = document.getElementById('price-error-box');

    const resPrice = document.getElementById('res-price-suggested');
    const resMarkup = document.getElementById('res-price-markup');
    const resTotalCost = document.getElementById('res-price-total-cost');
    const resTaxVal = document.getElementById('res-price-tax-val');
    const resProfit = document.getElementById('res-price-profit');

    function calculate() {
      const cost = sanitizeNumber(costEl, 0);
      const pack = sanitizeNumber(packEl, 0);
      const ship = sanitizeNumber(shipEl, 0);
      const other = sanitizeNumber(otherEl, 0);
      const taxPct = sanitizeNumber(taxEl, 0);
      const marginPct = sanitizeNumber(marginEl, 0);

      const totalCost = cost + pack + ship + other;
      resTotalCost.textContent = formatBRL(totalCost);

      if (taxPct + marginPct >= 100) {
        errorBox.textContent = 'A soma das taxas sobre venda (%) e da margem de lucro desejada (%) não pode ser igual ou superior a 100%.';
        errorBox.classList.remove('hidden');
        resPrice.textContent = '—';
        resMarkup.textContent = 'Ajuste os percentuais para calcular';
        resTaxVal.textContent = '—';
        resProfit.textContent = '—';
        return;
      }

      errorBox.classList.add('hidden');
      const divisor = 1 - ((taxPct + marginPct) / 100);
      const suggestedPrice = totalCost / divisor;
      const taxValue = suggestedPrice * (taxPct / 100);
      const profitValue = suggestedPrice * (marginPct / 100);
      const markupPct = totalCost > 0 ? ((suggestedPrice - totalCost) / totalCost) * 100 : 0;

      resPrice.textContent = formatBRL(suggestedPrice);
      resMarkup.textContent = `Markup equivalente aplicado sobre o custo: +${formatPct(markupPct, 1)}`;
      resTaxVal.textContent = `${formatBRL(taxValue)} (${formatPct(taxPct, 1)})`;
      resProfit.textContent = `${formatBRL(profitValue)} (${formatPct(marginPct, 1)})`;
    }

    form.addEventListener('input', calculate);
    calculate();
  }

  /* ------------------------------------------------------------------------
     FERRAMENTAS 5 & 6: CHECKLISTS INTERATIVAS (PERSISTÊNCIA EM LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  function initChecklist(options) {
    const container = document.getElementById(options.listId);
    const counterEl = document.getElementById(options.counterId);
    const pctEl = document.getElementById(options.pctId);
    const barEl = document.getElementById(options.barId);
    const resetBtn = document.getElementById(options.resetId);
    if (!container) return;

    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(options.storageKey) || '{}');
    } catch (e) {
      savedState = {};
    }

    function saveState() {
      try {
        localStorage.setItem(options.storageKey, JSON.stringify(savedState));
      } catch (e) {
        // Ignore storage quota errors
      }
    }

    function updateProgress() {
      const total = options.items.length;
      const done = options.items.filter((item) => Boolean(savedState[item.id])).length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;

      counterEl.textContent = `${done} de ${total} ${options.unitLabel} concluídas`;
      pctEl.textContent = `${pct}%`;
      barEl.style.width = `${pct}%`;
    }

    function render() {
      clearChildren(container);
      options.items.forEach((item) => {
        const isChecked = Boolean(savedState[item.id]);
        const row = createEl('label', 'check-row' + (isChecked ? ' completed' : ''));

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked;
        checkbox.addEventListener('change', () => {
          savedState[item.id] = checkbox.checked;
          row.classList.toggle('completed', checkbox.checked);
          saveState();
          updateProgress();
        });

        const textWrap = createEl('div', 'check-row__text');
        textWrap.appendChild(createEl('strong', '', item.title));
        textWrap.appendChild(createEl('span', '', item.detail));

        row.appendChild(checkbox);
        row.appendChild(textWrap);
        container.appendChild(row);
      });
      updateProgress();
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        savedState = {};
        saveState();
        render();
        if (window.showAcaoToast) {
          window.showAcaoToast('Checklist reiniciada com sucesso.');
        }
      });
    }

    render();
  }

  /* ------------------------------------------------------------------------
     FERRAMENTA 7: GLOSSÁRIO EMPRESARIAL INTERATIVO
     ------------------------------------------------------------------------ */
  function initGlossary() {
    const searchInput = document.getElementById('glossary-search');
    const categoriesBox = document.getElementById('glossary-categories');
    const gridBox = document.getElementById('glossary-grid');
    if (!gridBox) return;

    const gdTitle = document.getElementById('gd-title');
    const gdSummary = document.getElementById('gd-summary');
    const gdBody = document.getElementById('gd-body');
    const gdExp = document.getElementById('gd-explanation');
    const gdEx = document.getElementById('gd-example');
    const gdImp = document.getElementById('gd-importance');
    const gdAcc = document.getElementById('gd-accountant');

    const terms = DATA.glossaryTerms;
    const categories = ['Todos', ...Array.from(new Set(terms.map((t) => t.category)))];
    let activeCategory = 'Todos';
    let selectedTerm = terms[0];

    function selectTerm(item) {
      selectedTerm = item;
      gdTitle.textContent = `${item.term} — ${item.fullName}`;
      gdSummary.textContent = `Categoria: ${item.category}`;
      gdExp.textContent = item.explanation;
      gdEx.textContent = item.example;
      gdImp.textContent = item.importance;
      gdAcc.textContent = item.whenToConsult;
      gdBody.classList.remove('hidden');

      gridBox.querySelectorAll('.glossary-term-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.term === item.term);
      });
    }

    function renderCategories() {
      clearChildren(categoriesBox);
      categories.forEach((cat) => {
        const btn = createEl('button', 'filter-pill' + (cat === activeCategory ? ' active' : ''), cat);
        btn.type = 'button';
        btn.addEventListener('click', () => {
          activeCategory = cat;
          renderCategories();
          renderTerms();
        });
        categoriesBox.appendChild(btn);
      });
    }

    function renderTerms() {
      const q = (searchInput.value || '').toLowerCase().trim();
      const filtered = terms.filter((item) => {
        const matchCat = activeCategory === 'Todos' || item.category === activeCategory;
        if (!matchCat) return false;
        if (!q) return true;
        return (
          item.term.toLowerCase().includes(q) ||
          item.fullName.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q)
        );
      });

      clearChildren(gridBox);
      if (filtered.length === 0) {
        gridBox.appendChild(createEl('p', 'muted-text', 'Nenhum termo encontrado para a busca informada.'));
        return;
      }

      filtered.forEach((item) => {
        const btn = createEl('button', 'glossary-term-btn' + (selectedTerm && selectedTerm.term === item.term ? ' active' : ''));
        btn.type = 'button';
        btn.dataset.term = item.term;
        btn.appendChild(createEl('strong', '', item.term));
        btn.appendChild(createEl('span', '', item.fullName));
        btn.addEventListener('click', () => selectTerm(item));
        gridBox.appendChild(btn);
      });
    }

    searchInput.addEventListener('input', renderTerms);
    renderCategories();
    renderTerms();
    if (selectedTerm) selectTerm(selectedTerm);
  }

  /* ------------------------------------------------------------------------
     FERRAMENTA 2: SIMULADOR EDUCATIVO DE IMPOSTOS E REGIMES TRIBUTÁRIOS
     ------------------------------------------------------------------------ */
  function initTaxSimulator() {
    const monthlyEl = document.getElementById('tax-monthly-rev');
    const annualEl = document.getElementById('tax-annual-rev');
    const activityEl = document.getElementById('tax-activity');
    const cnaeEl = document.getElementById('tax-cnae');
    const regimeEl = document.getElementById('tax-selected-regime');
    const outputEl = document.getElementById('tax-sim-output');
    const whatsappBtn = document.getElementById('tax-study-whatsapp');
    if (!outputEl) return;

    monthlyEl.addEventListener('input', () => {
      const m = sanitizeNumber(monthlyEl, 0);
      annualEl.value = Math.round(m * 12);
      renderSimulation();
    });

    annualEl.addEventListener('input', () => {
      const a = sanitizeNumber(annualEl, 0);
      monthlyEl.value = Math.round(a / 12);
      renderSimulation();
    });

    [activityEl, cnaeEl, regimeEl].forEach((el) => {
      el.addEventListener('input', renderSimulation);
      el.addEventListener('change', renderSimulation);
    });

    function renderSimulation() {
      const monthly = sanitizeNumber(monthlyEl, 0);
      const annual = sanitizeNumber(annualEl, 0);
      const activity = activityEl.value;
      const cnae = (cnaeEl.value || '').trim();
      const focus = regimeEl.value;

      const activityLabels = {
        comercio: 'Comércio',
        servicos_gerais: 'Serviços Gerais',
        servicos_intelectuais: 'Serviços Regulamentados / Intelectuais',
        industria: 'Indústria'
      };

      const meiLimit = 81000;
      const simplesLimit = 4800000;

      const meiEligibleByRev = annual <= meiLimit;
      const meiEligibleByAct = activity !== 'servicos_intelectuais';
      const meiEligible = meiEligibleByRev && meiEligibleByAct;

      const simplesEligible = annual <= simplesLimit;

      const cards = [
        {
          key: 'mei',
          title: 'MEI — Microempreendedor Individual',
          badge: meiEligible ? 'Elegível em tese' : 'Atenção / Restrição',
          recommended: meiEligible && annual <= 65000,
          ineligible: !meiEligible,
          summary: meiEligible
            ? `Faturamento anual estimado (${formatBRL(annual)}) dentro do teto de referência de R$ 81.000,00/ano.`
            : !meiEligibleByRev
              ? `Faturamento anual estimado (${formatBRL(annual)}) ultrapassa o teto de referência de R$ 81.000,00/ano do MEI.`
              : 'Atividades intelectuais ou profissões regulamentadas, em regra, não são permitidas no MEI.',
          points: [
            'Guia mensal de valor fixo (DAS-MEI), independente do faturamento mensal dentro do limite.',
            'Permite contratar no máximo 1 empregado e não permite sócios.',
            'Exige entrega anual da DASN-SIMEI e acompanhamento para não estourar o limite proporcional.'
          ]
        },
        {
          key: 'simples',
          title: 'Simples Nacional (ME / EPP)',
          badge: simplesEligible ? 'Enquadramento avaliável' : 'Acima do teto',
          recommended: simplesEligible && !meiEligible && annual <= 1800000,
          ineligible: !simplesEligible,
          summary: simplesEligible
            ? `Faturamento anual estimado (${formatBRL(annual)}) compatível com o limite geral de R$ 4,8 milhões/ano (observar sublimite estadual de ICMS/ISS).`
            : `Faturamento estimado supera o limite geral do Simples Nacional.`,
          points: [
            activity === 'comercio'
              ? 'Comércio: tributado em regra pelo Anexo I, com alíquota progressiva conforme receita dos últimos 12 meses.'
              : activity === 'industria'
                ? 'Indústria: tributada em regra pelo Anexo II, observando regras específicas de IPI e ICMS-ST.'
                : activity === 'servicos_intelectuais'
                  ? 'Serviços regulamentados: podem transitar entre Anexo V e Anexo III conforme o Fator R (folha salarial >= 28% do faturamento).'
                  : 'Serviços gerais: tributados em regra pelos Anexos III ou IV, conforme o CNAE específico.',
            'Recolhimento unificado em guia única (DAS), simplificando a rotina mensal.',
            'Alíquota efetiva exata não é fixa: exige cálculo com RBT12 e CNAE oficial.'
          ]
        },
        {
          key: 'presumido',
          title: 'Lucro Presumido',
          badge: 'Regime Geral',
          recommended: !simplesEligible || (activity === 'servicos_intelectuais' && annual > 360000),
          ineligible: false,
          summary: `Para faturamento anual de ${formatBRL(annual)} em ${activityLabels[activity]}, o IRPJ e a CSLL são apurados trimestralmente sobre margem presumida.`,
          points: [
            'Tributos apurados em guias separadas (IRPJ, CSLL, PIS, COFINS e ICMS estadual ou ISS municipal).',
            'Incide contribuição previdenciária patronal sobre a folha de pagamento.',
            'Pode ser mais econômico que o Simples Nacional para empresas de serviços com alta margem de lucro e folha salarial enxuta.'
          ]
        }
      ];

      const visibleCards = focus === 'comparar'
        ? cards
        : cards.filter((c) => c.key === focus);

      clearChildren(outputEl);
      visibleCards.forEach((c) => {
        const card = createEl(
          'article',
          'regime-card' + (c.recommended ? ' recommended' : '') + (c.ineligible ? ' ineligible' : '')
        );
        const top = createEl('div', 'regime-card__top');
        top.appendChild(createEl('h3', '', c.title));
        top.appendChild(createEl('span', c.recommended ? 'badge badge-gold' : 'badge', c.badge));
        card.appendChild(top);

        card.appendChild(createEl('p', 'muted-text', c.summary));

        const ul = document.createElement('ul');
        c.points.forEach((pt) => ul.appendChild(createEl('li', '', pt)));
        card.appendChild(ul);

        outputEl.appendChild(card);
      });

      if (whatsappBtn) {
        const msg = `Olá, utilizei o Simulador Tributário da Ação Digital (Faturamento mensal: ${formatBRL(monthly)} | Anual: ${formatBRL(annual)} | Atividade: ${activityLabels[activity]}${cnae ? ' | CNAE: ' + cnae : ''}) e gostaria de solicitar um estudo tributário.`;
        whatsappBtn.href = `https://wa.me/${DATA.config.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      }
    }

    renderSimulation();
  }

  window.AcaoTools = {
    initAll() {
      initEmployeeCalculator();
      initRevenueCalculator();
      initPriceCalculator();
      initChecklist({
        listId: 'list-check-abertura',
        counterId: 'open-check-counter',
        pctId: 'open-check-pct',
        barId: 'open-check-bar',
        resetId: 'reset-check-abertura',
        storageKey: 'acao_digital_check_abertura_v1',
        items: DATA.checklistAbertura,
        unitLabel: 'etapas'
      });
      initChecklist({
        listId: 'list-check-mensal',
        counterId: 'monthly-check-counter',
        pctId: 'monthly-check-pct',
        barId: 'monthly-check-bar',
        resetId: 'reset-check-mensal',
        storageKey: 'acao_digital_check_mensal_v1',
        items: DATA.checklistMensal,
        unitLabel: 'tarefas'
      });
      initGlossary();
      initTaxSimulator();
    }
  };
})();
