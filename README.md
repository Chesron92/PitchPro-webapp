# PitchPro - Recruitment Platform

PitchPro is een modern recruitment platform dat werkzoekenden en recruiters met elkaar verbindt. Het biedt een uitgebreide set aan functies om het wervingsproces te verbeteren.

## Functies

- **Authenticatie**: Login, registratie en profielbeheer voor zowel werkzoekenden als recruiters
- **Vacaturebeheer**: Zoeken, filteren, bekijken en beheren van vacatures
- **Sollicitaties**: Solliciteren op vacatures, status volgen, beheer voor recruiters
- **Chatten**: Direct messaging tussen kandidaten en recruiters
- **Agenda**: Plannen en beheren van sollicitatiegesprekken
- **Profielen**: Uitgebreide profielen en CV-beheer

## Technische Details

- Frontend: React met TypeScript en Tailwind CSS
- Backend: Firebase (Firestore, Authentication, Storage)
- Hosting: Firebase Hosting

## Installatie

1. **Vereisten**
   - Node.js (v14 of hoger)
   - npm of yarn

2. **Setup**
   ```bash
   # Clone repository (indien beschikbaar)
   git clone https://github.com/jouw-username/pitchpro.git
   cd pitchpro
   
   # Installeer dependencies
   npm install
   
   # Start ontwikkelingsserver
   npm start
   ```

3. **Firebase configuratie**
   - Maak een Firebase project aan op [Firebase Console](https://console.firebase.google.com/)
   - Voeg een web-app toe aan je project
   - Kopieer de Firebase configuratie
   - Maak een `.env` bestand in de root van het project:
     ```
     REACT_APP_FIREBASE_API_KEY=jouw-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=jouw-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=jouw-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=jouw-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=jouw-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=jouw-app-id
     ```

## Project structuur

```
pitchpro/
├── public/             # Statische bestanden
├── src/                # Broncode
│   ├── components/     # React componenten
│   ├── contexts/       # Context providers
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Pagina componenten
│   ├── services/       # Firebase services
│   ├── styles/         # CSS/Tailwind stijlen
│   ├── types/          # TypeScript type definities
│   ├── utils/          # Utility functies
│   ├── App.tsx         # Hoofdcomponent
│   └── index.tsx       # Applicatie entry point
└── package.json        # Project metadata en dependencies
```

## Ontwikkeling

- **Runs lokaal**: `npm start`
- **Testen**: `npm test`
- **Build voor productie**: `npm run build` 