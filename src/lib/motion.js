// Progressive enhancement: all content stays visible without JavaScript.
export function reveal(node) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  node.dataset.reveal = 'waiting';
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        node.dataset.reveal = 'visible';
        observer.unobserve(node);
      }
    }
  }, { threshold: 0.05, rootMargin: '0px 0px 32px 0px' });
  observer.observe(node);
  const show = () => {
    if (preference.matches) {
      node.dataset.reveal = 'visible';
      observer.disconnect();
    }
  };
  preference.addEventListener('change', show);
  return {
    destroy() {
      observer.disconnect();
      preference.removeEventListener('change', show);
    },
  };
}
