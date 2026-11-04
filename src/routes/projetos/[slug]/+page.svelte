<script>
  import { profile } from '../../../data.js';
  import ProjectArt from '$lib/components/ProjectArt.svelte';
  import Icon from '$lib/components/Icon.svelte';
  let { data } = $props();
  let p = $derived(data.project);
  const sections = [['por-que', '01', 'Por que eu criei'], ['como', '02', 'Como foi feito'], ['decisoes', '03', 'Decisões de projeto'], ['infra', '04', 'Infraestrutura'], ['arquitetura', '05', 'System design']];
</script>

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
    <div class="detail-banner"><ProjectArt kind={p.art} /></div>
  </section>
  <div class="detail-layout">
    <nav class="contents" aria-label="Nesta página"><span class="eyebrow">POR DENTRO DO PROJETO</span>{#each sections as [id, num, title]}<a href="#{id}"><span>{num}</span>{title}</a>{/each}</nav>
    <div class="detail-content">
      <section id="por-que" class="detail-section"><span class="section-number">01 /</span><h2>Por que eu criei</h2><p>{p.motivation}</p></section>
      <section id="como" class="detail-section"><span class="section-number">02 /</span><h2>Como foi feito</h2><p>{p.implementation}</p></section>
      <section id="decisoes" class="detail-section"><span class="section-number">03 /</span><h2>Decisões de projeto</h2><div class="decisions">{#each p.decisions as [title, text]}<article><h3>{title}</h3><p>{text}</p></article>{/each}</div></section>
      <section id="infra" class="detail-section"><span class="section-number">04 /</span><h2>Infraestrutura</h2><p>{p.infrastructure}</p></section>
      <section id="arquitetura" class="detail-section"><span class="section-number">05 /</span><h2>System design</h2>{#if p.architecture.length}<ol class="architecture">{#each p.architecture as item}<li>{item}</li>{/each}</ol>{/if}<p class="architecture-note">{p.architectureNote}</p></section>
    </div>
  </div>
  <a class="next-project" href="/projetos/{data.next.slug}/"><div><span class="eyebrow">CONTINUE EXPLORANDO</span><h2>{data.next.name}</h2></div><span>Próximo projeto <Icon /></span></a>
</main>
