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