const projectData = {
      category: "Secret Project",

      headerText: [
        "This page is the secret featured project slot: a place for hidden, playful, or experimental work.",
        "It keeps the mystery style, but the content now reads like a real project page instead of a placeholder template.",
        "Use it for surprise pages, locked concepts, mini interactions, private tools, or anything that should feel discovered.",
        "Each section can show one reveal point, from the entry screen to the final unlocked state."
      ],

      sections: [
        {
          title: "Locked entry screen",
          text: "This is the first moment of the secret project: the screen that makes the user feel like they found something hidden.",
          image: "",
          alt: "Secret project entry screen screenshot",
          tags: ["Locked", "Entry", "Mystery"]
        },
        {
          title: "Secret interaction",
          text: "This section explains the main hidden behavior, choice, animation, unlock action, or playful interaction inside the project.",
          image: "",
          alt: "Secret project interaction screenshot",
          tags: ["Interaction", "Unlock", "Experiment"]
        },
        {
          title: "Mystery atmosphere",
          text: "Use this part to show the mood: dark surface, glow, signals, cards, symbols, or visual details that make the page feel discovered.",
          image: "",
          alt: "Secret project visual atmosphere screenshot",
          tags: ["Mood", "Glow", "Style"]
        },
        {
          title: "Final reveal",
          text: "The final section shows the reward: the revealed screen, hidden result, private tool state, or completed experimental idea.",
          image: "",
          alt: "Secret project final reveal screenshot",
          tags: ["Reveal", "Final", "Unlocked"]
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
    const savedTheme = localStorage.getItem("secret-project-showcase-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("secret-project-showcase-theme", isLight ? "light" : "dark");
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
