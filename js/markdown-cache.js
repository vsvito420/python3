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

    // Ensure DOCS_BASE_DIR is defined
    if (typeof window.DOCS_BASE_DIR === 'undefined') {
        window.DOCS_BASE_DIR = 'python-docs';
        console.warn("window.DOCS_BASE_DIR was not defined in initializeMarkdownCache. Defaulting to 'python-docs'.");
    }

    // Reset the cache
    window.markdownFileCache = {};

    // Only cache the main page initially
    const mainPagePath = `${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md`;
    try {
        console.log(`Checking main page at: ${mainPagePath}`);
        const response = await fetch(mainPagePath);
        if (response.ok) {
            console.log(`Main page found: ${mainPagePath}`);
            cacheFilePath("Anfang_Lese_Mich.md", mainPagePath);
        } else {
            console.warn(`Main page not found at ${mainPagePath}, status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error checking main page: ${error.message}`);
    }

    // Try to cache some common paths
    const commonPaths = [
        `${window.DOCS_BASE_DIR}/Kapitel_0/Erste_Schritte_Mac.md`,
        `${window.DOCS_BASE_DIR}/Kapitel_0/Erste_Schritte_Win_PC.md`
    ];

    for (const path of commonPaths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const fileName = path.split('/').pop();
                console.log(`Common file found: ${path}`);
                cacheFilePath(fileName, path);
            }
        } catch (error) {
            // Ignore errors for common paths
        }
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

    // Ensure DOCS_BASE_DIR is defined
    if (typeof window.DOCS_BASE_DIR === 'undefined') {
        window.DOCS_BASE_DIR = 'python-docs';
        console.warn("window.DOCS_BASE_DIR was not defined in findFileInChapters. Defaulting to 'python-docs'.");
    }

    // First check the main directory
    const mainDirPath = `${window.DOCS_BASE_DIR}/${fileName}`;
    console.log(`Checking main directory: ${mainDirPath}`);
    try {
        const response = await fetch(mainDirPath);
        if (response.ok) {
            console.log(`File found at: ${mainDirPath}`);
            cacheFilePath(fileName, mainDirPath);
            return mainDirPath;
        }
    } catch (error) {
        console.warn(`Error checking main directory: ${error.message}`);
        // Continue to check chapter directories
    }

    // Check each chapter directory
    for (let i = 0; i <= 10; i++) {
        const kapitelDir = `${window.DOCS_BASE_DIR}/Kapitel_${i}`;
        const filePath = `${kapitelDir}/${fileName}`;

        console.log(`Checking chapter directory: ${filePath}`);
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                console.log(`File found at: ${filePath}`);
                cacheFilePath(fileName, filePath);
                return filePath;
            }
        } catch (error) {
            console.warn(`Error checking chapter ${i}: ${error.message}`);
            // Ignore errors and try the next directory
        }
    }

    // Check for special directories like z_Projekt_Daten
    const specialDirs = ['z_Projekt_Daten'];
    for (const dir of specialDirs) {
        const specialPath = `${window.DOCS_BASE_DIR}/${dir}/${fileName}`;
        console.log(`Checking special directory: ${specialPath}`);
        try {
            const response = await fetch(specialPath);
            if (response.ok) {
                console.log(`File found at: ${specialPath}`);
                cacheFilePath(fileName, specialPath);
                return specialPath;
            }
        } catch (error) {
            console.warn(`Error checking special directory ${dir}: ${error.message}`);
            // Ignore errors and try the next directory
        }
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
    // If the path already starts with the base directory, return it as is
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