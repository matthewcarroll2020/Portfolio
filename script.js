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
