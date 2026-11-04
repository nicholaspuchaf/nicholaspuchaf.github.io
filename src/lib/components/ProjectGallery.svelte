<script>
  let { screenshots } = $props();
  import { reveal } from '$lib/motion.js';
</script>

<div class="project-gallery">
  {#each screenshots as screenshot}
    <figure use:reveal>
      <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label="Abrir imagem em tamanho original: {screenshot.alt}">
        <img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy" decoding="async" />
        <span class="open-screenshot">Abrir em tamanho original ↗</span>
      </a>
      <figcaption>{screenshot.caption}</figcaption>
    </figure>
  {/each}
</div>

<style>
  .project-gallery { display: grid; gap: 30px; }
  figure { margin: 0; min-width: 0; }
  a { display: block; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #101010; transition: border-color .3s; }
  a:hover { border-color: #666; }
  img { display: block; width: 100%; height: auto; transition: filter .4s; }
  a:hover img { filter: brightness(1.08); }
  .open-screenshot { display: block; padding: 14px 18px; border-top: 1px solid var(--line); color: var(--ink); font-size: .875rem; }
  figcaption { margin-top: 14px; color: var(--muted); font-size: .95rem; line-height: 1.8; }
</style>
