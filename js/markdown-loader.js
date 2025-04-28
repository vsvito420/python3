/**
 * Markdown loader for the Python learning platform
 * Loads markdown files and converts them to interactive HTML content
 */

// No need to declare local variables that are already in window object

/**
 * Load a markdown file and convert it to HTML
 * @param {string} filePath - The path of the markdown file to load
 * @returns {Promise<boolean>} - Whether the file was successfully loaded
 */
async function loadMarkdownFile(filePath) {
    try {
        // If the cache is empty, initialize it (minimal mode)
        if (!window.markdownFileCache || Object.keys(window.markdownFileCache).length === 0) {
            // Ensure cache exists before calling initialize
            window.markdownFileCache = {};
            // Make sure initializeMarkdownCache is defined and awaitable
            if (window.initializeMarkdownCache) {
                await window.initializeMarkdownCache();
            } else {
                console.warn("window.initializeMarkdownCache not found. Skipping cache initialization.");
            }
        }

        // Ensure DOCS_BASE_DIR is defined
        if (typeof window.DOCS_BASE_DIR === 'undefined') {
            window.DOCS_BASE_DIR = 'python-docs';
            console.warn("window.DOCS_BASE_DIR was not defined. Defaulting to 'python-docs'.");
        }

        // Correct the path (ensure correctPath is defined)
        const correctedPath = window.correctPath ? window.correctPath(filePath) : filePath; // Added fallback
        console.log(`Attempting to load file: ${correctedPath} (Original: ${filePath})`);

        // Try to load the file directly
        let response;
        let foundPath = correctedPath;

        try {
            response = await fetch(correctedPath);
        } catch (fetchError) {
            console.error(`Fetch error for ${correctedPath}:`, fetchError);
            response = { ok: false };
        }

        // If the file was not found, try to find it in the chapters
        if (!response.ok) {
            console.log("File not found, searching in chapters...");

            // Extract the file name without path
            const fileName = filePath.split('/').pop();

            // Try direct path with base directory
            const directPath = `${window.DOCS_BASE_DIR}/${fileName}`;
            console.log(`Trying direct path: ${directPath}`);

            try {
                response = await fetch(directPath);
                if (response.ok) {
                    foundPath = directPath;
                    console.log(`File found at direct path: ${directPath}`);
                }
            } catch (directFetchError) {
                console.error(`Fetch error for direct path ${directPath}:`, directFetchError);
            }

            // If still not found, search in chapter directories
            if (!response.ok) {
                // Search for the file in all chapter directories (ensure findFileInChapters exists)
                let alternativePath = null;
                if (window.findFileInChapters) {
                    alternativePath = await window.findFileInChapters(fileName);
                } else {
                    console.warn("window.findFileInChapters not found. Cannot search chapters.");
                }

                if (alternativePath) {
                    console.log(`File found at: ${alternativePath}`);
                    try {
                        response = await fetch(alternativePath);
                        foundPath = alternativePath;
                    } catch (altFetchError) {
                        console.error(`Fetch error for alternative path ${alternativePath}:`, altFetchError);
                        response = { ok: false };
                    }
                } else {
                    // If the file was not found anywhere, display an error
                    throw new Error(`File not found: ${fileName}`);
                }
            }
        }

        // If we have a valid response, process the file
        if (response.ok) {
            const markdown = await response.text();
            window.currentChapter = foundPath.split('/').pop().replace('.md', '');

            // Convert markdown to HTML and display it USING THE NEW PARSER
            try {
                const html = window.parseMarkdown(markdown); // Uses the new function
                document.getElementById('content').innerHTML = html;
            } catch (parseError) {
                console.error('Error parsing markdown:', parseError);
                document.getElementById('content').innerHTML = `
                    <div class="error-container">
                        <h2>Error Loading Content</h2>
                        <p>There was an error processing the markdown content. Please try again or contact support.</p>
                        <pre>${parseError.message}</pre>
                    </div>
                `;
                return false;
            }

            // Initialize interactive code blocks (ensure initializeCodeBlocks and codeBlocks exist)
            if (window.initializeCodeBlocks && window.codeBlocks) {
                console.log(`Found ${window.codeBlocks.length} code blocks to initialize`);
                window.initializeCodeBlocks();
            } else {
                console.warn("window.initializeCodeBlocks or window.codeBlocks not found. Skipping code block initialization.");
            }

            // Update active menu item (ensure updateActiveMenuItem exists)
            if (window.updateActiveMenuItem) {
                window.updateActiveMenuItem(foundPath);
            }

            // Update progress display (ensure updateProgressUI exists)
            if (window.updateProgressUI) {
                window.updateProgressUI();
            }

            // Scroll to the top of the page
            window.scrollTo(0, 0);

            // Update scroll navigation
            if (window.updateScrollNavigationOnLoad) {
                window.updateScrollNavigationOnLoad();
            }

            console.log(`File successfully loaded: ${foundPath}`);
            return true;
        } else {
            throw new Error(`Failed to load file: ${foundPath}`);
        }
    } catch (error) {
        console.error('Error loading markdown file:', error);
        const contentElement = document.getElementById('content');
        if (contentElement) { // Check if element exists before modifying
            contentElement.innerHTML = `
                <div class="error-message">
                    <h2>Fehler beim Laden des Inhalts</h2>
                    <p>${error.message || 'Unbekannter Fehler'}</p>
                    <div class="error-details">
                        <p>Versuchter Pfad: ${window.correctPath ? window.correctPath(filePath) : filePath}</p>
                        <p>Ursprünglicher Pfad: ${filePath}</p>
                    </div>
                    <button onclick="window.loadMarkdownFile && window.loadMarkdownFile('${window.DOCS_BASE_DIR || '.'}/Kapitel_0/Anfang_Lese_Mich.md')">
                        Zurück zur Hauptseite
                    </button>
                </div>
            `;
        }
        return false;
    }
}

/**
 * Initialize the application
 */
async function initializeApp() {
    // Define DOCS_BASE_DIR if not already defined
    if (typeof window.DOCS_BASE_DIR === 'undefined') {
        window.DOCS_BASE_DIR = 'python-docs'; // Set to the correct base directory
        console.warn("window.DOCS_BASE_DIR was not defined. Defaulting to 'python-docs'.");
    }

    // Load saved progress (ensure loadProgress exists)
    if(window.loadProgress) {
        window.loadProgress();
    }

    console.log("Initializing application...");

    // Initialize the markdown file cache (minimal mode)
    if (!window.markdownFileCache) window.markdownFileCache = {};
    if (window.initializeMarkdownCache) {
        try {
            await window.initializeMarkdownCache();
        } catch (error) {
            console.error("Error initializing markdown cache:", error);
            // Continue with initialization even if cache fails
        }
    } else {
        console.warn("window.initializeMarkdownCache not found during app init.");
    }

    // Check if editor is collapsed and set container class accordingly
    const editorSidebar = document.getElementById('code-editor-sidebar');
    const container = document.querySelector('.container');
    if (editorSidebar && container) {
        if (editorSidebar.classList.contains('collapsed')) {
            container.classList.add('editor-hidden');
            container.style.paddingBottom = '50px';
        }
    }

    // Load the main page
    try {
        const mainPagePath = `${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md`;
        console.log(`Loading main page from: ${mainPagePath}`);

        const success = await loadMarkdownFile(mainPagePath);

        if (success) {
            console.log("Main page successfully loaded, creating sidebar menu...");
            // Extract links from the table of contents and create sidebar menu (ensure createSidebarMenu exists)
            if(window.createSidebarMenu) {
                window.createSidebarMenu();
            } else {
                console.warn("window.createSidebarMenu not found. Cannot create sidebar.");
            }
        } else {
            console.error("Error loading main page");
            // Try to load with a direct fetch as a last resort
            try {
                const response = await fetch(mainPagePath);
                if (response.ok) {
                    const markdown = await response.text();
                    const html = window.parseMarkdown ? window.parseMarkdown(markdown) : markdown;
                    document.getElementById('content').innerHTML = html;
                    console.log("Main page loaded with direct fetch");
                }
            } catch (directError) {
                console.error("Failed to load main page with direct fetch:", directError);
            }
        }
    } catch (error) {
        console.error("Error initializing application:", error);
        // Display error message to the user
        const contentElement = document.getElementById('content');
        if (contentElement) {
            contentElement.innerHTML = `
                <div class="error-message">
                    <h2>Fehler beim Initialisieren der Anwendung</h2>
                    <p>${error.message || 'Unbekannter Fehler'}</p>
                    <p>Bitte laden Sie die Seite neu oder kontaktieren Sie den Support.</p>
                </div>
            `;
        }
    }
}

// Export functions for global access (if not already done implicitly by assigning to window)
window.loadMarkdownFile = loadMarkdownFile;
window.initializeApp = initializeApp;

// --- Ensure essential dependencies are at least stubbed if not defined ---
// These functions are called by the provided code but not defined within it.
// If they exist elsewhere, these are not needed. If not, provide dummy versions.
if (!window.correctPath) {
    console.warn("Defining stub for window.correctPath");
    window.correctPath = (path) => path; // Simple pass-through
}
if (!window.findFileInChapters) {
     console.warn("Defining stub for window.findFileInChapters");
    window.findFileInChapters = async (fileName) => null; // Default: not found
}
if (!window.initializeMarkdownCache) {
    console.warn("Defining stub for window.initializeMarkdownCache");
    window.initializeMarkdownCache = async () => { window.markdownFileCache = {}; }; // Init empty cache
}
if (!window.initializeCodeBlocks) {
    console.warn("Defining stub for window.initializeCodeBlocks");
    window.initializeCodeBlocks = () => {};
}
if (!window.codeBlocks) {
    console.warn("Defining stub for window.codeBlocks");
    window.codeBlocks = [];
}
if (!window.updateActiveMenuItem) {
    console.warn("Defining stub for window.updateActiveMenuItem");
    window.updateActiveMenuItem = (path) => {};
}
if (!window.updateProgressUI) {
     console.warn("Defining stub for window.updateProgressUI");
    window.updateProgressUI = () => {};
}
if (!window.loadProgress) {
    console.warn("Defining stub for window.loadProgress");
    window.loadProgress = () => {};
}
if (!window.createSidebarMenu) {
    console.warn("Defining stub for window.createSidebarMenu");
    window.createSidebarMenu = () => {};
}


// --- Initialization ---
// It's generally better to call initializeApp after the DOM is ready
// Or ensure this script is loaded at the end of the body
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp(); // DOMContentLoaded has already fired
}