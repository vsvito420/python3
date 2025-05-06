# Python3 Gemini API Proxy Server

Dieser Proxy-Server ermöglicht die sichere Kommunikation mit der Google Gemini API, ohne den API-Schlüssel im Frontend offenzulegen.

## Lokale Entwicklung

### Voraussetzungen

- [Node.js](https://nodejs.org/) (v16 oder höher)
- [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update) installiert (`npm install -g wrangler`)

### Einrichtung

1. Erstelle eine `.env`-Datei im Hauptverzeichnis des Projekts mit folgendem Inhalt:
   ```
   GEMINI_API_KEY=dein_google_api_schluessel
   ```

2. Starte den lokalen Entwicklungsserver:
   ```
   wrangler dev
   ```

### Lokaler Test

Der Server ist unter http://localhost:8787/api/gemini-proxy erreichbar. Du kannst Anfragen mit folgendem Format senden:

```bash
curl -X POST http://localhost:8787/api/gemini-proxy \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Erkläre mir Python in drei Sätzen"}'
```

## Deployment

### Auf Cloudflare Workers deployen

1. Stelle sicher, dass du in Cloudflare eingeloggt bist:
   ```
   wrangler login
   ```

2. Konfiguriere das API-Secret in Cloudflare:
   ```
   wrangler secret put GEMINI_API_KEY
   ```
   (Du wirst aufgefordert, deinen Gemini API-Schlüssel einzugeben)

3. Deploye den Worker:
   ```
   wrangler publish
   ```

### Hinweis

Nach dem Deployment wird der Proxy-Server unter einer Cloudflare-Domain verfügbar sein (z.B. https://python3-proxy.workers.dev/api/gemini-proxy).

Achte darauf, die URL in der `_redirects`-Datei im Hauptprojekt zu aktualisieren:

```
/api/gemini-proxy https://python3-proxy.workers.dev/api/gemini-proxy 200
```

## CORS

Der Server ist mit CORS-Headern konfiguriert, sodass Anfragen von jeder Domain möglich sind. Dies kann in `worker.js` bei Bedarf eingeschränkt werden.