/**
 * lokalizacja.js — wspólna logika dla wszystkich stron mapek miast.
 *
 * Każda strona miejska (np. krakow.html) musi przed załadowaniem tego skryptu
 * zdefiniować globalny obiekt `cityData`:
 *
 *   window.cityData = {
 *     coverage: {
 *       lead:  { covered: [...], uncovered: [...] },
 *       nbot:  { covered: [...], uncovered: [...] }
 *     },
 *     districtNames: {
 *       "slug": "Nazwa wyświetlana",
 *       ...
 *     },
 *     // opcjonalnie: lista do panelu bocznego "Nieobsługiwane dzielnice"
 *     uncoveredLabel: ["Nazwa 1", "Nazwa 2"]
 *   };
 */

(function () {
  let currentMode = "lead";
  let currentDistrict = null;

  /* ── helpers ──────────────────────────── */

  function getCoverage() {
    return window.cityData.coverage[currentMode];
  }

  function getDistrictName(id) {
    return (window.cityData.districtNames || {})[id] || id;
  }

  /* ── map paint ────────────────────────── */

  function paintMap() {
    document.querySelectorAll(".w-district").forEach((el) => {
      el.classList.remove("covered", "uncovered", "selected");

      const shortId = el.id.replace(/^wd-/, "");
      const cov = getCoverage();

      if (cov.covered.includes(shortId)) {
        el.classList.add("covered");
      } else if (cov.uncovered.includes(shortId)) {
        el.classList.add("uncovered");
      }
    });

    if (currentDistrict) {
      const sel = document.getElementById("wd-" + currentDistrict);
      if (sel) sel.classList.add("selected");
    }
  }

  /* ── side panel ───────────────────────── */

  function updatePanel(districtId) {
    const nameEl   = document.getElementById("c-panel-name");
    const statusEl = document.getElementById("c-panel-status");
    const descEl   = document.getElementById("c-panel-desc");
    const modeEl   = document.getElementById("c-panel-mode");

    if (!nameEl) return;

    const modeLabel = currentMode === "lead" ? "Lead" : "nBot";
    if (modeEl) modeEl.textContent = modeLabel;

    if (!districtId) {
      nameEl.textContent      = window.cityData.cityName || "Miasto";
      statusEl.className      = "city-status-badge neutral";
      statusEl.textContent    = "Wybierz dzielnicę";
      descEl.textContent      = "Kliknij dowolną dzielnicę, aby zobaczyć jej status obsługi w wybranym trybie.";
      return;
    }

    const name      = getDistrictName(districtId);
    const isCovered = getCoverage().covered.includes(districtId);

    nameEl.textContent = name;

    if (isCovered) {
      statusEl.className   = "city-status-badge covered";
      statusEl.textContent = "Obsługiwana";
      descEl.textContent   = `${name} jest obsługiwana w trybie ${modeLabel}.`;
    } else {
      statusEl.className   = "city-status-badge uncovered";
      statusEl.textContent = "Nieobsługiwana";
      descEl.textContent   = `${name} nie jest obsługiwana w trybie ${modeLabel}.`;
    }
  }

  /* ── district select ──────────────────── */

  function selectDistrict(id) {
    currentDistrict = id;
    paintMap();
    updatePanel(id);
  }

  /* ── init ─────────────────────────────── */

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.cityData) {
      console.error("lokalizacja.js: brak window.cityData na tej stronie!");
      return;
    }

    /* podpinamy klik na każdą dzielnicę */
    document.querySelectorAll(".w-district").forEach((el) => {
      el.addEventListener("click", () => {
        const shortId = el.id.replace(/^wd-/, "");
        selectDistrict(shortId);
      });
    });

    /* przełącznik Lead / nBot */
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.mode;
        paintMap();
        updatePanel(currentDistrict);
      });
    });

    /* wypełnij panel "Nieobsługiwane dzielnice" jeśli jest */
    const uncovList = document.getElementById("c-uncovered-list");
    if (uncovList && window.cityData.uncoveredLabel) {
      uncovList.innerHTML = window.cityData.uncoveredLabel
        .map((n) => `<li>${n}</li>`)
        .join("");
    }

    paintMap();
    updatePanel(null);
  });
})();
