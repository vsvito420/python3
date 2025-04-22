/**
 * Main entry point for the Python learning platform
 * This file initializes all modules and sets up event listeners
 */

// Global variables
window.currentChapter = '';
window.progress = {};
window.codeBlocks = []; // Important: This array is used across multiple modules
window.editors = {};
window.markdownFileCache = {}; // Cache for found markdown files

// Base directory for documentation
window.DOCS_BASE_DIR = 'python-docs';

/**
 * Initialize the application when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    if (typeof window.initializeApp === 'function') {
        window.initializeApp();
        
        // Let the initializeApp function handle loading the initial file
    } else {
        console.error('initializeApp function not found. Make sure markdown-loader.js is loaded correctly.');
    }
    
    // Initialize the standalone editor
    window.initializeStandaloneEditor();
    
    // Initialize editor resize functionality
    window.initializeEditorResize();
    
    // Initialize sidebar toggle functionality
    window.initializeSidebarToggle();
    
    // Initialize hover navigation
    if (typeof window.initializeHoverNavigation === 'function') {
        window.initializeHoverNavigation();
    } else {
        console.warn('initializeHoverNavigation function not found. Hover navigation will not be available.');
    }
    
    // Check window size and adjust resize handle display
    window.checkWindowSize();
    
    // Check if editor is collapsed and set container class accordingly
    const editorSidebar = document.getElementById('code-editor-sidebar');
    const container = document.querySelector('.container');
    if (editorSidebar && container) {
        if (editorSidebar.classList.contains('collapsed')) {
            container.classList.add('editor-hidden');
            container.style.paddingBottom = '50px';
        }
    }
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        // Update sidebar state
        window.setInitialSidebarState();
        
        // Check window size for resize handle
        window.checkWindowSize();
        
        // Update editor layouts
        window.debounce(function() {
            if (window.editors) {
                Object.values(window.editors).forEach(editor => {
                    if (editor && typeof editor.layout === 'function') {
                        editor.layout();
                    }
                });
            }
        }, 100)();
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter or Cmd+Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            // Find the active editor
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
});

/**
 * Log a message about the modular structure
 */
console.log('Python learning platform initialized with modular structure');