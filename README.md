# Python-Lernplattform: Architektur und Wartungsanleitung

Diese Dokumentation bietet einen Überblick über die Architektur und Funktionsweise der Python-Lernplattform, um die Wartung und Weiterentwicklung zu erleichtern.

## Dateistruktur

Die Plattform besteht aus folgenden Hauptdateien:

| Datei | Beschreibung |
|-------|-------------|
| **index.html** | Hauptdatei mit der HTML-Struktur der Anwendung |
| **styles.css** | Enthält alle Styling-Informationen und das responsive Layout |
| **script.js** | Enthält JavaScript-Funktionen für den eigenständigen Code-Editor |
| **markdown-loader.js** | Hauptlogik für das Laden und Verarbeiten von Markdown-Dateien |
| **python-docs/** | Verzeichnis mit den Markdown-Dokumentationen, nach Kapiteln organisiert |

## Hauptkomponenten

Die Anwendung besteht aus drei Hauptkomponenten:

| Komponente | Beschreibung |
|------------|-------------|
| **Sidebar-Navigation** | Linke Seitenleiste mit Kapitelübersicht und Fortschrittsanzeige |
| **Code-Editor** | Zentraler Bereich mit einem eigenständigen Python-Editor |
| **Markdown-Inhalt** | Bereich unter dem Code-Editor, der die Lernmaterialien anzeigt |

### Layout-Struktur

Das Layout verwendet CSS Grid mit folgender Struktur:

```css
.container {
    display: grid;
    grid-template-columns: 250px 300px 1fr;
    grid-template-areas: "sidebar editor-sidebar content";
}
```

| Bereich | Beschreibung |
|---------|-------------|
| `sidebar` | Linke Navigationsleiste |
| `editor-sidebar` | Code-Editor in der Mitte |
| `content` | Markdown-Inhalt rechts |

Auf mobilen Geräten ändert sich das Layout zu:

```css
.container {
    grid-template-columns: 1fr;
    grid-template-areas:
        "editor-sidebar"
        "content";
}
```

## Markdown-Verarbeitung

Die Markdown-Verarbeitung erfolgt in `markdown-loader.js` und umfasst folgende Schritte:

1. **Laden der Markdown-Dateien**: Die Funktion `loadMarkdownFile(filePath)` lädt eine Markdown-Datei von einem angegebenen Pfad.
2. **Pfadkorrektur**: Die Funktion `correctPath(path)` korrigiert Pfade in Markdown-Links.
3. **Markdown-Parsing**: Die Funktion `parseMarkdown(markdown)` wandelt Markdown in HTML um.
4. **Code-Block-Verarbeitung**: Code-Blöcke werden extrahiert und durch interaktive Editoren ersetzt.

### Markdown-Datei-Cache

Die Plattform verwendet einen Cache für Markdown-Dateien, um die Ladezeiten zu verbessern:

```javascript
// Initialisiere den Markdown-Datei-Cache
async function initializeMarkdownCache() {
    markdownFileCache = {};
    await scanDirectoryRecursively(DOCS_BASE_DIR);
}
```

## Code-Editor-Funktionalität

Die Plattform bietet zwei Arten von Code-Editoren:

1. **Eingebettete Editoren**: In Markdown-Inhalten eingebettete Code-Blöcke werden zu interaktiven Editoren.
2. **Eigenständiger Editor**: Ein separater Editor in der Seitenleiste für freies Experimentieren.

### Monaco Editor Integration

Die Plattform verwendet den Monaco Editor für die Code-Bearbeitung:

```javascript
// Erstelle den Editor
const standaloneEditor = monaco.editor.create(document.getElementById('standalone-editor'), {
    value: '# Schreibe deinen Python-Code hier\n\n# Beispiel:\nprint("Hallo, Welt!")',
    language: 'python',
    theme: 'vs-dark',
    automaticLayout: true,
    // weitere Optionen...
});
```

### Pyodide Integration

Die Python-Code-Ausführung erfolgt mit Pyodide:

```javascript
// Lade Pyodide
async function loadPyodideIfNeeded() {
    if (window.pyodide) return window.pyodide;
    // Lade Pyodide...
    window.pyodide = await loadPyodide();
    return window.pyodide;
}

// Führe Python-Code aus
async function runPythonCode(editorId) {
    // Code ausführen und Ausgabe anzeigen...
}
```

## Responsive Design

Die Plattform verwendet ein responsives Design mit drei Breakpoints:

| Gerät | Bildschirmgröße | Layout |
|-------|----------------|--------|
| **Mobile** | < 768px | Einspaltiges Layout, ausgeblendete Seitenleisten |
| **Tablet** | 768px - 992px | Zweispaltiges Layout |
| **Desktop** | > 992px | Dreispaltiges Layout mit allen Komponenten sichtbar |

### Ein-/Ausklappbare Komponenten

Beide Seitenleisten können ein- und ausgeklappt werden:

```javascript
// Toggle-Button für den Editor-Sidebar
document.getElementById('toggle-editor-sidebar').addEventListener('click', function() {
    document.getElementById('code-editor-sidebar').classList.toggle('collapsed');
    // Layout aktualisieren...
});
```

## Erweiterungsmöglichkeiten

### Neue Kapitel hinzufügen

Um neue Kapitel hinzuzufügen:

1. Erstelle eine neue Markdown-Datei im entsprechenden Kapitel-Verzeichnis
2. Füge einen Link zur neuen Datei in der Hauptseite (`Anfang_Lese_Mich.md`) hinzu

### Neue Funktionen hinzufügen

Für neue Funktionen:

1. **Neue UI-Elemente**: Füge HTML in `index.html` hinzu
2. **Styling**: Erweitere `styles.css`
3. **Funktionalität**: Implementiere JavaScript in `script.js` oder `markdown-loader.js`

## Wartungstipps

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| **Markdown-Dateien werden nicht gefunden** | Überprüfe die Pfade und den Markdown-Cache |
| **Code-Editor wird nicht angezeigt** | Überprüfe die Monaco-Editor-Initialisierung |
| **Python-Code kann nicht ausgeführt werden** | Überprüfe die Pyodide-Integration |

### Performance-Optimierung

Die Plattform verwendet mehrere Techniken zur Performance-Optimierung:

| Technik | Beschreibung |
|---------|-------------|
| **Lazy Loading** | Pyodide wird erst geladen, wenn es benötigt wird |
| **Debouncing** | Verhindert zu häufige Layout-Aktualisierungen |
| **Caching** | Markdown-Dateien werden gecacht |

### Browser-Kompatibilität

Die Plattform wurde für moderne Browser optimiert. Bei Problemen mit älteren Browsern:

| Überprüfung | Details |
|-------------|---------|
| CSS-Kompatibilität | Grid, Flexbox |
| JavaScript-Kompatibilität | async/await, ES6-Features |