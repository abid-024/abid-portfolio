/*
      EDIT ONLY THIS PART FOR EACH LOCAL SEO PROJECT.

      Add image path like:
      image: "../assets/images/local_seo_detail_page_images_all_6/01_local_seo_hero_featured_16x9.png"

      Add more sections by copying one object inside sections: []
    */

    const projectData = {
      category: "GMB Optimization Project",

      title: "Local visibility system.",

      headerText: [
        "This project focuses on making a local business easier to find on Google Maps and local search.",
        "The goal is to clean up the business profile, improve trust signals, and make important business information easier to understand.",
        "The page can show Google Business Profile screenshots, map visibility, review setup, service area, or local SEO improvements.",
        "Each section below contains one screenshot and one short explanation so the project stays simple and easy to scan.",
        "To reuse this file for another local SEO project, only change the projectData text, images, titles, and tags."
      ],

      sections: [
        {
          title: "Google Business Profile setup",
          text: "This screen can show the main business profile setup. Use it to explain the business name, category, contact details, website link, photos, and basic profile structure.",
          image: "",
          alt: "Google Business Profile setup screenshot",
          tags: ["GMB Setup", "Business Info", "Profile"]
        },
        {
          title: "Maps visibility preview",
          text: "This section shows how the business appears on Google Maps. You can explain location signals, service area, directions, and how users find the business locally.",
          image: "",
          alt: "Google Maps visibility screenshot",
          tags: ["Google Maps", "Local Search", "Visibility"]
        },
        {
          title: "Review and trust signals",
          text: "This screenshot can show reviews, ratings, photos, posts, or other trust-building parts of the profile that help visitors feel more confident.",
          image: "",
          alt: "Google review and trust signal screenshot",
          tags: ["Reviews", "Trust", "Ratings"]
        },
        {
          title: "Final local SEO result",
          text: "This section can show the finished profile, improved business information, cleaner layout, or final local SEO setup after optimization.",
          image: "",
          alt: "Final local SEO project result screenshot",
          tags: ["Final Result", "Local SEO", "Optimization"]
        }
      ]
    };

    const projectCategory = document.getElementById("projectCategory");
    const projectTitle = document.getElementById("projectTitle");
    const headerText = document.getElementById("headerText");
    const showcaseList = document.getElementById("showcaseList");

    projectCategory.textContent = projectData.category;
    projectTitle.textContent = projectData.title;

    headerText.innerHTML = projectData.headerText
      .map(line => `<p>${line}</p>`)
      .join("");

    showcaseList.innerHTML = projectData.sections
      .map((section, index) => {
        const isReverse = index % 2 === 1 ? "reverse" : "";

        const imageHTML = section.image
          ? `<img src="${section.image}" alt="${section.alt || section.title}">`
          : `
            <div class="empty-image">
              <div>
                Add screenshot here
                <small>${section.title}</small>
              </div>
            </div>
          `;

        const tagsHTML = section.tags && section.tags.length
          ? `<div class="mini-tags">${section.tags.map(tag => `<span>${tag}</span>`).join("")}</div>`
          : "";

        return `
          <article class="showcase-row ${isReverse}">
            <div class="screen-box">
              <div class="screen-frame">
                ${imageHTML}
              </div>
            </div>

            <div class="text-box">
              <h2>${section.title}</h2>
              <p>${section.text}</p>
              ${tagsHTML}
            </div>
          </article>
        `;
      })
      .join("");

    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("local-seo-project-showcase-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("local-seo-project-showcase-theme", isDark ? "dark" : "light");
    });


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


/* FINAL_PROJECT_THEME_SYNC: make project dark/light theme match global nav and toggle icon. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("#themeToggle, [data-theme-toggle]");

  function currentThemeFromBody() {
    if (document.body.classList.contains("light")) return "light";
    if (document.body.classList.contains("dark")) return "dark";
    return root.getAttribute("data-theme") || "light";
  }

  function sync() {
    const theme = currentThemeFromBody();
    root.setAttribute("data-theme", theme);
    root.dataset.theme = theme;
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.setAttribute("title", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  sync();
  toggle?.addEventListener("click", () => setTimeout(sync, 0));

  document.addEventListener("contextmenu", (event) => {
    if (event.target.closest("img, .screen-frame, .empty-image")) event.preventDefault();
  });
  document.addEventListener("dragstart", (event) => {
    if (event.target.closest("img")) event.preventDefault();
  });
  document.querySelectorAll("img").forEach((img) => img.setAttribute("draggable", "false"));
})();
