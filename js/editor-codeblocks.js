/**
 * Code block editor functionality for the Python learning platform
 */

/**
 * Initialize interactive code blocks
 */
function initializeCodeBlocks() {
    // Ensure codeBlocks array exists
    if (!window.codeBlocks) {
        window.codeBlocks = [];
    }
    
    if (!Array.isArray(window.codeBlocks) || window.codeBlocks.length === 0) {
        console.error('codeBlocks array empty or not an array');
        return;
    }
    
    console.log(`Initializing ${window.codeBlocks.length} code blocks`);

    window.codeBlocks.forEach(({ id, code, language }) => {
        const container = document.getElementById(id);
        if (!container) {
            console.error(`Container for code block ${id} not found`);
            return;
        }
        
        console.log(`Initializing code block ${id} with language ${language}`);
        
        // Show the language of the code block
        const languageDisplay = language ? `<div class="language-tag">${language}</div>` : '';
        
        // Create editor container with customized buttons based on language
        let editorButtons = '';
        if (language === 'python') {
            editorButtons = `
                <div class="editor-buttons">
                    <button class="run-button" data-editor="${id}-editor">Code ausführen</button>
                    <button class="reset-button" data-editor="${id}-editor">Zurücksetzen</button>
                </div>
            `;
        } else {
            editorButtons = `
                <div class="editor-buttons">
                    <button class="reset-button" data-editor="${id}-editor">Zurücksetzen</button>
                </div>
            `;
        }
        
        // Create different output containers based on language
        let outputContainer = '';
        if (language === 'python') {
            outputContainer = `
                <div class="output-container" id="${id}-output">
                    <h3>Ausgabe:</h3>
                    <div class="output-content"></div>
                </div>
            `;
        } else {
            outputContainer = `
                <div class="output-container" id="${id}-output" style="display: none;">
                    <div class="output-content"></div>
                </div>
            `;
        }
        
        // Set the HTML content of the container
        container.innerHTML = `
            ${languageDisplay}
            <div class="editor-container">
                <div id="${id}-editor" class="code-editor"></div>
                ${editorButtons}
            </div>
            ${outputContainer}
        `;
        
        // Initialize Monaco Editor
        require(['vs/editor/editor.main'], function() {
            // Determine the language for the editor
            const codeBlock = window.codeBlocks.find(block => block.id === id);
            const language = codeBlock && codeBlock.language ? codeBlock.language : 'python';
            
            // Map Markdown language designations to Monaco editor language designations
            let editorLanguage = 'plaintext';
            if (language === 'python') editorLanguage = 'python';
            else if (language === 'javascript' || language === 'js') editorLanguage = 'javascript';
            else if (language === 'typescript' || language === 'ts') editorLanguage = 'typescript';
            else if (language === 'html') editorLanguage = 'html';
            else if (language === 'css') editorLanguage = 'css';
            else if (language === 'json') editorLanguage = 'json';
            else if (language === 'xml') editorLanguage = 'xml';
            else if (language === 'markdown' || language === 'md') editorLanguage = 'markdown';
            else if (language === 'sql') editorLanguage = 'sql';
            else if (language === 'java') editorLanguage = 'java';
            else if (language === 'c' || language === 'cpp' || language === 'c++') editorLanguage = 'cpp';
            else if (language === 'csharp' || language === 'c#') editorLanguage = 'csharp';
            
            if (!window.editors) {
                window.editors = {};
            }
            
            window.editors[`${id}-editor`] = monaco.editor.create(document.getElementById(`${id}-editor`), {
                value: code,
                language: editorLanguage,
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
    
    // Add event listeners for buttons
    document.querySelectorAll('.run-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            window.runPythonCode(editorId);
        });
    });
    
    document.querySelectorAll('.reset-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            resetEditor(editorId);
        });
    });
    
    // Add event listener for "Mark chapter as completed"
    const markCompletedButton = document.getElementById('mark-completed');
    if (markCompletedButton) {
        markCompletedButton.addEventListener('click', function() {
            window.markChapterAsCompleted(window.currentChapter);
            this.disabled = true;
            this.textContent = 'Kapitel abgeschlossen ✓';
        });
        
        // Check if the chapter is already completed
        if (window.progress && window.progress[window.currentChapter] && window.progress[window.currentChapter].completed) {
            markCompletedButton.disabled = true;
            markCompletedButton.textContent = 'Kapitel abgeschlossen ✓';
        }
    }
}

/**
 * Reset editor to the original code
 * @param {string} editorId - The ID of the editor to reset
 */
function resetEditor(editorId) {
    const originalId = editorId.replace('-editor', '');
    const codeBlock = window.codeBlocks.find(block => block.id === originalId);
    
    if (codeBlock && window.editors && window.editors[editorId]) {
        window.editors[editorId].setValue(codeBlock.code);
        
        // If the language has changed, also update the editor's language
        const editorModel = window.editors[editorId].getModel();
        if (editorModel && codeBlock.language) {
            // Map Markdown language designations to Monaco editor language designations
            let editorLanguage = 'plaintext';
            if (codeBlock.language === 'python') editorLanguage = 'python';
            else if (codeBlock.language === 'javascript' || codeBlock.language === 'js') editorLanguage = 'javascript';
            else if (codeBlock.language === 'typescript' || codeBlock.language === 'ts') editorLanguage = 'typescript';
            else if (codeBlock.language === 'html') editorLanguage = 'html';
            else if (codeBlock.language === 'css') editorLanguage = 'css';
            else if (codeBlock.language === 'json') editorLanguage = 'json';
            else if (codeBlock.language === 'xml') editorLanguage = 'xml';
            else if (codeBlock.language === 'markdown' || codeBlock.language === 'md') editorLanguage = 'markdown';
            else if (codeBlock.language === 'sql') editorLanguage = 'sql';
            else if (codeBlock.language === 'java') editorLanguage = 'java';
            else if (codeBlock.language === 'c' || codeBlock.language === 'cpp' || codeBlock.language === 'c++') editorLanguage = 'cpp';
            else if (codeBlock.language === 'csharp' || codeBlock.language === 'c#') editorLanguage = 'csharp';
            
            monaco.editor.setModelLanguage(editorModel, editorLanguage);
        }
    }
}

// Export functions for global access
window.initializeCodeBlocks = initializeCodeBlocks;
window.resetEditor = resetEditor;