/**
 * Utility functions for the Python learning platform
 */

/**
 * Debounce function to limit the frequency of function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Add CSS for editor reset animation
 */
(function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .code-editor.reset-flash {
            animation: flash-border 0.5s ease;
        }
        
        @keyframes flash-border {
            0% { border-color: var(--border-color); }
            50% { border-color: var(--danger-color); }
            100% { border-color: var(--border-color); }
        }
        
        /* Loading animation */
        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--secondary-color);
        }
        
        .loading:after {
            content: '.';
            animation: dots 1.5s steps(5, end) infinite;
        }
        
        @keyframes dots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60% { content: '...'; }
            80%, 100% { content: ''; }
        }
    `;
    document.head.appendChild(style);
})();

// Export functions for global access
window.debounce = debounce;