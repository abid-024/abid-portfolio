(() => {
  const body = document.body;
  const toggle = document.querySelector("#themeToggle, [data-theme-toggle]");
  const root = document.documentElement;
  function isSecretLightMode() { return body.classList.contains("project-secret"); }
  function setTheme(isDark) {
    if (isSecretLightMode()) {
      body.classList.toggle("light", !isDark);
    } else {
      body.classList.toggle("dark", isDark);
    }
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    toggle?.setAttribute("aria-pressed", String(isDark));
    try { localStorage.setItem("site-theme", isDark ? "dark" : "light"); } catch (error) {}
  }
  let saved = "light";
  try { saved = localStorage.getItem("site-theme") || "light"; } catch (error) {}
  setTheme(saved === "dark");
  toggle?.addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") !== "dark");
  });
})();


(() => {
  function setupBackTop() {
    let button = document.querySelector("[data-back-top]");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "back-top";
      button.dataset.backTop = "";
      button.setAttribute("aria-label", "Back to top");
      button.textContent = "Top";
      document.body.appendChild(button);
    }
    function sync() { button.classList.toggle("is-visible", window.scrollY > 420); }
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    sync();
    window.addEventListener("scroll", sync, { passive: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupBackTop);
  else setupBackTop();
})();


/* FINAL_GLOBAL_IMAGE_PROTECTION */
(() => {
  document.addEventListener("contextmenu", (event) => {
    if (event.target.closest("img, [data-protected-photo], .hero-photo-card, .post-visual, .project-screen, .vault-screen, .contact-visual")) {
      event.preventDefault();
    }
  });
  document.addEventListener("dragstart", (event) => {
    if (event.target.closest("img, [data-protected-photo]")) event.preventDefault();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => document.querySelectorAll("img").forEach((img) => img.setAttribute("draggable", "false")));
  } else {
    document.querySelectorAll("img").forEach((img) => img.setAttribute("draggable", "false"));
  }
})();
