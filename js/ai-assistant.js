/* ==========================================================================
   AÇÃO INTELIGENTE — MÓDULO DE ASSISTENTE DE IA CONTÁBIL
   Arquitetura modular preparada para modo demonstrativo local (offline-ready)
   e futura integração segura via backend (sem exposição de API keys).
   ========================================================================== */

(function () {
  const WHATSAPP_BASE = 'https://wa.me/5583981212030?text=';

  const OPENING_SUGGESTIONS = [
    'Como abrir uma empresa?',
    'Qual a diferença entre MEI e ME?',
    'O que é o Simples Nacional?',
    'Como funciona a folha de pagamento?',
    'Quais impostos minha empresa pode pagar?',
    'Como funciona a Reforma Tributária?',
    'Como contratar meu primeiro funcionário?',
    'Quais documentos preciso para abrir um CNPJ?'
  ];

  // Base de conhecimento estruturada por domínio contábil/empresarial
  const KNOWLEDGE_BASE = [
    {
      id: 'abertura-empresa',
      category: 'Consultoria Societária • Abertura',
      keywords: ['abrir empresa', 'abertura de empresa', 'constituicao', 'constituir', 'comecar empresa', 'formalizar', 'abrir negocio', 'como abrir'],
      title: 'Como funciona a abertura de uma empresa',
      paragraphs: [
        'Abrir uma empresa envolve definir corretamente a atividade econômica (CNAE), a natureza jurídica (como SLU, LTDA ou MEI, quando aplicável) e o regime tributário mais adequado ao perfil do negócio.',
        'De forma geral, o fluxo passa pela consulta de viabilidade de nome e endereço, elaboração do ato constitutivo/contrato social, registro na Junta Comercial, emissão do CNPJ na Receita Federal, inscrições estadual/municipal e obtenção de alvarás.'
      ],
      bullets: [
        'Definição de CNAE e regime tributário antes do registro evita pagar impostos desnecessários.',
        'A exigência de alvarás e licenças (Sanitária, Bombeiros, Ambiental) depende da atividade e do município.',
        'Você pode acompanhar cada etapa no nosso Checklist para Abrir uma Empresa na aba Ferramentas.'
      ]
    },
    {
      id: 'documentos-cnpj',
      category: 'Consultoria Societária • Documentação',
      keywords: ['documentos', 'abrir um cnpj', 'abrir cnpj', 'documentacao cnpj', 'preciso para abrir', 'rg', 'iptu'],
      title: 'Documentos normalmente necessários para abrir um CNPJ',
      paragraphs: [
        'A relação exata pode variar conforme a natureza jurídica e o município, mas para iniciar o estudo de viabilidade e constituição costumam ser solicitados:'
      ],
      bullets: [
        'Documento de identificação oficial com foto (RG ou CNH) e CPF dos sócios/titular.',
        'Comprovante de endereço residencial atualizado dos sócios.',
        'Comprovante de endereço do local onde a empresa funcionará e inscrição imobiliária / IPTU do imóvel.',
        'Definição do nome empresarial pretendido, atividades (produtos/serviços) e capital social.',
        'Certidão de casamento (se casado) e recibo da última declaração de IRPF, quando aplicável.'
      ]
    },
    {
      id: 'mei-vs-me',
      category: 'Enquadramento Empresarial • MEI & ME',
      keywords: ['mei', 'me', 'diferenca entre mei e me', 'microempresa', 'microempreendedor', 'desenquadramento', 'limite mei'],
      title: 'Diferença entre MEI e Microempresa (ME)',
      paragraphs: [
        'O MEI (Microempreendedor Individual) é um modelo simplificado destinado a atividades permitidas em lei, com limite anual de faturamento específico, guia mensal fixa (DAS-MEI), proibição de ter sócios e limite de até 1 empregado.',
        'Já a Microempresa (ME) abrange um leque muito mais amplo de atividades (incluindo profissões regulamentadas e atividades intelectuais), permite sociedade (como LTDA) ou titular único (SLU), contratação de maior equipe e faturamento superior ao teto do MEI.'
      ],
      bullets: [
        'Na ME, a tributação geralmente ocorre pelo Simples Nacional (percentual sobre o faturamento) ou Lucro Presumido, exigindo escrituração contábil regular.',
        'Quando o MEI ultrapassa o limite ou precisa crescer, a migração planejada para ME evita multas e desenquadramentos retroativos.'
      ]
    },
    {
      id: 'simples-nacional',
      category: 'Fiscal e Tributário • Simples Nacional',
      keywords: ['simples nacional', 'simples', 'anexo', 'fator r', 'das', 'unificado'],
      title: 'O que é o Simples Nacional',
      paragraphs: [
        'O Simples Nacional é um regime tributário compartilhado voltado para Microempresas (ME) e Empresas de Pequeno Porte (EPP). Ele reúne em uma única guia mensal (DAS) diversos tributos federais, estaduais e municipais (como IRPJ, CSLL, PIS, COFINS, IPI, CPP, ICMS e ISS, conforme a atividade).',
        'As alíquotas não são únicas para todas as empresas: elas variam de acordo com o Anexo da atividade (Anexos I a V), a receita bruta acumulada nos últimos 12 meses (RBT12) e, em certos serviços, a relação entre folha de pagamento e faturamento (Fator R).'
      ],
      bullets: [
        'Nem sempre o Simples Nacional é automaticamente o regime mais barato — empresas de serviços sem folha relevante podem, em alguns casos, economizar no Lucro Presumido.',
        'O cálculo exato exige análise do CNAE e do histórico de faturamento.'
      ]
    },
    {
      id: 'lucro-presumido-real',
      category: 'Fiscal e Tributário • Regimes',
      keywords: ['lucro presumido', 'lucro real', 'regime tributario', 'qual melhor regime', 'presumido'],
      title: 'Lucro Presumido e Lucro Real: visão geral',
      paragraphs: [
        'No Lucro Presumido, a Receita Federal aplica percentuais pré-definidos de presunção de lucro sobre o faturamento (variando conforme comércio, indústria ou serviços) para apurar IRPJ e CSLL trimestralmente, enquanto PIS, COFINS, ICMS ou ISS são apurados separadamente.',
        'No Lucro Real, o IRPJ e a CSLL incidem sobre o lucro líquido contábil efetivamente apurado após ajustes fiscais, sendo obrigatório para determinados portes/setores e estratégico para empresas com margens estreitas ou muitos custos creditáveis.'
      ],
      bullets: [
        'A escolha do regime tributário vale para todo o ano-calendário e deve ser precedida por planejamento tributário comparativo.'
      ]
    },
    {
      id: 'impostos-empresa',
      category: 'Fiscal e Tributário • Tributos',
      keywords: ['quais impostos', 'impostos minha empresa', 'tributos', 'icms', 'iss', 'irpj', 'csll', 'pis', 'cofins', 'obrigacoes fiscais'],
      title: 'Principais impostos e obrigações de uma empresa',
      paragraphs: [
        'Os tributos que uma empresa paga dependem diretamente do seu regime tributário (MEI, Simples Nacional, Lucro Presumido ou Lucro Real) e da sua atividade (comércio, serviços ou indústria).'
      ],
      bullets: [
        'Comércio e Indústria: envolvem tributos federais (IRPJ, CSLL, PIS, COFINS e, se aplicável, IPI) e o ICMS estadual.',
        'Prestação de Serviços: envolvem os tributos federais e o ISS municipal (recolhidos de forma unificada no DAS se optante pelo Simples Nacional).',
        'Obrigações Acessórias: além de pagar guias, a empresa precisa transmitir declarações eletrônicas (como DEFIS, SPED/EFD, eSocial) e emitir notas fiscais regularmente.'
      ]
    },
    {
      id: 'folha-pagamento',
      category: 'Departamento Pessoal • Folha',
      keywords: ['folha de pagamento', 'folha', 'encargos', 'pro-labore', 'pro labore', 'fgts', 'inss', 'holerite'],
      title: 'Como funciona a folha de pagamento e encargos',
      paragraphs: [
        'A folha de pagamento consolida mensalmente a remuneração dos colaboradores (salários, horas extras, adicionais, comissões), os descontos legais (INSS do empregado, IRRF quando aplicável, vale-transporte) e os encargos/provisões do empregador.',
        'Para a empresa, além do salário bruto, existem obrigações como o depósito mensal do FGTS, provisões de 13º salário e férias + 1/3, e, conforme o regime tributário, contribuição previdenciária patronal.'
      ],
      bullets: [
        'O fechamento mensal depende do envio pontual de informações de ponto, faltas, atestados, férias e horas extras.',
        'Você pode simular o impacto financeiro na Calculadora de Custo de Funcionário da plataforma.'
      ]
    },
    {
      id: 'contratar-funcionario',
      category: 'Departamento Pessoal • Admissão',
      keywords: ['contratar', 'primeiro funcionario', 'admissao', 'admitir', 'clt', 'exame admissional', 'esocial'],
      title: 'Como contratar seu primeiro funcionário com segurança',
      paragraphs: [
        'A contratação sob regime CLT exige formalização prévia antes mesmo do primeiro dia de trabalho do colaborador, evitando autuações no eSocial.'
      ],
      bullets: [
        '1. Defina cargo, jornada, salário (observando o piso da convenção coletiva) e benefícios.',
        '2. Encaminhe o candidato para o Exame Médico Admissional (ASO) antes do início das atividades.',
        '3. Envie os documentos pessoais e dados da vaga ao Departamento Pessoal da contabilidade com antecedência.',
        '4. O setor pessoal transmite o evento de admissão no eSocial, gera o contrato de trabalho e registra a carteira digital.'
      ]
    },
    {
      id: 'rescisao-previdencia',
      category: 'Departamento Pessoal • Rescisão & Previdência',
      keywords: ['rescisao', 'demissao', 'demitir', 'aviso previo', 'previdencia', 'aposentadoria', 'ferias'],
      title: 'Orientações sobre rescisão trabalhista e previdência',
      paragraphs: [
        'O desligamento de um colaborador envolve modalidades distintas (pedido de demissão, dispensa sem justa causa, término de contrato de experiência ou acordo legal), cada uma com reflexos próprios em aviso prévio, saldo de salário, férias proporcionais, 13º proporcional e FGTS.',
        'Existem prazos legais rígidos para pagamento das verbas rescisórias e transmissão ao eSocial.'
      ],
      bullets: [
        'Comunique imediatamente a contabilidade antes de formalizar o desligamento para cálculo prévio e orientação sobre prazos e exames demissionais.'
      ]
    },
    {
      id: 'reforma-tributaria',
      category: 'Atualização • Reforma Tributária',
      keywords: ['reforma tributaria', 'ibs', 'cbs', 'iva', 'imposto seletivo', 'split payment'],
      title: 'Como funciona a Reforma Tributária (IBS e CBS)',
      paragraphs: [
        'A Reforma Tributária sobre o consumo (Emenda Constitucional 132/2023) substituirá gradualmente cinco tributos (PIS, COFINS, IPI, ICMS e ISS) por um sistema de IVA Dual composto pela CBS (federal) e pelo IBS (estadual e municipal), além do Imposto Seletivo.',
        'A transição está estruturada em etapas progressivas entre 2026 e 2033, com cobrança no destino e não cumulatividade plena.'
      ],
      bullets: [
        'Explore a seção dedicada Central da Reforma Tributária no menu superior para consultar a linha do tempo, glossário e perguntas frequentes.'
      ]
    },
    {
      id: 'alteracao-alvara-baixa',
      category: 'Consultoria Societária • Regularização',
      keywords: ['alteracao contratual', 'mudar endereco', 'alvara', 'certidao', 'certidoes', 'encerrar empresa', 'baixa', 'fechar empresa'],
      title: 'Alteração contratual, alvarás, certidões e baixa de empresas',
      paragraphs: [
        'Toda mudança relevante na estrutura da empresa — entrada ou saída de sócios, mudança de endereço, inclusão de atividades ou aumento de capital — exige alteração contratual registrada nos órgãos competentes e atualização de cadastros e alvarás.',
        'Da mesma forma, se a empresa encerrar suas operações, é fundamental realizar a baixa formal do CNPJ e das inscrições para evitar que obrigações acessórias e taxas continuem sendo geradas.'
      ],
      bullets: [
        'Certidões negativas (Federal, Estadual, Municipal e FGTS) demonstram a regularidade da empresa para bancos, fornecedores e licitações.'
      ]
    },
    {
      id: 'gestao-financeira-planejamento',
      category: 'Gestão Empresarial • Finanças',
      keywords: ['gestao financeira', 'planejamento', 'preco de venda', 'markup', 'margem', 'faturamento', 'organizar documentos', 'empreendedorismo'],
      title: 'Gestão financeira, precificação e organização empresarial',
      paragraphs: [
        'Uma gestão financeira saudável começa pela separação entre contas pessoais e empresariais, controle de fluxo de caixa, precificação correta (diferenciando margem de lucro e markup) e envio organizado de documentos fiscais e extratos à contabilidade.',
        'Relatórios contábeis como DRE e Balanço Patrimonial transformam esses registros em indicadores concretos para apoiar decisões de crescimento.'
      ],
      bullets: [
        'Utilize nossas Calculadoras de Preço de Venda e Faturamento e o Checklist Empresarial Mensal na aba Ferramentas.'
      ]
    },
    {
      id: 'acao-institucional',
      category: 'Ação Contabilidade & Consultoria',
      keywords: ['acao contabilidade', 'telefone', 'whatsapp', 'endereco', 'catole', 'campina grande', 'horario', 'atendimento'],
      title: 'Sobre a Ação Contabilidade & Consultoria',
      paragraphs: [
        'Com origem em 1961 por Francisco das Chagas Monte Paiva e mais de 30 anos de atuação consolidada, a Ação Contabilidade & Consultoria atende empresas com objetividade, correção, modernidade, ética e transparência.',
        'Contamos com unidades em Catolé do Rocha (Rua Américo Hermenegildo, 285, Centro) e Campina Grande (Av. Presidente Getúlio Vargas, 575, Centro), com atendimento de segunda a sexta, das 07:00 às 18:00.'
      ],
      bullets: [
        'WhatsApp Oficial: (83) 9.8121-2030 | Telefones: (83) 3660-0001 e (83) 3099-9901.'
      ]
    }
  ];

  function normalizeText(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  class AcaoAIEngine {
    constructor(config) {
      this.mode = (config && config.mode) || 'demo';
      this.backendEndpoint = (config && config.backendEndpoint) || '';
    }

    getOpeningSuggestions() {
      return OPENING_SUGGESTIONS.slice();
    }

    buildWhatsAppUrl(userQuestion, matchedCategory) {
      const cleanQ = String(userQuestion || '').trim().slice(0, 220);
      const text = cleanQ
        ? `Olá, utilizei o assistente Ação Inteligente (${matchedCategory || 'Orientação Geral'}) com a seguinte dúvida: "${cleanQ}" e gostaria da análise de um especialista.`
        : 'Olá, utilizei o assistente Ação Inteligente na plataforma Ação Digital e gostaria da análise de um especialista.';
      return WHATSAPP_BASE + encodeURIComponent(text);
    }

    /**
     * Ponto de extensão preparado para futura integração com IA real via backend seguro.
     * Nenhuma chave de API deve ser armazenada no código cliente.
     */
    async queryRemoteBackend(prompt, sessionHistory) {
      if (!this.backendEndpoint) {
        throw new Error('Endpoint de backend de IA não configurado.');
      }
      const response = await fetch(this.backendEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          history: sessionHistory.slice(-6)
        })
      });
      if (!response.ok) {
        throw new Error('Falha na comunicação com o serviço de IA.');
      }
      return response.json();
    }

    /**
     * Motor de resposta em Modo Demonstrativo Inteligente (local, determinístico, sem inventar dados oficiais).
     */
    generateDemoResponse(userPrompt) {
      const normalized = normalizeText(userPrompt);
      let bestMatch = null;
      let highestScore = 0;

      KNOWLEDGE_BASE.forEach((entry) => {
        let score = 0;
        entry.keywords.forEach((kw) => {
          const normKw = normalizeText(kw);
          if (normalized === normKw) {
            score += 10;
          } else if (normalized.includes(normKw)) {
            score += normKw.split(' ').length > 1 ? 5 : 3;
          } else {
            const kwTokens = normKw.split(' ');
            kwTokens.forEach((tok) => {
              if (tok.length > 3 && normalized.includes(tok)) {
                score += 1;
              }
            });
          }
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = entry;
        }
      });

      if (bestMatch && highestScore >= 2) {
        return {
          mode: 'demo',
          matched: true,
          category: bestMatch.category,
          title: bestMatch.title,
          paragraphs: bestMatch.paragraphs,
          bullets: bestMatch.bullets || [],
          whatsappUrl: this.buildWhatsAppUrl(userPrompt, bestMatch.category)
        };
      }

      // Fallback transparente quando a pergunta foge da base demonstrativa ou exige análise específica
      return {
        mode: 'demo',
        matched: false,
        category: 'Orientação Geral • Modo Demonstrativo',
        title: 'Entendi sua solicitação — veja como podemos ajudar',
        paragraphs: [
          'No momento, o assistente Ação Inteligente está operando em modo demonstrativo com base nos principais temas de abertura de empresas, MEI, Simples Nacional, Lucro Presumido, Departamento Pessoal, gestão financeira e Reforma Tributária.',
          'Para não fornecer informações imprecisas sobre casos específicos, alíquotas individuais ou obrigações particulares da sua empresa, recomendamos direcionar sua dúvida diretamente à equipe técnica da Ação Contabilidade.'
        ],
        bullets: [
          'Experimente perguntar sobre: diferença entre MEI e ME, Simples Nacional, documentos para CNPJ, folha de pagamento ou Reforma Tributária.',
          'Ou clique abaixo para enviar sua pergunta diretamente pelo WhatsApp oficial da Ação.'
        ],
        whatsappUrl: this.buildWhatsAppUrl(userPrompt, 'Atendimento Especializado')
      };
    }

    async sendMessage(userPrompt, sessionHistory = []) {
      if (this.mode === 'api' && this.backendEndpoint && navigator.onLine) {
        try {
          return await this.queryRemoteBackend(userPrompt, sessionHistory);
        } catch (err) {
          const fallback = this.generateDemoResponse(userPrompt);
          fallback.category += ' (Fallback Local)';
          return fallback;
        }
      }
      return this.generateDemoResponse(userPrompt);
    }
  }

  window.AcaoAIEngine = AcaoAIEngine;
})();
