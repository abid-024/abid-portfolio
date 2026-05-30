/*
      EDIT ONLY THIS PART FOR EACH PROJECT.

      You can:
      - Add more header text lines
      - Remove header text lines
      - Add 1, 2, 3, 6, or more showcase rows
      - Leave image empty to show placeholder
      - Add image path when ready
    */

    const projectData = {
      category: "Automation Project",

      title: "Smart lead automation.",

      headerText: [
        "This project shows a simple automation system for handling repeated client work.",
        "The goal is to collect requests, check useful details, and send the correct next step.",
        "It helps reduce manual replies and makes the service process feel more professional.",
        "Each section below can contain one screenshot and one short explanation.",
        "You can reuse this same file for any project by changing only this projectData area."
      ],

      sections: [
        {
          title: "Main project screen",
          text: "This screenshot shows the main visual direction of the project. Use this area to explain what the visitor is seeing and why this part matters.",
          image: "",
          alt: "Main project screenshot",
          tags: ["Main Screen", "UI", "Overview"]
        },
        {
          title: "Workflow logic",
          text: "This section explains how the automation works behind the design. You can show trigger, condition, action, routing, or any system logic here.",
          image: "",
          alt: "Workflow logic screenshot",
          tags: ["Workflow", "Logic", "Automation"]
        },
        {
          title: "Final result",
          text: "This screenshot can show the final output, dashboard, client response, form result, or completed automation state.",
          image: "",
          alt: "Final result screenshot",
          tags: ["Result", "Output", "Case Study"]
        }

        /*
        Add more like this:

        {
          title: "Another screenshot title",
          text: "Write project details here.",
          image: "../assets/images/automation_detail_page_images_all_6/01_automation_hero_featured_16x9.png",
          alt: "Image description",
          tags: ["Tag 1", "Tag 2"]
        }
        */
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
                Add screenshot here<br>
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
    const savedTheme = localStorage.getItem("simple-project-showcase-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("simple-project-showcase-theme", isDark ? "dark" : "light");
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
