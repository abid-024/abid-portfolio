(() => {
  const root = document.documentElement;
  const toggles = Array.from(
    document.querySelectorAll(
      "[data-theme-toggle], [data-blog-theme-toggle], #themeToggle",
    ),
  );
  const storageKey =
    document.body.classList.contains("blog-page") ||
    document.body.classList.contains("blog-article")
      ? "blogTheme"
      : "site-theme";

  function applyTheme(theme) {
    const cleanTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", cleanTheme);
    root.dataset.theme = cleanTheme;

    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(cleanTheme === "dark"));
      toggle.setAttribute(
        "title",
        cleanTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme",
      );
      const text = toggle.querySelector(".theme-toggle-text");
      if (text) text.textContent = cleanTheme === "dark" ? "Dark" : "Light";
    });

    try {
      localStorage.setItem(storageKey, cleanTheme);
      localStorage.setItem("site-theme", cleanTheme);
      localStorage.setItem("theme", cleanTheme);
      if (storageKey === "blogTheme")
        localStorage.setItem("blogDetailTheme", cleanTheme);
    } catch (error) {}
  }

  let saved = root.getAttribute("data-theme") || "light";
  try {
    saved =
      localStorage.getItem(storageKey) ||
      localStorage.getItem("site-theme") ||
      localStorage.getItem("theme") ||
      saved;
  } catch (error) {}

  applyTheme(saved);

  toggles.forEach((toggle) => {
    if (toggle.dataset.themeReady === "true") return;
    toggle.dataset.themeReady = "true";
    toggle.addEventListener("click", () => {
      const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);

      const logo = document.querySelector(
        ".blog-logo, .blog-logo-link, .site-nav-brand img",
      );
      logo?.classList.remove("is-theme-pulse");
      void logo?.offsetWidth;
      logo?.classList.add("is-theme-pulse");
    });
  });

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

    function sync() {
      button.classList.toggle("is-visible", window.scrollY > 420);
    }

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    sync();
    window.addEventListener("scroll", sync, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupBackTop);
  } else {
    setupBackTop();
  }
})();

/* FINAL_GLOBAL_IMAGE_PROTECTION */
(() => {
  document.addEventListener("contextmenu", (event) => {
    if (
      event.target.closest(
        "img, [data-protected-photo], .hero-photo-card, .post-visual, .project-screen, .vault-screen, .contact-visual",
      )
    ) {
      event.preventDefault();
    }
  });
  document.addEventListener("dragstart", (event) => {
    if (event.target.closest("img, [data-protected-photo]"))
      event.preventDefault();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      document
        .querySelectorAll("img")
        .forEach((img) => img.setAttribute("draggable", "false")),
    );
  } else {
    document
      .querySelectorAll("img")
      .forEach((img) => img.setAttribute("draggable", "false"));
  }
})();



function setupServiceForms() {
  const forms = document.querySelectorAll("[data-service-form], .service-contact-form");

  forms.forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const defaultButtonText = submitButton ? submitButton.textContent : "Send Message";

    const pageUrlInput = form.querySelector('input[name="page_url"]');
    const pageTitleInput = form.querySelector('input[name="page_title"]');

    if (pageUrlInput) pageUrlInput.value = window.location.href;
    if (pageTitleInput) pageTitleInput.value = document.title;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!submitButton) return;

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      const formData = new FormData(form);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (result.success) {
          submitButton.textContent = "Message sent";
          form.reset();

          if (pageUrlInput) pageUrlInput.value = window.location.href;
          if (pageTitleInput) pageTitleInput.value = document.title;

          setTimeout(() => {
            submitButton.textContent = defaultButtonText;
            submitButton.disabled = false;
          }, 2200);
        } else {
          submitButton.textContent = "Try again";
          submitButton.disabled = false;
          console.error("Web3Forms error:", result);
        }
      } catch (error) {
        submitButton.textContent = "Try again";
        submitButton.disabled = false;
        console.error("Form submit failed:", error);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", setupServiceForms);