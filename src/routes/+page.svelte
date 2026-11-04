<script>
  import { projects, profile } from '../data.js';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
  <title>{profile.name} — Projetos & ideias</title>
  <meta name="description" content={profile.description} />
  <meta property="og:title" content="{profile.name} — Projetos & ideias" />
  <meta property="og:description" content={profile.description} />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://nicholaspuchaf.github.io/" />
</svelte:head>

<main id="conteudo" class="linktree">
  <section class="projects-section" id="projetos">
    <div class="section-heading"><h2>Meus projetos <span class="project-count">{projects.length}</span></h2><span>Feitos com curiosidade ↗</span></div>
    <div class="project-list">{#each projects as project (project.slug)}<ProjectCard {project} />{/each}</div>
  </section>
  <section class="profile" aria-label="Sobre Nicholas">
    <span class="avatar" aria-hidden="true">nf<span>✳</span></span>
    <h1>{profile.name}</h1>
    <span class="profile-handle">@nicholaspuchaf</span>
    <p>{profile.description}</p>
    <div class="profile-links">
      <a href={profile.github} target="_blank" rel="noopener noreferrer"><Icon name="github" /> GitHub</a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Icon /></a>
    </div>
  </section>
  <p class="closing-note">Mais ideias chegando. Um projeto de cada vez. <span aria-hidden="true">✳</span></p>
</main>
