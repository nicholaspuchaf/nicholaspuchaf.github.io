// Edite os cadastros abaixo para adicionar projetos. Links indisponíveis usam null.
// Detalhes opcionais: capabilities, workflow, designPatterns, infrastructureComponents, architectureFlows, continuousIntegration, quality, limitations e screenshots.
export const profile = {
  "name": "Nicholas Fontanini",
  "initials": "nf",
  "description": "Construindo ferramentas úteis, explorando ideias e aprendendo no caminho. Um pouco de produto, código e infraestrutura.",
  "github": "https://github.com/nicholaspuchaf",
  "linkedin": "https://www.linkedin.com/in/nicholas-pucharelli-fontanini/"
};

export const projects = [
  {
    "slug": "folha",
    "name": "Folha",
    "category": "Estudo",
    "theme": "leaf",
    "art": "cards",
    "tagline": "Conhecimento que fica.",
    "description": "Baralhos e flashcards personalizados para transformar conteúdo técnico em revisões curtas, de qualquer dispositivo.",
    "tags": [
      "React",
      "TypeScript",
      "IndexedDB",
      "AWS Lambda",
      "DynamoDB",
      "Terraform"
    ],
    "url": "https://web-anki.snowy-fire-cbdf.workers.dev/",
    "github": "https://github.com/nicholaspuchaf/web-anki",
    "status": "Publicado",
    "motivation": "Criei o Folha para levar meu material de estudo no iPhone e revisar mesmo sem internet. Queria ir além de uma pergunta com um único verso: em um problema de programação, faz sentido revelar uma dica, tentar uma solução e só depois consultar o código ou a complexidade. Essa necessidade deu origem a cartões com várias faces e a uma experiência de estudo que começa no próprio aparelho.",
    "implementation": "A interface usa React e TypeScript, com Vite e React Compiler. O código é organizado por funcionalidades: biblioteca, revisão, LeetCode, backup e sincronização. Comandos de edição, filtros e agendamento são funções puras; React cuida da interação e um repositório encapsula o IndexedDB. Ao salvar, a persistência termina antes de a interface assumir o novo estado, preservando o conteúdo anterior se houver erro.",
    "decisions": [
      [
        "O aparelho funciona por conta própria",
        "IndexedDB e instalação como PWA permitem estudar sem depender da API. A contrapartida é cuidar da persistência local e oferecer backup, porque limpar os dados do navegador pode apagar a biblioteca."
      ],
      [
        "Sincronizar cartões, não substituir a biblioteca",
        "Cada cartão remoto tem uma versão. Escritas condicionais no DynamoDB rejeitam alterações baseadas em versões antigas, e a interface preserva o conflito para uma escolha explícita entre a edição local e a nuvem."
      ],
      [
        "Incremental com reconciliação periódica",
        "Um índice por data permite buscar mudanças desde o último checkpoint. A consulta sobrepõe dois minutos e uma reconciliação completa ocorre na primeira sincronização e depois de 24 horas, compensando a consistência eventual do índice."
      ],
      [
        "Exclusões precisam viajar entre aparelhos",
        "Cartões removidos viram tombstones, registros de exclusão sem TTL. Isso evita que uma cópia antiga volte a publicar um cartão apagado, ao custo de manter esses registros remotos."
      ],
      [
        "Regras de estudo independentes da interface",
        "O agendador recebe o instante de referência e calcula intervalos com regras simples. Essa separação permite testar o comportamento sem React, rede ou relógio real; não é uma implementação do FSRS."
      ]
    ],
    "infrastructure": "O frontend é publicado no Cloudflare Pages pela integração com GitHub. Terraform define o backend AWS: Lambda em Node.js, Function URL, permissões IAM, logs no CloudWatch e a tabela DynamoDB com índice por atualização. A tabela usa capacidade provisionada e proteção contra exclusão. A API é opcional para o uso local.",
    "architecture": [],
    "architectureNote": "A biblioteca remota atual é pública e compartilhada, sem login ou isolamento por usuário. CORS limita origens no navegador, mas não fornece identidade. Baralhos vazios permanecem locais.",
    "capabilities": [
      [
        "Cartões com várias faces",
        "Pergunta, dicas progressivas, resposta pessoal, solução com linguagem de código, complexidade e notas podem ser organizados e reordenados."
      ],
      [
        "Estudo offline",
        "A biblioteca fica no IndexedDB. A PWA pode ser instalada na tela inicial e usada offline depois do carregamento inicial."
      ],
      [
        "Revisão e treino livre",
        "A avaliação agenda a próxima revisão; o treino livre usa os cartões filtrados sem alterar seus intervalos."
      ],
      [
        "Importação de LeetCode",
        "Um link público preenche título, enunciado, dificuldade e tópicos sem substituir a solução pessoal ou salvar o cartão automaticamente."
      ]
    ],
    "workflow": [
      "Criar um baralho e cadastrar um cartão básico ou de LeetCode.",
      "Revelar dicas e respostas no próprio ritmo e avaliar a revisão.",
      "Salvar localmente, exportar um backup JSON ou iniciar a sincronização manual."
    ],
    "infrastructureComponents": [
      [
        "Cloudflare Pages",
        "Entrega o frontend e os recursos da PWA; recebe a URL pública da API no build."
      ],
      [
        "IndexedDB",
        "Guarda biblioteca, versões, conflitos e checkpoint por endpoint; dados e checkpoint são persistidos na mesma transação."
      ],
      [
        "Lambda + Function URL",
        "Expõe o contrato de cartões, sincronização paginada e importação de enunciados públicos."
      ],
      [
        "DynamoDB + Terraform",
        "Um item por cartão, escritas condicionais e índice por data; infraestrutura e permissões versionadas em código."
      ]
    ],
    "architectureFlows": [
      {
        "title": "Estudar sem conexão",
        "steps": [
          "Interface React",
          "Comandos e agendador",
          "Repositório IndexedDB"
        ],
        "description": "Edição e revisão acontecem localmente. A sessão de treino usa uma seleção em memória e não grava novas revisões."
      },
      {
        "title": "Sincronizar entre aparelhos",
        "steps": [
          "Motor de sincronização",
          "Lambda · Function URL",
          "DynamoDB · versão por cartão"
        ],
        "description": "O usuário inicia a sincronização. A leitura percorre as páginas de mudanças; envios usam a versão conhecida e conflitos ficam disponíveis para resolução. O relógio do servidor define as datas remotas."
      }
    ],
    "quality": "O repositório contém testes para comandos de biblioteca, agendador, backups, sincronização, adaptador DynamoDB e importação do LeetCode. Testes Playwright exercitam os fluxos sobre o build de produção. O gate de qualidade também reúne tipos, lint, formatação, scanners de dependências e validação Terraform.",
    "limitations": [
      "Não há integração com Anki nem suporte a arquivos .apkg; o backup é JSON versionado.",
      "A importação depende de conteúdo público acessível do LeetCode; problemas Premium e bloqueios preservam o rascunho e apresentam erro.",
      "A biblioteca local ainda é carregada em memória; índices e operações por entidade seriam uma evolução para coleções maiores."
    ],
    "designPatterns": [
      [
        "Organização por funcionalidades",
        "Biblioteca, revisão, LeetCode, backup, tema e sincronização têm seus próprios modelos, regras e componentes. A camada app compõe as telas e shared concentra infraestrutura e UI reutilizável. Isso mantém uma mudança próxima da funcionalidade a que pertence.",
        "features/library, features/review, features/sync e app/App.tsx"
      ],
      [
        "Núcleo funcional e coordenação de efeitos",
        "Comandos de biblioteca retornam um novo estado e o agendador recebe o instante de referência. Hooks coordenam carregamento, persistência e erros; regras de domínio podem ser exercitadas sem montar React ou abrir uma conexão de rede.",
        "library/commands.ts, review/scheduler.ts e library/hooks/use-library.ts"
      ],
      [
        "Repository e adapters nas fronteiras",
        "O repositório local encapsula IndexedDB e suas transações; o adaptador remoto encapsula comandos DynamoDB. O motor de sincronização recebe contratos de API e persistência, reduzindo o acoplamento das regras aos detalhes de armazenamento.",
        "shared/storage/library-repository.ts, features/sync/engine.ts e backend/store.ts"
      ],
      [
        "Injeção de dependências por composição",
        "O entrypoint Lambda cria o cliente DynamoDB, monta o store e o entrega a createHandler. As funções recebem as dependências de que precisam, permitindo substituir o armazenamento e o transporte em testes sem um contêiner de injeção.",
        "backend/handler.ts → createDynamoStore → createHandler"
      ],
      [
        "Composição e reutilização de componentes",
        "LeetCodeCard atende à prévia do editor, à consulta e à revisão. Componentes de UI como campos, modal e alertas ficam separados dos modelos de cartões, para compartilhar comportamento sem duplicar telas inteiras.",
        "features/leetcode/components/LeetCodeCard.tsx e shared/ui"
      ],
      [
        "Validação nas entradas",
        "Backups, conteúdo de cartões e respostas HTTP atravessam parsers e validações antes de alterar a biblioteca. A mesma validação de LeetCode participa dos comandos e da importação, preservando o contrato entre caminhos diferentes de entrada.",
        "backup/parse-backup.ts, leetcode/model.ts e features/sync/api.ts"
      ],
      [
        "Concorrência otimista e commit atômico",
        "Escritas remotas usam a versão conhecida do cartão. Localmente, uma revisão impede que uma sincronização sobrescreva alterações de outra aba; biblioteca e checkpoint são gravados na mesma transação IndexedDB. Conflitos exigem resolução explícita.",
        "createSyncRepository().commit, backend/store.ts e features/sync/model.ts"
      ]
    ],
    "continuousIntegration": {
      "overview": "O workflow Quality and security executa a cada push. Há dois jobs com timeout de cinco minutos: Dependency security e Lint, types, tests and builds. O segundo depende do primeiro. Execuções antigas da mesma branch são canceladas quando chega um novo push, e cada ferramenta usa uma etapa nomeada para facilitar a identificação de falhas.",
      "flow": {
        "title": "Pipeline no GitHub Actions",
        "steps": [
          "Push · nova revisão",
          "Dependency security",
          "Qualidade · testes e builds"
        ],
        "description": "O job de segurança analisa o lockfile antes de instalar as dependências da aplicação. Somente após sua aprovação o job de qualidade prepara o ambiente e executa os demais checks."
      },
      "checks": [
        [
          "Pacotes maliciosos conhecidos",
          "bun run security:malware",
          "Lê nomes e versões do bun.lock, consulta OSV em lotes, trata paginação e bloqueia avisos MAL-*. Dependências não analisáveis e falhas de consulta também interrompem o gate."
        ],
        [
          "Vulnerabilidades e segredos",
          "bun run security:trivy",
          "Trivy verifica dependências diretas, transitivas e de desenvolvimento e segredos nas fontes cobertas pela configuração. Achados HIGH/CRITICAL falham mesmo quando não existe correção disponível."
        ],
        [
          "Formatação",
          "bun run format:check",
          "Prettier confere os arquivos sem modificá-los."
        ],
        [
          "Análise estática",
          "bun run lint",
          "ESLint com regras TypeScript e React Hooks/Compiler. O comando usa --max-warnings=0, fazendo avisos também falharem."
        ],
        [
          "Tipos",
          "bun run typecheck",
          "TypeScript valida aplicação, backend, scripts e testes de navegador sem emitir arquivos."
        ],
        [
          "Testes unitários e de integração",
          "bun test",
          "Exercita regras, agendamento, backups, IndexedDB, sincronização, contrato HTTP, adaptador DynamoDB e os próprios scanners."
        ],
        [
          "Artefato do backend",
          "bun run build:backend",
          "Compila o handler TypeScript para um módulo ESM minificado destinado ao runtime Node da Lambda."
        ],
        [
          "Formatação da infraestrutura",
          "terraform fmt -check -recursive",
          "Mantém a formatação dos arquivos Terraform consistente. O comando é executado em infra/terraform."
        ],
        [
          "Validação da infraestrutura",
          "terraform validate -no-color",
          "Confere a configuração após init com -backend=false -input=false. A validação não executa plan ou apply nem depende de credenciais AWS."
        ],
        [
          "Artefato do frontend",
          "bun run build",
          "Executa TypeScript e gera o bundle de produção com Vite."
        ],
        [
          "Testes reais de navegador",
          "bun run test:e2e:check",
          "Playwright usa Chromium em viewport móvel de 390 × 844. Os fluxos de estudo, nuvem e importação usam um build exclusivo e uma API interceptada, sem consultar a AWS."
        ]
      ],
      "safeguards": [
        [
          "Ferramentas e Actions fixadas",
          "Actions referenciadas por SHA, versões explícitas de Bun, Node e Terraform no workflow e instalação do Trivy com versão e checksum SHA-256 verificados."
        ],
        [
          "Dependências reproduzíveis",
          "O CI instala com bun install --frozen-lockfile --ignore-scripts. O lockfile é respeitado e lifecycle scripts dos pacotes não são executados nessa instalação."
        ],
        [
          "Permissões mínimas",
          "O workflow usa contents: read, checkout sem persistir credenciais e não recebe credenciais cloud para executar as verificações."
        ],
        [
          "Build de navegador isolado",
          "O Playwright gera e serve .cache/playwright-build com VITE_API_URL de teste. Isso permite rodar o teste de navegador junto do build normal sem disputar dist."
        ]
      ],
      "localGate": "No desenvolvimento local, o hook pre-push do Lefthook executa onze verificações nomeadas em paralelo: Prettier, ESLint, TypeScript, testes, builds de frontend e backend, Terraform fmt/validate, Trivy, OSV e Playwright. Qualquer falha bloqueia o push normal. O comando bun run prepush permite executar o mesmo gate manualmente; ele não corrige arquivos automaticamente.",
      "setup": "bun run setup:checks prepara os hooks, o Trivy com checksum verificado, o Chromium e os providers Terraform sem backend. As ferramentas JavaScript são dependências de desenvolvimento; Trivy, navegador e Terraform têm preparação própria. Cada clone precisa ter os hooks locais instalados.",
      "deployment": "A publicação do frontend continua pela integração GitHub do Cloudflare Pages. Esse build pode começar antes do término do workflow. O CI descrito valida o commit, mas não publica recursos nem estabelece uma dependência automática entre aprovação dos checks e deploy.",
      "limits": [
        "Hooks locais podem ser ignorados pelo Git. Para proteger merges no servidor, os checks Dependency security e Lint, types, tests and builds precisam ser exigidos na proteção da branch; os arquivos do repositório não aplicam essa configuração remota.",
        "OSV e Trivy dependem de consultas e bases externas. Falhas de rede bloqueiam o gate, e um resultado limpo se limita às ameaças conhecidas cobertas pelos scanners."
      ]
    },
    "screenshots": [
      {
        "src": "/projetos/folha/biblioteca.png",
        "alt": "Biblioteca do Folha com baralho LeetCode, revisões e opções de backup.",
        "caption": "Visão da biblioteca, revisões pendentes, backup e sincronização manual.",
        "width": 1781,
        "height": 919
      },
      {
        "src": "/projetos/folha/previa-cartao.png",
        "alt": "Prévia de um cartão LeetCode com enunciado e seleção de dicas e respostas.",
        "caption": "Enunciado e revisão lado a lado, com dicas progressivas e versos independentes.",
        "width": 1548,
        "height": 900
      },
      {
        "src": "/projetos/folha/solucao.png",
        "alt": "Verso de solução no Folha com código Python e botão para copiar.",
        "caption": "Verso de código da solução com numeração de linhas e cópia do conteúdo.",
        "width": 691,
        "height": 717
      }
    ]
  },
  {
    "slug": "labirinto",
    "name": "Labirinto",
    "category": "IA aplicada",
    "theme": "blue",
    "art": "document",
    "tagline": "Menos transcrição. Mais atenção.",
    "description": "IA para organizar resultados de exames em PDF em um texto enxuto, pronto para copiar no prontuário.",
    "tags": [
      "Svelte 5",
      "TypeScript",
      "PDF.js",
      "Cloudflare Pages",
      "IA"
    ],
    "url": "https://labirinto-b3j.pages.dev/",
    "github": null,
    "status": "Publicado",
    "motivation": "O Labirinto nasceu ao observar uma tarefa repetitiva em consultas: transcrever resultados de exames para o prontuário. A transcrição manual consumia cerca de dez minutos por consulta no fluxo que motivou o projeto. A ideia foi transformar PDFs e textos de laudos em uma saída curta e organizada, mantendo a revisão e a decisão clínica com a médica.",
    "implementation": "A interface é uma SPA em Svelte 5 e TypeScript, com Vite e suporte a instalação como PWA. Um núcleo compartilhado reúne catálogo de exames, aliases, parser determinístico, sanitização e formatação. É possível colar texto ou extrair texto selecionável de um PDF com PDF.js no navegador. A extração assistida por IA passa pela Pages Function /api/analyze, que devolve resultados estruturados para normalização e revisão.",
    "decisions": [
      [
        "IA para extrair, catálogo para organizar",
        "A resposta do modelo segue um schema JSON estrito e IDs do catálogo. O núcleo normaliza a saída e elimina campos sem resultado, reduzindo a dependência de texto livre gerado pelo modelo."
      ],
      [
        "Resultado e referência são coisas diferentes",
        "O prompt restringe a tarefa à extração do valor do paciente. A normalização identifica casos ambíguos para revisão; não há diagnóstico ou prescrição no fluxo de IA."
      ],
      [
        "Sanitização em duas fronteiras",
        "O texto passa pelo sanitizador no cliente e novamente na Function antes do envio ao provedor. Isso reduz dados identificáveis no payload, sem transformar a heurística em uma garantia de anonimização completa."
      ],
      [
        "Arquivo processado no navegador",
        "PDF.js extrai o texto localmente; a requisição de análise recebe texto, não o PDF inteiro. Essa escolha evita uma etapa de upload e armazenamento do arquivo no backend da aplicação."
      ],
      [
        "Métricas não bloqueiam a extração",
        "Escritas de analytics são tratadas separadamente: uma falha ao registrar consumo não deve interromper a organização do exame."
      ]
    ],
    "infrastructure": "Cloudflare Pages serve o frontend e executa as Functions. A chave do provedor fica no ambiente do servidor. A análise usa um endpoint compatível com a API Responses, com store: false, limite de entrada de 50 mil caracteres e modelo configurável. O binding opcional ANALYTICS_DB recebe métricas agregadas; as migrações SQL definem as tabelas de uso e os totais diários.",
    "architecture": [],
    "architectureNote": "Os destaques de valores usam faixas de referência e contexto do paciente no núcleo local. A organização dos resultados auxilia a revisão; o projeto não mede nem demonstra uma redução exata no tempo de consulta.",
    "capabilities": [
      [
        "Texto ou PDF",
        "O usuário cola um laudo ou escolhe um PDF e revisa a prévia do texto extraído antes de enviá-lo para análise."
      ],
      [
        "Saída clínica organizada",
        "O catálogo reconhece nomes e abreviações, agrupa exames e preserva os não mapeados na seção Outros."
      ],
      [
        "Histórico no navegador",
        "As transcrições ficam no localStorage e podem ser removidas individualmente ou em conjunto."
      ],
      [
        "Consumo observável",
        "Um painel administrativo acompanha chamadas, tokens e estimativas de custo por modelo e por dia."
      ]
    ],
    "workflow": [
      "Selecionar um PDF com texto ou colar o conteúdo de um laudo.",
      "Revisar o texto e solicitar a extração dos resultados.",
      "Conferir a saída normalizada e copiar o texto para o prontuário."
    ],
    "infrastructureComponents": [
      [
        "Svelte + PDF.js",
        "Interface, leitura de PDF, prévia e sanitização inicial no aparelho."
      ],
      [
        "Núcleo TypeScript",
        "Parser, catálogo, normalização da extração e regras de destaque de valores."
      ],
      [
        "Pages Function",
        "Valida o pedido, sanitiza o texto, chama o modelo e normaliza o resultado."
      ],
      [
        "Analytics + Cloudflare Access",
        "Agregação de uso e painel administrativo protegido por validação do JWT, audiência e lista de e-mails permitidos."
      ]
    ],
    "architectureFlows": [
      {
        "title": "Do laudo ao prontuário",
        "steps": [
          "PDF.js ou texto colado",
          "Prévia e sanitização",
          "Function + modelo",
          "Normalização e revisão"
        ],
        "description": "O texto sanitizado segue para a extração estruturada. O catálogo organiza os resultados recebidos e a interface oferece a saída para copiar; não há integração direta com o prontuário."
      },
      {
        "title": "Histórico e observabilidade",
        "steps": [
          "Function · uso de tokens",
          "Analytics · agregação",
          "API administrativa · Access",
          "Dashboard · consumo"
        ],
        "description": "A Function registra o consumo agregado, que é consultado pela API administrativa após validar o acesso. O histórico de transcrições é independente e permanece no navegador."
      }
    ],
    "quality": "Há testes de parser, catálogo, formatação, sanitização, extração de texto de PDF e regressões da saída estruturada. Casos de referência exercitam aliases, exames sem valor e preservação de conteúdo não reconhecido.",
    "limitations": [
      "PDFs escaneados sem texto selecionável precisam de OCR, que não faz parte desse fluxo.",
      "A reconstrução do layout de tabelas e colunas a partir do PDF ainda é provisória.",
      "Faixas de referência precisam ser revisadas conforme laboratório e diretriz; a extração continua exigindo conferência humana."
    ],
    "screenshots": [
      {
        "src": "/projetos/labirinto/visao-geral.png",
        "alt": "Página inicial do Labirinto com acesso ao processamento de exames.",
        "caption": "A entrada do Labirinto, com acesso ao processamento e ao painel administrativo.",
        "width": 1261,
        "height": 338
      },
      {
        "src": "/projetos/labirinto/processamento.png",
        "alt": "Upload de PDF, contexto clínico e resultados estruturados no Labirinto.",
        "caption": "Preparação do PDF, contexto clínico e saída estruturada para revisão e cópia.",
        "width": 1392,
        "height": 827
      }
    ]
  },
  {
    "slug": "reader",
    "name": "Reader RSVP",
    "category": "Estudo",
    "theme": "peach",
    "art": "reader",
    "tagline": "Uma palavra. Todo o foco.",
    "description": "Um leitor de livros com RSVP, criado para experimentar uma forma mais rápida e focada de leitura.",
    "tags": [
      "RSVP",
      "Leitura",
      "Livros"
    ],
    "url": "https://dsk38motcgcrz.cloudfront.net/",
    "github": null,
    "status": "Publicado",
    "motivation": "Criei este Reader para ler livros mais rápido, explorando a técnica RSVP (Rapid Serial Visual Presentation).",
    "implementation": "A experiência usa RSVP para apresentar palavras em sequência em um ponto fixo da tela. Os detalhes da implementação serão adicionados em breve.",
    "decisions": [
      [
        "Foco na leitura",
        "RSVP é a técnica central da experiência de leitura do projeto."
      ]
    ],
    "infrastructure": "A aplicação está disponível no endereço CloudFront informado. Os demais serviços e o processo de deploy ainda serão documentados.",
    "architecture": [],
    "architectureNote": "O desenho da arquitetura será adicionado em breve.",
    "screenshots": [
      {
        "src": "/projetos/reader/leitor.png",
        "alt": "Interface do Reader RSVP com controles de velocidade, fonte e índice de capítulos.",
        "caption": "Tela de leitura com abertura de documento, velocidade em palavras por minuto, fonte e capítulos.",
        "width": 1879,
        "height": 476
      }
    ]
  },
  {
    "slug": "finance-bro",
    "name": "Finance Bro",
    "category": "IA aplicada",
    "theme": "lime",
    "art": "finance",
    "tagline": "Seus gastos, com mais clareza.",
    "description": "Uma visão unificada dos gastos de extratos e cartões, com IA para identificar e categorizar despesas.",
    "tags": [
      "Svelte",
      "FastAPI",
      "SQLite",
      "Docker",
      "Pluggy",
      "IA"
    ],
    "url": null,
    "github": "https://github.com/nicholaspuchaf/finance-bro",
    "status": "Em desenvolvimento",
    "motivation": "Criei o Finance Bro para reunir meus gastos em um só lugar e entender o que estava por trás de cada lançamento. A proposta é combinar transações bancárias e de cartão, classificação revisável e uma visão de gastos e aportes, mantendo a instalação e o banco sob meu controle.",
    "implementation": "O frontend Svelte consome uma API Python com FastAPI. A persistência usa SQLite com modelos SQLAlchemy. A integração Meu Pluggy importa contas e transações com paginação por cursor; identificadores externos e a combinação conta/transação evitam duplicação em novas importações. As telas de início, transações, dashboards e tags compartilham tabela e seletores para manter os mesmos critérios de consulta.",
    "decisions": [
      [
        "Um container, uma origem",
        "O build Svelte é servido pelo próprio FastAPI. Uma imagem e uma porta simplificam a instalação e dispensam proxy entre interface e API; em troca, os dois componentes são atualizados juntos."
      ],
      [
        "IA sob demanda",
        "A categoria recebida da Pluggy é usada diretamente. A OpenAI só é chamada por ação explícita em uma transação ou lote de até dez, evitando custo e envio de dados em toda importação."
      ],
      [
        "Resposta de IA validada",
        "O adaptador solicita JSON com categoria, confiança e justificativa, restringe as categorias e valida o retorno com Pydantic. Recusas, respostas incompletas e formatos inválidos viram erros recuperáveis."
      ],
      [
        "A correção do usuário prevalece",
        "Regras normalizam o nome do estabelecimento e podem atingir transações atuais e futuras. Elas têm prioridade sobre a categoria importada, e tags locais sobrevivem à sincronização."
      ],
      [
        "SQLite para uma instalação pessoal",
        "Um banco em volume e um único worker mantêm a operação pequena. Isso atende ao uso local; uma oferta pública precisaria rever identidade, concorrência e distribuição."
      ]
    ],
    "infrastructure": "Docker Compose inicia um único serviço. O Dockerfile usa múltiplos estágios para compilar o frontend e preparar o backend; Node, pnpm e ferramentas de build ficam fora da imagem final Python slim. A aplicação roda sem root, com filesystem somente leitura e volume persistente para SQLite e backups. A porta é publicada apenas no loopback do host.",
    "architecture": [],
    "architectureNote": "Os totais de gastos consideram débitos confirmados em BRL com exclusões específicas, como transferências e pagamentos de fatura. A visão de investimentos representa aportes e entradas relacionadas, não rentabilidade de carteira.",
    "capabilities": [
      [
        "Importação e lançamentos locais",
        "Conexão com Meu Pluggy e cadastro manual alimentam a mesma base de transações."
      ],
      [
        "Categorias que podem ser corrigidas",
        "Categorias da Pluggy, sugestões opcionais de IA e regras por estabelecimento convivem com notas e tags pessoais."
      ],
      [
        "Dashboards consistentes",
        "Análises de gastos e aportes combinam períodos, categorias e tags sem duplicar transações que atendam a vários filtros."
      ],
      [
        "Privacidade na apresentação",
        "Modo público oculta valores na interface; idioma, escala e tema ficam salvos no navegador."
      ]
    ],
    "workflow": [
      "Configurar a conexão Meu Pluggy ou cadastrar transações manualmente.",
      "Importar os lançamentos, revisar categorias e criar regras ou tags.",
      "Consultar transações e dashboards; solicitar IA apenas quando quiser classificar pendências."
    ],
    "infrastructureComponents": [
      [
        "Svelte compilado + FastAPI",
        "Interface estática e endpoints /api na mesma origem e no mesmo processo de distribuição."
      ],
      [
        "SQLite + volume Docker",
        "Transações, conexões, tags e regras locais persistem entre reconstruções da imagem."
      ],
      [
        "Meu Pluggy",
        "Fonte das contas e transações, com paginação, tratamento do consentimento e reaproveitamento dos IDs externos."
      ],
      [
        "Adaptador OpenAI",
        "Classificação opcional; envia descrição, valor e moeda e mantém a justificativa separada das notas pessoais."
      ]
    ],
    "architectureFlows": [
      {
        "title": "Consultar e gerenciar",
        "steps": [
          "Svelte · navegador",
          "FastAPI · /api",
          "SQLite · volume local"
        ],
        "description": "O mesmo FastAPI entrega o frontend e a API. Tabela, filtros e agregações usam os dados locais; o dashboard é independente da paginação da listagem."
      },
      {
        "title": "Trazer dados e enriquecer",
        "steps": [
          "Meu Pluggy",
          "Importação idempotente",
          "Categorias e regras locais"
        ],
        "description": "A IA é um caminho opcional acionado depois da importação. Não participa automaticamente da sincronização bancária."
      }
    ],
    "quality": "Os testes do backend simulam Pluggy e IA sem conexão bancária real. Há verificações de arquivos estáticos e API na mesma origem, isolamento do diretório publicado e comportamentos de importação e regras. O frontend possui testes, checagem Svelte e build próprios.",
    "limitations": [
      "O aplicativo não tem autenticação para exposição pública; a execução atual é local.",
      "O modo de ocultar valores muda a exibição, não as respostas da API nem o controle de acesso.",
      "Não há conversão cambial no total em BRL; recorrências são sugestões e não criam lançamentos futuros."
    ]
  },
  {
    "slug": "nasa-space-apps",
    "name": "NASA Space Apps",
    "category": "Experimentos",
    "theme": "space",
    "art": "orbit",
    "tagline": "O universo, mais perto.",
    "description": "Uma trilha de aprendizado sobre o espaço, com simulações 3D de órbitas e impactos de meteoros.",
    "tags": [
      "React",
      "Three.js",
      "Cesium",
      "JavaScript"
    ],
    "url": "https://bewareoftherocks.github.io/",
    "github": null,
    "status": "Publicado",
    "motivation": "Criado em equipe durante o NASA Space Apps Challenge, o projeto apresenta a NASA e seus projetos e ensina sobre meteoros, órbitas e outros temas por meio de uma trilha de aprendizado.",
    "implementation": "A equipe desenvolveu um simulador 3D de órbitas do sistema solar com planetas e milhares de asteroides e meteoros, além de um simulador 3D de impacto de meteoro na Terra. As tecnologias do projeto incluem JavaScript, React, Three.js e Cesium.",
    "decisions": [
      [
        "Aprender explorando",
        "A navegação foi organizada como uma trilha para conectar o conteúdo educacional às experiências interativas."
      ],
      [
        "Visualização tridimensional",
        "Simuladores tornam órbitas e impactos mais concretos para quem está aprendendo."
      ],
      [
        "Construção em equipe",
        "O projeto foi desenvolvido em um hackathon; o detalhamento da minha contribuição individual será adicionado posteriormente."
      ]
    ],
    "infrastructure": "A demonstração está disponível no GitHub Pages. Outros detalhes de publicação ainda serão documentados.",
    "architecture": [],
    "architectureNote": "O detalhamento dos componentes dos simuladores será adicionado em breve.",
    "screenshots": [
      {
        "src": "/projetos/nasa-space-apps/terra-e-sol.png",
        "alt": "Explorador 3D com Terra, Sol e linhas de órbita no cenário espacial.",
        "caption": "Terra e Sol no explorador 3D, com controles de câmera e navegação.",
        "width": 1803,
        "height": 825
      },
      {
        "src": "/projetos/nasa-space-apps/alerta-inicial.png",
        "alt": "Tela de alerta inicial do projeto educacional NASA Space Apps.",
        "caption": "Abertura narrativa: um alerta fictício introduz o cenário de aproximação de um objeto.",
        "width": 1374,
        "height": 691
      },
      {
        "src": "/projetos/nasa-space-apps/introducao-missao.png",
        "alt": "Introdução da missão com texto verde sobre fundo preto.",
        "caption": "A narrativa convida o visitante a participar da missão antes de explorar os simuladores.",
        "width": 1458,
        "height": 629
      },
      {
        "src": "/projetos/nasa-space-apps/earth-explorer.png",
        "alt": "Earth Explorer com a Terra em 3D e painel de controles da câmera.",
        "caption": "Exploração da Terra com opções de rotação, zoom e acompanhamento dos objetos.",
        "width": 1815,
        "height": 846
      },
      {
        "src": "/projetos/nasa-space-apps/terra-em-orbita.png",
        "alt": "Outro ângulo da Terra no cenário tridimensional do explorador espacial.",
        "caption": "Outra perspectiva da Terra no ambiente espacial interativo.",
        "width": 1605,
        "height": 770
      },
      {
        "src": "/projetos/nasa-space-apps/simulador-impacto.png",
        "alt": "Simulador de impacto com globo terrestre e controles de diâmetro, velocidade, ângulo e material.",
        "caption": "Configuração do simulador de impacto: diâmetro, velocidade, ângulo e material do meteoro, com seleção do alvo no globo.",
        "width": 1857,
        "height": 892
      }
    ]
  },
  {
    "slug": "rigbify",
    "name": "Rigbyfy",
    "category": "Mobile",
    "theme": "lavender",
    "art": "music",
    "tagline": "Sua música, no seu celular.",
    "description": "Um player Android para ouvir músicas armazenadas localmente no celular.",
    "tags": [
      "Svelte 5",
      "Tauri 2",
      "Rust",
      "SQLite",
      "Kotlin",
      "Media3"
    ],
    "url": null,
    "github": "https://github.com/nicholaspuchaf/rigbify/",
    "status": "Em desenvolvimento",
    "motivation": "Criei o Rigbyfy para ouvir e organizar músicas locais no Android, com biblioteca e playlists no próprio aparelho. O objetivo é uma experiência offline com controles familiares, sem depender de uma conta ou enviar o catálogo para um servidor.",
    "implementation": "A interface usa Svelte 5 e TypeScript dentro de um shell Tauri 2. Serviços TypeScript fazem a ponte com commands Rust; o núcleo coordena os casos de uso e repositories SQLite. Plugins próprios cuidam da seleção de arquivos, reprodução e downloads no Android. Kotlin e Media3/ExoPlayer mantêm o áudio fora do ciclo de vida da WebView.",
    "decisions": [
      [
        "Cada estado tem seu responsável",
        "SQLite governa catálogo e playlists; Media3 governa a reprodução. A interface consulta o player nativo, atualmente a cada segundo, em vez de manter uma segunda fila independente no Svelte."
      ],
      [
        "Referenciar o áudio em vez de copiá-lo para o banco",
        "O Storage Access Framework concede permissões persistentes para as URIs escolhidas. O banco guarda referências e metadados; remover uma faixa do catálogo não apaga o arquivo físico."
      ],
      [
        "Regras fora dos componentes",
        "Telas chamam serviços tipados, que chegam aos commands Tauri. Traits de repository isolam os casos de uso Rust do SQLite e permitem testes com implementações em memória."
      ],
      [
        "Playlists com transação e versão",
        "Mutações relacionadas são atômicas. Edições e reordenações que usam uma versão antiga são rejeitadas, evitando sobrescritas silenciosas. A ordem personalizada é preservada mesmo ao visualizar outra ordenação."
      ],
      [
        "Integrações nativas em plugins",
        "Seleção de arquivos, player e downloader têm contratos separados. No navegador, mocks permitem desenvolver a interface; não significam reprodução nativa disponível em todas as plataformas."
      ]
    ],
    "infrastructure": "O aplicativo executa no dispositivo, sem backend de catálogo ou telemetria da biblioteca. Vite compila a interface, Tauri empacota o shell e o projeto Android é compilado com Rust e Gradle. Migrations SQL incrementais mantêm catálogo, playlists, origens de download e histórico de reprodução. O downloader usa yt-dlp e FFmpeg por integração Android.",
    "architecture": [],
    "architectureNote": "No fluxo de importação, media-source obtém arquivos e metadados via Android e o núcleo registra as referências com deduplicação por origem e URI. Downloads concluídos reutilizam a mesma entrada de importação do catálogo.",
    "capabilities": [
      [
        "Biblioteca local",
        "Importação pelo seletor Android, metadados e capas, busca, favoritos e edição do catálogo sem alterar o áudio original."
      ],
      [
        "Playlists persistentes",
        "Criação, duplicação, ordenação, descrição e capa, com prevenção de faixas repetidas e duração calculada."
      ],
      [
        "Player nativo",
        "Fila, play/pause, seek, anterior e próxima, serviço em segundo plano e notificação multimídia."
      ],
      [
        "Importação e downloads",
        "Bundles com manifesto podem reconstruir playlists; downloads autorizados de mídia individual têm formatos, progresso e cancelamento."
      ]
    ],
    "workflow": [
      "Escolher arquivos no seletor nativo e registrar suas referências na biblioteca.",
      "Organizar favoritos e playlists sem mover nem duplicar o áudio no banco.",
      "Iniciar a fila no player Android e acompanhar a reprodução pelo app ou pela notificação."
    ],
    "infrastructureComponents": [
      [
        "Svelte + serviços TypeScript",
        "Telas, navegação, mini player e contratos para chamar o runtime nativo."
      ],
      [
        "Tauri + Rust",
        "Validação de entradas, coordenação dos casos de uso e adaptadores de plataforma."
      ],
      [
        "SQLite",
        "Catálogo, favoritos, playlists, versões e índices de reprodução recente."
      ],
      [
        "Plugins Kotlin",
        "Storage Access Framework, Media3/ExoPlayer e pipeline de download com progresso."
      ]
    ],
    "architectureFlows": [
      {
        "title": "Catálogo e playlists",
        "steps": [
          "Svelte · serviços tipados",
          "Commands e casos de uso Rust",
          "Repositories · SQLite"
        ],
        "description": "O domínio depende de contratos de persistência. A interface não consulta SQLite nem chama Kotlin diretamente."
      },
      {
        "title": "Reprodução no Android",
        "steps": [
          "Serviço TypeScript",
          "Plugin media-player",
          "Kotlin · MediaSessionService",
          "Media3 / ExoPlayer"
        ],
        "description": "O serviço nativo mantém a reprodução em segundo plano. Player completo e mini player refletem o estado consultado na plataforma."
      }
    ],
    "quality": "O repositório contém testes de serviços TypeScript, regras Rust de biblioteca e playlists e mapeadores Kotlin. A documentação registra validação do frontend e núcleo Rust; a instalação Android após as alterações recentes ainda precisa ser revalidada em aparelho.",
    "limitations": [
      "A reprodução nativa está implementada apenas no Android; iOS e desktop não têm player equivalente.",
      "Bluetooth, chamadas, foco de áudio e recuperação após encerramento ainda precisam de testes completos em dispositivos.",
      "Persistência da fila entre reinícios, download de playlists e distribuição com a política CSP endurecida permanecem como evoluções."
    ]
  },
  {
    "slug": "encurtador",
    "name": "Encurtador de URLs",
    "category": "Ferramentas",
    "theme": "lavender",
    "art": "link",
    "tagline": "Um caminho mais curto.",
    "description": "Um encurtador de links feito para aprofundar meus conhecimentos de desenvolvimento e infraestrutura na AWS.",
    "tags": [
      "Svelte",
      "Python",
      "API Gateway",
      "Lambda",
      "DynamoDB",
      "AWS CDK"
    ],
    "url": "https://d3d0fy6tgi6g4w.cloudfront.net/",
    "github": "https://github.com/nicholaspuchaf/url_shortner",
    "status": "Publicado",
    "motivation": "Construí o encurtador para aprender AWS com um serviço pequeno de ponta a ponta: uma interface pública, uma API que gera identificadores e uma base que resolve o destino de cada link. O escopo também permite discutir colisões, expiração, proteção de recursos e o custo de manter um endpoint aberto.",
    "implementation": "O frontend Svelte e TypeScript chama uma Lambda Python por uma HTTP API do API Gateway. POST /shorten valida e normaliza o endereço; um prefixo de sete caracteres do hash BLAKE2s vira o código. A tabela DynamoDB usa esse código como chave. GET /{code} busca o destino e retorna um redirecionamento HTTP 302, ou 404 quando o registro não existe.",
    "decisions": [
      [
        "Hash determinístico com colisão explícita",
        "O código deriva da URL, evitando um identificador novo para a mesma entrada. Se o prefixo já representar outro destino, a API responde 409; não existe extensão automática do hash nessa implementação."
      ],
      [
        "Criação protegida no banco",
        "PutItem usa attribute_not_exists(code), impedindo que uma criação sobrescreva um registro concorrente. O tratamento atual não transforma toda corrida entre criações em uma resposta de reutilização."
      ],
      [
        "Expiração delegada ao DynamoDB",
        "Cada novo link recebe expiresAt para 30 dias e a tabela tem TTL. A remoção é assíncrona: a rota de redirecionamento não verifica esse timestamp, então não é uma expiração rígida de acesso."
      ],
      [
        "Frontend estático com origem privada",
        "O CDK cria S3 com bloqueio de acesso público e CloudFront com Origin Access Control. A interface é distribuída por CDN sem expor o bucket diretamente."
      ],
      [
        "Limites conservadores para a API",
        "A infraestrutura limita a criação por throttling e reserva duas execuções concorrentes para a Lambda por padrão. Isso restringe a capacidade do serviço; não é uma solução ilimitada de escala."
      ]
    ],
    "infrastructure": "AWS CDK em TypeScript define duas stacks: frontend em S3/CloudFront e backend em API Gateway, Lambda Python ARM64 e DynamoDB sob demanda. Em produção, a tabela é retida e tem recuperação point-in-time. O endereço do frontend passa por SSM para configurar o CORS. Domínio customizado com Route 53/ACM e WAF no CloudFront são opções do código, não requisitos da publicação.",
    "architecture": [],
    "architectureNote": "TTL é limpeza de armazenamento eventual, não bloqueio imediato depois de 30 dias. A validação de destinos também não funciona como um serviço de reputação de URLs.",
    "capabilities": [
      [
        "Encurtar e reutilizar",
        "A mesma URL normalizada reutiliza o código existente; uma criação retorna 201 e a reutilização retorna 200."
      ],
      [
        "Compartilhar por QR Code",
        "O QR é gerado no navegador. Se o encurtamento falhar nesse modo, a interface pode gerar o QR do endereço original."
      ],
      [
        "Copiar e consultar recentes",
        "A interface oferece cópia do resultado e uma lista local de links gerados."
      ],
      [
        "Validação do destino",
        "A API aceita HTTP/HTTPS, adiciona HTTPS quando falta o esquema e rejeita credenciais na URL, caracteres de controle e destinos IP locais ou reservados."
      ]
    ],
    "workflow": [
      "Informar um endereço e escolher link curto ou QR Code.",
      "A API validar a URL, calcular o código e criar ou reutilizar o registro.",
      "Compartilhar o resultado; cada abertura consulta o destino e responde com 302."
    ],
    "infrastructureComponents": [
      [
        "S3 + CloudFront",
        "Arquivos estáticos, HTTPS, cache e acesso privado à origem via OAC."
      ],
      [
        "API Gateway HTTP API",
        "Rotas de criação e redirecionamento; limite específico para POST /shorten."
      ],
      [
        "Lambda Python",
        "Validação, hash e acesso ao banco; a configuração usa 256 MB, timeout de um segundo e ARM64."
      ],
      [
        "DynamoDB + CDK",
        "Chave por código, escrita condicional e TTL; permissões IAM limitadas à tabela da aplicação."
      ]
    ],
    "architectureFlows": [
      {
        "title": "Criar um link",
        "steps": [
          "Svelte · CloudFront/S3",
          "POST /shorten · API Gateway",
          "Lambda · validação e hash",
          "DynamoDB · escrita condicional"
        ],
        "description": "A interface recebe o código e a URL curta e pode gerar o QR Code localmente. O backend não faz download do conteúdo do destino."
      },
      {
        "title": "Abrir um link curto",
        "steps": [
          "Navegador · GET /{code}",
          "API Gateway + Lambda",
          "DynamoDB · leitura",
          "302 · destino original"
        ],
        "description": "O redirecionamento usa o endpoint da API. O CloudFront da interface e o endpoint de resolução são componentes distintos."
      }
    ],
    "quality": "Há testes unitários do handler Python, dos contratos e componentes Svelte e das stacks CDK. Eles exercitam criação, reutilização, validação de URL, redirecionamento e configuração dos recursos sem exigir tráfego real da aplicação publicada.",
    "limitations": [
      "Colisões de hash são rejeitadas e ainda não têm estratégia automática de realocação.",
      "A expiração exata exigiria validar expiresAt no caminho de leitura.",
      "Autenticação, contagem de cliques e planos comerciais não fazem parte do backend examinado."
    ],
    "screenshots": [
      {
        "src": "/projetos/encurtador/visao-geral.png",
        "alt": "Página do encurtador com formulário de URL e abas de link curto e QR Code.",
        "caption": "Visão da interface e do formulário de encurtamento de links.",
        "width": 1500,
        "height": 909
      },
      {
        "src": "/projetos/encurtador/qr-code.png",
        "alt": "Aba de geração de QR Code a partir de um endereço.",
        "caption": "Formulário para gerar QR Code a partir de um link.",
        "width": 611,
        "height": 505
      },
      {
        "src": "/projetos/encurtador/links-recentes.png",
        "alt": "Seção de links recentes e apresentação visual de recursos na interface.",
        "caption": "Seção de histórico e blocos visuais de apresentação. A captura inclui exemplos de links e textos de demonstração do layout.",
        "width": 1572,
        "height": 821
      }
    ]
  },
  {
    "slug": "comparador-de-acoes",
    "name": "Comparador de ações",
    "category": "Ferramentas",
    "theme": "sand",
    "art": "chart",
    "tagline": "Indicadores lado a lado.",
    "description": "Comparação de ações da bolsa brasileira a partir de indicadores econômicos e coleta automatizada de dados.",
    "tags": [
      "Vue.js",
      "Python",
      "Flask",
      "Selenium"
    ],
    "url": null,
    "github": "https://github.com/nicholaspuchaf/market-hunter",
    "status": "Sem link público",
    "motivation": "Reunir indicadores econômicos para facilitar a comparação entre ações da bolsa brasileira.",
    "implementation": "Frontend em Vue.js e backend em Python com Flask. Selenium automatiza a coleta e o parsing de informações financeiras, indicadores e conteúdos sobre ações.",
    "decisions": [
      [
        "Automação da coleta",
        "Selenium é utilizado para coletar e interpretar as informações financeiras."
      ],
      [
        "Comparação na interface",
        "Vue.js apresenta os dados para comparar indicadores entre ações."
      ]
    ],
    "infrastructure": "Os detalhes de hospedagem e deploy serão adicionados em breve.",
    "architecture": [
      "Selenium · Coleta",
      "Flask · Backend",
      "Vue.js · Interface"
    ],
    "architectureNote": "Componentes conhecidos; persistência e comunicação entre eles ainda serão documentadas."
  },
  {
    "slug": "blog",
    "name": "Blog pessoal",
    "category": "Pessoal",
    "theme": "mint",
    "art": "blog",
    "tagline": "Ideias que viram palavras.",
    "description": "Meu espaço pessoal na web, com publicação automática a partir do GitHub para a Cloudflare.",
    "tags": [
      "GitHub",
      "Cloudflare",
      "Deploy automático"
    ],
    "url": "https://blog-f4m.pages.dev/",
    "github": "https://github.com/nicholaspuchaf/blog",
    "status": "Publicado",
    "motivation": "Ter um espaço pessoal na web para publicar conteúdo.",
    "implementation": "O projeto tem deploy automático do GitHub para a Cloudflare. Mais detalhes sobre o desenvolvimento e o conteúdo serão adicionados em breve.",
    "decisions": [
      [
        "Publicação automática",
        "As alterações no GitHub alimentam o deploy na Cloudflare."
      ]
    ],
    "infrastructure": "Publicação na Cloudflare, com deploy automático a partir do GitHub.",
    "architecture": [
      "GitHub · Código",
      "Cloudflare · Publicação"
    ],
    "architectureNote": "Fluxo de publicação informado; framework e etapas do build ainda serão documentados."
  }
];
