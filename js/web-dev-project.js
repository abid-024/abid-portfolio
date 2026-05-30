const projectData = {
      category: "Web Development Project",

      title: "Responsive website build.",

      headerText: [
        "This project shows a clean website build made for strong layout, clear sections, and smooth user experience.",
        "The focus is on creating a responsive page that works properly on desktop, tablet, and mobile screens.",
        "Each part of the design is structured so visitors can understand the service, action, and next step quickly.",
        "The project keeps the code easy to edit, so sections, images, and text can be changed without confusion.",
        "Use this details page to show the main design, responsive version, final page result, or any important website section."
      ],

      sections: [
        {
          title: "Main landing page",
          text: "This screenshot shows the main website landing page. Use this section to explain the hero area, headline, button placement, visual style, and first impression.",
          image: "",
          alt: "Main web development landing page screenshot",
          tags: ["Landing Page", "Hero", "Website UI"]
        },
        {
          title: "Responsive layout",
          text: "This section shows how the website adapts for smaller screens. You can use it to present mobile layout, spacing fixes, navbar behavior, and section stacking.",
          image: "",
          alt: "Responsive website layout screenshot",
          tags: ["Responsive", "Mobile", "Layout"]
        },
        {
          title: "Final website result",
          text: "This screenshot can show the finished website section, service page, dashboard, or final live result after the web development work is complete.",
          image: "",
          alt: "Final web development project result screenshot",
          tags: ["Final Result", "Live Page", "Clean Build"]
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
    const savedTheme = localStorage.getItem("web-dev-project-showcase-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("web-dev-project-showcase-theme", isDark ? "dark" : "light");
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
