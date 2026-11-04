<script>
  let { flow } = $props();
</script>

<figure class="architecture-flow">
  <figcaption>{flow.title}</figcaption>
  <ol class="architecture" aria-label={flow.title}>
    {#each flow.steps as step}<li>{step}</li>{/each}
  </ol>
  <p>{flow.description}</p>
</figure>

<style>
  .architecture-flow { margin: 0 0 32px; }
  figcaption { font-size: 1.05rem; font-weight: 600; margin-bottom: 16px; }
  .architecture-flow > p { font-size: .95rem; }
</style>
