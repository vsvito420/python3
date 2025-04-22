/**
 * Pyodide integration for the Python learning platform
 */

// Global variables
let pyodideLoading = false;

/**
 * Load Pyodide if it's not already loaded
 * @returns {Promise<object>} - The Pyodide instance
 */
async function loadPyodideIfNeeded() {
    // If Pyodide is already loaded, return it
    if (window.pyodide) {
        return window.pyodide;
    }
    
    // If Pyodide is currently loading, wait for it to complete
    if (window.pyodideLoading) {
        // Wait until loading is complete
        while (window.pyodideLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return window.pyodide;
    }
    
    // Set flag that Pyodide is loading
    window.pyodideLoading = true;
    
    try {
        console.log("Loading Pyodide...");
        // Load Pyodide
        window.pyodide = await loadPyodide();
        console.log("Pyodide successfully loaded!");
        return window.pyodide;
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        throw error;
    } finally {
        // Reset flag
        window.pyodideLoading = false;
    }
}

// Export functions for global access
window.loadPyodideIfNeeded = loadPyodideIfNeeded;