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
  .architecture-flow { margin: 0 0 26px; }
  figcaption { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
  .architecture-flow > p { font-size: 12px; }
</style>
