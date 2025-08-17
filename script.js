// Dark mode, remembers preference
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark" || (storedTheme === null && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.body.classList.add("dark");
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("nav-menu");
navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  if (getComputedStyle(navMenu).display === "none") {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Project data, edit to your projects
const projects = [
  {
    title: "Virtual Fitting Room with Biometrics",
    summary: "Unity VR prototype integrating HP Omnicept and Tobii for eye tracking, heart rate, and cognitive load streams.",
    stack: ["Unity", "C#", "HP Omnicept", "Tobii", "Python", "Pandas"],
    links: {
      github: "https://github.com/matthewcarroll2020/Portfolio", // replace per project
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
    title: "Data Analysis, Life Expectancy",
    summary: "Compared linear models, trees, and ensembles, reported R² with confidence intervals, reproducible notebook.",
    stack: ["Python", "Pandas", "scikit learn", "Jupyter"],
    links: {
      github: "https://github.com/yourrepo",
      demo: "#"
    }
  }
];

// Render projects
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
grid.innerHTML = projects.map(cardHTML).join("");
