/**
 * Markdown file caching functionality for the Python learning platform
 */

// Using global variables defined in main.js

/**
 * Initialize the markdown file cache through recursive search
 */
async function initializeMarkdownCache() {
    console.log("Initializing markdown file cache...");
    
    // Reset the cache
    window.markdownFileCache = {};
    
    // Start the recursive search in the base directory
    await scanDirectoryRecursively(window.DOCS_BASE_DIR);
    
    console.log("Markdown file cache initialized:", window.markdownFileCache);
}

/**
 * Scan a directory recursively for markdown files
 * @param {string} directory - The directory to scan
 */
async function scanDirectoryRecursively(directory) {
    console.log(`Scanning directory: ${directory}`);
    
    try {
        // List all chapter directories
        const kapitelDirs = [
            `${window.DOCS_BASE_DIR}/Kapitel_0`,
            `${window.DOCS_BASE_DIR}/Kapitel_1`,
            `${window.DOCS_BASE_DIR}/Kapitel_2`,
            `${window.DOCS_BASE_DIR}/Kapitel_3`,
            `${window.DOCS_BASE_DIR}/Kapitel_4`,
            `${window.DOCS_BASE_DIR}/Kapitel_5`,
            `${window.DOCS_BASE_DIR}/Kapitel_6`,
            `${window.DOCS_BASE_DIR}/Kapitel_7`,
            `${window.DOCS_BASE_DIR}/Kapitel_8`,
            `${window.DOCS_BASE_DIR}/Kapitel_9`,
            `${window.DOCS_BASE_DIR}/Kapitel_10`
        ];
        
        // Search each chapter directory
        for (const kapitelDir of kapitelDirs) {
            await scanKapitelDirectory(kapitelDir);
        }
        
        // Also scan the main directory
        await scanKapitelDirectory(window.DOCS_BASE_DIR);
        
    } catch (error) {
        console.error(`Error scanning directory ${directory}:`, error);
    }
}

/**
 * Scan a chapter directory for markdown files
 * @param {string} directory - The chapter directory to scan
 */
async function scanKapitelDirectory(directory) {
    // List of known markdown files in this directory
    const knownFiles = [
        "Anfang_Lese_Mich.md",
        "Erste_Schritte_Mac.md",
        "Erste_Schritte_Mobile_Replit.md",
        "Erste_Schritte_Win_PC.md",
        "Textausgabe_InDerKonsole.md",
        "Variablen_und_Datentypen.md",
        "Operatoren.md",
        "Strings.md",
        "Bedingte_Anweisungen.md",
        "Schleifen.md",
        "Listen.md",
        "Tupel.md",
        "Sets.md",
        "Dictionaries.md",
        "Funktionen.md",
        "Parameter_und_Rueckgabewerte.md",
        "Lambda_Funktionen.md",
        "Module.md",
        "Eigene_Module.md",
        "Standardbibliotheken.md",
        "Klassen_und_Objekte.md",
        "Vererbung.md",
        "Polymorphismus.md",
        "Dateien_lesen_schreiben.md",
        "CSV_Dateien.md",
        "JSON_Dateien.md",
        "Fehlerbehandlung.md",
        "Eigene_Exceptions.md"
    ];
    
    // Check each known file
    for (const fileName of knownFiles) {
        const filePath = `${directory}/${fileName}`;
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                console.log(`Markdown file found: ${filePath}`);
                
                // Store various variants of the path in the cache
                cacheFilePath(fileName, filePath);
            }
        } catch (error) {
            // Ignore errors, as we're just checking if the file exists
        }
    }
}

/**
 * Store various variants of a path in the cache
 * @param {string} fileName - The file name
 * @param {string} fullPath - The full path to the file
 */
function cacheFilePath(fileName, fullPath) {
    // Store the full path
    window.markdownFileCache[fullPath] = fullPath;
    
    // Store the file name
    window.markdownFileCache[fileName] = fullPath;
    
    // Store the file name without extension
    const fileNameWithoutExt = fileName.replace('.md', '');
    window.markdownFileCache[fileNameWithoutExt] = fullPath;
    
    // Store variants with different path prefixes
    window.markdownFileCache[`/${fullPath}`] = fullPath;
    window.markdownFileCache[`/Projekte/${fileName}`] = fullPath;
    
    // Extract the chapter from the path (e.g. "Kapitel_1")
    const match = fullPath.match(/Kapitel_\d+/);
    if (match) {
        const kapitel = match[0];
        window.markdownFileCache[`/Projekte/${kapitel}/${fileName}`] = fullPath;
        window.markdownFileCache[`Projekte/${kapitel}/${fileName}`] = fullPath;
    }
}

/**
 * Correct paths in markdown links
 * @param {string} path - The path to correct
 * @returns {string} - The corrected path
 */
function correctPath(path) {
    // If the path is in the cache, use the stored path
    if (window.markdownFileCache[path]) {
        console.log(`Path found in cache: ${path} -> ${window.markdownFileCache[path]}`);
        return window.markdownFileCache[path];
    }
    
    // If the path already starts with the base directory
    if (path.startsWith(`${window.DOCS_BASE_DIR}/`)) {
        return path;
    }
    
    // Remove leading slash if present
    let correctedPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Replace "Projekte/" with the base directory
    if (correctedPath.startsWith('Projekte/')) {
        correctedPath = correctedPath.replace('Projekte/', `${window.DOCS_BASE_DIR}/`);
    }
    // If the path doesn't start with the base directory, add it
    else if (!correctedPath.startsWith(`${window.DOCS_BASE_DIR}/`)) {
        // Extract the file name
        const fileName = correctedPath.split('/').pop();
        
        // Try to find the path in the cache
        for (const [cachedPath, fullPath] of Object.entries(window.markdownFileCache)) {
            if (cachedPath.endsWith(fileName)) {
                console.log(`File found in cache: ${fileName} -> ${fullPath}`);
                return fullPath;
            }
        }
        
        // If not found in the cache, add the base directory
        correctedPath = `${window.DOCS_BASE_DIR}/` + correctedPath;
    }
    
    console.log(`Path corrected: ${path} -> ${correctedPath}`);
    return correctedPath;
}

// Export functions for global access
window.initializeMarkdownCache = initializeMarkdownCache;
window.scanDirectoryRecursively = scanDirectoryRecursively;
window.scanKapitelDirectory = scanKapitelDirectory;
window.cacheFilePath = cacheFilePath;
window.correctPath = correctPath;