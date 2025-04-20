/**
 * Markdown Loader für die Python-Lernplattform
 * Lädt Markdown-Dateien und wandelt sie in interaktive HTML-Inhalte um
 */

// Globale Variablen
let currentChapter = '';
let progress = {};
let codeBlocks = [];
let editors = {};
let markdownFileCache = {}; // Cache für gefundene Markdown-Dateien

// Basis-Verzeichnis für Dokumentationen
const DOCS_BASE_DIR = 'python-docs';

// Lade gespeicherten Fortschritt aus dem localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('pythonLearningProgress');
    if (savedProgress) {
        progress = JSON.parse(savedProgress);
    }
}

// Speichere Fortschritt im localStorage
function saveProgress() {
    localStorage.setItem('pythonLearningProgress', JSON.stringify(progress));
}

// Markiere ein Kapitel als abgeschlossen
function markChapterAsCompleted(chapterId) {
    progress[chapterId] = {
        completed: true,
        timestamp: new Date().toISOString()
    };
    saveProgress();
    updateProgressUI();
}

// Aktualisiere die Fortschrittsanzeige in der UI
function updateProgressUI() {
    const progressElement = document.getElementById('progress-tracker');
    if (!progressElement) return;
    
    const completedChapters = Object.keys(progress).length;
    const totalChapters = document.querySelectorAll('.sidebar-menu li').length;
    
    progressElement.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${(completedChapters / totalChapters) * 100}%"></div>
        </div>
        <div class="progress-text">${completedChapters} von ${totalChapters} Kapiteln abgeschlossen</div>
    `;
}

// Initialisiere den Markdown-Datei-Cache durch rekursive Suche
async function initializeMarkdownCache() {
    console.log("Initialisiere Markdown-Datei-Cache...");
    
    // Setze den Cache zurück
    markdownFileCache = {};
    
    // Starte die rekursive Suche im Basis-Verzeichnis
    await scanDirectoryRecursively(DOCS_BASE_DIR);
    
    console.log("Markdown-Datei-Cache initialisiert:", markdownFileCache);
}

// Scanne ein Verzeichnis rekursiv nach Markdown-Dateien
async function scanDirectoryRecursively(directory) {
    console.log(`Scanne Verzeichnis: ${directory}`);
    
    try {
        // Liste alle Kapitel-Verzeichnisse
        const kapitelDirs = [
            `${DOCS_BASE_DIR}/Kapitel_0`,
            `${DOCS_BASE_DIR}/Kapitel_1`,
            `${DOCS_BASE_DIR}/Kapitel_2`,
            `${DOCS_BASE_DIR}/Kapitel_3`,
            `${DOCS_BASE_DIR}/Kapitel_4`,
            `${DOCS_BASE_DIR}/Kapitel_5`,
            `${DOCS_BASE_DIR}/Kapitel_6`,
            `${DOCS_BASE_DIR}/Kapitel_7`,
            `${DOCS_BASE_DIR}/Kapitel_8`,
            `${DOCS_BASE_DIR}/Kapitel_9`,
            `${DOCS_BASE_DIR}/Kapitel_10`
        ];
        
        // Durchsuche jedes Kapitel-Verzeichnis
        for (const kapitelDir of kapitelDirs) {
            await scanKapitelDirectory(kapitelDir);
        }
        
        // Scanne auch das Hauptverzeichnis
        await scanKapitelDirectory(DOCS_BASE_DIR);
        
    } catch (error) {
        console.error(`Fehler beim Scannen des Verzeichnisses ${directory}:`, error);
    }
}

// Scanne ein Kapitel-Verzeichnis nach Markdown-Dateien
async function scanKapitelDirectory(directory) {
    // Liste der bekannten Markdown-Dateien in diesem Verzeichnis
    const knownFiles = [
        "Anfang_Lese_Mich.md",
        "Erste_Schritte_Mac.md",
        "Erste_Schritte_Mobile_Replit.md",
        "Erste_Schritte_Win_PC.md",
        "Textausgabe_InDerKonsole.md",
        "Variablen_und_Datentypen.md",
        "Operatoren.md",
        "Strings.md",
        "Bedingte_Anweisungen.md",
        "Schleifen.md",
        "Listen.md",
        "Tupel.md",
        "Sets.md",
        "Dictionaries.md",
        "Funktionen.md",
        "Parameter_und_Rueckgabewerte.md",
        "Lambda_Funktionen.md",
        "Module.md",
        "Eigene_Module.md",
        "Standardbibliotheken.md",
        "Klassen_und_Objekte.md",
        "Vererbung.md",
        "Polymorphismus.md",
        "Dateien_lesen_schreiben.md",
        "CSV_Dateien.md",
        "JSON_Dateien.md",
        "Fehlerbehandlung.md",
        "Eigene_Exceptions.md"
    ];
    
    // Prüfe jede bekannte Datei
    for (const fileName of knownFiles) {
        const filePath = `${directory}/${fileName}`;
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                console.log(`Markdown-Datei gefunden: ${filePath}`);
                
                // Speichere verschiedene Varianten des Pfads im Cache
                cacheFilePath(fileName, filePath);
            }
        } catch (error) {
            // Ignoriere Fehler, da wir nur prüfen, ob die Datei existiert
        }
    }
}

// Speichere verschiedene Varianten eines Pfads im Cache
function cacheFilePath(fileName, fullPath) {
    // Speichere den vollständigen Pfad
    markdownFileCache[fullPath] = fullPath;
    
    // Speichere den Dateinamen
    markdownFileCache[fileName] = fullPath;
    
    // Speichere den Dateinamen ohne Erweiterung
    const fileNameWithoutExt = fileName.replace('.md', '');
    markdownFileCache[fileNameWithoutExt] = fullPath;
    
    // Speichere Varianten mit verschiedenen Pfadpräfixen
    markdownFileCache[`/${fullPath}`] = fullPath;
    markdownFileCache[`/Projekte/${fileName}`] = fullPath;
    
    // Extrahiere das Kapitel aus dem Pfad (z.B. "Kapitel_1")
    const match = fullPath.match(/Kapitel_\d+/);
    if (match) {
        const kapitel = match[0];
        markdownFileCache[`/Projekte/${kapitel}/${fileName}`] = fullPath;
        markdownFileCache[`Projekte/${kapitel}/${fileName}`] = fullPath;
    }
}

// Korrigiere Pfade in Markdown-Links
function correctPath(path) {
    // Wenn der Pfad im Cache ist, verwende den gespeicherten Pfad
    if (markdownFileCache[path]) {
        console.log(`Pfad im Cache gefunden: ${path} -> ${markdownFileCache[path]}`);
        return markdownFileCache[path];
    }
    
    // Wenn der Pfad bereits mit dem Basis-Verzeichnis beginnt
    if (path.startsWith(`${DOCS_BASE_DIR}/`)) {
        return path;
    }
    
    // Entferne führenden Slash, falls vorhanden
    let correctedPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Ersetze "Projekte/" durch das Basis-Verzeichnis
    if (correctedPath.startsWith('Projekte/')) {
        correctedPath = correctedPath.replace('Projekte/', `${DOCS_BASE_DIR}/`);
    }
    // Wenn der Pfad nicht mit dem Basis-Verzeichnis beginnt, füge es hinzu
    else if (!correctedPath.startsWith(`${DOCS_BASE_DIR}/`)) {
        // Extrahiere den Dateinamen
        const fileName = correctedPath.split('/').pop();
        
        // Versuche, den Pfad im Cache zu finden
        for (const [cachedPath, fullPath] of Object.entries(markdownFileCache)) {
            if (cachedPath.endsWith(fileName)) {
                console.log(`Datei im Cache gefunden: ${fileName} -> ${fullPath}`);
                return fullPath;
            }
        }
        
        // Wenn nicht im Cache gefunden, füge das Basis-Verzeichnis hinzu
        correctedPath = `${DOCS_BASE_DIR}/` + correctedPath;
    }
    
    console.log(`Pfad korrigiert: ${path} -> ${correctedPath}`);
    return correctedPath;
}

// Lade eine Markdown-Datei und wandle sie in HTML um
async function loadMarkdownFile(filePath) {
    try {
        // Wenn der Cache leer ist, initialisiere ihn
        if (Object.keys(markdownFileCache).length === 0) {
            await initializeMarkdownCache();
        }
        
        // Korrigiere den Pfad
        const correctedPath = correctPath(filePath);
        console.log(`Versuche Datei zu laden: ${correctedPath} (Original: ${filePath})`);
        
        const response = await fetch(correctedPath);
        if (!response.ok) {
            // Wenn die Datei nicht gefunden wurde, versuche eine rekursive Suche
            console.log("Datei nicht gefunden, starte rekursive Suche...");
            
            // Extrahiere den Dateinamen ohne Pfad
            const fileName = filePath.split('/').pop();
            
            // Durchsuche alle Kapitel-Verzeichnisse nach der Datei
            for (let i = 0; i <= 10; i++) {
                const kapitelDir = `${DOCS_BASE_DIR}/Kapitel_${i}`;
                const alternativePath = `${kapitelDir}/${fileName}`;
                
                console.log(`Versuche alternative Datei zu laden: ${alternativePath}`);
                
                try {
                    const altResponse = await fetch(alternativePath);
                    if (altResponse.ok) {
                        console.log(`Datei gefunden unter: ${alternativePath}`);
                        
                        // Aktualisiere den Cache für zukünftige Anfragen
                        cacheFilePath(fileName, alternativePath);
                        
                        const markdown = await altResponse.text();
                        currentChapter = alternativePath.split('/').pop().replace('.md', '');
                        
                        // Wandle Markdown in HTML um und zeige es an
                        const html = parseMarkdown(markdown);
                        document.getElementById('content').innerHTML = html;
                        
                        // Initialisiere interaktive Code-Blöcke
                        initializeCodeBlocks();
                        
                        // Aktualisiere aktiven Menüpunkt
                        updateActiveMenuItem(alternativePath);
                        
                        // Aktualisiere Fortschrittsanzeige
                        updateProgressUI();
                        
                        // Scrolle zum Anfang der Seite
                        window.scrollTo(0, 0);
                        
                        return true;
                    }
                } catch (altError) {
                    // Ignoriere Fehler und versuche das nächste Verzeichnis
                }
            }
            
            // Wenn die Datei nirgendwo gefunden wurde, zeige einen Fehler an
            throw new Error(`Datei nicht gefunden: ${fileName}`);
        }
        
        const markdown = await response.text();
        currentChapter = correctedPath.split('/').pop().replace('.md', '');
        
        // Wandle Markdown in HTML um und zeige es an
        const html = parseMarkdown(markdown);
        document.getElementById('content').innerHTML = html;
        
        // Initialisiere interaktive Code-Blöcke
        initializeCodeBlocks();
        
        // Aktualisiere aktiven Menüpunkt
        updateActiveMenuItem(correctedPath);
        
        // Aktualisiere Fortschrittsanzeige
        updateProgressUI();
        
        // Scrolle zum Anfang der Seite
        window.scrollTo(0, 0);
        
        console.log(`Datei erfolgreich geladen: ${correctedPath}`);
        return true;
    } catch (error) {
        console.error('Fehler beim Laden der Markdown-Datei:', error);
        document.getElementById('content').innerHTML = `
            <div class="error-message">
                <h2>Fehler beim Laden des Inhalts</h2>
                <p>${error.message}</p>
                <div class="error-details">
                    <p>Versuchter Pfad: ${correctPath(filePath)}</p>
                    <p>Ursprünglicher Pfad: ${filePath}</p>
                </div>
                <button onclick="loadMarkdownFile('${DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md')">
                    Zurück zur Hauptseite
                </button>
            </div>
        `;
        return false;
    }
}

// Wandle Markdown in HTML um
function parseMarkdown(markdown) {
    // Speichere Code-Blöcke für spätere Verarbeitung
    codeBlocks = [];
    
    // Temporäre Platzhalter für Code-Blöcke
    const codePlaceholders = [];
    
    // Ersetze Code-Blöcke mit drei Backticks und speichere sie
    let processedMarkdown = markdown.replace(/```python\n([\s\S]*?)```/g, (match, code) => {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        codePlaceholders.push({ type: 'code', code: code.trim() });
        return placeholder;
    });
    
    // Ersetze auch Code-Blöcke mit einem Backtick und speichere sie
    processedMarkdown = processedMarkdown.replace(/`python\n([\s\S]*?)`/g, (match, code) => {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        codePlaceholders.push({ type: 'code', code: code.trim() });
        return placeholder;
    });
    
    // Ersetze Code-Blöcke, die nur mit dem Wort "python" in einer eigenen Zeile beginnen
    processedMarkdown = processedMarkdown.replace(/^python\s*$([\s\S]*?)(?=^[a-zA-Z]|\n\s*\n|$)/gm, (match, code) => {
        if (code.trim()) {
            const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
            codePlaceholders.push({ type: 'code', code: code.trim() });
            return placeholder;
        }
        return match;
    });
    
    // Ersetze Überschriften
    processedMarkdown = processedMarkdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    processedMarkdown = processedMarkdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    processedMarkdown = processedMarkdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Ersetze Links mit korrigierten Pfaden
    processedMarkdown = processedMarkdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // Interne Links zu Markdown-Dateien
        if (url.endsWith('.md')) {
            // Korrigiere den Pfad für die verlinkte Datei
            const correctedUrl = correctPath(url);
            return `<a href="javascript:void(0)" onclick="loadMarkdownFile('${correctedUrl}')">${text}</a>`;
        }
        // Externe Links
        return `<a href="${url}" target="_blank">${text}</a>`;
    });
    
    // Ersetze Listen
    processedMarkdown = processedMarkdown.replace(/^\s*-\s*(.*$)/gm, '<li>$1</li>');
    processedMarkdown = processedMarkdown.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    processedMarkdown = processedMarkdown.replace(/^\s*\d+\.\s*(.*$)/gm, '<li>$1</li>');
    processedMarkdown = processedMarkdown.replace(/(<li>.*<\/li>\n)+/g, '<ol>$&</ol>');
    
    // Ersetze Absätze
    processedMarkdown = processedMarkdown.replace(/^(?!<[a-z]|\s*$)(.+)$/gm, '<p>$1</p>');
    
    // Ersetze Hervorhebungen
    processedMarkdown = processedMarkdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedMarkdown = processedMarkdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    processedMarkdown = processedMarkdown.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Ersetze horizontale Linien
    processedMarkdown = processedMarkdown.replace(/^---$/gm, '<hr>');
    
    // Ersetze die Code-Block-Platzhalter durch tatsächliche Code-Editoren
    codePlaceholders.forEach((placeholder, index) => {
        if (placeholder.type === 'code') {
            const id = `code-block-${codeBlocks.length}`;
            codeBlocks.push({ id, code: placeholder.code });
            processedMarkdown = processedMarkdown.replace(`__CODE_BLOCK_${index}__`, `<div id="${id}" class="code-editor-container"></div>`);
        }
    });
    
    // Füge Navigationsbuttons hinzu
    processedMarkdown += `
        <div class="chapter-navigation">
            <button id="mark-completed" class="mark-completed-button">Kapitel als abgeschlossen markieren</button>
        </div>
    `;
    
    return processedMarkdown;
}

// Initialisiere interaktive Code-Blöcke
function initializeCodeBlocks() {
    codeBlocks.forEach(({ id, code }) => {
        const container = document.getElementById(id);
        if (!container) return;
        
        // Erstelle Editor-Container
        container.innerHTML = `
            <div class="editor-container">
                <div id="${id}-editor" class="code-editor"></div>
                <div class="editor-buttons">
                    <button class="run-button" data-editor="${id}-editor">Code ausführen</button>
                    <button class="reset-button" data-editor="${id}-editor">Zurücksetzen</button>
                </div>
            </div>
            <div class="output-container" id="${id}-output">
                <h3>Ausgabe:</h3>
                <div class="output-content"></div>
            </div>
        `;
        
        // Initialisiere Monaco Editor
        require(['vs/editor/editor.main'], function() {
            editors[`${id}-editor`] = monaco.editor.create(document.getElementById(`${id}-editor`), {
                value: code,
                language: 'python',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                tabSize: 4,
                insertSpaces: true,
                wordWrap: 'on'
            });
        });
    });
    
    // Füge Event-Listener für Buttons hinzu
    document.querySelectorAll('.run-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            runPythonCode(editorId);
        });
    });
    
    document.querySelectorAll('.reset-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            resetEditor(editorId);
        });
    });
    
    // Füge Event-Listener für "Kapitel als abgeschlossen markieren" hinzu
    const markCompletedButton = document.getElementById('mark-completed');
    if (markCompletedButton) {
        markCompletedButton.addEventListener('click', function() {
            markChapterAsCompleted(currentChapter);
            this.disabled = true;
            this.textContent = 'Kapitel abgeschlossen ✓';
        });
        
        // Prüfe, ob das Kapitel bereits abgeschlossen ist
        if (progress[currentChapter] && progress[currentChapter].completed) {
            markCompletedButton.disabled = true;
            markCompletedButton.textContent = 'Kapitel abgeschlossen ✓';
        }
    }
}

// Lade Pyodide
async function loadPyodideIfNeeded() {
    // Wenn Pyodide bereits geladen ist, gib es zurück
    if (window.pyodide) {
        return window.pyodide;
    }
    
    // Wenn Pyodide gerade geladen wird, warte auf den Abschluss
    if (window.pyodideLoading) {
        // Warte, bis das Laden abgeschlossen ist
        while (window.pyodideLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return window.pyodide;
    }
    
    // Setze Flag, dass Pyodide geladen wird
    window.pyodideLoading = true;
    
    try {
        console.log("Lade Pyodide...");
        // Lade Pyodide
        window.pyodide = await loadPyodide();
        console.log("Pyodide erfolgreich geladen!");
        return window.pyodide;
    } catch (error) {
        console.error("Fehler beim Laden von Pyodide:", error);
        throw error;
    } finally {
        // Setze Flag zurück
        window.pyodideLoading = false;
    }
}

// Führe Python-Code aus
async function runPythonCode(editorId) {
    if (!editors[editorId]) {
        console.error(`Editor ${editorId} nicht gefunden`);
        return;
    }
    
    const code = editors[editorId].getValue();
    const outputId = editorId.replace('editor', 'output');
    const outputElement = document.querySelector(`#${outputId} .output-content`);
    
    if (!outputElement) {
        console.error(`Output-Element für ${editorId} nicht gefunden`);
        return;
    }
    
    outputElement.textContent = 'Ausführung...';
    
    try {
        // Lade Pyodide, falls noch nicht geladen
        try {
            await loadPyodideIfNeeded();
        } catch (error) {
            outputElement.textContent = `Fehler beim Laden der Python-Umgebung: ${error.message}`;
            return;
        }
        
        // Umleiten der Standardausgabe
        window.pyodide.runPython(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
        `);
        
        // Führe den Code aus
        await window.pyodide.runPythonAsync(code);
        
        // Hole die Ausgabe
        const stdout = window.pyodide.runPython('sys.stdout.getvalue()');
        
        // Zeige die Ausgabe an
        outputElement.textContent = stdout || 'Code erfolgreich ausgeführt (keine Ausgabe)';
        
        // Setze stdout zurück
        window.pyodide.runPython('sys.stdout = sys.__stdout__');
    } catch (error) {
        console.error('Python-Ausführungsfehler:', error);
        outputElement.textContent = `Fehler: ${error.message}`;
    }
}

// Setze Editor auf den ursprünglichen Code zurück
function resetEditor(editorId) {
    const originalId = editorId.replace('-editor', '');
    const codeBlock = codeBlocks.find(block => block.id === originalId);
    
    if (codeBlock && editors[editorId]) {
        editors[editorId].setValue(codeBlock.code);
    }
}

// Aktualisiere den aktiven Menüpunkt
function updateActiveMenuItem(filePath) {
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll(`.sidebar-menu a[href*="${filePath}"]`).forEach(link => {
        link.parentElement.classList.add('active');
    });
}

// Initialisiere die Anwendung
async function initializeApp() {
    // Lade gespeicherten Fortschritt
    loadProgress();
    
    console.log("Initialisiere Anwendung...");
    
    // Initialisiere den Markdown-Datei-Cache
    await initializeMarkdownCache();
    
    // Erstelle Kapitelmenü aus der Inhaltsverzeichnis-Datei
    loadMarkdownFile(`${DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md`)
        .then(success => {
            if (success) {
                console.log("Hauptseite erfolgreich geladen, erstelle Sidebar-Menü...");
                // Extrahiere Links aus dem Inhaltsverzeichnis und erstelle Sidebar-Menü
                createSidebarMenu();
            } else {
                console.error("Fehler beim Laden der Hauptseite");
            }
        })
        .catch(error => {
            console.error("Fehler beim Initialisieren der Anwendung:", error);
        });
}

// Erstelle Sidebar-Menü aus dem Inhaltsverzeichnis
function createSidebarMenu() {
    const links = document.querySelectorAll('#content a[onclick*="loadMarkdownFile"]');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    
    if (!sidebarMenu || links.length === 0) return;
    
    // Leere das Menü
    sidebarMenu.innerHTML = '';
    
    // Füge Hauptseiten-Link hinzu
    const homeItem = document.createElement('li');
    homeItem.classList.add('active');
    homeItem.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('${DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md')">Hauptseite</a>`;
    sidebarMenu.appendChild(homeItem);
    
    // Füge Links aus dem Inhaltsverzeichnis hinzu
    links.forEach(link => {
        const filePath = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        const text = link.textContent;
        
        // Überspringe Links zur Hauptseite
        if (filePath.includes('Anfang_Lese_Mich.md')) return;
        
        const item = document.createElement('li');
        item.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('${filePath}')">${text}</a>`;
        
        // Markiere als abgeschlossen, falls zutreffend
        const chapterId = filePath.split('/').pop().replace('.md', '');
        if (progress[chapterId] && progress[chapterId].completed) {
            item.classList.add('completed');
            item.innerHTML += ' ✓';
        }
        
        sidebarMenu.appendChild(item);
    });
}

// Exportiere Funktionen für globalen Zugriff
window.loadMarkdownFile = loadMarkdownFile;
window.initializeApp = initializeApp;