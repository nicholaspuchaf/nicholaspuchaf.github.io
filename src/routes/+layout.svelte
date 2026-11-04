<script>
  import '../app.css';
  import { profile } from '../data.js';
  import Icon from '$lib/components/Icon.svelte';
  let { children } = $props();
</script>

<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header" id="topo">
  <a class="wordmark" href="/" aria-label="Nicholas — início">nf<span>.</span></a>
  <nav aria-label="Navegação principal">
    <a href="/#projetos">Projetos</a>
    <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Icon /></a>
    <a class="contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Vamos conversar <Icon /></a>
  </nav>
</header>
{@render children()}
<footer>
  <a class="footer-brand" href="/">nicholas<span>.</span></a>
  <p>Feito com curiosidade. Sempre em construção.</p>
  <a href="#topo">De volta ao topo ↑</a>
</footer>
