<script>
  import Icon from './Icon.svelte';
  import ProjectArt from './ProjectArt.svelte';
  let { project: p } = $props();
</script>

<article class="project-card theme-{p.theme}">
  <a href="/projetos/{p.slug}/" class="banner" aria-label="Saiba mais sobre {p.name}">
    {#if p.screenshots?.length}
      <img class="banner-screenshot" src={p.screenshots[0].src} alt="" width={p.screenshots[0].width} height={p.screenshots[0].height} loading="lazy" decoding="async" />
    {:else}
      <div class="banner-art"><ProjectArt kind={p.art} /></div>
    {/if}
  </a>
  <div class="card-body">
    <div class="card-heading">
      <h3><a href="/projetos/{p.slug}/">{p.name}</a></h3>
      <span class:live={!!p.url} class="status" title={p.status}><i></i>{p.url ? 'No ar' : p.status === 'Em desenvolvimento' ? 'Em construção' : 'Projeto'}</span>
    </div>
    <p>{p.description}</p>
    <div class="card-actions">
      <div class="secondary-actions">
        <a class="learn-more" href="/projetos/{p.slug}/">Saiba mais <span>→</span></a>
        {#if p.github}<a class="icon-link" href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub de {p.name}"><Icon name="github" /><span>GitHub</span></a>{/if}
      </div>
      {#if p.url}<a class="visit-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-label="Visitar projeto {p.name}">Visitar projeto <Icon /></a>{/if}
    </div>
  </div>
</article>
