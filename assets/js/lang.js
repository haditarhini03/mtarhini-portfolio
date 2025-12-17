let currentLang = localStorage.getItem("lang") || "en";

async function loadLang(lang) {
  const res = await fetch(`assets/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (data[key]) {
      el.textContent = data[key];
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

function setLang(lang) {
  currentLang = lang;
  loadLang(lang);
}

loadLang(currentLang);
