async function loadProjects() {
    const res = await fetch('projects.json');
    const data = await res.json();
    return data;
  }
  
  function projectCard(p) {
    const stack = p.stack?.join(' · ') || '';
    const detailUrl = `project.html?p=${encodeURIComponent(p.slug)}`;
    const bg = p.heroImage ? `style="background-image:url('${p.heroImage}');"` : '';
  
    return `
      <article class="card card--bg">
        <a class="card__link" href="${detailUrl}" aria-label="Open ${p.title}" ${bg}>
          <div class="card__overlay card__top">
            <h3>${p.title}</h3>
          </div>
          <div class="card__overlay card__bottom">
            <p class="meta">${stack}</p>
          </div>
        </a>
      </article>
    `;  
  }    
  
  (async () => {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    const projects = await loadProjects();
    grid.innerHTML = projects.map(projectCard).join('');
  })();

  function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('p');
  }
  
  async function loadProjects() {
    const res = await fetch('projects.json');
    return res.json();
  }
  
  function linkBtn(label, url) {
    return `<a class="btn btn--ghost" href="${url}" target="_blank" rel="noopener">${label}</a>`;
  }
  
  (async () => {
    const slug = getSlug();
    const projects = await loadProjects();
    const p = projects.find(x => x.slug === slug);
  
    const titleEl = document.getElementById('projTitle');
    const tagEl = document.getElementById('projTagline');
    const sumEl = document.getElementById('projSummary');
    const detailsEl = document.getElementById('projDetails');
    const stackEl = document.getElementById('projStack');
    const linksEl = document.getElementById('projLinks');
    const galleryEl = document.getElementById('projGallery');
  
    if (!p) {
      titleEl.textContent = 'Project not found';
      tagEl.textContent = 'Check the link or go back to Projects';
      return;
    }
  
    document.title = `${p.title} Matthew Carroll`;
    titleEl.textContent = p.title;
    tagEl.textContent = p.tagline || '';
    sumEl.textContent = p.summary || '';
    detailsEl.innerHTML = (p.responsibilities || [])
      .map(item => `<li><p>${item}</p></li>`)
      .join('');
    stackEl.textContent = (p.stack || []).join(' · ');
    galleryEl.innerHTML = (p.gallery || []).map(src => `
        <article class="card">
          <img src="${src}" alt="${p.title} screenshot" style="width:100%;border-radius:.6rem;"/>
        </article>
      `).join('');
  
    // Links row
    const links = [];
    if (p.links?.live) links.push(linkBtn('Live', p.links.live));
    if (p.links?.site) links.push(linkBtn('Website', p.links.site));
    if (p.links?.page) links.push(linkBtn('Page', p.links.page));
    if (p.links?.repo) links.push(linkBtn('Code', p.links.repo));
    if (p.links?.wiki) links.push(linkBtn('Wiki', p.links.wiki));
    if (p.links?.board) links.push(linkBtn('Project Board', p.links.board));
    linksEl.innerHTML = links.join('');
  
    // Hero image
    heroImgEl.innerHTML = p.heroImage
      ? `<img src="${p.heroImage}" alt="${p.title} hero" style="width:100%;border-radius:.9rem;border:1px solid var(--border);"/>`
      : '';
  
    // Details bullets
    detailsEl.innerHTML = (p.details || [])
      .map(item => `<li><p>${item}</p></li>`)
      .join('');
  
    // Gallery grid
    galleryEl.innerHTML = (p.gallery || []).map(src => `
      <article class="card">
        <img src="${src}" alt="${p.title} screenshot" style="width:100%;border-radius:.6rem;"/>
      </article>
    `).join('');
  })();
  