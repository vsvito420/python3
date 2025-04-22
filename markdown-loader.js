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
        if (Object.keys(window.markdownFileCache).length === 0) {
            await window.initializeMarkdownCache();
        }
        
        // Correct the path
        const correctedPath = window.correctPath(filePath);
        console.log(`Attempting to load file: ${correctedPath} (Original: ${filePath})`);
        
        // Try to load the file directly
        let response = await fetch(correctedPath);
        let foundPath = correctedPath;
        
        // If the file was not found, try to find it in the chapters
        if (!response.ok) {
            console.log("File not found, searching in chapters...");
            
            // Extract the file name without path
            const fileName = filePath.split('/').pop();
            
            // Search for the file in all chapter directories
            const alternativePath = await window.findFileInChapters(fileName);
            
            if (alternativePath) {
                console.log(`File found at: ${alternativePath}`);
                response = await fetch(alternativePath);
                foundPath = alternativePath;
            } else {
                // If the file was not found anywhere, display an error
                throw new Error(`File not found: ${fileName}`);
            }
        }
        
        // If we have a valid response, process the file
        if (response.ok) {
            const markdown = await response.text();
            window.currentChapter = foundPath.split('/').pop().replace('.md', '');
            
            // Convert markdown to HTML and display it
            const html = window.parseMarkdown(markdown);
            document.getElementById('content').innerHTML = html;
            
            // Initialize interactive code blocks
            console.log(`Found ${window.codeBlocks.length} code blocks to initialize`);
            window.initializeCodeBlocks();
            
            // Update active menu item
            window.updateActiveMenuItem(foundPath);
            
            // Update progress display
            window.updateProgressUI();
            
            // Scroll to the top of the page
            window.scrollTo(0, 0);
            
            console.log(`File successfully loaded: ${foundPath}`);
            return true;
        } else {
            throw new Error(`Failed to load file: ${foundPath}`);
        }
    } catch (error) {
        console.error('Error loading markdown file:', error);
        document.getElementById('content').innerHTML = `
            <div class="error-message">
                <h2>Fehler beim Laden des Inhalts</h2>
                <p>${error.message}</p>
                <div class="error-details">
                    <p>Versuchter Pfad: ${window.correctPath(filePath)}</p>
                    <p>Ursprünglicher Pfad: ${filePath}</p>
                </div>
                <button onclick="loadMarkdownFile('${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md')">
                    Zurück zur Hauptseite
                </button>
            </div>
        `;
        return false;
    }
}

/**
 * Initialize the application
 */
async function initializeApp() {
    // Load saved progress
    window.loadProgress();
    
    console.log("Initializing application...");
    
    // Initialize the markdown file cache (minimal mode)
    await window.initializeMarkdownCache();
    
    // Load the main page
    loadMarkdownFile(`${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md`)
        .then(success => {
            if (success) {
                console.log("Main page successfully loaded, creating sidebar menu...");
                // Extract links from the table of contents and create sidebar menu
                window.createSidebarMenu();
            } else {
                console.error("Error loading main page");
            }
        })
        .catch(error => {
            console.error("Error initializing application:", error);
        });
}

// Export functions for global access
window.loadMarkdownFile = loadMarkdownFile;
window.initializeApp = initializeApp;