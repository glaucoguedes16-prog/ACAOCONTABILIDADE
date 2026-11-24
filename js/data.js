/* ==========================================================================
   AÇÃO DIGITAL — BASE DE DADOS ESTRUTURADA E EDITÁVEL
   Ação Contabilidade & Consultoria
   ========================================================================== */

window.ACAO_DATA = {
  config: {
    companyName: 'Ação Contabilidade & Consultoria',
    platformName: 'Ação Digital',
    whatsappNumber: '5583981212030',
    whatsappDisplay: '(83) 9.8121-2030',
    phones: ['(83) 3660-0001', '(83) 3099-9901'],
    email: 'contato@acaocontabilidade.com.br',
    instagramHandle: '@acaocontabilidadecr',
    instagramUrl: 'https://www.instagram.com/acaocontabilidadecr/',
    officeHours: '07:00 às 18:00',
    aiConfig: {
      mode: 'demo', // 'demo' (local offline-ready) | 'api' (futuro backend seguro)
      backendEndpoint: '' // Configurar URL de backend seguro (nunca inserir API key aqui)
    }
  },

  toolsCatalog: {
    'calc-funcionario': { id: 'calc-funcionario', name: 'Calculadora de Custo de Funcionário', view: 'ferramentas', type: 'tool' },
    'calc-faturamento': { id: 'calc-faturamento', name: 'Calculadora de Faturamento e Metas', view: 'ferramentas', type: 'tool' },
    'calc-preco': { id: 'calc-preco', name: 'Calculadora de Preço de Venda', view: 'ferramentas', type: 'tool' },
    'check-abertura': { id: 'check-abertura', name: 'Checklist para Abrir Empresa', view: 'ferramentas', type: 'tool' },
    'check-mensal': { id: 'check-mensal', name: 'Checklist Empresarial Mensal', view: 'ferramentas', type: 'tool' },
    'glossario': { id: 'glossario', name: 'Glossário Empresarial Interativo', view: 'ferramentas', type: 'tool' },
    'sim-impostos': { id: 'sim-impostos', name: 'Simulador de Impostos e Regimes', view: 'simuladores', type: 'sim' }
  },

  checklistAbertura: [
    {
      id: 'open-1',
      title: '1. Definir a atividade e o modelo de negócio',
      detail: 'Descreva claramente quais produtos serão vendidos ou quais serviços serão prestados, além do formato de atuação (presencial, digital, atendimento externo).'
    },
    {
      id: 'open-2',
      title: '2. Verificar os códigos CNAE adequados',
      detail: 'Identifique o CNAE principal e os secundários junto ao contador. O CNAE determina regras tributárias, exigências de licenciamento e possibilidade de opção pelo Simples Nacional.'
    },
    {
      id: 'open-3',
      title: '3. Escolher a natureza jurídica',
      detail: 'Defina se a empresa será individual (ex.: SLU — Sociedade Limitada Unipessoal, Empresário Individual ou MEI, quando elegível) ou com sócios (ex.: LTDA).'
    },
    {
      id: 'open-4',
      title: '4. Definir o regime tributário inicial',
      detail: 'Avalie com a contabilidade o enquadramento mais indicado entre MEI (se permitido), Simples Nacional, Lucro Presumido ou Lucro Real.'
    },
    {
      id: 'open-5',
      title: '5. Realizar consulta de viabilidade de nome e endereço',
      detail: 'Verifique na Junta Comercial e na Prefeitura se o nome empresarial está disponível e se o endereço permite o exercício da atividade.'
    },
    {
      id: 'open-6',
      title: '6. Elaborar o Contrato Social ou Requerimento',
      detail: 'Formalize cláusulas de capital social, participação dos sócios, administração e objeto social com respaldo jurídico e societário.'
    },
    {
      id: 'open-7',
      title: '7. Registrar o ato constitutivo na Junta Comercial',
      detail: 'Protocole a documentação na Junta Comercial do Estado (como a JUCEP na Paraíba) para obtenção do NIRE.'
    },
    {
      id: 'open-8',
      title: '8. Obter o CNPJ na Receita Federal',
      detail: 'Com a integração via Redesim, o Cadastro Nacional da Pessoa Jurídica (CNPJ) é emitido oficialmente.'
    },
    {
      id: 'open-9',
      title: '9. Solicitar Inscrição Estadual e/ou Municipal',
      detail: 'Empresas de comércio, indústria e transporte interestadual precisam de Inscrição Estadual; prestadores de serviço e estabelecimentos locais precisam de Inscrição Municipal.'
    },
    {
      id: 'open-10',
      title: '10. Emitir alvarás, licenças e Certificado Digital',
      detail: 'Providencie Alvará de Funcionamento, licenças específicas (Vigilância Sanitária, Bombeiros, Ambiental, quando aplicável) e o e-CNPJ para emissão de notas fiscais.'
    }
  ],

  checklistMensal: [
    {
      id: 'month-1',
      title: 'Conferir documentos fiscais emitidos e recebidos',
      detail: 'Verifique se todas as NF-e, NFC-e ou NFS-e emitidas no mês estão autorizadas e se eventuais cancelamentos foram registrados dentro do prazo.'
    },
    {
      id: 'month-2',
      title: 'Organizar notas de compras e despesas operacionais',
      detail: 'Reúna notas fiscais de fornecedores, recibos válidos e comprovantes de despesas vinculadas à operação da empresa.'
    },
    {
      id: 'month-3',
      title: 'Conferir receitas e extratos bancários (conciliação)',
      detail: 'Compare o faturamento registrado com os valores efetivamente recebidos nas contas bancárias e maquininhas de cartão.'
    },
    {
      id: 'month-4',
      title: 'Separar finanças pessoais das finanças da empresa',
      detail: 'Evite misturar despesas particulares na conta PJ; formalize retiradas via pró-labore ou distribuição de lucros apurada.'
    },
    {
      id: 'month-5',
      title: 'Revisar pagamentos e guias de impostos',
      detail: 'Confira os vencimentos das guias mensais (como DAS, DARF, GPS/INSS, FGTS) para evitar multas e juros por atraso.'
    },
    {
      id: 'month-6',
      title: 'Enviar movimento financeiro e fiscal ao contador',
      detail: 'Encaminhe extratos, arquivos XML e relatórios mensais dentro do cronograma combinado com a equipe contábil.'
    },
    {
      id: 'month-7',
      title: 'Revisar folha de pagamento e eventos de Departamento Pessoal',
      detail: 'Informe antecipadamente admissões, férias, horas extras, atestados, afastamentos ou rescisões para transmissão correta no eSocial.'
    },
    {
      id: 'month-8',
      title: 'Verificar pendências e regularidade fiscal',
      detail: 'Acompanhe periodicamente a situação cadastral e certidões negativas (Federal, Estadual, Municipal e FGTS).'
    },
    {
      id: 'month-9',
      title: 'Analisar indicadores e resultado do mês',
      detail: 'Avalie margem de lucro, evolução de faturamento e custos fixos com apoio dos demonstrativos contábeis.'
    }
  ],

  glossaryTerms: [
    {
      term: 'CNPJ',
      fullName: 'Cadastro Nacional da Pessoa Jurídica',
      category: 'Societário & Digital',
      explanation: 'É o número único de identificação de uma empresa perante a Receita Federal e órgãos públicos no Brasil.',
      example: 'Assim como o CPF identifica o cidadão, o CNPJ identifica sua loja, clínica ou prestadora de serviços ao emitir notas fiscais ou abrir conta bancária PJ.',
      importance: 'Indispensável para operar formalmente, contratar fornecedores, emitir notas fiscais e acessar crédito empresarial.',
      whenToConsult: 'Antes de iniciar atividades comerciais ou sempre que houver alteração de endereço, sócios ou atividades.'
    },
    {
      term: 'CNAE',
      fullName: 'Classificação Nacional de Atividades Econômicas',
      category: 'Societário & Digital',
      explanation: 'Código numérico padronizado que define exatamente quais atividades econômicas a empresa exerce.',
      example: 'Uma empresa pode ter um CNAE principal de comércio varejista de vestuário e CNAEs secundários para acessórios.',
      importance: 'Define quais impostos incidem, se a empresa pode optar pelo Simples Nacional e quais alvarás são exigidos.',
      whenToConsult: 'Na abertura do CNPJ ou antes de começar a vender um novo tipo de produto ou serviço.'
    },
    {
      term: 'DAS',
      fullName: 'Documento de Arrecadação do Simples Nacional',
      category: 'Tributário & Fiscal',
      explanation: 'Guia única mensal utilizada por MEIs e empresas optantes pelo Simples Nacional para pagar diversos tributos de uma só vez.',
      example: 'Em vez de pagar várias guias separadas de impostos federais, estaduais e municipais, a empresa quita apenas o DAS mensal.',
      importance: 'Manter o DAS em dia garante a regularidade fiscal e evita exclusão do Simples Nacional.',
      whenToConsult: 'Caso haja dúvidas sobre o valor apurado, atraso de guias ou parcelamento de débitos.'
    },
    {
      term: 'DASN-SIMEI',
      fullName: 'Declaração Anual do Simples Nacional para o MEI',
      category: 'Tributário & Fiscal',
      explanation: 'Declaração obrigatória entregue uma vez por ano pelo Microempreendedor Individual informando o faturamento total do ano anterior.',
      example: 'Mesmo que o MEI não tenha tido faturamento em algum mês ou no ano inteiro, precisa transmitir a DASN-SIMEI informando os valores.',
      importance: 'A falta de entrega gera multa e bloqueia a emissão das guias mensais do ano seguinte.',
      whenToConsult: 'Anualmente dentro do prazo legal ou caso precise retificar valores declarados.'
    },
    {
      term: 'DRE',
      fullName: 'Demonstração do Resultado do Exercício',
      category: 'Contábil & Financeiro',
      explanation: 'Relatório contábil que mostra, de forma estruturada, se a empresa teve lucro ou prejuízo em determinado período.',
      example: 'A DRE parte das receitas brutas, deduz impostos sobre vendas, custos dos produtos/serviços e despesas operacionais até chegar ao resultado líquido.',
      importance: 'Permite enxergar onde o dinheiro está sendo consumido e se a operação é realmente lucrativa.',
      whenToConsult: 'Periodicamente com seu contador para tomar decisões de preços, cortes de custos e distribuição de lucros.'
    },
    {
      term: 'Balanço Patrimonial',
      fullName: 'Demonstração Contábil do Patrimônio',
      category: 'Contábil & Financeiro',
      explanation: 'Retrato financeiro da empresa em uma data específica, dividido em Ativos (bens e direitos), Passivos (obrigações) e Patrimônio Líquido.',
      example: 'Mostra quanto a empresa possui em caixa, estoque e contas a receber comparado ao que deve a fornecedores, bancos e impostos.',
      importance: 'Exigido por bancos para linhas de crédito, licitações públicas e análise de solidez do negócio.',
      whenToConsult: 'No encerramento de cada exercício ou sempre que precisar apresentar demonstrações formais a instituições financeiras.'
    },
    {
      term: 'Pró-labore',
      fullName: 'Remuneração do Sócio Administrador',
      category: 'Trabalhista & Previdenciário',
      explanation: 'É a remuneração mensal paga ao sócio que efetivamente trabalha na administração ou operação da empresa.',
      example: 'Diferente da distribuição de lucros, o pró-labore equivale ao “salário” do sócio gestor e possui incidência previdenciária (INSS).',
      importance: 'Garante contribuição à Previdência Social para o sócio e influencia o cálculo do Fator R no Simples Nacional.',
      whenToConsult: 'Para definir um valor equilibrado entre retirada mensal, encargos previdenciários e planejamento tributário.'
    },
    {
      term: 'Fator R',
      fullName: 'Relação entre Folha Salarial e Faturamento',
      category: 'Tributário & Fiscal',
      explanation: 'Regra do Simples Nacional que compara o gasto com folha de pagamento (incluindo pró-labore) dos últimos 12 meses com o faturamento do mesmo período.',
      example: 'Determinadas atividades de prestação de serviços podem ser tributadas em uma faixa mais vantajosa caso a folha represente 28% ou mais do faturamento.',
      importance: 'Pode representar economia tributária significativa para prestadores de serviços elegíveis.',
      whenToConsult: 'Em simulações de planejamento tributário antes e durante a operação de empresas de serviços.'
    },
    {
      term: 'ICMS',
      fullName: 'Imposto sobre Circulação de Mercadorias e Serviços',
      category: 'Tributário & Fiscal',
      explanation: 'Imposto estadual que incide sobre a movimentação de mercadorias, transporte interestadual/intermunicipal e comunicação.',
      example: 'Quando uma loja vende um produto físico ou uma mercadoria cruza estados, há regras específicas de ICMS.',
      importance: 'Possui regras detalhadas por estado e regime de substituição tributária (ICMS-ST).',
      whenToConsult: 'Ao cadastrar produtos, vender para outros estados ou definir preços no comércio.'
    },
    {
      term: 'ISS',
      fullName: 'Imposto Sobre Serviços de Qualquer Natureza',
      category: 'Tributário & Fiscal',
      explanation: 'Imposto municipal cobrado sobre a prestação de serviços listados na legislação.',
      example: 'Clínicas, escritórios, empresas de tecnologia e consultorias recolhem ISS (dentro do DAS no Simples Nacional ou em guia própria em outros regimes).',
      importance: 'A alíquota e o local de recolhimento variam conforme o município e o tipo de serviço.',
      whenToConsult: 'Ao prestar serviços para outros municípios ou emitir Notas Fiscais de Serviço (NFS-e).'
    },
    {
      term: 'IRPJ',
      fullName: 'Imposto de Renda Pessoa Jurídica',
      category: 'Tributário & Fiscal',
      explanation: 'Tributo federal calculado sobre o lucro da empresa (real, presumido ou arbitrado) ou integrado no Simples Nacional.',
      example: 'No Lucro Presumido, o IRPJ é apurado trimestralmente aplicando-se um percentual de presunção sobre o faturamento.',
      importance: 'Impacta diretamente o planejamento financeiro trimestral e anual das empresas fora do MEI.',
      whenToConsult: 'Na escolha ou revisão anual do regime tributário.'
    },
    {
      term: 'CSLL',
      fullName: 'Contribuição Social sobre o Lucro Líquido',
      category: 'Tributário & Fiscal',
      explanation: 'Contribuição federal destinada ao financiamento da seguridade social, calculada sobre o resultado das pessoas jurídicas.',
      example: 'Acompanha a lógica de apuração do IRPJ conforme o regime tributário adotado pela empresa.',
      importance: 'Compõe a carga tributária federal das empresas e deve ser considerada na formação de preços.',
      whenToConsult: 'Durante o planejamento tributário e apurações periódicas.'
    },
    {
      term: 'INSS',
      fullName: 'Instituto Nacional do Seguro Social (Contribuição Previdenciária)',
      category: 'Trabalhista & Previdenciário',
      explanation: 'Contribuição previdenciária que financia aposentadorias, auxílios e benefícios dos trabalhadores e sócios.',
      example: 'Incide tanto no desconto da folha do funcionário quanto no pró-labore do sócio e na parte patronal (conforme regime).',
      importance: 'O recolhimento correto assegura proteção previdenciária e evita autuações trabalhistas.',
      whenToConsult: 'Em contratações, definição de pró-labore ou análise de encargos sobre folha.'
    },
    {
      term: 'FGTS',
      fullName: 'Fundo de Garantia do Tempo de Serviço',
      category: 'Trabalhista & Previdenciário',
      explanation: 'Depósito mensal obrigatório feito pelo empregador em conta vinculada ao trabalhador contratado sob regime CLT.',
      example: 'Corresponde, em regra geral, a 8% sobre a remuneração bruta do colaborador (sem descontar do salário dele).',
      importance: 'Obrigação trabalhista mensal fundamental para regularidade da empresa.',
      whenToConsult: 'Ao simular o custo real de contratação de funcionários ou calcular provisões rescisórias.'
    },
    {
      term: 'eSocial',
      fullName: 'Sistema de Escrituração Digital das Obrigações Fiscais, Previdenciárias e Trabalhistas',
      category: 'Trabalhista & Previdenciário',
      explanation: 'Plataforma unificada do Governo Federal onde as empresas comunicam eventos trabalhistas, previdenciários e fiscais.',
      example: 'Admissões, alterações salariais, férias, atestados, folha mensal e demissões são transmitidos eletronicamente pelo eSocial.',
      importance: 'Exige envio tempestivo — por exemplo, a admissão deve ser informada antes do início das atividades do colaborador.',
      whenToConsult: 'Sempre antes de admitir, afastar ou desligar qualquer colaborador.'
    },
    {
      term: 'DEFIS',
      fullName: 'Declaração de Informações Socioeconômicas e Fiscais',
      category: 'Tributário & Fiscal',
      explanation: 'Declaração anual obrigatória para empresas optantes pelo Simples Nacional (exceto MEI).',
      example: 'Reúne informações contábeis, econômicas e fiscais da empresa referentes ao ano-calendário anterior.',
      importance: 'Obrigação acessória anual indispensável para regularidade perante a Receita Federal.',
      whenToConsult: 'Anualmente junto à contabilidade para fechamento do exercício.'
    },
    {
      term: 'EFD',
      fullName: 'Escrituração Fiscal Digital (SPED)',
      category: 'Tributário & Fiscal',
      explanation: 'Arquivo digital integrante do sistema SPED que reúne registros de entradas, saídas, apuração de impostos e inventário.',
      example: 'Existem módulos como EFD-ICMS/IPI, EFD-Contribuições e EFD-Reinf, conforme o regime e perfil da empresa.',
      importance: 'Permite o cruzamento eletrônico de dados fiscais pela Receita Federal e Secretarias de Fazenda.',
      whenToConsult: 'Para garantir que o cadastro fiscal de produtos e notas emitidas esteja consistente.'
    },
    {
      term: 'NF-e',
      fullName: 'Nota Fiscal Eletrônica (Modelo 55)',
      category: 'Tributário & Fiscal',
      explanation: 'Documento fiscal digital utilizado para registrar operações de circulação de mercadorias entre empresas ou vendas com entrega.',
      example: 'Quando uma distribuidora vende mercadorias para um lojista, emite uma NF-e acompanhada do DANFE.',
      importance: 'Comprova a origem fiscal da mercadoria e calcula tributos incidentes na operação.',
      whenToConsult: 'Antes de iniciar vendas B2B, interestaduais ou operações com transporte de mercadorias.'
    },
    {
      term: 'NFC-e',
      fullName: 'Nota Fiscal de Consumidor Eletrônica (Modelo 65)',
      category: 'Tributário & Fiscal',
      explanation: 'Documento fiscal eletrônico voltado ao varejo presencial para vendas diretas ao consumidor final.',
      example: 'Substitui o antigo cupom fiscal em papel em lojas, restaurantes, farmácias e supermercados.',
      importance: 'Obrigatoriedade frequente no comércio varejista para acobertar vendas no balcão.',
      whenToConsult: 'Na implantação do sistema de frente de caixa (PDV) do seu comércio.'
    },
    {
      term: 'Certificado Digital',
      fullName: 'Identidade Eletrônica (e-CNPJ / e-CPF)',
      category: 'Societário & Digital',
      explanation: 'Assinatura eletrônica com validade jurídica que autentica a empresa e seus representantes em sistemas governamentais.',
      example: 'Necessário para emitir notas fiscais eletrônicas, transmitir declarações e acessar o portal e-CAC da Receita Federal.',
      importance: 'Sem Certificado Digital ativo, a empresa pode ficar impedida de faturar ou cumprir obrigações acessórias.',
      whenToConsult: 'Logo após a abertura do CNPJ e antes do vencimento anual para renovação.'
    },
    {
      term: 'MEI',
      fullName: 'Microempreendedor Individual',
      category: 'Societário & Digital',
      explanation: 'Modalidade simplificada de formalização para pequenos empreendedores individuais que exercem atividades permitidas e respeitam o teto legal de faturamento anual.',
      example: 'Paga guia mensal fixa (DAS-MEI) e pode contratar no máximo 1 empregado.',
      importance: 'Porta de entrada simplificada para formalização, mas exige acompanhamento para não ultrapassar o limite.',
      whenToConsult: 'Quando o faturamento crescer, precisar contratar mais funcionários ou incluir atividades não permitidas no MEI.'
    },
    {
      term: 'Simples Nacional',
      fullName: 'Regime Tributário Unificado para ME e EPP',
      category: 'Tributário & Fiscal',
      explanation: 'Regime compartilhado de arrecadação para Microempresas e Empresas de Pequeno Porte com alíquotas progressivas divididas em Anexos (I a V).',
      example: 'As alíquotas variam conforme a atividade (comércio, indústria ou serviços) e a receita acumulada dos últimos 12 meses.',
      importance: 'Simplifica o recolhimento de até 8 tributos em guia única, mas nem sempre é o mais econômico sem estudo prévio.',
      whenToConsult: 'Para avaliar em qual Anexo sua empresa se enquadra e comparar com o Lucro Presumido.'
    },
    {
      term: 'Lucro Presumido',
      fullName: 'Regime de Tributação por Margem Presumida',
      category: 'Tributário & Fiscal',
      explanation: 'Regime em que a Receita Federal presume um percentual de lucro sobre o faturamento para calcular IRPJ e CSLL, além de apurar PIS, COFINS, ICMS ou ISS separadamente.',
      example: 'Pode ser vantajoso para empresas de serviços com margens de lucro altas e folha salarial reduzida.',
      importance: 'Exige controle fiscal rigoroso de apurações mensais e trimestrais.',
      whenToConsult: 'Em estudos comparativos de planejamento tributário anual.'
    },
    {
      term: 'Alvará de Funcionamento',
      fullName: 'Licença Municipal de Localização e Funcionamento',
      category: 'Societário & Digital',
      explanation: 'Autorização emitida pela Prefeitura que permite o exercício da atividade empresarial em determinado endereço.',
      example: 'Dependendo do grau de risco da atividade, pode haver dispensa ou exigência de vistoria prévia.',
      importance: 'Garante que o estabelecimento atende às normas municipais de zoneamento e segurança.',
      whenToConsult: 'Antes de alugar um ponto comercial ou iniciar atendimento presencial.'
    }
  ],

  reformaData: {
    cards: [
      {
        badge: 'Visão Geral • EC 132/2023',
        title: 'O que é a Reforma Tributária sobre o Consumo?',
        description: 'A Reforma Tributária reorganiza a cobrança de impostos sobre bens e serviços no Brasil, substituindo gradualmente cinco tributos atuais (PIS, COFINS, IPI, ICMS e ISS) por um modelo de IVA Dual, buscando simplificação, transparência e fim da cumulatividade em cascata.'
      },
      {
        badge: 'Tributo Federal',
        title: 'CBS — Contribuição sobre Bens e Serviços',
        description: 'Gerida pela União, a CBS substituirá o PIS e a COFINS. Terá legislação uniforme em todo o território nacional e sistema amplo de crédito financeiro sobre aquisições vinculadas à atividade empresarial.'
      },
      {
        badge: 'Tributo Subnacional',
        title: 'IBS — Imposto sobre Bens e Serviços',
        description: 'Gerido de forma compartilhada por Estados e Municípios, o IBS substituirá o ICMS e o ISS. A arrecadação passará a ocorrer no local de destino (onde o bem ou serviço é consumido), reduzindo a guerra fiscal.'
      },
      {
        badge: 'Impacto Operacional',
        title: 'Não Cumulatividade Plena e Formação de Preços',
        description: 'Empresas fora do regime simplificado poderão apropriar créditos de forma mais ampla sobre despesas operacionais tributadas. Ao mesmo tempo, contratos, sistemas de emissão de notas e margens de lucro precisarão ser revisados.'
      }
    ],
    timeline: [
      {
        period: 'Etapa 1 — Regulamentação e Testes Operacionais (2026)',
        detail: 'Início da fase de calibração e testes operacionais das novas regras e layouts fiscais, com alíquotas de teste previstas na transição constitucional.'
      },
      {
        period: 'Etapa 2 — Entrada da CBS e Extinção de PIS/COFINS (2027)',
        detail: 'Previsão de entrada plena da CBS federal, extinção de PIS e COFINS e início do Imposto Seletivo (IS) sobre itens específicos.'
      },
      {
        period: 'Etapa 3 — Transição Gradual ICMS/ISS para IBS (2029 a 2032)',
        detail: 'Redução progressiva das alíquotas de ICMS e ISS acompanhada da elevação gradual da alíquota do IBS.'
      },
      {
        period: 'Etapa 4 — Vigência Plena do Novo Sistema (2033)',
        detail: 'Extinção definitiva do ICMS e do ISS, consolidando o modelo integral de IBS e CBS.'
      }
    ],
    glossary: [
      {
        term: 'IVA Dual (IBS + CBS)',
        meaning: 'Modelo de Imposto sobre Valor Agregado dividido em duas competências: uma federal (CBS) e outra estadual/municipal (IBS), com regras harmonizadas.'
      },
      {
        term: 'Imposto Seletivo (IS)',
        meaning: 'Tributo federal de caráter extrafiscal incidente sobre bens e serviços prejudiciais à saúde ou ao meio ambiente.'
      },
      {
        term: 'Tributação no Destino',
        meaning: 'O imposto passa a pertencer ao estado e município onde o comprador/consumidor está localizado, e não mais à origem da venda.'
      },
      {
        term: 'Split Payment (Pagamento Dividido)',
        meaning: 'Mecanismo tecnológico previsto para separar automaticamente a parcela do imposto no momento da liquidação financeira da venda.'
      }
    ],
    faqs: [
      {
        question: 'O Simples Nacional vai acabar com a Reforma Tributária?',
        answer: 'Não. O Simples Nacional permanece garantido constitucionalmente. Contudo, empresas optantes poderão avaliar, conforme regulamentação, se mantêm o recolhimento unificado tradicional ou se apuram IBS/CBS pelo regime regular para transferir créditos integrais a clientes pessoas jurídicas.'
      },
      {
        question: 'O que os empresários já devem fazer para se preparar?',
        answer: 'Manter o cadastro fiscal de produtos e serviços (NCM, NBS, CFOP) organizado, revisar contratos de longo prazo e acompanhar periodicamente o planejamento tributário junto à contabilidade.'
      },
      {
        question: 'As alíquotas definitivas já estão fixadas?',
        answer: 'As alíquotas de referência dependem de leis complementares, regulamentações e calibração durante a fase de testes. Por isso, qualquer projeção financeira deve ser validada com a equipe da Ação Contabilidade.'
      }
    ]
  },

  servicesData: [
    {
      id: 'contabil',
      title: 'Gestão Contábil',
      description: 'Escrituração contábil precisa e elaboração de demonstrações financeiras completas para apoiar decisões seguras e transparentes.',
      items: [
        'Escrituração contábil completa',
        'Balancetes periódicos',
        'DRE (Demonstração do Resultado do Exercício)',
        'Balanço Patrimonial e demonstrações financeiras',
        'Organização e análise das informações financeiras'
      ],
      example: 'Ideal quando a empresa precisa comprovar saúde financeira junto a bancos, organizar distribuição de lucros ou acompanhar a rentabilidade real.',
      whatsappText: 'Olá, vim pela plataforma Ação Digital e gostaria de atendimento sobre Gestão Contábil.'
    },
    {
      id: 'fiscal',
      title: 'Fiscal e Tributário',
      description: 'Cumprimento rigoroso das obrigações fiscais aliado ao planejamento tributário estratégico para reduzir riscos e identificar oportunidades.',
      items: [
        'Apuração mensal e trimestral de impostos',
        'Entrega de declarações fiscais e acessórias',
        'Planejamento tributário comparativo',
        'Conformidade fiscal e cruzamento eletrônico',
        'Orientação contínua sobre legislação e obrigações'
      ],
      example: 'Indicado para revisar o enquadramento tributário (Simples Nacional, Lucro Presumido ou Real) e evitar autuações fiscais.',
      whatsappText: 'Olá, vim pela plataforma Ação Digital e gostaria de atendimento sobre Fiscal e Tributário.'
    },
    {
      id: 'societario',
      title: 'Consultoria Societária',
      description: 'Assessoria completa em todo o ciclo societário da empresa, desde a abertura até alterações contratuais, licenças e regularizações.',
      items: [
        'Constituição e abertura de empresas',
        'Alterações contratuais (endereço, sócios, atividades, capital)',
        'Elaboração de contratos sociais personalizados',
        'Obtenção e renovação de alvarás',
        'Baixa/encerramento de empresas, cadastros e certidões'
      ],
      example: 'Indicado para quem vai abrir um CNPJ, incluir ou retirar sócios, mudar de endereço ou regularizar licenças.',
      whatsappText: 'Olá, vim pela plataforma Ação Digital e gostaria de atendimento sobre Consultoria Societária.'
    },
    {
      id: 'trabalhista',
      title: 'Trabalhista e Previdenciário',
      description: 'Gestão segura das rotinas de Departamento Pessoal, garantindo conformidade legal e prevenção de passivos trabalhistas.',
      items: [
        'Processamento de folha de pagamento e pró-labore',
        'Admissões, férias e rescisões contratuais',
        'Apuração de encargos sociais (INSS, FGTS, IRRF)',
        'Transmissão de eventos no eSocial e obrigações aplicáveis',
        'Orientação trabalhista e previdenciária empresarial'
      ],
      example: 'Essencial ao contratar o primeiro colaborador, gerenciar equipes ou esclarecer dúvidas sobre legislação trabalhista.',
      whatsappText: 'Olá, vim pela plataforma Ação Digital e gostaria de atendimento sobre Trabalhista e Previdenciário.'
    },
    {
      id: 'personalizados',
      title: 'Serviços Personalizados',
      description: 'Soluções consultivas sob medida com metodologia técnica e ferramentas avançadas para necessidades específicas do seu negócio.',
      items: [
        'Auditoria interna de processos e controles',
        'Análise e recuperação de créditos tributários',
        'Gestão especializada de folha de pagamento',
        'Due diligence contábil, fiscal e trabalhista',
        'Projetos consultivos conforme demanda empresarial'
      ],
      example: 'Indicado para empresas em expansão, reestruturação societária ou revisão aprofundada de conformidade.',
      whatsappText: 'Olá, vim pela plataforma Ação Digital e gostaria de saber mais sobre Serviços Personalizados.'
    }
  ],

  articlesData: [
    {
      id: 'art-1',
      title: 'MEI, ME ou EPP: quando é hora de evoluir o porte da sua empresa?',
      category: 'MEI',
      date: 'Conteúdo Orientativo • Atualizado',
      readTime: '4 min de leitura',
      summary: 'Entenda os sinais práticos de crescimento que indicam a necessidade de migrar do MEI para Microempresa com segurança tributária.',
      paragraphs: [
        'O Microempreendedor Individual (MEI) é uma excelente porta de entrada para formalizar atividades autônomas e pequenos negócios. Contudo, à medida que as vendas crescem ou surge a necessidade de contratar mais colaboradores, manter-se no formato inadequado pode gerar desenquadramento retroativo.',
        'Os principais gatilhos de transição incluem: proximidade do teto anual de faturamento permitido ao MEI, necessidade de contratar mais de um empregado, entrada de sócios no negócio ou inclusão de atividades econômicas (CNAEs) não abrangidas pelo regime.',
        'Planejar essa passagem antes de ultrapassar o limite evita multas e permite escolher o anexo mais econômico dentro do Simples Nacional.'
      ],
      bullets: [
        'Acompanhe o faturamento acumulado mês a mês, e não apenas o mês isolado.',
        'Verifique se suas notas fiscais de compra são compatíveis com o volume de vendas.',
        'Solicite uma simulação de migração com a equipe da Ação antes de atingir o limite.'
      ]
    },
    {
      id: 'art-2',
      title: 'Como separar as finanças pessoais das contas da empresa na prática',
      category: 'Gestão',
      date: 'Conteúdo Orientativo • Atualizado',
      readTime: '5 min de leitura',
      summary: 'A mistura patrimonial compromete a visão de lucro e pode gerar riscos fiscais. Veja como organizar pró-labore e retiradas.',
      paragraphs: [
        'Um dos erros mais frequentes na gestão de pequenas e médias empresas é pagar despesas pessoais diretamente pelo caixa ou conta bancária da pessoa jurídica. Essa prática distorce a DRE e impede o gestor de saber se o negócio realmente dá lucro.',
        'O caminho correto começa pela abertura de uma conta bancária exclusiva para o CNPJ e pela definição de um pró-labore mensal fixo para os sócios que atuam na operação.',
        'Quando a empresa apura lucro contábil comprovado em balancete ou balanço, os sócios podem realizar distribuição de lucros de forma organizada e documentada.'
      ],
      bullets: [
        'Mantenha conta corrente e cartões separados entre CPF e CNPJ.',
        'Defina um valor realista de pró-labore compatível com o orçamento da empresa.',
        'Envie os extratos bancários completos mensalmente para a escrituração contábil.'
      ]
    },
    {
      id: 'art-3',
      title: 'Reforma Tributária: como preparar o cadastro de produtos e serviços da sua empresa',
      category: 'Reforma Tributária',
      date: 'Conteúdo Orientativo • Atualizado',
      readTime: '4 min de leitura',
      summary: 'A transição para o IBS e a CBS exigirá consistência cadastral nas notas fiscais. Saiba o que revisar desde já.',
      paragraphs: [
        'Com a implementação gradual da Contribuição sobre Bens e Serviços (CBS) e do Imposto sobre Bens e Serviços (IBS), a qualidade das informações fiscais inseridas nos sistemas de emissão de notas ganha protagonismo.',
        'Classificações incorretas de NCM (para mercadorias) ou códigos de serviço (NBS/LC 116) podem resultar em tributação indevida ou perda de créditos tributários na cadeia comercial.',
        'Revisar o cadastro interno de itens com apoio da consultoria fiscal prepara a empresa de forma tranquila para as etapas de transição.'
      ],
      bullets: [
        'Audite os códigos NCM e tributação dos principais itens vendidos.',
        'Mantenha seu software emissor de NF-e/NFC-e/NFS-e sempre atualizado.',
        'Converse com o setor fiscal da Ação antes de firmar contratos de longo prazo.'
      ]
    },
    {
      id: 'art-4',
      title: 'Contratação no regime CLT: o que considerar além do salário em carteira',
      category: 'Departamento Pessoal',
      date: 'Conteúdo Orientativo • Atualizado',
      readTime: '5 min de leitura',
      summary: 'Antes de abrir uma vaga, conheça os encargos, provisões de 13º, férias e prazos do eSocial.',
      paragraphs: [
        'Ao planejar a contratação de um colaborador, muitos empresários consideram apenas o salário nominal combinado. Na prática, o custo real envolve encargos mensais e provisões trabalhistas que se acumulam ao longo do ano.',
        'Itens como FGTS, provisão mensal de 13º salário, férias acrescidas de um terço constitucional, vale-transporte e eventuais benefícios de convenção coletiva compõem o orçamento real da vaga.',
        'Além do planejamento financeiro, lembre-se de que o envio dos dados de admissão ao eSocial deve ocorrer antes do início efetivo do trabalho.'
      ],
      bullets: [
        'Utilize a Calculadora de Custo de Funcionário aqui na Ação Digital para simular cenários.',
        'Envie a documentação do candidato ao Departamento Pessoal com antecedência.',
        'Consulte sempre as regras da Convenção Coletiva da categoria.'
      ]
    },
    {
      id: 'art-5',
      title: 'DRE e Balanço Patrimonial: como usar relatórios contábeis para decidir melhor',
      category: 'Contabilidade',
      date: 'Conteúdo Orientativo • Atualizado',
      readTime: '4 min de leitura',
      summary: 'A contabilidade vai muito além das guias de impostos: veja como interpretar os indicadores essenciais da sua empresa.',
      paragraphs: [
        'Enxergar a contabilidade apenas como uma obrigação fiscal faz o empresário perder uma das ferramentas mais valiosas de gestão. Relatórios como o Balancete, a DRE e o Balanço Patrimonial traduzem a operação em números objetivos.',
        'Pela DRE, é possível acompanhar a evolução da margem bruta, o peso das despesas fixas e o resultado líquido. Pelo Balanço Patrimonial, avalia-se o equilíbrio entre capital de giro, estoques e endividamento.',
        'Na Ação Contabilidade, trabalhamos para que esses demonstrativos sejam claros, confiáveis e úteis no dia a dia do gestor.'
      ],
      bullets: [
        'Compare a DRE mês a mês para identificar sazonalidades e gargalos de custo.',
        'Acompanhe o índice de liquidez e o prazo médio de recebimento.',
        'Agende reuniões periódicas de análise com seu consultor contábil.'
      ]
    },
    {
      id: 'art-6',
      title: 'Planejamento Tributário preventivo: por que revisar o regime antes da virada do ano',
      category: 'Fiscal e Tributário',
      date: 'Conteúdo Orientativo • Atualizado',
      readTime: '4 min de leitura',
      summary: 'A opção pelo regime tributário (Simples Nacional, Lucro Presumido ou Lucro Real) vincula a empresa durante o ano-calendário.',
      paragraphs: [
        'No Brasil, a escolha do regime tributário acontece, via de regra, no início de cada ano-calendário e permanece válida até dezembro. Uma escolha baseada apenas em intuição pode gerar pagamento excessivo de tributos durante doze meses inteiros.',
        'O planejamento tributário analisa o histórico de faturamento, a margem de lucro real, o volume da folha de pagamento (Fator R) e o perfil dos clientes e fornecedores.',
        'Com dados organizados, a equipe fiscal compara cenários de forma técnica para indicar o enquadramento mais eficiente dentro da lei.'
      ],
      bullets: [
        'Não espere janeiro para avaliar mudanças de regime tributário.',
        'Considere projeções de crescimento de receita e contratação de equipe.',
        'Solicite um estudo tributário personalizado junto à equipe da Ação.'
      ]
    }
  ]
};
