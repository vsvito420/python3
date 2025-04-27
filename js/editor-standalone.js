/**
 * Standalone editor functionality for the Python learning platform
 */

/**
 * Initialize the standalone code editor in the sidebar
 */
function initializeStandaloneEditor() {
    // Wait until Monaco Editor is loaded
    if (typeof monaco === 'undefined') {
        setTimeout(initializeStandaloneEditor, 100);
        return;
    }

    // Create the editor
    const standaloneEditor = monaco.editor.create(document.getElementById('standalone-editor'), {
        value: '# Write your Python code here\n\n# Example:\nprint("Hello, World!")',
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

    // Add the editor to the global editors object
    if (typeof window.editors === 'undefined') {
        window.editors = {};
    }
    window.editors['standalone-editor'] = standaloneEditor;

    // Event listener for the Run button
    document.getElementById('standalone-run-button').addEventListener('click', async function() {
        const code = standaloneEditor.getValue();
        const outputElement = document.querySelector('#standalone-output .output-content');
        
        outputElement.textContent = 'Executing code...';
        
        try {
            // Initialize Pyodide if not already done
            if (!window.pyodide) {
                outputElement.textContent = 'Loading Python interpreter...';
                await window.loadPyodideIfNeeded();
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
            outputElement.textContent = stdout || 'Code executed successfully (no output)';
            
            // Reset stdout
            window.pyodide.runPython('sys.stdout = sys.__stdout__');
        } catch (error) {
            outputElement.textContent = `Error: ${error.message}`;
            console.error('Python execution error:', error);
        }
    });

    // Event listener for the Reset button
    document.getElementById('standalone-reset-button').addEventListener('click', function() {
        standaloneEditor.setValue('# Write your Python code here\n\n# Example:\nprint("Hello, World!")');
        document.querySelector('#standalone-output .output-content').textContent = '';
        
        // Add a short animation
        const editorElement = document.getElementById('standalone-editor');
        editorElement.classList.add('reset-flash');
        setTimeout(() => editorElement.classList.remove('reset-flash'), 500);
    });

    // Toggle button for the editor sidebar
    document.getElementById('toggle-editor-sidebar').addEventListener('click', function() {
        const editorSidebar = document.getElementById('code-editor-sidebar');
        const container = document.querySelector('.container');
        
        editorSidebar.classList.toggle('collapsed');
        
        // Toggle editor-hidden class on container for proper padding
        container.classList.toggle('editor-hidden', editorSidebar.classList.contains('collapsed'));
        
        // Update editor layout if it's visible
        if (!editorSidebar.classList.contains('collapsed')) {
            setTimeout(() => {
                standaloneEditor.layout();
                // Restore container padding based on editor height
                const computedStyle = window.getComputedStyle(editorSidebar);
                const height = parseInt(computedStyle.height, 10);
                container.style.paddingBottom = `${height}px`;
            }, 300);
            
            // Make sure the resize handle is visible (only on desktop)
            if (window.innerWidth >= 992) {
                document.getElementById('vertical-resize-handle').style.display = 'block';
            }
        } else {
            // If the editor is collapsed, set minimal padding
            container.style.paddingBottom = '50px';
            
            // WICHTIG: Nicht das Grid-Layout ändern, wenn der Editor ausgeblendet wird
            // Das verursacht das Layout-Problem
        }
    });
}

// Export functions for global access
window.initializeStandaloneEditor = initializeStandaloneEditor;