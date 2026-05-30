/* ==================================================
   CONTACT PAGE JS
   Fixes clock + theme toggle + basic copy behavior
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setupContactTheme();
  setupContactClock();
  setupContactCopy();
});

function setupContactTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const key = "siteTheme";

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem(key) || "light";
  } catch (error) {
    savedTheme = "light";
  }

  if (savedTheme !== "light" && savedTheme !== "dark") {
    savedTheme = "light";
  }

  root.setAttribute("data-theme", savedTheme);
  syncToggle(savedTheme);

  toggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    syncToggle(next);

    try {
      localStorage.setItem(key, next);
    } catch (error) {
      // keep visible theme even if storage is blocked
    }
  });

  function syncToggle(theme) {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

function setupContactClock() {
  const timeCard = document.querySelector("[data-contact-time-card]");
  const ampmTime = document.querySelector("[data-contact-ampm-time]");
  const time24 = document.querySelector("[data-contact-time-24]");

  if (!timeCard || !ampmTime || !time24) return;

  const modes = ["ampm", "24"];

  try {
    const savedMode = localStorage.getItem("contactClockMode");
    if (modes.includes(savedMode)) {
      timeCard.dataset.contactClockMode = savedMode;
    }
  } catch (error) {
    // clock still works without storage
  }

  function updateLocalTime() {
    const now = new Date();

    ampmTime.textContent = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now);

    time24.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  timeCard.addEventListener("click", () => {
    const current = timeCard.dataset.contactClockMode || "ampm";
    const next = current === "ampm" ? "24" : "ampm";

    timeCard.dataset.contactClockMode = next;

    try {
      localStorage.setItem("contactClockMode", next);
    } catch (error) {
      // ignore storage error
    }
  });
}

function setupContactCopy() {
  document.querySelectorAll("[data-contact-copy]").forEach((item) => {
    item.addEventListener("click", async (event) => {
      event.preventDefault();

      const value = item.dataset.contactCopy || "";
      const small = item.querySelector("small");
      const oldText = small ? small.textContent : "";

      try {
        await navigator.clipboard.writeText(value);
        if (small) small.textContent = "Copied";
      } catch (error) {
        if (small) small.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        if (small) small.textContent = oldText;
      }, 1200);
    });
  });
}