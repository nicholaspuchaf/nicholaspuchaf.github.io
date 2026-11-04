<script>
  let { screenshots } = $props();
</script>

<div class="project-gallery">
  {#each screenshots as screenshot}
    <figure>
      <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label="Abrir imagem em tamanho original: {screenshot.alt}">
        <img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy" decoding="async" />
        <span class="open-screenshot">Abrir em tamanho original ↗</span>
      </a>
      <figcaption>{screenshot.caption}</figcaption>
    </figure>
  {/each}
</div>

<style>
  .project-gallery { display: grid; gap: 24px; }
  figure { margin: 0; min-width: 0; }
  a { display: block; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #111413; }
  a:hover { border-color: #879c71; }
  img { display: block; width: 100%; height: auto; }
  .open-screenshot { display: block; padding: 10px 13px; border-top: 1px solid var(--line); color: var(--green); font-size: 10px; }
  figcaption { margin-top: 10px; color: var(--muted); font-size: 12px; line-height: 1.8; }
</style>
