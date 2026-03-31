const krakowCoverage = {
  lead: {
    covered: ["stare_miasto"],
    uncovered: []
  },
  nbot: {
    covered: ["stare_miasto"],
    uncovered: []
  }
};

const krakowDistrictNames = {
  stare_miasto: "Stare Miasto"
};

let krakowCurrentMode = "lead";
let krakowCurrentDistrict = null;

function paintKrakowMap() {
  document.querySelectorAll(".k-district").forEach((district) => {
    district.classList.remove("covered", "uncovered", "selected");

    const shortId = district.id.replace("kd-", "");

    if (krakowCoverage[krakowCurrentMode].covered.includes(shortId)) {
      district.classList.add("covered");
    } else {
      district.classList.add("uncovered");
    }
  });

  if (krakowCurrentDistrict) {
    const selected = document.getElementById("kd-" + krakowCurrentDistrict);
    if (selected) {
      selected.classList.add("selected");
    }
  }
}

function updateKrakowPanel(districtId = null) {
  const nameEl = document.getElementById("k-panel-name");
  const statusEl = document.getElementById("k-panel-status");
  const descEl = document.getElementById("k-panel-desc");
  const modeEl = document.getElementById("k-panel-mode");

  modeEl.textContent = krakowCurrentMode === "lead" ? "Lead" : "nBot";

  if (!districtId) {
    nameEl.textContent = "Kraków";
    statusEl.className = "krakow-status-badge neutral";
    statusEl.textContent = "Wybierz dzielnicę";
    descEl.textContent = "Kliknij dzielnicę, aby zobaczyć jej status.";
    return;
  }

  nameEl.textContent = krakowDistrictNames[districtId];
  statusEl.className = "krakow-status-badge covered";
  statusEl.textContent = "Obsługiwana";
  descEl.textContent = `Stare Miasto jest obsługiwane w trybie ${krakowCurrentMode === "lead" ? "Lead" : "nBot"}.`;
}

function krakowSelectDistrict(districtId) {
  krakowCurrentDistrict = districtId;
  paintKrakowMap();
  updateKrakowPanel(districtId);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".k-district").forEach((district) => {
    district.addEventListener("click", () => {
      const shortId = district.id.replace("kd-", "");
      krakowSelectDistrict(shortId);
    });
  });

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      krakowCurrentMode = btn.dataset.mode;
      paintKrakowMap();
      updateKrakowPanel(krakowCurrentDistrict);
    });
  });

  paintKrakowMap();
  updateKrakowPanel();
});