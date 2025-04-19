/**
 * Python Learning Platform JavaScript
 * Handles editor initialization, Python execution, and UI interactions
 */

// Global variables
let pyodide = null;
let editors = {};
let pyodideLoading = false;
let activeLesson = 'lesson1';

// Default code examples for each lesson
const defaultCode = {
    editor1: 'print("Hello, World!")',
    editor2: '# Create variables of different types\nname = "Python Learner"\nage = 25\nis_coding = True\n\n# Print the variables\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Is coding: {is_coding}")'
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Monaco editors first (faster initial load)
    initializeEditors();
    
    // Set up event listeners
    setupEventListeners();
    
    // Lazy load Pyodide only when needed
    const visibleLesson = document.querySelector('.lesson-container:not(.hidden)');
    if (visibleLesson) {
        activeLesson = visibleLesson.id;
    }
});

/**
 * Initialize Monaco editors with optimized settings
 */
function initializeEditors() {
    require(['vs/editor/editor.main'], function() {
        // Create editors for each lesson
        document.querySelectorAll('.code-editor').forEach(editorElement => {
            const editorId = editorElement.id;
            
            // Only initialize visible editors immediately for better performance
            const parentLesson = editorElement.closest('.lesson-container');
            const isVisible = !parentLesson.classList.contains('hidden');
            
            if (isVisible || Object.keys(editors).length < 2) { // Always initialize at least first two editors
                createEditor(editorElement, editorId);
            }
        });
    });
}

/**
 * Create a Monaco editor instance
 */
function createEditor(editorElement, editorId) {
    if (editors[editorId]) return; // Prevent duplicate initialization
    
    editors[editorId] = monaco.editor.create(editorElement, {
        value: defaultCode[editorId] || '# Write your Python code here',
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
        wordWrap: 'on', // Better for mobile
        accessibilitySupport: 'on'
    });
    
    // Ensure proper sizing
    setTimeout(() => {
        if (editors[editorId]) {
            editors[editorId].layout();
        }
    }, 100);
}

/**
 * Initialize Pyodide when needed
 */
async function loadPyodideIfNeeded() {
    if (pyodide !== null) {
        return pyodide; // Already loaded
    }
    
    if (pyodideLoading) {
        // Wait for existing loading process to complete
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(() => {
                if (pyodide !== null) {
                    clearInterval(checkInterval);
                    resolve(pyodide);
                } else if (!pyodideLoading) {
                    clearInterval(checkInterval);
                    reject(new Error("Pyodide loading failed"));
                }
            }, 100);
        });
    }
    
    pyodideLoading = true;
    
    try {
        // Show loading message only in the active lesson
        const activeOutputContent = document.querySelector(`#${activeLesson} .output-content`);
        if (activeOutputContent) {
            activeOutputContent.textContent = 'Loading Python environment...';
        }
        
        // Add loading indicator to run buttons
        document.querySelectorAll('.run-button').forEach(button => {
            button.disabled = true;
            button.textContent = 'Loading...';
        });
        
        // Check if loadPyodide is available (should be since we removed defer)
        if (typeof loadPyodide !== 'function') {
            throw new Error('Pyodide library not loaded properly. Please refresh the page.');
        }
        
        // Load Pyodide
        pyodide = await loadPyodide();
        
        // Update UI
        if (activeOutputContent) {
            activeOutputContent.textContent = 'Python environment loaded successfully!';
        }
        
        document.querySelectorAll('.run-button').forEach(button => {
            button.disabled = false;
            button.textContent = 'Run Code';
        });
        
        console.log('Pyodide loaded successfully');
        return pyodide;
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        
        const activeOutputContent = document.querySelector(`#${activeLesson} .output-content`);
        if (activeOutputContent) {
            activeOutputContent.textContent = `Error loading Python environment: ${error.message}. Please refresh the page.`;
        }
        
        document.querySelectorAll('.run-button').forEach(button => {
            button.disabled = false;
            button.textContent = 'Run Code';
        });
        
        pyodideLoading = false;
        throw error;
    }
}

/**
 * Set up event listeners with improved handling
 */
function setupEventListeners() {
    // Toggle sidebar (desktop)
    const toggleSidebarDesktop = document.getElementById('toggle-sidebar-desktop');
    if (toggleSidebarDesktop) {
        toggleSidebarDesktop.addEventListener('click', toggleSidebar);
    }
    
    // Toggle sidebar (mobile)
    const toggleSidebarMobile = document.getElementById('toggle-sidebar-mobile');
    if (toggleSidebarMobile) {
        toggleSidebarMobile.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('toggle-sidebar-mobile');
        
        if (window.innerWidth < 992 &&
            sidebar &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) &&
            sidebarToggle !== event.target) {
            sidebar.classList.remove('active');
        }
    });
    
    // Run code buttons with debounce
    document.querySelectorAll('.run-button').forEach(button => {
        button.addEventListener('click', debounce(function() {
            const editorId = this.getAttribute('data-editor');
            runPythonCode(editorId);
        }, 300));
    });
    
    // Reset code buttons
    document.querySelectorAll('.reset-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            if (confirm('Are you sure you want to reset your code?')) {
                resetEditor(editorId);
            }
        });
    });
    
    // Navigation buttons
    document.querySelectorAll('.next-button, .prev-button').forEach(button => {
        button.addEventListener('click', function() {
            const nextLessonId = this.getAttribute('data-next');
            const prevLessonId = this.getAttribute('data-prev');
            const targetLessonId = nextLessonId || prevLessonId;
            
            if (targetLessonId) {
                navigateToLesson(targetLessonId);
            }
        });
    });
    
    // Sidebar navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetLessonId = this.getAttribute('href').substring(1);
            navigateToLesson(targetLessonId);
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth < 992) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter or Cmd+Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeLesson = document.querySelector('.lesson-container:not(.hidden)');
            if (activeLesson) {
                const runButton = activeLesson.querySelector('.run-button');
                if (runButton) {
                    runButton.click();
                    e.preventDefault();
                }
            }
        }
    });
    
    // Handle window resize for editor layout
    window.addEventListener('resize', debounce(function() {
        Object.values(editors).forEach(editor => {
            editor.layout();
        });
    }, 100));
}

/**
 * Toggle sidebar visibility
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

/**
 * Debounce function to limit how often a function can be called
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
 * Run Python code with improved error handling and timeout protection
 */
async function runPythonCode(editorId) {
    // Ensure editor exists
    if (!editors[editorId]) {
        console.error(`Editor ${editorId} not found`);
        return;
    }
    
    // Get code and output elements
    const code = editors[editorId].getValue();
    const outputId = editorId.replace('editor', 'output');
    const outputElement = document.querySelector(`#${outputId} .output-content`);
    const runButton = document.querySelector(`[data-editor="${editorId}"].run-button`);
    
    if (!outputElement) {
        console.error(`Output element for ${editorId} not found`);
        return;
    }
    
    // Show loading state
    outputElement.textContent = 'Running...';
    if (runButton) {
        runButton.disabled = true;
        runButton.textContent = 'Running...';
    }
    
    try {
        // Load Pyodide if not already loaded
        if (!pyodide) {
            try {
                await loadPyodideIfNeeded();
            } catch (error) {
                outputElement.textContent = `Failed to load Python environment: ${error.message}`;
                if (runButton) {
                    runButton.disabled = false;
                    runButton.textContent = 'Run Code';
                }
                return;
            }
        }
        
        // Set execution timeout
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Execution timed out (10s limit)')), 10000);
        });
        
        // Execute with timeout protection
        await Promise.race([
            executeCode(code, outputElement),
            timeoutPromise
        ]);
    } catch (error) {
        console.error('Python execution error:', error);
        outputElement.textContent = `Error: ${error.message}`;
    } finally {
        // Reset button state
        if (runButton) {
            runButton.disabled = false;
            runButton.textContent = 'Run Code';
        }
    }
}

/**
 * Execute Python code and capture output
 */
async function executeCode(code, outputElement) {
    try {
        // Redirect stdout to capture print statements
        pyodide.runPython(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
        `);
        
        // Run the user's code
        await pyodide.runPythonAsync(code);
        
        // Get the captured output
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        
        // Display the output
        outputElement.textContent = stdout || 'Code executed successfully (no output)';
        
        // Reset stdout
        pyodide.runPython('sys.stdout = sys.__stdout__');
    } catch (error) {
        // Format Python errors to be more readable
        let errorMessage = error.message;
        
        // Clean up common Python error messages
        if (errorMessage.includes('Traceback')) {
            const lastLine = errorMessage.split('\n').filter(line => line.trim()).pop();
            errorMessage = lastLine || errorMessage;
        }
        
        throw new Error(errorMessage);
    }
}

/**
 * Reset editor to default code with animation
 */
function resetEditor(editorId) {
    if (editors[editorId]) {
        // Add visual feedback for reset
        const editorElement = document.getElementById(editorId);
        if (editorElement) {
            editorElement.classList.add('reset-flash');
            setTimeout(() => {
                editorElement.classList.remove('reset-flash');
            }, 500);
        }
        
        editors[editorId].setValue(defaultCode[editorId] || '# Write your Python code here');
    }
}

/**
 * Navigate to a specific lesson with lazy loading of editors
 */
function navigateToLesson(lessonId) {
    // Update active lesson tracking
    activeLesson = lessonId;
    
    // Hide all lessons
    document.querySelectorAll('.lesson-container').forEach(lesson => {
        lesson.classList.add('hidden');
    });
    
    // Show the target lesson
    const targetLesson = document.getElementById(lessonId);
    if (targetLesson) {
        targetLesson.classList.remove('hidden');
        
        // Initialize editor if it hasn't been initialized yet
        const editorElement = targetLesson.querySelector('.code-editor');
        if (editorElement) {
            const editorId = editorElement.id;
            if (!editors[editorId]) {
                createEditor(editorElement, editorId);
            }
        }
    }
    
    // Update active state in sidebar
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll(`.sidebar-menu a[href="#${lessonId}"]`).forEach(link => {
        link.parentElement.classList.add('active');
    });
    
    // Resize editors to ensure proper rendering
    Object.values(editors).forEach(editor => {
        editor.layout();
    });
    
    // Update URL hash for bookmarking
    window.location.hash = lessonId;
}

/**
 * Add CSS for editor reset animation
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
    `;
    document.head.appendChild(style);
})();