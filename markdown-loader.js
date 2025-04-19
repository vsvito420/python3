/**
 * Markdown Loader für die Python-Lernplattform
 * Lädt Markdown-Dateien und wandelt sie in interaktive HTML-Inhalte um
 */

// Globale Variablen
let currentChapter = '';
let progress = {};
let codeBlocks = [];
let editors = {};

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

// Lade eine Markdown-Datei und wandle sie in HTML um
async function loadMarkdownFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Fehler beim Laden der Datei: ${response.status}`);
        }
        
        const markdown = await response.text();
        currentChapter = filePath.split('/').pop().replace('.md', '');
        
        // Wandle Markdown in HTML um und zeige es an
        const html = parseMarkdown(markdown);
        document.getElementById('content').innerHTML = html;
        
        // Initialisiere interaktive Code-Blöcke
        initializeCodeBlocks();
        
        // Aktualisiere aktiven Menüpunkt
        updateActiveMenuItem(filePath);
        
        // Aktualisiere Fortschrittsanzeige
        updateProgressUI();
        
        // Scrolle zum Anfang der Seite
        window.scrollTo(0, 0);
        
        return true;
    } catch (error) {
        console.error('Fehler beim Laden der Markdown-Datei:', error);
        document.getElementById('content').innerHTML = `
            <div class="error-message">
                <h2>Fehler beim Laden des Inhalts</h2>
                <p>${error.message}</p>
                <button onclick="loadMarkdownFile('alte-markdown-dateien/Kapitel_0/Anfang_Lese_Mich.md')">
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
    
    // Ersetze Code-Blöcke mit Platzhaltern
    let processedMarkdown = markdown.replace(/```python\n([\s\S]*?)```/g, (match, code) => {
        const id = `code-block-${codeBlocks.length}`;
        codeBlocks.push({ id, code: code.trim() });
        return `<div id="${id}" class="code-editor-container"></div>`;
    });
    
    // Ersetze Überschriften
    processedMarkdown = processedMarkdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    processedMarkdown = processedMarkdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    processedMarkdown = processedMarkdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Ersetze Links
    processedMarkdown = processedMarkdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // Interne Links zu Markdown-Dateien
        if (url.endsWith('.md')) {
            return `<a href="javascript:void(0)" onclick="loadMarkdownFile('${url}')">${text}</a>`;
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
        if (!window.pyodide) {
            try {
                window.pyodide = await loadPyodide();
            } catch (error) {
                outputElement.textContent = `Fehler beim Laden der Python-Umgebung: ${error.message}`;
                return;
            }
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
function initializeApp() {
    // Lade gespeicherten Fortschritt
    loadProgress();
    
    // Erstelle Kapitelmenü aus der Inhaltsverzeichnis-Datei
    loadMarkdownFile('alte-markdown-dateien/Kapitel_0/Anfang_Lese_Mich.md')
        .then(success => {
            if (success) {
                // Extrahiere Links aus dem Inhaltsverzeichnis und erstelle Sidebar-Menü
                createSidebarMenu();
            }
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
    homeItem.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('alte-markdown-dateien/Kapitel_0/Anfang_Lese_Mich.md')">Hauptseite</a>`;
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