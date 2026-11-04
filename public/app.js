const buttons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const search = document.querySelector('#project-search');
let selected = 'Todos';
function filterProjects() {
  const term = search.value.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let count = 0;
  for (const card of cards) {
    const text = card.dataset.search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const matches = (selected === 'Todos' || card.dataset.category === selected) && text.includes(term);
    card.hidden = !matches;
    if (matches) count++;
  }
  document.querySelector('.empty-state').hidden = count !== 0;
  document.querySelector('#filter-result').textContent = `${count} ${count === 1 ? 'projeto encontrado' : 'projetos encontrados'}.`;
}
buttons.forEach(button => button.addEventListener('click', () => {
  selected = button.dataset.filter;
  buttons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  filterProjects();
}));
search?.addEventListener('input', filterProjects);
document.querySelector('#clear-filters')?.addEventListener('click', () => {
  search.value = '';
  buttons[0].click();
  search.focus();
});
