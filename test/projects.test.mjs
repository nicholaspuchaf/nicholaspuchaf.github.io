import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data.js';
import { home, detail, escape } from '../src/render.js';

test('cadastros possuem slugs únicos, conteúdo e links seguros', () => {
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const key of ['name','category','description','motivation','implementation','infrastructure']) assert.ok(p[key], `${p.slug}: ${key}`);
    for (const key of ['url','github']) if (p[key]) assert.equal(new URL(p[key]).protocol, 'https:');
    assert.ok(p.tags.length);
  }
});
test('todos os projetos possuem card e página com seções navegáveis', () => {
  const html = home();
  assert.equal((html.match(/class="project-card /g) || []).length, projects.length);
  for (const p of projects) {
    assert.ok(html.includes(`href="./projetos/${p.slug}/"`));
    const page = detail(p);
    assert.ok(page.includes(`<h1>${escape(p.name)}</h1>`));
    for (const section of ['por-que','como','decisoes','infra','arquitetura']) assert.ok(page.includes(`id="${section}"`));
    assert.ok(!page.includes('href="null"'));
    assert.ok(!page.includes('undefined'));
    if (!p.url) assert.ok(!page.includes('Visitar projeto'));
    if (!p.github) assert.ok(!page.includes('Ver no GitHub'));
  }
});
test('texto dos cadastros é escapado antes de entrar no HTML', () => {
  assert.equal(escape('<script>"&\'</script>'), '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;');
  const html = detail({...projects[0], name:'<img src=x onerror=alert(1)>', decisions:[['<script>', '<iframe>']]});
  assert.ok(!html.includes('<img src=x'));
  assert.ok(!html.includes('<iframe>'));
});
