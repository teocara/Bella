// Bella Napoli — script principale del sito

document.addEventListener("DOMContentLoaded", () => {
  impostaAnnoFooter();
  gestisciHeaderScorrimento();
  gestisciMenuMobile();
  attivaRivelazioneScroll();
  gestisciFiltriMenu();
  gestisciFaq();
  gestisciFormContatti();
});

function impostaAnnoFooter() {
  document.querySelectorAll("[data-anno-corrente]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function gestisciHeaderScorrimento() {
  const header = document.querySelector(".header");
  if (!header) return;

  const aggiorna = () => {
    header.classList.toggle("scorso", window.scrollY > 40);
  };

  aggiorna();
  window.addEventListener("scroll", aggiorna, { passive: true });
}

function gestisciMenuMobile() {
  const hamburger = document.querySelector(".menu-hamburger");
  const nav = document.querySelector(".nav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    const aperto = nav.classList.toggle("aperto");
    hamburger.classList.toggle("aperto", aperto);
    hamburger.setAttribute("aria-expanded", String(aperto));
    document.body.style.overflow = aperto ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("aperto");
      hamburger.classList.remove("aperto");
      document.body.style.overflow = "";
    });
  });
}

function attivaRivelazioneScroll() {
  const elementi = document.querySelectorAll(".rivela");
  if (!elementi.length) return;

  if (!("IntersectionObserver" in window)) {
    elementi.forEach((el) => el.classList.add("visibile"));
    return;
  }

  const osservatore = new IntersectionObserver(
    (voci) => {
      voci.forEach((voce) => {
        if (voce.isIntersecting) {
          voce.target.classList.add("visibile");
          osservatore.unobserve(voce.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementi.forEach((el) => osservatore.observe(el));
}

function gestisciFiltriMenu() {
  const filtri = document.querySelectorAll(".filtro-btn");
  const gruppi = document.querySelectorAll("[data-categoria-menu]");
  if (!filtri.length || !gruppi.length) return;

  filtri.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      filtri.forEach((f) => f.classList.remove("attivo"));
      filtro.classList.add("attivo");

      const categoria = filtro.dataset.filtro;

      gruppi.forEach((gruppo) => {
        const mostra = categoria === "tutti" || gruppo.dataset.categoriaMenu === categoria;
        gruppo.style.display = mostra ? "" : "none";
      });
    });
  });
}

function gestisciFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const domanda = item.querySelector(".faq-domanda");
    const risposta = item.querySelector(".faq-risposta");
    if (!domanda || !risposta) return;

    domanda.addEventListener("click", () => {
      const eraAperto = item.classList.contains("aperto");

      document.querySelectorAll(".faq-item.aperto").forEach((altro) => {
        if (altro !== item) {
          altro.classList.remove("aperto");
          altro.querySelector(".faq-risposta").style.maxHeight = null;
        }
      });

      item.classList.toggle("aperto", !eraAperto);
      risposta.style.maxHeight = !eraAperto ? risposta.scrollHeight + "px" : null;
    });
  });
}

function gestisciFormContatti() {
  const form = document.querySelector("#form-contatti");
  if (!form) return;

  const NUMERO_WHATSAPP = "393277313774";
  const EMAIL_RISTORANTE = "bellanapolimn@virgilio.it";

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dati = new FormData(form);
    const nome = dati.get("nome") || "";
    const telefono = dati.get("telefono") || "";
    const persone = dati.get("persone") || "";
    const data = dati.get("data") || "";
    const ora = dati.get("ora") || "";
    const messaggio = dati.get("messaggio") || "";

    const metodo = dati.get("metodo-invio") || "email";
    const esito = document.querySelector("#esito-form");

    const corpoMessaggio =
      `Richiesta di prenotazione — Bella Napoli\n\n` +
      `Nome: ${nome}\n` +
      `Telefono: ${telefono}\n` +
      `Persone: ${persone}\n` +
      `Data: ${data}\n` +
      `Ora: ${ora}\n` +
      `Note: ${messaggio}`;

    if (metodo === "whatsapp") {
      const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(corpoMessaggio)}`;
      window.open(url, "_blank", "noopener");
    } else {
      const oggetto = encodeURIComponent("Richiesta di prenotazione dal sito");
      const corpo = encodeURIComponent(corpoMessaggio);
      window.location.href = `mailto:${EMAIL_RISTORANTE}?subject=${oggetto}&body=${corpo}`;
    }

    if (esito) {
      esito.classList.add("mostra", "successo");
      esito.textContent =
        metodo === "whatsapp"
          ? "Ti stiamo per aprire WhatsApp con il messaggio pronto: conferma l'invio da lì."
          : "Si sta aprendo il tuo programma email con il messaggio pronto: conferma l'invio da lì.";
    }
  });

  document.querySelectorAll(".opzione-metodo").forEach((opzione) => {
    opzione.addEventListener("click", () => {
      document.querySelectorAll(".opzione-metodo").forEach((o) => o.classList.remove("selezionato"));
      opzione.classList.add("selezionato");
      opzione.querySelector("input").checked = true;
    });
  });
}
