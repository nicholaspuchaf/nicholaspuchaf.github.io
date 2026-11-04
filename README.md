# nicholaspuchaf.github.io

Vitrine pessoal com banners, busca por nome ou tecnologia, filtros por categoria e uma página técnica para cada projeto. HTML gerado estaticamente: o conteúdo e os links funcionam mesmo sem JavaScript. JavaScript é usado apenas na busca e nos filtros.

## Rodar

Requer Node.js 22 ou superior. Não há dependências para instalar.

```sh
npm run dev
```

Abra http://localhost:3000. O comando gera o site e o serve localmente. Depois de editar os arquivos, reinicie o comando para gerar novamente.

```sh
npm test
npm run build
```

## Adicionar ou editar projetos

Edite **src/data.js**. O objeto `profile` contém o nome, a apresentação e os links pessoais. Cada objeto de `projects` gera automaticamente um card e a página `projetos/<slug>/index.html`.

```js
{
  slug: 'meu-projeto', // único, minúsculo, sem espaços ou acentos
  name: 'Meu projeto',
  category: 'Ferramentas', // novas categorias viram filtros automaticamente
  theme: 'leaf',
  art: 'cards',
  tagline: 'Uma frase sobre a ideia.',
  description: 'Descrição curta para o card.',
  tags: ['React', 'AWS'],
  url: null, // ou https://... quando estiver publicado
  github: null, // ou https://github.com/...
  status: 'Em desenvolvimento',
  motivation: 'Por que o projeto existe.',
  implementation: 'Como foi feito.',
  decisions: [['Uma decisão', 'Motivo e consequências dessa escolha.']],
  infrastructure: 'Onde roda e como é publicado.',
  architecture: ['Interface', 'Backend', 'Persistência'],
  architectureNote: 'Contexto do diagrama simplificado.',
}
```

`architecture` é uma visão simplificada em sequência; use uma lista vazia quando a arquitetura ainda não estiver documentada. `url: null` e `github: null` ocultam os respectivos botões sem remover o projeto. A ordem da lista define a ordem dos cards e do próximo projeto.

Temas: `leaf`, `blue`, `peach`, `lime`, `space`, `lavender`, `sand`, `rose`, `mint`.

Ilustrações: `cards`, `document`, `reader`, `finance`, `orbit`, `link`, `chart`, `resume`, `blog`, `music`. Para criar outro banner, adicione uma ilustração em `src/render.js` e o estilo em `public/styles.css`.

## Deploy no GitHub Pages

Este projeto está preparado para **https://nicholaspuchaf.github.io/**. O repositório no GitHub precisa se chamar exatamente **nicholaspuchaf.github.io**, na conta **nicholaspuchaf**.

1. Crie o repositório `nicholaspuchaf.github.io` no GitHub (ou renomeie o repositório existente em Settings → General → Repository name).
2. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
3. Envie este código para a branch **main**. O workflow `.github/workflows/pages.yml` executa os testes, gera `dist/` e publica o artefato automaticamente.

Para conectar este checkout, caso ainda não exista um remoto:

```sh
git branch -M main
git remote add origin git@github.com:nicholaspuchaf/nicholaspuchaf.github.io.git
git add .
git commit -m "Cria portfólio com deploy no GitHub Pages"
git push -u origin main
```

Se já houver `origin`, atualize com `git remote set-url origin git@github.com:nicholaspuchaf/nicholaspuchaf.github.io.git`. Os comandos acima pressupõem que o repositório já existe e que sua chave SSH está configurada no GitHub.

Cada push em `main` publica o site. Pull requests executam testes e build, sem publicar. Você também pode acionar o workflow manualmente na aba Actions. O workflow usa o `GITHUB_TOKEN` fornecido pelo GitHub; não é necessário cadastrar um token pessoal. A pasta `dist/` é gerada no CI e não precisa ser commitada.

Cada projeto tem seu próprio HTML em `/projetos/<slug>/`, permitindo acesso direto e atualização da página sem regras de SPA. Uma página `404.html` personalizada é incluída. Para gerar os arquivos localmente, execute `npm run build`.

## Conteúdo

Descrições baseadas nas informações fornecidas por Nicholas e em `/home/nicholas/Documents/resume/contexto`. Detalhes técnicos ainda desconhecidos estão identificados nas páginas. A presença de um endereço não significa monitoramento da disponibilidade do serviço. Fontes do Google são opcionais: o layout usa fontes locais de fallback quando estiver offline. Os banners são feitos em HTML/CSS/SVG, sem imagens externas.
