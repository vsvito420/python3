/**
 * Python code execution functionality for the Python learning platform
 * Improved with better error handling and user feedback
 */

/**
 * Format Python error messages to be more user-friendly
 * @param {string} errorMessage - The original error message
 * @returns {string} - A more user-friendly error message
 */
function formatPythonError(errorMessage) {
    // Common Python errors and their user-friendly explanations
    const errorPatterns = [
        { regex: /NameError: name '(.+)' is not defined/, friendly: "NameError: Die Variable '$1' wurde nicht definiert. Überprüfe die Schreibweise oder ob die Variable vor der Verwendung initialisiert wurde." },
        { regex: /TypeError: (.+)/, friendly: "TypeError: Typfehler - $1. Überprüfe die Datentypen deiner Variablen." },
        { regex: /SyntaxError: (.+)/, friendly: "SyntaxError: Syntaxfehler - $1. Überprüfe die Syntax deines Codes." },
        { regex: /IndexError: (.+)/, friendly: "IndexError: Indexfehler - $1. Überprüfe, ob du auf einen gültigen Index zugreifst." },
        { regex: /KeyError: (.+)/, friendly: "KeyError: Schlüsselfehler - $1. Überprüfe, ob der Schlüssel im Dictionary existiert." },
        { regex: /ValueError: (.+)/, friendly: "ValueError: Wertfehler - $1. Überprüfe die Werte, die du verwendest." },
        { regex: /ZeroDivisionError: (.+)/, friendly: "ZeroDivisionError: Division durch Null - $1. Überprüfe deine Divisionsoperationen." }
    ];

    // Try to match the error with a pattern and return a friendly message
    for (const pattern of errorPatterns) {
        const match = errorMessage.match(pattern.regex);
        if (match) {
            return pattern.friendly.replace('$1', match[1]);
        }
    }

    // If no pattern matches, return the original error message
    return errorMessage;
}

/**
 * Execute Python code with improved error handling
 * @param {string} editorId - The ID of the editor containing the code
 * @returns {Promise<void>}
 */
async function runPythonCode(editorId) {
    if (!window.editors || !window.editors[editorId]) {
        console.error(`Editor ${editorId} not found`);
        return;
    }

    const code = window.editors[editorId].getValue();
    const outputId = editorId.replace('editor', 'output');
    const outputElement = document.querySelector(`#${outputId} .output-content`);

    if (!outputElement) {
        console.error(`Output element for ${editorId} not found`);
        return;
    }

    // Find the associated code block to determine the language
    const originalId = editorId.replace('-editor', '');
    const codeBlock = window.codeBlocks.find(block => block.id === originalId);
    const language = codeBlock && codeBlock.language ? codeBlock.language : 'python';

    console.log(`Executing code for editor ${editorId}, language: ${language}`);

    // If it's not Python code, show a note and abort
    if (language !== 'python') {
        // Show the output container if it's hidden
        const outputContainer = document.getElementById(outputId);
        if (outputContainer) {
            outputContainer.style.display = 'block';
        }

        outputElement.textContent = `Hinweis: Ausführung ist nur für Python-Code verfügbar. Dieser Code ist in der Sprache "${language}" geschrieben und wird nur angezeigt.`;
        return;
    }

    // Show loading indicator
    outputElement.innerHTML = '<div class="loading">Ausführung</div>';

    // Show the output container if it's hidden
    const outputContainer = document.getElementById(outputId);
    if (outputContainer) {
        outputContainer.style.display = 'block';
    }

    try {
        // Load Pyodide if not already loaded
        try {
            await window.loadPyodideIfNeeded();
        } catch (error) {
            console.error('Error loading Pyodide:', error);
            outputElement.innerHTML = `<div class="error">Fehler beim Laden der Python-Umgebung: ${error.message}</div>`;
            return;
        }

        // Redirect standard output and error
        window.pyodide.runPython(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
            sys.stderr = StringIO()
        `);

        // Execute the code with timeout protection
        const executionPromise = window.pyodide.runPythonAsync(code);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Zeitüberschreitung: Die Ausführung wurde nach 10 Sekunden abgebrochen.')), 10000);
        });

        await Promise.race([executionPromise, timeoutPromise]);

        // Get the output and errors
        const stdout = window.pyodide.runPython('sys.stdout.getvalue()');
        const stderr = window.pyodide.runPython('sys.stderr.getvalue()');

        // Reset stdout and stderr
        window.pyodide.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__');

        // Display the output or error
        if (stderr && stderr.trim()) {
            outputElement.innerHTML = `<div class="error">${formatPythonError(stderr)}</div>`;
        } else {
            outputElement.innerHTML = stdout ?
                `<div class="success">${stdout}</div>` :
                '<div class="success">Code erfolgreich ausgeführt (keine Ausgabe)</div>';
        }
    } catch (error) {
        console.error('Python execution error:', error);
        outputElement.innerHTML = `<div class="error">${formatPythonError(error.message)}</div>`;
    }
}

// Export functions for global access
window.runPythonCode = runPythonCode;