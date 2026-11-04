<script>
  import { profile } from '../../../data.js';
  import ProjectArt from '$lib/components/ProjectArt.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ArchitectureFlow from '$lib/components/ArchitectureFlow.svelte';
  import ProjectGallery from '$lib/components/ProjectGallery.svelte';
  let { data } = $props();
  let p = $derived(data.project);
  let sections = $derived([
    ['por-que', 'Por que eu criei'],
    ...(p.screenshots?.length ? [['telas', 'O projeto em telas']] : []),
    ['como', 'Como foi feito'],
    ['decisoes', 'Decisões de projeto'],
    ...(p.designPatterns?.length ? [['padroes', 'Padrões de projeto']] : []),
    ['infra', 'Infraestrutura'],
    ['arquitetura', 'System design'],
    ...(p.continuousIntegration ? [['ci', 'CI e segurança']] : []),
    ...(p.quality ? [['qualidade', 'Qualidade e evolução']] : []),
  ].map(([id, title], index) => [id, String(index + 1).padStart(2, '0'), title]));
</script>

{#snippet sectionHeading(id, title)}
  <span class="section-number">{sections.find(([key]) => key === id)?.[1]} /</span><h2>{title}</h2>
{/snippet}

<svelte:head>
  <title>{p.name} — {profile.name}</title>
  <meta name="description" content={p.description} />
  <meta property="og:title" content="{p.name} — {profile.name}" />
  <meta property="og:description" content={p.description} />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://nicholaspuchaf.github.io/projetos/{p.slug}/" />
</svelte:head>

<main id="conteudo" class="detail theme-{p.theme}">
  <a class="back-link" href="/#projetos">← Todos os projetos</a>
  <section class="detail-hero">
    <div>
      <span class="eyebrow">{p.category} <span class="detail-dot">·</span> {p.status}</span>
      <h1>{p.name}</h1><h2>{p.tagline}</h2><p>{p.description}</p>
      <ul class="tags">{#each p.tags as tag}<li>{tag}</li>{/each}</ul>
      <div class="detail-links">
        {#if p.url}<a class="primary-button" href={p.url} target="_blank" rel="noopener noreferrer">Visitar projeto <Icon /></a>{/if}
        {#if p.github}<a class="secondary-button" href={p.github} target="_blank" rel="noopener noreferrer"><Icon name="github" /> Ver no GitHub</a>{/if}
        {#if !p.url && !p.github}<span class="pending-link">Links públicos em breve.</span>{/if}
      </div>
    </div>
    <div class="detail-banner" class:has-screenshot={!!p.screenshots?.length}>
      {#if p.screenshots?.length}
        <a class="detail-cover" href="#telas" aria-label="Ver capturas de tela de {p.name}">
          <img src={p.screenshots[0].src} alt={p.screenshots[0].alt} width={p.screenshots[0].width} height={p.screenshots[0].height} decoding="async" />
          <span>Conheça a interface ↓</span>
        </a>
      {:else}
        <ProjectArt kind={p.art} />
      {/if}
    </div>
  </section>
  <div class="detail-layout">
    <nav class="contents" aria-label="Nesta página"><span class="eyebrow">POR DENTRO DO PROJETO</span>{#each sections as [id, num, title]}<a href="#{id}"><span>{num}</span>{title}</a>{/each}</nav>
    <div class="detail-content">
      <section id="por-que" class="detail-section">{@render sectionHeading('por-que', 'Por que eu criei')}<p>{p.motivation}</p></section>
      {#if p.screenshots?.length}
        <section id="telas" class="detail-section">
          {@render sectionHeading('telas', 'O projeto em telas')}
          <ProjectGallery screenshots={p.screenshots} />
        </section>
      {/if}
      <section id="como" class="detail-section">
        {@render sectionHeading('como', 'Como foi feito')}
        <p>{p.implementation}</p>
        {#if p.capabilities?.length}
          <h3 class="detail-subheading">O que dá para fazer</h3>
          <div class="capabilities">
            {#each p.capabilities as [title, text]}<article><h4>{title}</h4><p>{text}</p></article>{/each}
          </div>
        {/if}
        {#if p.workflow?.length}
          <h3 class="detail-subheading">Na prática</h3>
          <ol class="workflow">{#each p.workflow as step}<li>{step}</li>{/each}</ol>
        {/if}
      </section>
      <section id="decisoes" class="detail-section">{@render sectionHeading('decisoes', 'Decisões de projeto')}<div class="decisions">{#each p.decisions as [title, text]}<article><h3>{title}</h3><p>{text}</p></article>{/each}</div></section>
      {#if p.designPatterns?.length}
        <section id="padroes" class="detail-section">
          {@render sectionHeading('padroes', 'Padrões de projeto')}
          <div class="decisions">
            {#each p.designPatterns as [title, text, example]}
              <article><h3>{title}</h3><p>{text}</p>{#if example}<p class="code-reference"><span>No código</span><code>{example}</code></p>{/if}</article>
            {/each}
          </div>
        </section>
      {/if}
      <section id="infra" class="detail-section">
        {@render sectionHeading('infra', 'Infraestrutura')}<p>{p.infrastructure}</p>
        {#if p.infrastructureComponents?.length}
          <div class="infrastructure-table">
            <table>
              <caption class="sr-only">Componentes da infraestrutura de {p.name}</caption>
              <thead><tr><th scope="col">Componente</th><th scope="col">Responsabilidade</th></tr></thead>
              <tbody>{#each p.infrastructureComponents as [component, role]}<tr><th scope="row">{component}</th><td>{role}</td></tr>{/each}</tbody>
            </table>
          </div>
        {/if}
      </section>
      <section id="arquitetura" class="detail-section">
        {@render sectionHeading('arquitetura', 'System design')}
        {#if p.architectureFlows?.length}
          {#each p.architectureFlows as flow}<ArchitectureFlow {flow} />{/each}
        {:else if p.architecture.length}
          <ol class="architecture">{#each p.architecture as item}<li>{item}</li>{/each}</ol>
        {/if}
        <p class="architecture-note">{p.architectureNote}</p>
      </section>
      {#if p.continuousIntegration}
        {@const ci = p.continuousIntegration}
        <section id="ci" class="detail-section">
          {@render sectionHeading('ci', 'CI e segurança')}
          <p>{ci.overview}</p>
          <div class="ci-flow"><ArchitectureFlow flow={ci.flow} /></div>
          <h3 class="detail-subheading">O que o pipeline verifica</h3>
          <div class="infrastructure-table ci-checks">
            <table>
              <caption class="sr-only">Verificações do CI de {p.name}</caption>
              <thead><tr><th scope="col">Etapa</th><th scope="col">Comando e objetivo</th></tr></thead>
              <tbody>{#each ci.checks as [name, command, description]}<tr><th scope="row">{name}</th><td><code>{command}</code><p>{description}</p></td></tr>{/each}</tbody>
            </table>
          </div>
          <h3 class="detail-subheading">Como o pipeline é protegido</h3>
          <div class="decisions">{#each ci.safeguards as [title, text]}<article><h3>{title}</h3><p>{text}</p></article>{/each}</div>
          <h3 class="detail-subheading">Antes do push: Lefthook</h3><p>{ci.localGate}</p>
          <h3 class="detail-subheading">Preparação do ambiente</h3><p>{ci.setup}</p>
          <h3 class="detail-subheading">Relação com o deploy</h3><p>{ci.deployment}</p>
          <h3 class="detail-subheading">Limites do gate</h3><ul class="project-limitations">{#each ci.limits as limit}<li>{limit}</li>{/each}</ul>
        </section>
      {/if}
      {#if p.quality}
        <section id="qualidade" class="detail-section">
          {@render sectionHeading('qualidade', 'Qualidade e evolução')}<p>{p.quality}</p>
          {#if p.limitations?.length}
            <h3 class="detail-subheading">Limites atuais e próximos passos</h3>
            <ul class="project-limitations">{#each p.limitations as limitation}<li>{limitation}</li>{/each}</ul>
          {/if}
        </section>
      {/if}
    </div>
  </div>
  <a class="next-project" href="/projetos/{data.next.slug}/"><div><span class="eyebrow">CONTINUE EXPLORANDO</span><h2>{data.next.name}</h2></div><span>Próximo projeto <Icon /></span></a>
</main>
