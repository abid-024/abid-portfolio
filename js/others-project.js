/*
      EDIT ONLY THIS PART FOR EACH GENERAL PROJECT.

      Add image path like:
      image: "../assets/images/code_feeling_detail_page_images_all_6/01_code_feeling_hero_featured_16x9.png"

      Add more sections by copying one object inside sections: []
    */

    const projectData = {
      category: "Other Project",

      headerText: [
        "This page is for the extra featured work that does not fit one single service category.",
        "It can hold small tools, creative experiments, mixed design ideas, quick builds, and unusual portfolio concepts.",
        "The style stays close to the main project vault: calm cream surface, bold type, clean screenshots, and useful detail blocks.",
        "Use these sections to show what the project does, why it exists, and what made it different from the regular service pages."
      ],

      sections: [
        {
          title: "Mixed project preview",
          text: "The main preview shows the strongest part of the project, whether it is a mini site, a content idea, a tool screen, or a visual concept.",
          image: "",
          alt: "Main project preview screenshot",
          tags: ["Other", "Preview", "Creative"]
        },
        {
          title: "Creative direction",
          text: "This section explains the layout, color, content structure, or interaction idea that gives the project its own personality.",
          image: "",
          alt: "Project design details screenshot",
          tags: ["Direction", "Design", "Details"]
        },
        {
          title: "How it works",
          text: "Show the project flow here: how someone moves through it, what action happens, or what small system sits behind the screen.",
          image: "",
          alt: "Project system or flow screenshot",
          tags: ["Flow", "Structure", "Idea"]
        },
        {
          title: "Final polish",
          text: "The final section can show the finished state, a polished screen, the last interaction, or the clearest proof of the project.",
          image: "",
          alt: "Final project result screenshot",
          tags: ["Final", "Polish", "Portfolio"]
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
    const savedTheme = localStorage.getItem("general-project-showcase-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("general-project-showcase-theme", isDark ? "dark" : "light");
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
