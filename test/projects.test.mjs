import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data.js';
import { filterProjects } from '../src/lib/projects.js';
import { entries, load } from '../src/routes/projetos/[slug]/+page.js';

test('projetos têm slugs únicos, conteúdo e links HTTPS', () => {
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const key of ['name','category','description','motivation','implementation','infrastructure']) assert.ok(p[key], `${p.slug}: ${key}`);
    for (const key of ['url','github']) if (p[key]) assert.equal(new URL(p[key]).protocol, 'https:');
    assert.ok(p.tags.length);
  }
});
test('busca ignora acentos, caixa e espaços e encontra tecnologias', () => {
  assert.ok(filterProjects('Todos', '  ACOES  ').some(p => p.slug === 'comparador-de-acoes'));
  assert.ok(filterProjects('Todos', 'lambda').some(p => p.slug === 'folha'));
  assert.equal(filterProjects('Todos', 'projeto inexistente').length, 0);
  assert.equal(filterProjects().length, projects.length);
});
test('categoria e busca funcionam em conjunto', () => {
  assert.deepEqual(filterProjects('Mobile', 'android').map(p => p.slug), ['rigbify']);
  assert.equal(filterProjects('Mobile', 'folha').length, 0);
  assert.ok(filterProjects('IA aplicada').every(p => p.category === 'IA aplicada'));
});
test('todas as rotas são pré-renderizadas e carregam o projeto correto', () => {
  assert.deepEqual(entries(), projects.map(p => ({ slug: p.slug })));
  for (let index = 0; index < projects.length; index++) {
    const data = load({ params: { slug: projects[index].slug } });
    assert.equal(data.project.slug, projects[index].slug);
    assert.equal(data.next.slug, projects[(index + 1) % projects.length].slug);
  }
  assert.throws(() => load({ params: { slug: 'nao-existe' } }), error => error.status === 404);
});
