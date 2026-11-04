<script>
  let { kind } = $props();
</script>

<div class="art art-{kind}" aria-hidden="true">
  {#if kind === 'cards'}
    <div class="flashcard back"></div><div class="flashcard front"><span>folha<span class="tiny-leaf">✳</span></span><small>O que você vai aprender hoje?</small><i></i><i></i><b>Um pouco, todos os dias.</b></div>
  {:else if kind === 'document'}
    <div class="exam"><span>RESULTADOS DO EXAME</span><i></i><i></i><i></i><div><b>✓</b> Tudo no seu lugar.</div></div><div class="spark">✦</div>
  {:else if kind === 'reader'}
    <div class="reader-text"><small>UM LIVRO. UM NOVO MUNDO.</small><span>desc<span>o</span>brir</span><i></i><small>palavra por palavra</small></div>
  {:else if kind === 'finance'}
    <div class="finance-panel"><small>UM OLHAR SOBRE SEUS GASTOS</small><div class="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>finance bro <b>↗</b></span></div>
  {:else if kind === 'orbit'}
    <div class="orbital o1"></div><div class="orbital o2"></div><div class="orbital o3"></div><div class="planet"></div><div class="moon"></div><span class="space-caption">EXPLORE O EXTRAORDINÁRIO</span>
  {:else if kind === 'link'}
    <div class="link-art"><span>https://uma.ideia/longa</span><b>↓</b><strong>cur.to/ideia ↗</strong></div>
  {:else if kind === 'chart'}
    <div class="chart-art"><span>ENCONTRE NOVAS PERSPECTIVAS</span><svg viewBox="0 0 260 85"><path d="M0 75 35 58 65 67 100 35 135 45 172 20 200 30 260 5" fill="none" stroke="currentColor" stroke-width="3" /></svg><b>market hunter ↗</b></div>
  {:else if kind === 'music'}
    <div class="music-art"><div class="record"><span>♪</span></div><div class="music-label"><strong>rigbify</strong><small>SUA MÚSICA. SEU RITMO.</small></div></div>
  {:else}
    <div class="blog-art"><span>entre ideias<br />e <em>linhas.</em></span><small>NOTAS DE QUEM ESTÁ CONSTRUINDO.</small></div>
  {/if}
</div>
