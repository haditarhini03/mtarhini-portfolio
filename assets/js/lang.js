// Get saved language or default to English
let currentLang = localStorage.getItem("lang") || "en";

// Apply direction and html attributes
function applyDirection(lang) {
  if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.remove("rtl");
  }

  document.documentElement.lang = lang;
}

// Load language file and apply translations
async function loadLang(lang) {
  try {
    const res = await fetch(`assets/lang/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (data[key]) {
        el.textContent = data[key];
      }
    });

    localStorage.setItem("lang", lang);
    applyDirection(lang);

  } catch (err) {
    console.error("Error loading language file:", err);
  }
}

// Change language manually
function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  loadLang(lang);
}

// Initial load
loadLang(currentLang);
window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (!target) return;

    // wait one frame to ensure layout is final
    requestAnimationFrame(() => {
      target.scrollIntoView({
        block: "start"
      });
    });
  }
});
