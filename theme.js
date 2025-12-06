// Theme toggle, scroll animations, and back-to-top logic
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("toggleTheme");
  const backToTopBtn = document.getElementById("backToTop");

  // -------- THEME TOGGLE --------
  const storedTheme = localStorage.getItem("theme");
  let currentTheme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : (root.getAttribute("data-theme") || "dark");

  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
    });
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "🌞" : "🌙";
    }
  }

  // -------- SCROLL ANIMATIONS (fade-only) --------
  const animatedEls = document.querySelectorAll(".sa-up, .sa-fade");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sa-show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    animatedEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show all
    animatedEls.forEach((el) => el.classList.add("sa-show"));
  }

  // -------- BACK TO TOP BUTTON --------
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
