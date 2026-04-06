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
  { name: "Agata Duszeńko",           city: "Wrocław",                                        initials: "AD" },
  { name: "Agnieszka Lewandowska",    city: "Warszawa",                                       initials: "AL" },
  { name: "Beata Jagieła",            city: "Warszawa",                                       initials: "BJ" },
  { name: "Ewelina Zdunek",           city: "Trójmiasto",                                     initials: "EZ" },
  { name: "Filip Szymaszek",          city: "Łódź",                                           initials: "FS" },
  { name: "Gabriela Kowalska",        city: "Wrocław",                                        initials: "GK" },
  { name: "Justyna Siemiennik",       city: "Szczecin",                                       initials: "JS" },
  { name: "Karol Wieder",             city: "Katowice / Gliwice / Chorzów / Bielsko-Biała",   initials: "KW" },
  { name: "Karolina Grabeus",         city: "Zakopane · Oferta Smart",                        initials: "KG" },
  { name: "Katarzyna Okupniarek",     city: "Katowice / Gliwice / Chorzów / Bielsko-Biała",   initials: "KO" },
  { name: "Katarzyna Puc",            city: "Rzeszów",                                        initials: "KP" },
  { name: "Magdalena Gruchot",        city: "Poznań",                                         initials: "MG" },
  { name: "Magdalena Kanik-Drabicka", city: "Najem długoterminowy",                           initials: "MD" },
  { name: "Małgorzata Królik",        city: "Kraków",                                         initials: "MR" },
  { name: "Monika Księska",           city: "Lublin",                                         initials: "MK" },
  { name: "Łukasz Kurdej",            city: "Warszawa",                                       initials: "ŁK" },
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

  // Używamy history API zamiast location.hash żeby nie triggerować scroll przeglądarki
  history.replaceState(null, null, "#" + pageId);

  // Przewiń na górę layoutu (nie do elementu, bo header by go przykrył)
  window.scrollTo({ top: 0, behavior: "instant" });
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
    article.dataset.search = `${expert.name} ${expert.city}`.toLowerCase();

    article.innerHTML = `
      <div class="avatar">${expert.initials}</div>
      <div class="expert-info">
        <h3>${expert.name}</h3>
        <div class="expert-city">📍 ${expert.city}</div>
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