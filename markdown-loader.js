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
        // If the cache is empty, initialize it
        if (Object.keys(window.markdownFileCache).length === 0) {
            await window.initializeMarkdownCache();
        }
        
        // Correct the path
        const correctedPath = window.correctPath(filePath);
        console.log(`Attempting to load file: ${correctedPath} (Original: ${filePath})`);
        
        const response = await fetch(correctedPath);
        if (!response.ok) {
            // If the file was not found, try a recursive search
            console.log("File not found, starting recursive search...");
            
            // Extract the file name without path
            const fileName = filePath.split('/').pop();
            
            // Search all chapter directories for the file
            for (let i = 0; i <= 10; i++) {
                const kapitelDir = `${window.DOCS_BASE_DIR}/Kapitel_${i}`;
                const alternativePath = `${kapitelDir}/${fileName}`;
                
                console.log(`Attempting to load alternative file: ${alternativePath}`);
                
                try {
                    const altResponse = await fetch(alternativePath);
                    if (altResponse.ok) {
                        console.log(`File found at: ${alternativePath}`);
                        
                        // Update the cache for future requests
                        window.cacheFilePath(fileName, alternativePath);
                        
                        const markdown = await altResponse.text();
                        window.currentChapter = alternativePath.split('/').pop().replace('.md', '');
                        
                        // Convert markdown to HTML and display it
                        const html = window.parseMarkdown(markdown);
                        document.getElementById('content').innerHTML = html;
                        
                        // Initialize interactive code blocks
                        console.log(`Found ${window.codeBlocks.length} code blocks to initialize`);
                        window.initializeCodeBlocks();
                        
                        // Update active menu item
                        window.updateActiveMenuItem(alternativePath);
                        
                        // Update progress display
                        window.updateProgressUI();
                        
                        // Scroll to the top of the page
                        window.scrollTo(0, 0);
                        
                        return true;
                    }
                } catch (altError) {
                    // Ignore errors and try the next directory
                }
            }
            
            // If the file was not found anywhere, display an error
            throw new Error(`File not found: ${fileName}`);
        }
        
        const markdown = await response.text();
        window.currentChapter = correctedPath.split('/').pop().replace('.md', '');
        
        // Convert markdown to HTML and display it
        const html = window.parseMarkdown(markdown);
        document.getElementById('content').innerHTML = html;
        
        // Initialize interactive code blocks
        console.log(`Found ${window.codeBlocks.length} code blocks to initialize`);
        window.initializeCodeBlocks();
        
        // Update active menu item
        window.updateActiveMenuItem(correctedPath);
        
        // Update progress display
        window.updateProgressUI();
        
        // Scroll to the top of the page
        window.scrollTo(0, 0);
        
        console.log(`File successfully loaded: ${correctedPath}`);
        return true;
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
    
    // Initialize the markdown file cache
    await window.initializeMarkdownCache();
    
    // Create chapter menu from the table of contents file
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