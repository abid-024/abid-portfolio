/*
      EDIT ONLY THIS PART FOR EACH UI/UX PROJECT.

      Add image path like:
      image: "../assets/images/ui1.png"

      Add more sections by copying one object inside sections: []
    */

    const projectData = {
      category: "UI/UX Design Project",

      headerText: [
        "This project focuses on creating clean interfaces with stronger structure, better spacing, and clearer user flow.",
        "The design direction uses cards, soft gradients, reusable components, and visual hierarchy to make the screen easier to understand.",
        "Each section below can show one important screen from the project with a short explanation beside it.",
        "You can use this page for landing page UI, dashboard UI, app screens, design systems, or product flow concepts.",
        "To reuse this file for another UI/UX project, only change the projectData section, images, titles, and text."
      ],

      sections: [
        {
          title: "Landing page direction",
          text: "This screen shows the main visual direction of the interface. Use this section to explain the hero layout, headline style, CTA placement, spacing, and first impression.",
          image: "",
          alt: "UI UX landing page screenshot",
          tags: ["Landing UI", "Hero", "Visual Flow"]
        },
        {
          title: "Mobile first layout",
          text: "This section shows how the design adapts for smaller screens. You can explain the mobile card layout, clean spacing, readable content, and simple user movement.",
          image: "",
          alt: "Mobile UI UX screen screenshot",
          tags: ["Mobile UI", "Responsive", "App Screen"]
        },
        {
          title: "Design system pieces",
          text: "This screen can show reusable UI pieces like buttons, cards, colors, spacing rules, input fields, navigation, and content blocks that keep the interface consistent.",
          image: "",
          alt: "UI UX design system screenshot",
          tags: ["Design System", "Components", "Consistency"]
        },
        {
          title: "Final user flow",
          text: "This screenshot can show the final flow, dashboard, product screen, or completed interface state after the UI structure is ready.",
          image: "",
          alt: "Final UI UX user flow screenshot",
          tags: ["User Flow", "Final Screen", "UX"]
        }
      ]
    };

    const projectCategory = document.getElementById("projectCategory");
    const headerText = document.getElementById("headerText");
    const showcaseList = document.getElementById("showcaseList");

    projectCategory.textContent = projectData.category;

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
    const savedTheme = localStorage.getItem("uiux-project-showcase-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("uiux-project-showcase-theme", isDark ? "dark" : "light");
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
