// THEME TOGGLE (dark mode default)
const toggleBtn = document.getElementById("toggleTheme");
const root = document.documentElement;

function updateThemeButton() {
  const theme = root.getAttribute("data-theme");
  toggleBtn.textContent = theme === "dark" ? "🌞" : "🌙";
  toggleBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

// Initial setup (dark by default, as in HTML)
updateThemeButton();

toggleBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  updateThemeButton();
});

// BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// SCROLL ANIMATION OBSERVER (trigger once)
const saElements = document.querySelectorAll(".sa-up, .sa-fade");

saElements.forEach((el) => {
  el.classList.add("sa-init");
});

const saObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("sa-show");
        entry.target.classList.remove("sa-init");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

saElements.forEach((el) => saObserver.observe(el));
