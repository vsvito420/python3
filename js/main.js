/**
 * Main entry point for the Python learning platform
 * This file initializes all modules and sets up event listeners
 */

// Global variables
window.currentChapter = '';
window.progress = {};
window.codeBlocks = []; // Important: This array is used across multiple modules
window.editors = {};
window.markdownFileCache = {}; // Cache for found markdown files

// Base directory for documentation
window.DOCS_BASE_DIR = 'python-docs';

// Board Mode State
window.isBoardModeActive = false;
window.currentSlideIndex = 0;
window.slides = [];

/**
 * Initialize the application when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    if (typeof window.initializeApp === 'function') {
        window.initializeApp();
        
        // Let the initializeApp function handle loading the initial file
    } else {
        console.error('initializeApp function not found. Make sure markdown-loader.js is loaded correctly.');
    }
    
    // Initialize the standalone editor
    window.initializeStandaloneEditor();
    
    // Initialize editor resize functionality
    window.initializeEditorResize();
    
    // Initialize sidebar toggle functionality
    window.initializeSidebarToggle();
    
    // Initialize scroll navigation
    if (typeof window.initializeScrollNavigation === 'function') {
        window.initializeScrollNavigation();
    } else {
        console.warn('initializeScrollNavigation function not found. Scroll navigation will not be available.');
    }
    
    // Check window size and adjust resize handle display
    window.checkWindowSize();
    
    // Standardmäßig den Code-Editor ausblenden
    const editorSidebar = document.getElementById('code-editor-sidebar');
    const container = document.querySelector('.container');
    if (editorSidebar && container) {
        editorSidebar.classList.add('collapsed');
        container.classList.add('editor-hidden');
        container.style.paddingBottom = '50px';
    }
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        // Update sidebar state
        window.setInitialSidebarState();
        
        // Check window size for resize handle
        window.checkWindowSize();
        
        // Update editor layouts
        window.debounce(function() {
            if (window.editors) {
                Object.values(window.editors).forEach(editor => {
                    if (editor && typeof editor.layout === 'function') {
                        editor.layout();
                    }
                });
            }
        }, 100)();
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter or Cmd+Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            // Find the active editor
            const activeEditor = document.querySelector('.code-editor:focus');
            if (activeEditor) {
                const editorId = activeEditor.id;
                const runButton = document.querySelector(`[data-editor="${editorId}"].run-button`);
                if (runButton) {
                    runButton.click();
                    e.preventDefault();
                }
            }
        }
    });

    // Initialize Board Mode Toggle
    initializeBoardModeToggle();
});

/**
 * Toggles the board mode on/off
 */
function toggleBoardMode() {
    window.isBoardModeActive = !window.isBoardModeActive;
    const contentElement = document.getElementById('content');
    const boardModeButton = document.getElementById('toggle-board-mode');
    const container = document.querySelector('.container'); // Get main container

    if (window.isBoardModeActive) {
        contentElement.classList.add('board-mode');
        container.classList.add('board-mode-active'); // Add class to main container too
        boardModeButton.classList.add('active');
        console.log("Board mode activated");
        initializeSlides(); // This now wraps content
        createBoardNavButtons(contentElement); // Create nav buttons
        showSlide(window.currentSlideIndex); // Show first slide and update nav state
        document.addEventListener('keydown', handleBoardModeKeys);
    } else {
        contentElement.classList.remove('board-mode');
        container.classList.remove('board-mode-active'); // Remove class from main container
        boardModeButton.classList.remove('active');
        removeBoardNavButtons(contentElement); // Remove nav buttons
        console.log("Board mode deactivated");
        document.removeEventListener('keydown', handleBoardModeKeys);
        // Reload the current markdown file to restore original content structure
        const currentDoc = new URLSearchParams(window.location.search).get('doc');
        if (currentDoc && window.loadMarkdownFile) {
            window.loadMarkdownFile(currentDoc, false); // Reload without adding history entry
        }
    }
}

/**
 * Initializes the slides based on the content
 */
function initializeSlides() {
    const contentElement = document.getElementById('content');
    // Split content by '---' separator. This logic might need refinement
    // markdown-parser.js now creates .board-slide elements directly.
    const slideElements = contentElement.querySelectorAll('.board-slide');

    window.slides = Array.from(slideElements).map((slideElement, index) => {
        // Wrap slide content for scaling
        const wrapper = document.createElement('div');
        wrapper.classList.add('slide-content-wrapper');
        // Move existing content into the wrapper
        while (slideElement.firstChild) {
            wrapper.appendChild(slideElement.firstChild);
        }
        slideElement.appendChild(wrapper);

        slideElement.style.display = 'none'; // Hide all slides initially
        slideElement.dataset.index = index; // Ensure index is set
        return slideElement;
    });

    // No need to clear and append, parser already structured it.
    // Just ensure they are hidden initially.
    window.slides.forEach(slide => slide.style.display = 'none');

    window.currentSlideIndex = 0; // Reset to first slide
    console.log(`Initialized ${window.slides.length} slides.`);
}

/**
 * Displays a specific slide
 * @param {number} index - The index of the slide to show
 */
function showSlide(index) {
    if (index >= 0 && index < window.slides.length) {
        window.slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'flex' : 'none';
            slide.classList.toggle('active-slide', i === index);
        });
        window.currentSlideIndex = index;
        console.log(`Showing slide ${index + 1}/${window.slides.length}`);

        // Update navigation button states
        updateBoardNavButtonsState(index, window.slides.length);

        // Scaling is primarily handled by CSS on .active-slide .slide-content-wrapper
        // If JS calculation is needed, call scaleSlideContent here.
        // scaleSlideContent(window.slides[index].querySelector('.slide-content-wrapper'));
    }
}

/**
 * Scales the content of the active slide to fit the viewport.
 * This is a basic example; might need refinement based on actual content and layout.
 * @param {HTMLElement} wrapperElement - The slide content wrapper element to scale.
 */
function scaleSlideContent(wrapperElement) {
    // Optional: Implement JS-based scaling if CSS isn't sufficient.
    // This would involve getting wrapper dimensions, viewport dimensions,
    // calculating the scale factor, and applying `transform: scale(...)`.
    console.log("Scaling slide content (currently CSS-driven)");
    // Example JS scaling (if needed):
    // const viewportWidth = document.getElementById('content').clientWidth;
    // const viewportHeight = document.getElementById('content').clientHeight;
    // const contentWidth = wrapperElement.scrollWidth;
    // const contentHeight = wrapperElement.scrollHeight;
    // const scaleX = viewportWidth / contentWidth;
    // const scaleY = viewportHeight / contentHeight;
    // const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1
    // wrapperElement.style.transform = `scale(${scale})`;
}

/**
 * Creates and appends navigation buttons for board mode.
 * @param {HTMLElement} container - The element to append buttons to (usually #content).
 */
function createBoardNavButtons(container) {
    // Remove existing buttons first
    removeBoardNavButtons(container);

    const prevButton = document.createElement('button');
    prevButton.id = 'board-nav-prev';
    prevButton.classList.add('board-nav-side', 'prev');
    prevButton.innerHTML = '&#10094;'; // Left arrow
    prevButton.setAttribute('aria-label', 'Vorherige Folie');
    prevButton.addEventListener('click', previousSlide);

    const nextButton = document.createElement('button');
    nextButton.id = 'board-nav-next';
    nextButton.classList.add('board-nav-side', 'next');
    nextButton.innerHTML = '&#10095;'; // Right arrow
    nextButton.setAttribute('aria-label', 'Nächste Folie');
    nextButton.addEventListener('click', nextSlide);

    container.appendChild(prevButton);
    container.appendChild(nextButton);
}

/**
 * Removes navigation buttons for board mode.
 * @param {HTMLElement} container - The element containing the buttons.
 */
function removeBoardNavButtons(container) {
    const prevButton = container.querySelector('#board-nav-prev');
    const nextButton = container.querySelector('#board-nav-next');
    if (prevButton) prevButton.remove();
    if (nextButton) nextButton.remove();
}

/**
 * Updates the enabled/disabled state of board navigation buttons.
 * @param {number} currentIndex - The current slide index.
 * @param {number} totalSlides - The total number of slides.
 */
function updateBoardNavButtonsState(currentIndex, totalSlides) {
    const prevButton = document.getElementById('board-nav-prev');
    const nextButton = document.getElementById('board-nav-next');

    if (prevButton) {
        prevButton.disabled = currentIndex <= 0;
    }
    if (nextButton) {
        nextButton.disabled = currentIndex >= totalSlides - 1;
    }
}


/**
 * Navigates to the next slide
 */
function nextSlide() {
    if (window.isBoardModeActive) {
        showSlide(window.currentSlideIndex + 1);
    }
}

/**
 * Navigates to the previous slide
 */
function previousSlide() {
     if (window.isBoardModeActive) {
        showSlide(window.currentSlideIndex - 1);
    }
}

/**
 * Handles keyboard navigation for board mode
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleBoardModeKeys(e) {
    if (!window.isBoardModeActive) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        previousSlide();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        toggleBoardMode(); // Exit board mode on Escape
    }
}


/**
 * Initializes the toggle button for board mode
 */
function initializeBoardModeToggle() {
    const boardModeButton = document.getElementById('toggle-board-mode');
    if (boardModeButton) {
        boardModeButton.addEventListener('click', toggleBoardMode);
    } else {
        console.warn('Board mode toggle button not found.');
    }
}


/**
 * Log a message about the modular structure
 */
console.log('Python learning platform initialized with modular structure');