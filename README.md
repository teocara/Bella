# Bella Napoli — Sito Web

Sito statico (HTML/CSS/JS puro, nessuna build necessaria) per la pizzeria ristorante **Bella Napoli** di Mantova, Piazza Felice Cavallotti 14.

## Struttura del progetto

```
index.html        Home
menu.html          Menu completo con filtri per categoria
chi-siamo.html     Storia, filosofia e team
contatti.html      Contatti, mappa e form di prenotazione
css/style.css      Tutti gli stili del sito
js/main.js         Menu mobile, animazioni, filtri menu, FAQ, form
.github/workflows/deploy-pages.yml   Pubblicazione automatica su GitHub Pages
```

## Dati usati nel sito

Indirizzo, telefono ed email sono stati recuperati da fonti pubbliche (Google, PagineGialle, PagineBianche) perché il sito precedente non era raggiungibile per l'estrazione automatica:

- **Indirizzo:** Piazza Felice Cavallotti, 14 — 46100 Mantova (MN)
- **Telefono:** 0376 222675 · Cellulare/WhatsApp: 327 731 3774
- **Email:** bellanapolimn@virgilio.it
- **Orari:** Lun 12:00–14:30/19:00–23:00, Mar chiuso, Mer–Dom 12:00–14:30/19:00–23:00

**Verifica questi dati prima della pubblicazione ufficiale.** Alcuni contenuti sono indicativi e vanno controllati/aggiornati dal titolare:

- Prezzi del menu (`menu.html`) — indicativi, basati su fonti parziali e prezzi tipici di zona
- P.IVA nel footer di ogni pagina (attualmente segnaposto `00000000000`)
- Link social Facebook/Instagram nel footer (attualmente `#`, da sostituire con i profili reali)
- Nomi del team in `chi-siamo.html` (Roberto, Antonella, Salvatore) — illustrativi
- Numero WhatsApp per prenotazioni (`js/main.js`, costante `NUMERO_WHATSAPP`) — verificare che sia quello corretto

## Come funziona il form di prenotazione

Non essendoci un backend, il form in `contatti.html` genera un'email precompilata (`mailto:`) oppure un messaggio WhatsApp precompilato (`wa.me`), a seconda dell'opzione scelta dall'utente. Nessun dato viene inviato automaticamente: l'utente conferma l'invio dal proprio client email o da WhatsApp.

## Pubblicazione su GitHub Pages

È incluso il workflow `.github/workflows/deploy-pages.yml` che pubblica automaticamente il sito su GitHub Pages ad ogni push.

Per attivarlo (operazione manuale una tantum, necessaria la prima volta):

1. Vai su **Settings → Pages** nel repository GitHub.
2. In **Build and deployment → Source**, seleziona **GitHub Actions**.
3. Al primo push su `main` (o eseguendo manualmente il workflow da **Actions**), il sito sarà pubblicato all'indirizzo `https://<utente>.github.io/<repo>/`.

Se il repository non ha ancora un branch `main`, valuta di impostare questo branch come branch predefinito oppure di eseguire il workflow manualmente (`workflow_dispatch`) dalla tab **Actions**.

## Sviluppo locale

Nessuna build richiesta: apri `index.html` in un browser, oppure avvia un server locale, ad esempio:

```
python3 -m http.server 8000
```

e visita `http://localhost:8000`.
