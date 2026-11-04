# Fontes das páginas técnicas

O conteúdo de Folha, Labirinto, Finance Bro, Rigbyfy e Encurtador foi revisado a partir dos cinco repositórios locais indicados por Nicholas. A inspeção cobriu documentação, implementações e testes existentes. Não foram executados os projetos de origem nem suas suítes nesta revisão; as verificações executadas são as do portfólio.

## Folha — `iphone-study`

- `README.md` e `docs/backend-sync.md`: funcionalidades, contrato público, revisão e restrições.
- `docs/architecture.md`: fronteiras entre interface, comandos, armazenamento e sincronização. As seções de evolução da primeira versão são históricas; a seção de sincronização opcional e o código descrevem a implementação atual.
- `src/features/review/scheduler.ts`: agendamento simples, independente de FSRS.
- `src/features/sync/engine.ts`, `backend/store.ts` e `backend/sync.ts`: paginação, checkpoint, versões e escrita condicional.
- `infra/terraform/backend.tf` e `storage.tf`: Function URL pública, Lambda, logs, IAM, DynamoDB provisionado e proteção contra exclusão.
- `.github/workflows/quality.yml`, `lefthook.yml`, `package.json` e `docs/quality.md`: jobs dependentes de segurança/qualidade, hook pre-push paralelo, comandos, preparação e limites da relação entre CI e Cloudflare Pages.
- `trivy.yaml`, `scripts/lib/security.ts`, `eslint.config.js` e `playwright.config.ts`: severidades, consulta paginada OSV, regras React/TypeScript e build de navegador isolado.
- `src/features/library/commands.ts`, `src/features/library/hooks/use-library.ts`, `src/shared/storage/library-repository.ts` e `backend/handler.ts`: transformações imutáveis, coordenação de efeitos, repository e composição de dependências.

O remoto local confirma a associação entre `iphone-study` e `nicholaspuchaf/web-anki`.

## Labirinto — `labirinto`

- `README.md`, `src/App.svelte` e `packages/core/`: Svelte, extração PDF no navegador, sanitização, catálogo, parser e persistência local.
- `functions/api/analyze.ts`: limite de entrada, schema estrito, sanitização no servidor, modelo configurável e `store: false`.
- `functions/_lib/analytics.ts` e `migrations/`: agregação de chamadas, tokens e estimativas de custo.
- `functions/_lib/access.ts` e `functions/api/admin/metrics.ts`: validação de acesso administrativo.
- Testes em `packages/core/` e `tests/model-regression.test.ts`: cobertura existente e casos de regressão.

A política de sanitização é uma mitigação implementada, não comprovação de anonimização completa. As faixas de referência e a extração não devem ser apresentadas como diagnóstico. O README registra a reconstrução de layout do PDF como provisória.

## Finance Bro — `finance-bro`

- `README.md` e `docs/DOCKER.md`: funcionalidades, uma única imagem/processo, uso local e limites.
- `backend/app/frontend.py`, `Dockerfile` e `compose.yaml`: frontend compilado servido pelo FastAPI, volume SQLite, bind local e configuração do container.
- `backend/app/models.py` e `services/pluggy.py`: identificadores externos e importação paginada.
- `backend/app/services/category_rules.py`: regras locais com precedência sobre categorias importadas.
- `backend/app/services/ai_classifier.py`: IA opcional, schema de categorias e validação da resposta.

A integração Meu Pluggy já existe no código. A IA não é executada automaticamente em toda importação. A distribuição atual tem um container, não dois serviços em containers separados.

## Rigbyfy — `rigbyfy`

- `README.md`: stack, funcionalidades e pendências de validação em aparelho.
- `src-tauri/src/database/sqlite_playlist_repository.rs`: transações, ordenação e controle otimista de versão.
- `plugins/media-player/android/src/main/java/PlaybackService.kt`: `MediaSessionService` e ExoPlayer fora da WebView.
- `src/services/`, `src-tauri/src/media/` e plugins: divisão de responsabilidades e contratos da aplicação.

O nome no código/documentação é Rigbyfy. O slug público existente `/projetos/rigbify/` foi preservado, e o remoto local confirma `nicholaspuchaf/rigbify`. O estado de player Android implementado não comprova validação completa em aparelho após as últimas mudanças.

## Encurtador — `url_shortner`

- `backend/handler.py`: BLAKE2s, código de sete caracteres, reutilização, colisão, escrita condicional, TTL e redirecionamento 302.
- `infra/lib/infra-stack.ts`: API Gateway, Lambda ARM64, DynamoDB, IAM, throttling e domínio opcional.
- `infra/lib/frontend-stack.ts`: bucket privado, OAC, CloudFront, WAF opcional e publicação de assets.
- `frontend/src/lib/components/ToolPanel.svelte` e `frontend/src/App.svelte`: QR no navegador, fallback e histórico no localStorage.
- Testes em `backend/tests/`, `frontend/src/` e `infra/test/`: evidências da cobertura existente.

`expiresAt` é usado pelo TTL do DynamoDB; o handler de leitura não verifica a data. Escrita condicional impede sobrescrita, mas a corrida de criação não tem tratamento completo de reutilização. Recursos opcionais descritos no CDK não são confirmação de sua ativação no ambiente publicado.

## Limite da revisão

Os endereços públicos foram preservados do cadastro. Ler fontes locais não comprova que a mesma revisão está publicada, nem valida métricas de latência, custo real ou economia de tempo. Não foram incluídas credenciais, dados financeiros ou laudos reais no conteúdo do site.
