// Global variables
let pyodide = null;
let editors = {};
let defaultCode = {
    editor1: 'print("Hello, World!")',
    editor2: '# Create variables of different types\nname = "Python Learner"\nage = 25\nis_coding = True\n\n# Print the variables\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Is coding: {is_coding}")'
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize Monaco editors
    initializeEditors();
    
    // Initialize Pyodide
    await initializePyodide();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize Monaco editors
function initializeEditors() {
    require(['vs/editor/editor.main'], function() {
        // Create editors for each lesson
        document.querySelectorAll('.code-editor').forEach(editorElement => {
            const editorId = editorElement.id;
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
                insertSpaces: true
            });
        });
    });
}

// Initialize Pyodide
async function initializePyodide() {
    try {
        // Show loading message
        document.querySelectorAll('.output-content').forEach(output => {
            output.textContent = 'Loading Python environment...';
        });
        
        // Load Pyodide
        pyodide = await loadPyodide();
        
        // Update loading message
        document.querySelectorAll('.output-content').forEach(output => {
            output.textContent = 'Python environment loaded successfully!';
        });
        
        console.log('Pyodide loaded successfully');
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        document.querySelectorAll('.output-content').forEach(output => {
            output.textContent = 'Error loading Python environment. Please refresh the page.';
        });
    }
}

// Set up event listeners
function setupEventListeners() {
    // Toggle sidebar
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    toggleSidebarButton.addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    });
    
    // Run code buttons
    document.querySelectorAll('.run-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            runPythonCode(editorId);
        });
    });
    
    // Reset code buttons
    document.querySelectorAll('.reset-button').forEach(button => {
        button.addEventListener('click', function() {
            const editorId = this.getAttribute('data-editor');
            resetEditor(editorId);
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
        });
    });
}

// Run Python code
async function runPythonCode(editorId) {
    if (!pyodide) {
        alert('Python environment is not loaded yet. Please wait.');
        return;
    }
    
    const code = editors[editorId].getValue();
    const outputId = editorId.replace('editor', 'output');
    const outputElement = document.querySelector(`#${outputId} .output-content`);
    
    outputElement.textContent = 'Running...';
    
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
        console.error('Python execution error:', error);
        outputElement.textContent = `Error: ${error.message}`;
    }
}

// Reset editor to default code
function resetEditor(editorId) {
    if (editors[editorId]) {
        editors[editorId].setValue(defaultCode[editorId] || '# Write your Python code here');
    }
}

// Navigate to a specific lesson
function navigateToLesson(lessonId) {
    // Hide all lessons
    document.querySelectorAll('.lesson-container').forEach(lesson => {
        lesson.classList.add('hidden');
    });
    
    // Show the target lesson
    const targetLesson = document.getElementById(lessonId);
    if (targetLesson) {
        targetLesson.classList.remove('hidden');
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
}