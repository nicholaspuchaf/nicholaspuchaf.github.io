# nicholaspuchaf.github.io

Portfólio em **Svelte 5 + SvelteKit + Vite**, com deploy estático no GitHub Pages. Tema escuro por padrão, coluna central no estilo Linktree, banners compactos e páginas sobre motivação, implementação, decisões, infraestrutura e system design.

## Desenvolvimento

Requer Node.js 22.12+ (recomendado: 24) e pnpm 11.

```sh
pnpm install
pnpm dev
```

Abra http://localhost:3000. O Vite atualiza a página durante as edições.

```sh
pnpm check    # valida componentes Svelte
pnpm test     # valida cadastros, filtros e rotas
pnpm build    # gera HTML estático em dist/
pnpm preview  # prévia em http://localhost:4173
```

## Adicionar ou editar projetos

Edite **src/data.js**. O objeto `profile` contém a apresentação e os links pessoais. Cada objeto de `projects` gera um card e uma página em `/projetos/<slug>/`. A ordem dos cadastros define a ordem dos cards.

```js
{
  slug: 'meu-projeto',
  name: 'Meu projeto',
  category: 'Ferramentas',
  theme: 'leaf',
  art: 'cards',
  tagline: 'Uma frase sobre a ideia.',
  description: 'Descrição curta para o card.',
  tags: ['Svelte', 'AWS'],
  url: null,
  github: null,
  status: 'Em desenvolvimento',
  motivation: 'Por que o projeto existe.',
  implementation: 'Como foi feito.',
  decisions: [['Uma decisão', 'Motivo e consequências dessa escolha.']],
  infrastructure: 'Onde roda e como é publicado.',
  architecture: ['Interface', 'Backend', 'Persistência'],
  architectureNote: 'Contexto do diagrama simplificado.',
}
```

Use um slug único em minúsculas, sem espaços ou acentos. A categoria aparece na página de detalhes de cada projeto. `url: null` e `github: null` ocultam os respectivos botões sem remover o projeto. Use `architecture: []` se ainda não houver desenho documentado. Os diagramas são visões simplificadas em sequência.

Temas: `leaf`, `blue`, `peach`, `lime`, `space`, `lavender`, `sand`, `rose`, `mint`.

As páginas mais completas também usam campos opcionais: `capabilities` (pares de título e descrição), `workflow` (passos de uso), `infrastructureComponents` (pares de componente e responsabilidade), `architectureFlows` (objetos com `title`, `steps` e `description`), `quality` (texto) e `limitations` (lista). Esses campos geram os blocos detalhados; projetos sem eles continuam usando o formato simples. A seção de qualidade aparece automaticamente no índice quando `quality` é preenchido.

As fontes e os limites da revisão técnica estão em [docs/fontes-dos-projetos.md](docs/fontes-dos-projetos.md).

Para adicionar capturas reais, coloque os arquivos em `static/projetos/<slug>/` e acrescente `screenshots` ao cadastro:

```js
screenshots: [{
  src: '/projetos/meu-projeto/tela.png',
  alt: 'Descrição do que aparece na tela.',
  caption: 'Contexto da funcionalidade demonstrada.',
  width: 1440,
  height: 900,
}]
```

A primeira captura aparece no banner da lista e na capa; todas aparecem na galeria, com acesso ao arquivo original. Sem capturas, o banner continua usando a ilustração. Use as dimensões reais para reservar o espaço da imagem durante o carregamento.

`designPatterns` recebe entradas `[título, explicação, referência no código]`. `continuousIntegration` descreve o pipeline (`flow`), as verificações (`checks`), as proteções (`safeguards`), o hook local, a preparação, o deploy e os limites. Veja o cadastro do Folha como exemplo completo. As seções e sua numeração entram no índice automaticamente.

Banners: `cards`, `document`, `reader`, `finance`, `orbit`, `link`, `chart`, `blog`, `music`. Para criar outro, edite `src/lib/components/ProjectArt.svelte` e `src/app.css`.

## Estrutura

- `src/routes/+page.svelte`: lista de projetos em coluna única e apresentação pessoal ao final.
- `src/routes/projetos/[slug]/`: páginas individuais e carregamento de dados.
- `src/routes/+layout.svelte`: cabeçalho, rodapé e estilos globais.
- `src/lib/components/`: cards, ilustrações e ícones reutilizáveis.
- `src/lib/projects.js`: busca e filtragem.
- `src/data.js`: cadastro de projetos e perfil.
- `static/`: favicon e arquivos públicos.

## GitHub Pages

Destino: **https://nicholaspuchaf.github.io/**. O repositório deve se chamar **nicholaspuchaf.github.io**, na conta **nicholaspuchaf**.

1. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
2. Envie o código para `main` ou `master`.
3. Acompanhe a publicação na aba **Actions**.

O workflow `.github/workflows/pages.yml` instala dependências com o lockfile, valida o Svelte, executa os testes, gera o site e publica dist/. Pull requests executam as validações sem publicar. Também é possível acionar o deploy manualmente. O workflow usa o token fornecido pelo GitHub, sem token pessoal.

Para conectar um checkout sem remoto:

```sh
git remote add origin git@github.com:nicholaspuchaf/nicholaspuchaf.github.io.git
```

Se origin já existir, use `git remote set-url origin git@github.com:nicholaspuchaf/nicholaspuchaf.github.io.git`.

O adapter-static do SvelteKit pré-renderiza o início e todas as páginas dos projetos. Os links diretos funcionam no GitHub Pages, inclusive ao atualizar a página. O HTML já contém os projetos antes de carregar JavaScript; o Svelte hidrata a interface para ativar a navegação. O fallback 404.html trata URLs desconhecidas.

O domínio é de usuário, na raiz, sem prefixo de repositório. Não precisa de domínio personalizado ou CNAME.

## Conteúdo

Descrições baseadas nas informações fornecidas por Nicholas e no contexto do currículo. Detalhes ainda desconhecidos estão identificados nas páginas. O resume-maker foi deixado de fora. Os banners usam componentes Svelte, CSS e SVG. As fontes do Google são opcionais, com fontes locais de fallback.
