const getTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return storedTheme || (systemDark ? "dark" : "light");
};

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  document
    .querySelector(".theme-toggle")
    ?.setAttribute("aria-pressed", String(theme === "dark"));
};

const syncThemeToggle = () => {
  const button = document.querySelector(".theme-toggle");
  button?.setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
};

document.documentElement.dataset.theme = getTheme();

document.addEventListener("astro:before-swap", (event) => {
  event.newDocument.documentElement.dataset.theme = getTheme();
});

if (!window.__themeToggleBound) {
  window.__themeToggleBound = true;
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.(".theme-toggle");
    if (!button) return;
    event.preventDefault();
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

document.addEventListener("astro:page-load", syncThemeToggle);
syncThemeToggle();
