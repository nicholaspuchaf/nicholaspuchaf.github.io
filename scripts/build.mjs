import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { home, detail, notFound } from '../src/render.js';
import { projects } from '../src/data.js';

export const output = fileURLToPath(new URL('../dist/', import.meta.url));
export async function build() {
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(new URL('../public/', import.meta.url), output, { recursive: true });
  await writeFile(`${output}/index.html`, home());
  await writeFile(`${output}/404.html`, notFound());
  for (const project of projects) {
    const path = `${output}/projetos/${project.slug}`;
    await mkdir(path, { recursive: true });
    await writeFile(`${path}/index.html`, detail(project));
  }
  console.log(`Build concluído: início + ${projects.length} projetos em dist/`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
