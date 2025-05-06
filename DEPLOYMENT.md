# Deployment-Konfiguration für Python-Lernplattform

Diese Dokumentation beschreibt die Deployment-Konfiguration für die Python-Lernplattform, insbesondere das Setup des Gemini API Proxy Servers und der statischen Website.

## Übersicht der Architektur

Die Anwendung besteht aus zwei Hauptkomponenten:

1. **Statische Website** - Gehostet auf Cloudflare Pages
2. **Gemini API Proxy** - Separater Cloudflare Worker, der als API-Proxy dient

```
+------------------------+       +--------------------------+
|                        |       |                          |
|  Statische Website     |------>|  Gemini API Proxy Server |-----> Google Gemini API
|  (Cloudflare Pages)    |       |  (Cloudflare Worker)     |
|                        |       |                          |
+------------------------+       +--------------------------+
```

## 1. Statische Website Deployment

### Konfigurationsdateien

- `wrangler.toml` - Hauptkonfiguration für Cloudflare Pages
- `_redirects` - Konfiguriert Weiterleitungen für API-Anfragen zum Proxy-Server

### Deployment-Anweisungen

1. Stelle sicher, dass dein GitHub-Repository mit Cloudflare Pages verbunden ist
2. Pushe Änderungen zum Hauptbranch, um automatisches Deployment auszulösen
3. Alternativ kannst du manuell deployen mit:
   ```
   npx wrangler pages publish .
   ```

## 2. Gemini API Proxy Server

Der Proxy-Server wird als separater Cloudflare Worker bereitgestellt und leitet Anfragen an die Google Gemini API weiter, ohne den API-Schlüssel im Frontend preiszugeben.

### Konfigurationsdateien

- `proxy-server/wrangler.toml` - Konfiguration für den Proxy-Server Worker
- `proxy-server/worker.js` - Implementierung des Proxy-Servers
- `.env.example` - Vorlage für die erforderlichen Umgebungsvariablen

### Deployment-Anweisungen

1. Navigiere zum Proxy-Server-Verzeichnis:
   ```
   cd proxy-server
   ```

2. Logge dich in Cloudflare ein:
   ```
   npx wrangler login
   ```

3. Konfiguriere den API-Schlüssel als Secret:
   ```
   npx wrangler secret put GEMINI_API_KEY
   ```
   (Du wirst aufgefordert, deinen Gemini API-Schlüssel einzugeben)

4. Deploye den Worker:
   ```
   npx wrangler publish
   ```

5. Nach dem Deployment aktualisiere die URL in der `_redirects`-Datei im Hauptverzeichnis mit der neuen Worker-URL:
   ```
   /api/gemini-proxy https://DEINE-WORKER-URL.workers.dev/api/gemini-proxy 200
   ```

## Fehlerbehebung beim Deployment

Wenn das Deployment fehlschlägt, überprüfe Folgendes:

1. **API-Schlüssel-Konfiguration**:
   - Ist der GEMINI_API_KEY korrekt im Cloudflare Worker konfiguriert?
   - Teste den Worker direkt, um API-Schlüssel-Probleme zu identifizieren

2. **Redirect-Konfiguration**:
   - Ist die URL in der `_redirects`-Datei korrekt?
   - Zeigt sie auf den richtigen Worker-Endpunkt?

3. **CORS-Probleme**:
   - Der Worker ist mit CORS-Headern konfiguriert, die alle Ursprünge erlauben
   - Bei Problemen überprüfe die Network-Tab in den Browser-DevTools

4. **Worker-Limits**:
   - Cloudflare Worker haben Anfragelimits im kostenlosen Plan
   - Bei hohem Traffic prüfe die Cloudflare Dashboard auf Fehler

## Lokale Entwicklung

Für die lokale Entwicklung:

1. Erstelle eine `.env`-Datei im Hauptverzeichnis basierend auf `.env.example`:
   ```
   GEMINI_API_KEY=dein_google_api_schluessel
   ```

2. Starte den lokalen Entwicklungsserver:
   ```
   node js/server.js
   ```

3. Starte den lokalen Proxy-Server in einem separaten Terminal:
   ```
   cd proxy-server
   npx wrangler dev
   ```

## Weitere Hinweise

- Die statische Website und der Proxy-Server sollten getrennt verwaltet werden
- Bei Änderungen am Proxy-Server muss dieser separat deployed werden
- Achte auf die korrekte Konfiguration der Umgebungsvariablen
- Bei Updates der Gemini API muss möglicherweise auch der Proxy-Server aktualisiert werden