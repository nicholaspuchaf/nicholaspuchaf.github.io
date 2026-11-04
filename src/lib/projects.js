import { projects } from '../data.js';

const normalize = value => value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export function filterProjects(category = 'Todos', query = '') {
  const term = normalize(query.trim());
  return projects.filter(p => (category === 'Todos' || p.category === category) && normalize([p.name, p.description, ...p.tags].join(' ')).includes(term));
}
