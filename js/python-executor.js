/**
 * Python code execution functionality for the Python learning platform
 */

/**
 * Execute Python code
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
    
    outputElement.textContent = 'Ausführung...';
    
    try {
        // Load Pyodide if not already loaded
        try {
            await window.loadPyodideIfNeeded();
        } catch (error) {
            outputElement.textContent = `Fehler beim Laden der Python-Umgebung: ${error.message}`;
            return;
        }
        
        // Redirect standard output
        window.pyodide.runPython(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
        `);
        
        // Execute the code
        await window.pyodide.runPythonAsync(code);
        
        // Get the output
        const stdout = window.pyodide.runPython('sys.stdout.getvalue()');
        
        // Display the output
        outputElement.textContent = stdout || 'Code erfolgreich ausgeführt (keine Ausgabe)';
        
        // Reset stdout
        window.pyodide.runPython('sys.stdout = sys.__stdout__');
    } catch (error) {
        console.error('Python execution error:', error);
        outputElement.textContent = `Fehler: ${error.message}`;
    }
}

// Export functions for global access
window.runPythonCode = runPythonCode;