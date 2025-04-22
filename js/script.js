/**
 * Hilfsfunktionen für die Python-Lernplattform
 * Diese Datei enthält ergänzende Funktionen, die nicht im markdown-loader.js enthalten sind
 */

// Globale Variablen
let pyodide = null;
let pyodideLoading = false;

/**
 * Debounce-Funktion zur Begrenzung der Häufigkeit von Funktionsaufrufen
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Fügt Tastaturkürzel für die Anwendung hinzu
 */
document.addEventListener('keydown', function(e) {
    // Strg+Enter oder Cmd+Enter zum Ausführen von Code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        // Finde den aktiven Editor
        const activeEditor = document.querySelector('.code-editor:focus');
        if (activeEditor) {
            const editorId = activeEditor.id;
            const runButton = document.querySelector(`[data-editor="${editorId}"].run-button`);
            if (runButton) {
                runButton.click();
                e.preventDefault();
            }
        }
    }
});

/**
 * Fügt CSS für Editor-Reset-Animation hinzu
 */
(function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .code-editor.reset-flash {
            animation: flash-border 0.5s ease;
        }
        
        @keyframes flash-border {
            0% { border-color: var(--border-color); }
            50% { border-color: var(--danger-color); }
            100% { border-color: var(--border-color); }
        }
        
        /* Lade-Animation */
        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--secondary-color);
        }
        
        .loading:after {
            content: '.';
            animation: dots 1.5s steps(5, end) infinite;
        }
        
        @keyframes dots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60% { content: '...'; }
            80%, 100% { content: ''; }
        }
    `;
    document.head.appendChild(style);
})();

/**
 * Behandelt Fenstergrößenänderungen für Editor-Layout
 */
window.addEventListener('resize', debounce(function() {
    if (typeof editors !== 'undefined' && editors) {
        Object.values(editors).forEach(editor => {
            if (editor && typeof editor.layout === 'function') {
                editor.layout();
            }
        });
    }
}, 100));

/**
 * Initialisiert den eigenständigen Code-Editor in der Seitenleiste
 */
function initializeStandaloneEditor() {
    // Warte bis Monaco Editor geladen ist
    if (typeof monaco === 'undefined') {
        setTimeout(initializeStandaloneEditor, 100);
        return;
    }

    // Erstelle den Editor
    const standaloneEditor = monaco.editor.create(document.getElementById('standalone-editor'), {
        value: '# Schreibe deinen Python-Code hier\n\n# Beispiel:\nprint("Hallo, Welt!")',
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        tabSize: 4,
        insertSpaces: true
    });

    // Füge den Editor zum globalen editors-Objekt hinzu
    if (typeof editors === 'undefined') {
        window.editors = {};
    }
    editors['standalone-editor'] = standaloneEditor;

    // Event-Listener für den Run-Button
    document.getElementById('standalone-run-button').addEventListener('click', async function() {
        const code = standaloneEditor.getValue();
        const outputElement = document.querySelector('#standalone-output .output-content');
        
        outputElement.textContent = 'Führe Code aus...';
        
        try {
            // Initialisiere Pyodide, falls noch nicht geschehen
            if (!window.pyodide) {
                outputElement.textContent = 'Lade Python-Interpreter...';
                await loadPyodideIfNeeded();
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
            outputElement.textContent = `Fehler: ${error.message}`;
            console.error('Python-Ausführungsfehler:', error);
        }
    });

    // Event-Listener für den Reset-Button
    document.getElementById('standalone-reset-button').addEventListener('click', function() {
        standaloneEditor.setValue('# Schreibe deinen Python-Code hier\n\n# Beispiel:\nprint("Hallo, Welt!")');
        document.querySelector('#standalone-output .output-content').textContent = '';
        
        // Füge eine kurze Animation hinzu
        const editorElement = document.getElementById('standalone-editor');
        editorElement.classList.add('reset-flash');
        setTimeout(() => editorElement.classList.remove('reset-flash'), 500);
    });

    // Toggle-Button für den Editor-Sidebar
    document.getElementById('toggle-editor-sidebar').addEventListener('click', function() {
        const editorSidebar = document.getElementById('code-editor-sidebar');
        editorSidebar.classList.toggle('collapsed');
        
        // Layout des Editors aktualisieren, wenn er sichtbar ist
        if (!editorSidebar.classList.contains('collapsed')) {
            setTimeout(() => standaloneEditor.layout(), 300);
            
            // Stelle sicher, dass der Resize-Handle sichtbar ist (nur auf Desktop)
            if (window.innerWidth >= 992) {
                document.getElementById('vertical-resize-handle').style.display = 'block';
            }
        } else {
            // Wenn der Editor eingeklappt ist, setze die Container-Spalten zurück
            if (window.innerWidth >= 992) {
                document.querySelector('.container').style.gridTemplateColumns = '250px 50px 1fr';
            }
        }
    });

    // Resize-Funktionalität für den Editor (vertikal)
    const resizeHandle = document.getElementById('editor-resize-handle');
    let startY, startHeight;

    resizeHandle.addEventListener('mousedown', function(e) {
        startY = e.clientY;
        startHeight = document.getElementById('standalone-editor').offsetHeight;
        document.addEventListener('mousemove', resizeEditor);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });

    function resizeEditor(e) {
        const newHeight = startHeight + (e.clientY - startY);
        if (newHeight > 100) { // Mindesthöhe
            document.getElementById('standalone-editor').style.height = newHeight + 'px';
            standaloneEditor.layout();
        }
    }

    function stopResize() {
        document.removeEventListener('mousemove', resizeEditor);
        document.removeEventListener('mouseup', stopResize);
    }
    
    // Resize-Funktionalität für die Grenze zwischen Editor und Inhalt (horizontal)
    const verticalResizeHandle = document.getElementById('vertical-resize-handle');
    let startX, startWidth, container, editorSidebar, contentArea;

    // Nur auf Desktop-Geräten aktivieren
    if (verticalResizeHandle) {
        verticalResizeHandle.addEventListener('mousedown', function(e) {
            // Nur fortfahren, wenn wir auf einem Desktop-Gerät sind
            if (window.innerWidth < 992) return;
            
            startX = e.clientX;
            container = document.querySelector('.container');
            editorSidebar = document.getElementById('code-editor-sidebar');
            contentArea = document.getElementById('content');
            
            // Aktuelle Breite des Editor-Sidebars ermitteln
            const computedStyle = window.getComputedStyle(editorSidebar);
            startWidth = parseInt(computedStyle.width, 10);
            
            document.addEventListener('mousemove', resizeHorizontal);
            document.addEventListener('mouseup', stopHorizontalResize);
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });
    }

    function resizeHorizontal(e) {
        // Nur fortfahren, wenn wir auf einem Desktop-Gerät sind
        if (window.innerWidth < 992) return;
        
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(200, Math.min(800, startWidth + deltaX)); // Min 200px, Max 800px
        
        // Aktualisiere das Grid-Template
        const sidebarWidth = 250; // Breite der linken Sidebar
        container.style.gridTemplateColumns = `${sidebarWidth}px ${newWidth}px 1fr`;
        
        // Aktualisiere das Layout des Editors
        if (editors['standalone-editor']) {
            editors['standalone-editor'].layout();
        }
    }

    function stopHorizontalResize() {
        document.removeEventListener('mousemove', resizeHorizontal);
        document.removeEventListener('mouseup', stopHorizontalResize);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
}

// Initialisiere den eigenständigen Editor, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', function() {
    initializeStandaloneEditor();
    
    // Überprüfe die Fenstergröße und passe die Anzeige des Resize-Handles an
    function checkWindowSize() {
        const verticalResizeHandle = document.getElementById('vertical-resize-handle');
        if (verticalResizeHandle) {
            if (window.innerWidth < 992) {
                verticalResizeHandle.style.display = 'none';
            } else {
                // Nur anzeigen, wenn der Editor nicht eingeklappt ist
                if (!document.getElementById('code-editor-sidebar').classList.contains('collapsed')) {
                    verticalResizeHandle.style.display = 'block';
                }
            }
        }
    }
    
    // Initial prüfen
    checkWindowSize();
    
    // Bei Größenänderung prüfen
    window.addEventListener('resize', checkWindowSize);
});