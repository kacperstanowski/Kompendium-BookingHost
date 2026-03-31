const recordings = [
  {
    title: "Pozyskanie nowego właściciela",
    tag: "Sprzedaż",
    duration: "7:34",
    desc: "Pierwsza rozmowa cold – prezentacja oferty i umówienie spotkania.",
    audio: "audio/rozmowa-01.mp3"
  },
  {
    title: "Obsługa skargi gościa",
    tag: "Obsługa klienta",
    duration: "4:12",
    desc: "Gość zgłasza problem z klimatyzacją. Deeskalacja i rozwiązanie.",
    audio: "audio/rozmowa-02.mp3"
  },
  {
    title: "Rozmowa retencyjna – właściciel",
    tag: "Retencja",
    duration: "9:05",
    desc: "Właściciel rozważa rezygnację. Techniki retencji i argumenty.",
    audio: "audio/rozmowa-03.mp3"
  },
  {
    title: "Prezentacja oferty Premium",
    tag: "Sprzedaż",
    duration: "12:20",
    desc: "Rozmowa z właścicielem 3 mieszkań – upgrade z Standard do Premium.",
    audio: "audio/rozmowa-04.mp3"
  },
  {
    title: "Check-in telefoniczny",
    tag: "Operacje",
    duration: "3:45",
    desc: "Wsparcie gościa przy samodzielnym zameldowaniu smart lock.",
    audio: "audio/rozmowa-05.mp3"
  },
  {
    title: "Negocjacje prowizji",
    tag: "Sprzedaż",
    duration: "8:55",
    desc: "Właściciel negocjuje stawkę. Argumentacja wartości usługi.",
    audio: "audio/rozmowa-06.mp3"
  },
  {
    title: "Zgłoszenie awarii – eskalacja",
    tag: "Operacje",
    duration: "5:18",
    desc: "Awaria ogrzewania. Procedura eskalacji do technika.",
    audio: "audio/rozmowa-07.mp3"
  },
  {
    title: "Onboarding telefoniczny",
    tag: "Onboarding",
    duration: "11:00",
    desc: "Witamy nowego właściciela i omawiamy kolejne kroki.",
    audio: "audio/rozmowa-08.mp3"
  },
  {
    title: "Pytania o rozliczenie miesięczne",
    tag: "Finanse",
    duration: "6:30",
    desc: "Właściciel pyta o szczegóły raportu. Wyjaśnienie pozycji.",
    audio: "audio/rozmowa-09.mp3"
  },
  {
    title: "Up-sell usług dodatkowych",
    tag: "Sprzedaż",
    duration: "7:50",
    desc: "Propozycja pakietu zdjęć profesjonalnych i homestaging.",
    audio: "audio/rozmowa-10.mp3"
  }
];

const experts = [
  { name: "Anna Kowalska", city: "Warszawa", phone: "+48 600 100 200", initials: "AK" },
  { name: "Marta Wiśniewska", city: "Kraków", phone: "+48 601 200 300", initials: "MW" },
  { name: "Karolina Nowak", city: "Wrocław", phone: "+48 602 300 400", initials: "KN" },
  { name: "Joanna Lewandowska", city: "Gdańsk", phone: "+48 603 400 500", initials: "JL" },
  { name: "Agnieszka Zielińska", city: "Poznań", phone: "+48 604 500 600", initials: "AZ" },
  { name: "Monika Szymańska", city: "Łódź", phone: "+48 605 600 700", initials: "MS" },
  { name: "Patrycja Woźniak", city: "Zakopane", phone: "+48 606 700 800", initials: "PW" },
  { name: "Natalia Dąbrowska", city: "Katowice", phone: "+48 607 800 900", initials: "ND" }
];

const tagColors = {
  "Sprzedaż": "#00C2B3",
  "Obsługa klienta": "#6c63ff",
  "Retencja": "#e08c00",
  "Operacje": "#1a2535",
  "Onboarding": "#00b87a",
  "Finanse": "#c0392b"
};

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  const tabs = document.querySelectorAll(".tab");

  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === pageId);
  });

  window.location.hash = pageId;
}

function setupTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      showPage(tab.dataset.tab);
    });
  });

  document.querySelectorAll(".quick-link").forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  const hash = window.location.hash.replace("#", "");
  const validPages = [...document.querySelectorAll(".page")].map((page) => page.id);

  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage("start");
  }
}

function setupFAQ() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach((other) => other.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

function renderRecordings() {
  const grid = document.getElementById("recordings-grid");
  if (!grid) return;

  grid.innerHTML = "";

  recordings.forEach((recording, index) => {
    const color = tagColors[recording.tag] || "#00C2B3";

    const article = document.createElement("article");
    article.className = "recording-card";

    article.innerHTML = `
      <div class="rec-header">
        <div class="rec-num">${index + 1}</div>
        <div>
          <div class="rec-title">${recording.title}</div>
          <div class="rec-meta">⏱ ${recording.duration} · ${recording.desc}</div>
        </div>
      </div>
      <span class="rec-tag" style="background:${color}22; color:${color};">${recording.tag}</span>
      <audio controls preload="none">
        <source src="${recording.audio}" type="audio/mpeg" />
        Twoja przeglądarka nie obsługuje odtwarzacza audio.
      </audio>
    `;

    grid.appendChild(article);
  });
}

function renderExperts() {
  const list = document.getElementById("expert-list");
  if (!list) return;

  list.innerHTML = "";

  experts.forEach((expert) => {
    const article = document.createElement("article");
    article.className = "expert-card";
    article.dataset.search = `${expert.name} ${expert.city} ${expert.phone}`.toLowerCase();

    article.innerHTML = `
      <div class="avatar">${expert.initials}</div>
      <div class="expert-info">
        <h3>${expert.name}</h3>
        <div class="expert-city">📍 ${expert.city}</div>
        <div class="phone-badge">📞 ${expert.phone}</div>
      </div>
    `;

    list.appendChild(article);
  });
}

function setupSearch() {
  const citySearch = document.getElementById("city-search");
  const faqSearch = document.getElementById("faq-search");
  const expertSearch = document.getElementById("expert-search");

  if (citySearch) {
    citySearch.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      document.querySelectorAll("#city-grid .city-card").forEach((card) => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  if (faqSearch) {
    faqSearch.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      document.querySelectorAll("#faq-list .faq-item").forEach((item) => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  if (expertSearch) {
    expertSearch.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      document.querySelectorAll("#expert-list .expert-card").forEach((card) => {
        const text = card.dataset.search || "";
        card.style.display = text.includes(query) ? "" : "none";
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecordings();
  renderExperts();
  setupTabs();
  setupFAQ();
  setupSearch();
});