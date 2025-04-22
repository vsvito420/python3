/**
 * Markdown file caching functionality for the Python learning platform
 */

// Using global variables defined in main.js

/**
 * Initialize the markdown file cache with minimal loading
 * Only initializes the structure without loading all files
 */
async function initializeMarkdownCache() {
    console.log("Initializing markdown file cache (minimal mode)...");
    
    // Reset the cache
    window.markdownFileCache = {};
    
    // Only cache the main page initially
    const mainPagePath = `${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md`;
    try {
        const response = await fetch(mainPagePath);
        if (response.ok) {
            console.log(`Main page found: ${mainPagePath}`);
            cacheFilePath("Anfang_Lese_Mich.md", mainPagePath);
        }
    } catch (error) {
        console.error(`Error checking main page: ${error}`);
    }
    
    console.log("Minimal markdown file cache initialized:", window.markdownFileCache);
}

/**
 * Find a file in the chapter directories
 * @param {string} fileName - The file name to find
 * @returns {Promise<string|null>} - The full path if found, null otherwise
 */
async function findFileInChapters(fileName) {
    console.log(`Searching for file: ${fileName} in chapter directories`);
    
    // Check each chapter directory
    for (let i = 0; i <= 10; i++) {
        const kapitelDir = `${window.DOCS_BASE_DIR}/Kapitel_${i}`;
        const filePath = `${kapitelDir}/${fileName}`;
        
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                console.log(`File found at: ${filePath}`);
                cacheFilePath(fileName, filePath);
                return filePath;
            }
        } catch (error) {
            // Ignore errors and try the next directory
        }
    }
    
    // Also check the main directory
    const mainDirPath = `${window.DOCS_BASE_DIR}/${fileName}`;
    try {
        const response = await fetch(mainDirPath);
        if (response.ok) {
            console.log(`File found at: ${mainDirPath}`);
            cacheFilePath(fileName, mainDirPath);
            return mainDirPath;
        }
    } catch (error) {
        // Ignore errors
    }
    
    console.log(`File not found: ${fileName}`);
    return null;
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
window.findFileInChapters = findFileInChapters;
window.cacheFilePath = cacheFilePath;
window.correctPath = correctPath;