<script>
  let { name = 'arrow' } = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
  {#if name === 'github'}
    <path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.4 6-1.5 6-6a5 5 0 0 0-1-3.5A4.6 4.6 0 0 0 19 2s-1 0-3 1.5a12 12 0 0 0-7 0C7 2 6 2 6 2a4.6 4.6 0 0 0 0 3.5A5 5 0 0 0 5 9c0 4.5 3 5.6 6 6a3.5 3.5 0 0 0-1 3v4" />
  {:else if name === 'search'}
    <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" />
  {:else}
    <path d="M7 17 17 7M7 7h10v10" />
  {/if}
</svg>
