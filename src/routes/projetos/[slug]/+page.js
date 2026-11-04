import { error } from '@sveltejs/kit';
import { projects } from '../../../data.js';

export const entries = () => projects.map(project => ({ slug: project.slug }));
export function load({ params }) {
  const index = projects.findIndex(project => project.slug === params.slug);
  if (index === -1) error(404, 'Projeto não encontrado');
  return { project: projects[index], next: projects[(index + 1) % projects.length] };
}
