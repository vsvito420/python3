// This script handles the manual theme switch and local storage persistence.
// The initial theme (from storage or system preference) is set by the inline script in <head>.
document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const htmlElement = document.documentElement;

    // Function to apply the theme and update the checkbox state
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        if (themeCheckbox) {
            themeCheckbox.checked = theme === 'dark';
        }
        console.log(`Applied theme: ${theme}`);
    };

    // Set the initial state of the checkbox based on the theme already applied by the inline script
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    if (themeCheckbox) {
        themeCheckbox.checked = currentTheme === 'dark';
        console.log(`Checkbox initial state set to: ${themeCheckbox.checked}`);
    }

    // Add event listener for the theme switch (manual toggle)
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            const newTheme = themeCheckbox.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme); // Save user preference
            console.log(`User toggled theme to: ${newTheme}. Saved to localStorage.`);
        });
    }

    // Optional: Listen for changes in system preference ONLY if no preference is saved
    try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (event) => {
            // Only change if no theme is explicitly saved by the user
            if (!localStorage.getItem('theme')) {
                const systemTheme = event.matches ? 'dark' : 'light';
                console.log(`System theme changed to ${systemTheme}, but no user preference saved. Applying system theme.`);
                applyTheme(systemTheme);
            } else {
                console.log("System theme changed, but user preference exists in localStorage. Ignoring system change.");
            }
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        console.log("Added listener for system color scheme changes (will only apply if no localStorage preference).");
    } catch (e) {
        // Fallback for older browsers
        try {
            window.matchMedia('(prefers-color-scheme: dark)').addListener(handleSystemThemeChange);
            console.log("Added legacy listener for system color scheme changes.");
        } catch (e2) {
            console.error("Error adding listener for system color scheme changes:", e2);
        }
    }
});