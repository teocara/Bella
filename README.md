# Ing. Demurtas — Sito web

Sito statico (HTML/CSS/JS, nessuna build) per lo studio di ingegneria Ing. Demurtas.

- `index.html` — pagina unica: Servizi, Metodo, Progetti, Chi sono, Contatti
- `css/style.css`, `js/main.js`
- `.github/workflows/deploy-pages.yml` — pubblicazione su GitHub Pages

## Da personalizzare
Contenuti segnaposto da sostituire con i dati reali: email, telefono, indirizzo, P.IVA (`index.html`, costante `EMAIL` in `js/main.js`), statistiche, testi "Chi sono", foto dei progetti.

Il form apre un'email precompilata (`mailto:`), non c'è backend.

Anteprima locale: `python3 -m http.server 8000`
