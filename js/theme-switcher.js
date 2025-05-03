// This script handles the manual theme switch (page and editor) and local storage persistence.
// The initial page theme (from storage or system preference) is set by the inline script in <head>.

// --- Global Editor Theme Functions ---
const EDITOR_THEME_KEY = 'editorTheme';
const DEFAULT_EDITOR_THEME = 'vs-dark'; // Default to dark for editor

// Function to apply the theme to all known Monaco editor instances
function applyEditorTheme(theme) {
    const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs';
    console.log(`Applying editor theme: ${editorTheme}`);
    // Check for editor instances and apply theme
    if (window.monaco && typeof monaco.editor.setTheme === 'function') {
        // For code-editor.html
        if (window.editor) {
            monaco.editor.setTheme(editorTheme);
            console.log("Applied theme to window.editor");
        }
        // For index.html standalone editor
        if (window.standaloneEditor) {
            monaco.editor.setTheme(editorTheme); // Assuming standalone uses monaco directly
             console.log("Applied theme to window.standaloneEditor");
        }
        // For index.html code block editors (assuming they are stored in an array or object)
        if (window.codeBlockEditors) {
             Object.values(window.codeBlockEditors).forEach(editorInstance => {
                 if (editorInstance && typeof editorInstance.updateOptions === 'function') { // Monaco instances have updateOptions
                     editorInstance.updateOptions({ theme: editorTheme });
                 } else if (editorInstance && editorInstance._themeService) { // Check internal structure as fallback
                     monaco.editor.setTheme(editorTheme); // Might work globally if instances share service
                 }
             });
             console.log(`Attempted to apply theme to ${Object.keys(window.codeBlockEditors).length} code block editors.`);
        }
    } else {
        console.warn("Monaco editor or setTheme function not available yet.");
    }
}

// Function to get the current editor theme preference
function getCurrentEditorTheme() {
    return localStorage.getItem(EDITOR_THEME_KEY) || DEFAULT_EDITOR_THEME;
}

// Function to toggle the editor theme
function toggleEditorTheme() {
    const currentTheme = getCurrentEditorTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(EDITOR_THEME_KEY, newTheme);
    console.log(`Editor theme toggled to: ${newTheme}. Saved to localStorage.`);
    applyEditorTheme(newTheme);
    updateEditorToggleButtonState(newTheme); // Update button appearance
}

// Function to update the toggle button's appearance (add this if you have visual feedback)
function updateEditorToggleButtonState(theme) {
    const editorThemeButton = document.getElementById('editor-theme-toggle-button');
    if (editorThemeButton) {
        // Example: Add/remove a class or change text/icon
        editorThemeButton.setAttribute('data-editor-theme', theme);
        console.log(`Updated editor theme toggle button state for theme: ${theme}`);
        // Add specific icon/text update logic here if needed
        const iconSpan = editorThemeButton.querySelector('.editor-theme-icon');
         if (iconSpan) {
             iconSpan.textContent = theme === 'dark' ? '🌙' : '☀️'; // Example icons
         }
    }
}


// --- DOMContentLoaded Listener ---
document.addEventListener('DOMContentLoaded', () => {
    const pageThemeCheckbox = document.getElementById('theme-checkbox'); // Renamed for clarity
    const editorThemeButton = document.getElementById('editor-theme-toggle-button');
    const htmlElement = document.documentElement;

    // Function to apply the theme and update the checkbox state
    // --- Page Theme Logic ---
    const applyPageTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        if (pageThemeCheckbox) {
            pageThemeCheckbox.checked = theme === 'dark';
        }
        console.log(`Applied page theme: ${theme}`);
        // Note: We don't automatically change editor theme when page theme changes
    };

    // Set the initial state of the page theme checkbox
    const currentPageTheme = htmlElement.getAttribute('data-theme') || 'light';
    if (pageThemeCheckbox) {
        pageThemeCheckbox.checked = currentPageTheme === 'dark';
        console.log(`Page theme checkbox initial state set to: ${pageThemeCheckbox.checked}`);
    }

    // Add event listener for the page theme switch
    if (pageThemeCheckbox) {
        pageThemeCheckbox.addEventListener('change', () => {
            const newTheme = pageThemeCheckbox.checked ? 'dark' : 'light';
            applyPageTheme(newTheme);
            localStorage.setItem('theme', newTheme); // Save page theme preference
            console.log(`User toggled page theme to: ${newTheme}. Saved to localStorage.`);
        });
    }

    // --- Editor Theme Logic ---
    // Apply initial editor theme based on localStorage
    const initialEditorTheme = getCurrentEditorTheme();
    // We need to ensure Monaco is loaded before applying. This might be too early.
    // Consider calling applyEditorTheme from the editor initialization scripts instead.
    // applyEditorTheme(initialEditorTheme); // Apply initial editor theme
    updateEditorToggleButtonState(initialEditorTheme); // Set initial button state

    // Add event listener for the editor theme toggle button
    if (editorThemeButton) {
        editorThemeButton.addEventListener('click', toggleEditorTheme);
        console.log("Added click listener for editor theme toggle button.");
    } else {
        console.log("Editor theme toggle button not found on this page.");
    }


    // --- System Page Theme Preference Listener ---
    // (No changes needed here, it only affects page theme if no preference is set)
    try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (event) => {
            if (!localStorage.getItem('theme')) { // Check for page theme preference
                const systemTheme = event.matches ? 'dark' : 'light';
                console.log(`System theme changed to ${systemTheme}, but no user page preference saved. Applying system page theme.`);
                applyPageTheme(systemTheme);
            } else {
                console.log("System theme changed, but user page preference exists in localStorage. Ignoring system change.");
            }
        };
        // Check if addEventListener is supported, otherwise use addListener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        } else if (mediaQuery.addListener) { // Deprecated but needed for some browsers
            mediaQuery.addListener(handleSystemThemeChange);
        }
        console.log("Added listener for system color scheme changes (will only apply page theme if no localStorage preference).");
    } catch (e) {
        console.error("Error adding listener for system color scheme changes:", e);
    }
});