const navToggle = document.getElementById("navToggle");
const navDrawer = document.getElementById("nav-drawer");
const navBackdrop = document.getElementById("navBackdrop");

function openNav() {
  navDrawer.classList.add("open");
  navBackdrop.hidden = false;
  navToggle.classList.add("is-open");
  navToggle.setAttribute("aria-expanded", "true");
  navDrawer.querySelector("a, button")?.focus();
}

function closeNav() {
  navDrawer.classList.remove("open");
  navBackdrop.hidden = true;
  navToggle.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.focus();
}

function toggleNav() {
  if (navDrawer.classList.contains("open")) closeNav();
  else openNav();
}

navToggle?.addEventListener("click", toggleNav);
navBackdrop?.addEventListener("click", closeNav);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navDrawer.classList.contains("open")) closeNav();
});

navDrawer.addEventListener("click", (e) => {
  const t = e.target;
  if (t.matches("a") || t.closest("a")) closeNav();
});


// ====== Footer year ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Projects data and rendering ======
// Update this array with your actual projects
const projects = [
  {
    title: "Virtual Fitting Room with Biometrics",
    summary: "Unity VR prototype integrating HP Omnicept and Tobii for eye tracking, heart rate, and cognitive load streams.",
    stack: ["Unity", "C#", "HP Omnicept", "Tobii", "Python", "Pandas"],
    links: {
      github: "https://github.com/matthewcarroll2020/Portfolio",
      demo: "#"
    }
  },
  {
    title: "QuickWrite App",
    summary: "Full stack social writing app with auth and cloud functions, optimized for low friction posting.",
    stack: ["React", "Node.js", "NoSQL", "Cloud Functions"],
    links: {
      github: "https://github.com/yourrepo",
      demo: "#"
    }
  },
  {
    title: "Life Expectancy Modeling",
    summary: "Compared linear models, trees, and ensembles, reported R^2 with confidence intervals in a reproducible notebook.",
    stack: ["Python", "Pandas", "scikit learn", "Jupyter"],
    links: {
      github: "https://github.com/yourrepo",
      demo: "#"
    }
  }
];

const grid = document.getElementById("projectsGrid");

function cardHTML(p) {
  const stack = p.stack.join(" · ");
  const gh = p.links.github ? `<a class="btn btn--ghost" href="${p.links.github}" target="_blank" rel="noopener">Code</a>` : "";
  const demo = p.links.demo ? `<a class="btn btn--ghost" href="${p.links.demo}" target="_blank" rel="noopener">Demo</a>` : "";
  return `
    <article class="card">
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <p class="meta">${stack}</p>
      <div class="links">${gh}${demo}</div>
    </article>
  `;
}

if (grid) {
  grid.innerHTML = projects.map(cardHTML).join("");
}
