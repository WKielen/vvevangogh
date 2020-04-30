# VVE van Gogh

This project was generated with version 9.1




# run in production mode
ng build --prod
http-server -p 8080 -c-1 dist/leden

Omdat het path naar de service-worker altijd naar 'app' wijst. (Lokatie op productie) moet de 
ngsw-worker.js en ngsw.json naar de 'app' folder worden gekopieerd om de service worker te laten werken. 
 manifest.webmanifest "start_url": "/index.html",   /app toevoegen
  index.html  <base href="/">  moet /app/ zijn






## Progressive Web App

This app has PWA on board. Please allways checkout the service-worker config `ngsw-config.json` when you change the API url or fonts url's.

Run `http-server -p 8080 -c-1 dist/ttvn -o` for the production version with pwa

## Build for production

Run `ng build --prod --base-href=/app/` for the production build


## Development server


Run `ng serve --base-href=/app/` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

