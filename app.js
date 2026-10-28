(function () {
  'use strict';

  const data = window.PORTFOLIO;
  const app = document.getElementById('app');
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));

  if (!data || !app) {
    console.error('Missing portfolio data. Check content.js.');
    return;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function safeHref(value) {
    const href = String(value ?? '').trim();
    if (/^(https?:\/\/|mailto:)/i.test(href)) return escapeHTML(href);
    if (/^(assets\/|\.\/assets\/)[a-z0-9_./ -]+$/i.test(href) && !href.includes('..')) {
      return escapeHTML(href);
    }
    return '#';
  }

  function externalAttrs(url) {
    return /^https?:\/\//i.test(String(url)) ? ' target="_blank" rel="noopener noreferrer"' : '';
  }

  function personalLinks(extraClass = '') {
    return (data.links || []).map(({ label, url }) => `
      <a class="text-link ${extraClass}" href="${safeHref(url)}"${externalAttrs(url)}>${escapeHTML(label)}<span class="link-arrow" aria-hidden="true">↗</span></a>
    `).join('');
  }

  function section(label, body, options = '') {
    return `<section class="editorial-section ${options}">
      <h2 class="section-heading">${escapeHTML(label)}</h2>
      <div class="section-content">${body}</div>
    </section>`;
  }

  function profilePhoto() {
    if (data.photo) {
      return `<img class="avatar" src="${safeHref(data.photo)}" alt="Portrait of ${escapeHTML(data.name)}" />`;
    }
    return `<div class="avatar avatar-fallback" role="img" aria-label="Profile placeholder">${escapeHTML(data.initials || 'YN')}</div>`;
  }

  function projectPreview(project) {
    return `<li class="preview-item">
      <a class="project-preview-link" href="#projects/${encodeURIComponent(project.slug)}">
        <span class="preview-name">${escapeHTML(project.title)}</span>
        <span class="preview-summary">${escapeHTML(project.summary)}</span>
        <span class="preview-arrow" aria-hidden="true">↗</span>
      </a>
    </li>`;
  }

  function homePage() {
    const featured = (data.projects || []).slice(0, 4).map(projectPreview).join('');
    return `<div class="page home-page">
      <div class="intro">
        ${profilePhoto()}
        <div class="intro-copy">
          <h1>${escapeHTML(data.name)} </h1>
          <p class="role">${escapeHTML(data.role)}</p>
          <p class="tagline">${escapeHTML(data.tagline)}</p>
        </div>
      </div>
      ${section('Now', `<p>${escapeHTML(data.now)}</p>`)}
      ${section('Projects', `<ul class="preview-list">${featured}</ul><a class="more-link" href="#projects">All projects <span aria-hidden="true">→</span></a>`)}
      ${section('Elsewhere', `<div class="link-group">${personalLinks()}</div>`)}
    </div>`;
  }

  // Image filenames are set per project in content.js; no markup edits required.
  function projectGallery(project) {
    const images = (project.images || []).filter(Boolean);
    if (!images.length) return '';
    const gallery = images.map((image, index) => {
      const path = typeof image === 'string' ? image : image.src;
      const alt = typeof image === 'string'
        ? `${project.title} — image ${index + 1}`
        : (image.alt || `${project.title} — image ${index + 1}`);
      const caption = typeof image === 'string' ? '' : image.caption;
      const original = typeof image === 'string' ? path : (image.original || path);
      return `<figure class="project-image${image.fullWidth ? ' full-width' : ''}">
        <a href="${safeHref(original)}" target="_blank" rel="noopener noreferrer" aria-label="Open original image ${index + 1} from ${escapeHTML(project.title)} in a new tab">
          <img src="${safeHref(path)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async" />
        </a>
        ${caption ? `<figcaption>${escapeHTML(caption)}</figcaption>` : ''}
      </figure>`;
    }).join('');
    return `<div class="project-gallery${images.length === 1 ? ' single' : ''}">${gallery}</div>`;
  }

  function projectItem(project) {
    const tags = (project.tags || []).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('');
    return `<article class="project-item${project.thumbnail ? ' has-thumbnail' : ''}" id="${escapeHTML(project.slug)}">
      <div class="project-meta">
        <span class="project-date">${escapeHTML(project.year)}</span>
      </div>
      <div class="project-main">
        <h2><a class="project-title-link" href="#projects/${encodeURIComponent(project.slug)}">${escapeHTML(project.title)} <span aria-hidden="true">→</span></a></h2>
        ${project.summary ? `<p class="project-summary">${escapeHTML(project.summary)}</p>` : ''}
        ${tags ? `<div class="tags">${tags}</div>` : ''}
      </div>
      ${project.thumbnail ? `<a class="project-thumbnail" href="#projects/${encodeURIComponent(project.slug)}" aria-label="View ${escapeHTML(project.title)}"><img src="${safeHref(project.thumbnail)}" alt="" loading="lazy" decoding="async" /></a>` : ''}
    </article>`;
  }

  function projectsPage() {
    return `<div class="page inner-page" aria-label="Projects">
      <div class="project-list">${(data.projects || []).map(projectItem).join('')}</div>
    </div>`;
  }

  function projectPage(project) {
    const links = (project.links || []).filter(item => item.url).map(({ label, url }) => `
      <a class="text-link" href="${safeHref(url)}"${externalAttrs(url)}>${escapeHTML(label)} <span aria-hidden="true">↗</span></a>
    `).join('');
    const tags = (project.tags || []).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('');
    const paragraphs = (project.details || '').split(/\n\s*\n/).filter(text => text.trim());
    return `<article class="page inner-page project-page">
      <a class="back-link text-link" href="#projects">← All projects</a>
      <header class="page-intro">
        <p class="eyebrow">Project${project.year ? ` · ${escapeHTML(project.year)}` : ''}</p>
        <h1>${escapeHTML(project.title)}</h1>
        ${project.summary ? `<p class="page-description">${escapeHTML(project.summary)}</p>` : ''}
        ${tags ? `<div class="tags">${tags}</div>` : ''}
      </header>
      ${paragraphs.length ? `<section class="project-overview" aria-label="Project overview">${paragraphs.map(text => `<p>${escapeHTML(text)}</p>`).join('')}</section>` : ''}
      ${projectGallery(project)}
      ${links ? `<div class="project-links">${links}</div>` : ''}
    </article>`;
  }

  function missingProjectPage() {
    return `<div class="page inner-page">
      <a class="back-link text-link" href="#projects">← All projects</a>
      <div class="page-intro"><h1>Project not found<span class="period">.</span></h1>
        <p class="page-description">This project link is unavailable. Browse all projects to find what you're looking for.</p></div>
    </div>`;
  }

  function currentRoute() {
    let path;
    try {
      path = decodeURIComponent(location.hash.replace(/^#/, '')) || 'home';
    } catch {
      return { page: 'projects', slug: '\uFFFD' };
    }
    if (path === 'projects' || path.startsWith('projects/')) {
      return { page: 'projects', slug: path.startsWith('projects/') ? path.slice(9) : undefined };
    }
    return { page: 'home' };
  }

  function render() {
    const { page, slug } = currentRoute();
    const project = slug !== undefined ? (data.projects || []).find(item => item.slug === slug) : undefined;
    app.innerHTML = slug !== undefined
      ? (project ? projectPage(project) : missingProjectPage())
      : (page === 'projects' ? projectsPage() : homePage());
    navLinks.forEach(link => {
      const active = link.dataset.nav === page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = project ? `${project.title} — ${data.name}`
      : slug !== undefined ? `Project not found — ${data.name}`
      : page === 'home' ? `${data.name} — Portfolio` : `Projects — ${data.name}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    app.focus({ preventScroll: true });
  }

  document.getElementById('footer-name').textContent = data.name;
  document.getElementById('footer-year').textContent = String(new Date().getFullYear());
  window.addEventListener('hashchange', render);
  render();
})();
