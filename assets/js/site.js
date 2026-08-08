document.addEventListener('DOMContentLoaded', () => {
  const normalizePath = (value) => {
    const withoutHash = (value || '').split('#')[0];
    const trimmed = withoutHash.replace(/^\.\//, '').replace(/^\.\.\//, '');
    const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return path.replace(/\/+$/, '') || '/';
  };

  const currentPath = normalizePath(window.location.pathname);
  const currentHash = window.location.hash;

  document.querySelectorAll('.site-nav a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const [pathPart, hashPart] = href.split('#');
    const linkPath = normalizePath(pathPart);
    const linkHash = hashPart ? `#${hashPart}` : '';
    const isHomePage = currentPath === '/' || currentPath === '/index.html';
    const isAboutPage = currentPath === '/pages/about.html';

    let isActive = false;

    if (linkHash) {
      isActive = isHomePage && currentHash === linkHash;
    } else if (linkPath === '/pages/about.html') {
      isActive = isAboutPage && linkPath === currentPath;
    } else if (linkPath === currentPath || (linkPath === '/index.html' && currentPath === '/')) {
      isActive = !currentHash && (isHomePage || isAboutPage);
    }

    if (link.textContent.trim() === 'About Me' && isAboutPage) {
      isActive = true;
    }

    if (link.textContent.trim() === 'Home' && isHomePage && !currentHash) {
      isActive = true;
    }

    link.classList.toggle('active', isActive);
  });
});
