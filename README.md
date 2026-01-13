# Netfilm - Piattaforma di Streaming

Netfilm è un'applicazione web React moderna che simula una piattaforma di streaming per film. L'applicazione offre un'interfaccia utente elegante e funzionalità complete per la gestione di film, preferiti, recensioni e profilo utente.

## 🚀 Tecnologie Utilizzate

- **React 19.1.1** - Libreria JavaScript per la costruzione di interfacce utente
- **React Router DOM 7.9.5** - Routing e navigazione
- **Vite 7.1.7** - Build tool e dev server veloce
- **Anime.js 4.2.2** - Libreria per animazioni
- **Flubber 0.4.2** - Interpolazione di path SVG per animazioni fluide
- **JSONPlaceholder API** - API REST fittizia per i dati dei film (todos)

## 📋 Funzionalità Principali

### 1. Splash Screen
- **Schermata iniziale animata** con il logo Netfilm
- Animazione del logo che si trasforma da stato "Pause" a "Play" utilizzando morphing SVG
- Transizione automatica alla home page dopo l'animazione
- Dissolvenza elegante prima della navigazione

### 2. Home Page
- **Layout split-screen** con due colonne di poster cinematografici
- **Scroll infinito bidirezionale**: le due colonne scrollano in direzioni opposte
- **Loop infinito** delle immagini per un'esperienza continua
- **Hover interattivo**: al passaggio del mouse sui poster, appare il titolo del film
- **Navigazione diretta**: click su un poster per visualizzare i dettagli del film
- **Protezione accesso**: se non autenticati, viene aperto il modal di login prima di accedere ai dettagli

### 3. Sistema di Autenticazione

#### Login
- **Modal di login** elegante e responsive
- **Login automatico**: se l'email non esiste, viene creato automaticamente un nuovo utente
- **Validazione** dei campi email e password
- **Gestione stato**: il sistema traccia l'autenticazione dell'utente
- **Redirect intelligente**: dopo il login, l'utente viene reindirizzato alla pagina che stava cercando di visitare

#### Gestione Utente
- **Registrazione automatica** al primo login
- **Storage locale**: i dati utente sono salvati nel localStorage
- **Sessione persistente**: l'utente rimane autenticato anche dopo il refresh della pagina

### 4. Lista Film (Lista Todos)

#### Visualizzazione
- **Griglia di card** con poster cinematografici
- **Informazioni film**: titolo, stato (completato/in corso), ID
- **Poster dinamici**: ogni film ha un poster assegnato automaticamente

#### Filtri e Ricerca
- **Barra di ricerca** per cercare film per titolo
- **Filtri per stato**: 
  - Tutti i film
  - Solo completati
  - Solo in corso

#### Gestione Film (CRUD Completo)

##### Creazione (POST)
- **Form di creazione** per aggiungere nuovi film
- Campi: titolo (obbligatorio), stato completato (checkbox)
- Integrazione con JSONPlaceholder API
- Feedback visivo durante la creazione

##### Lettura (GET)
- **Caricamento automatico** di 10 film all'avvio
- Visualizzazione in card responsive
- Gestione stati di loading ed errore

##### Aggiornamento (PATCH)
- **Modifica inline** dei film direttamente dalla lista
- Possibilità di modificare titolo e stato
- Salvataggio automatico tramite API
- Conferma visiva delle modifiche

##### Eliminazione (DELETE)
- **Eliminazione film** con conferma
- Rimozione automatica dai preferiti se presente
- Aggiornamento immediato della lista

#### Preferiti
- **Aggiunta/rimozione** film dai preferiti con icona cuore
- Stato visivo: cuore pieno (preferito) o vuoto (non preferito)
- Sincronizzazione con la pagina Preferiti

### 5. Dettaglio Film

#### Informazioni Film
- **Background dinamico** con poster del film come sfondo
- **Overlay scuro** per migliorare la leggibilità
- **Titolo e metadati**: ID, stato (completato/in corso)
- **Descrizione** personalizzabile
- **Pulsante indietro** per tornare alla home

#### Sistema di Valutazione
- **Valutazione a stelle** (1-5 stelle)
- **Salvataggio persistente** nel localStorage
- **Visualizzazione** della valutazione corrente
- **Interfaccia accessibile** con supporto ARIA

#### Sistema di Recensioni
- **Aggiunta recensioni**: form per scrivere commenti sui film
- **Lista recensioni**: visualizzazione di tutte le recensioni salvate
- **Modifica recensioni**: possibilità di modificare le proprie recensioni
- **Eliminazione recensioni**: rimozione con conferma
- **Storage persistente**: tutte le recensioni sono salvate nel localStorage
- **Gestione multipla**: supporto per più recensioni per film
- **Validazione**: prevenzione di recensioni vuote

### 6. Pagina Preferiti
- **Visualizzazione** di tutti i film aggiunti ai preferiti
- **Card film** con poster, titolo e stato
- **Navigazione diretta** al dettaglio film cliccando sul poster
- **Rimozione preferiti** con pulsante dedicato
- **Stato vuoto**: messaggio informativo quando non ci sono preferiti
- **Sincronizzazione** in tempo reale con le altre pagine

### 7. Profilo Utente

#### Informazioni Personali
- **Visualizzazione dati utente**: nome, email, password (nascosta)
- **Modifica inline** dei campi:
  - Nome
  - Email
  - Password
- **Salvataggio modifiche** con feedback visivo
- **Avatar** con icona SVG personalizzata

#### Preferiti nel Profilo
- **Sezione dedicata** ai preferiti nel profilo
- **Contatore** del numero di preferiti
- **Griglia di card** con poster dei film preferiti
- **Navigazione** al dettaglio film
- **Rimozione** preferiti direttamente dal profilo

#### Logout
- **Pulsante logout** nella sidebar e nel profilo
- **Pulizia sessione**: rimozione dati utente dal localStorage
- **Redirect** alla home dopo il logout

### 8. Navigazione e Layout

#### Navbar
- **Logo Netfilm** centrato e ruotato di 180 gradi
- **Menu hamburger** per utenti autenticati (in alto a sinistra)
- **Pulsante login** per utenti non autenticati (in basso)
- **Tooltip informativo** sul pulsante login

#### Sidebar
- **Menu laterale** scorrevole con animazione
- **Voci di menu**:
  - Home
  - Lista film
  - Preferiti
  - Profilo
- **Indicatore pagina attiva**: evidenziazione della pagina corrente
- **Overlay scuro** quando la sidebar è aperta
- **Pulsante logout** nel footer della sidebar
- **Chiusura automatica** dopo la navigazione

#### Layout Responsive
- **Design adattivo** per diverse dimensioni schermo
- **Layout strutturato** con navbar fissa e contenuto scrollabile

### 9. Route Protette
- **Protezione accesso** alle pagine riservate:
  - Dettaglio film
  - Lista film
  - Preferiti
  - Profilo
- **Redirect automatico** al login se non autenticati
- **Preservazione URL**: dopo il login, redirect alla pagina richiesta
- **Messaggio informativo** quando si tenta di accedere senza autenticazione

### 10. Gestione Dati

#### LocalStorage
- **Storage utente**: dati di autenticazione e profilo
- **Storage preferiti**: lista preferiti per utente (multi-utente supportato)
- **Storage valutazioni**: valutazioni a stelle per film
- **Storage recensioni**: recensioni testuali per film
- **Migrazione automatica** da formati legacy

#### API Integration
- **JSONPlaceholder API** per operazioni CRUD sui film
- **Gestione errori** con messaggi informativi
- **Loading states** durante le operazioni asincrone
- **Ottimizzazione** con limitazione risultati

### 11. Sistema di Poster

#### Assegnazione Poster
- **10 poster cinematografici** disponibili
- **Assegnazione automatica** basata su:
  - Titolo del film (mapping specifico)
  - Posizione nella lista
  - ID del film
- **Fallback** a poster predefinito se nessuna corrispondenza

#### Gestione Immagini
- **Poster nella home**: coppie di immagini per colonna sinistra/destra
- **Poster nei dettagli**: background dinamico
- **Poster nelle liste**: card con immagini ottimizzate

### 12. Animazioni e UX

#### Animazioni Logo
- **Morphing SVG** da Pause a Play utilizzando Flubber
- **Transizioni fluide** per spostamento elementi
- **Timing personalizzato** per un'esperienza elegante

#### Interazioni Utente
- **Hover effects** sui poster e bottoni
- **Transizioni CSS** per cambiamenti di stato
- **Feedback visivo** per azioni utente
- **Loading indicators** durante operazioni asincrone

#### Accessibilità
- **Supporto ARIA** per screen reader
- **Navigazione da tastiera** supportata
- **Contrasti adeguati** per leggibilità
- **Label descrittivi** per form e bottoni

## 📁 Struttura del Progetto

```
netfilm-react/
├── public/                 # File pubblici statici
├── src/
│   ├── api/               # Integrazione API
│   │   └── jsonplaceholder.js
│   ├── assets/            # Immagini e risorse
│   ├── components/        # Componenti riutilizzabili
│   │   ├── Layout.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── constants/         # Costanti e configurazioni
│   │   └── posters.js
│   ├── context/           # Context API per stato globale
│   │   ├── LoginModalContext.jsx
│   │   └── useLoginModal.js
│   ├── hooks/             # Custom hooks
│   │   └── useLoginForm.js
│   ├── pages/             # Pagine dell'applicazione
│   │   ├── FilmDetail.jsx
│   │   ├── Home.jsx
│   │   ├── ListaTodos.jsx
│   │   ├── Preferiti.jsx
│   │   ├── Profilo.jsx
│   │   └── SplashScreen.jsx
│   ├── routes/            # Route protette
│   │   └── ProtectedRoute.jsx
│   ├── utils/             # Funzioni di utilità
│   │   ├── auth.js
│   │   ├── favorites.js
│   │   └── posters.js
│   ├── App.jsx            # Componente principale
│   ├── main.jsx           # Entry point
│   └── Style.css          # Stili globali
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Installazione e Avvio

### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o yarn

### Installazione Dipendenze
```bash
npm install
```

### Avvio Server di Sviluppo
```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

### Build per Produzione
```bash
npm run build
```

### Preview Build di Produzione
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🎨 Caratteristiche UI/UX

- **Design moderno** con palette colori scura (dark theme)
- **Tipografia** chiara e leggibile
- **Spaziature** consistenti e bilanciate
- **Icone** personalizzate e SVG ottimizzati
- **Responsive design** per mobile, tablet e desktop
- **Animazioni fluide** per transizioni e interazioni
- **Feedback visivo** immediato per tutte le azioni utente

## 🔐 Sicurezza e Privacy

- **Autenticazione client-side** con localStorage
- **Password in chiaro** (per demo - in produzione utilizzare hash)
- **Validazione input** su tutti i form
- **Gestione errori** robusta con messaggi informativi
- **Protezione route** per contenuti riservati

## 📝 Note di Sviluppo

- Il progetto utilizza **JSONPlaceholder** come API fittizia: le modifiche non sono persistenti
- I dati utente e preferiti sono salvati nel **localStorage** del browser
- Le valutazioni e recensioni sono **per-film** e salvate localmente
- Il sistema supporta **multi-utente** con preferiti separati per utente
- Le immagini dei poster sono incluse come asset locali

## 🚧 Possibili Miglioramenti Futuri

- Integrazione con API reale per film
- Sistema di ricerca avanzato
- Filtri multipli combinati
- Paginazione per liste lunghe
- Sistema di notifiche
- Condivisione social dei film
- Playlist personalizzate
- Sistema di raccomandazioni
- Modalità offline con Service Workers
- PWA (Progressive Web App)

## 📄 Licenza

Questo progetto è stato creato a scopo educativo e dimostrativo.

---

**Netfilm** - La tua piattaforma di streaming personale 🎬
