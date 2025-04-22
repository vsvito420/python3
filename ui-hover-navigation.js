/**
 * Hover Navigation Menu for the Python learning platform
 * Provides smooth navigation between sections and chapters
 */

/**
 * Store all section headings and their positions
 */
let sectionHeadings = [];
let currentSectionIndex = 0;
let isNavigating = false;

/**
 * Initialize the hover navigation
 */
function initializeHoverNavigation() {
    // Get all headings in the content
    updateSectionHeadings();
    
    // Set up event listeners for navigation buttons
    document.getElementById('prev-section').addEventListener('click', navigateToPreviousSection);
    document.getElementById('next-section').addEventListener('click', navigateToNextSection);
    
    // Update navigation on scroll
    window.addEventListener('scroll', debounce(updateNavigationOnScroll, 100));
    
    // Initial update of the navigation
    updateNavigationState();
    
    console.log('Hover navigation initialized with', sectionHeadings.length, 'sections');
}

/**
 * Update the list of section headings
 */
function updateSectionHeadings() {
    const content = document.getElementById('content');
    sectionHeadings = [];
    
    // Get all h1, h2, and h3 elements in the content
    const headings = content.querySelectorAll('h1, h2, h3');
    
    headings.forEach((heading, index) => {
        // Add an ID to the heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'section-' + index;
        }
        
        sectionHeadings.push({
            element: heading,
            id: heading.id,
            text: heading.textContent,
            level: parseInt(heading.tagName.substring(1)), // Extract the heading level (1, 2, or 3)
            position: heading.offsetTop
        });
    });
    
    // Sort by position
    sectionHeadings.sort((a, b) => a.position - b.position);
}

/**
 * Navigate to the previous section
 */
function navigateToPreviousSection() {
    if (currentSectionIndex > 0) {
        navigateToSection(currentSectionIndex - 1);
    } else {
        // If we're at the first section, try to load the previous chapter
        tryLoadPreviousChapter();
    }
}

/**
 * Navigate to the next section
 */
function navigateToNextSection() {
    if (currentSectionIndex < sectionHeadings.length - 1) {
        navigateToSection(currentSectionIndex + 1);
    } else {
        // If we're at the last section, try to load the next chapter
        tryLoadNextChapter();
    }
}

/**
 * Navigate to a specific section
 * @param {number} index - The index of the section to navigate to
 */
function navigateToSection(index) {
    if (index >= 0 && index < sectionHeadings.length && !isNavigating) {
        isNavigating = true;
        
        // Remove highlight from current section
        if (currentSectionIndex >= 0 && currentSectionIndex < sectionHeadings.length) {
            sectionHeadings[currentSectionIndex].element.classList.remove('current-section');
        }
        
        // Update current section index
        currentSectionIndex = index;
        
        // Highlight the new current section
        sectionHeadings[currentSectionIndex].element.classList.add('current-section');
        
        // Scroll to the section
        const targetPosition = sectionHeadings[index].position - 20; // 20px offset for better visibility
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update navigation state
        updateNavigationState();
        
        // Reset navigation flag after animation completes
        setTimeout(() => {
            isNavigating = false;
        }, 500);
    }
}

/**
 * Update the navigation state based on the current section
 */
function updateNavigationState() {
    // Update button states
    const prevButton = document.getElementById('prev-section');
    const nextButton = document.getElementById('next-section');
    
    // Disable previous button if we're at the first section
    prevButton.disabled = currentSectionIndex === 0;
    
    // Disable next button if we're at the last section
    nextButton.disabled = currentSectionIndex === sectionHeadings.length - 1;
    
    // Update progress indicator
    const progressIndicator = document.querySelector('.nav-progress-indicator');
    if (sectionHeadings.length > 0) {
        const progress = ((currentSectionIndex + 1) / sectionHeadings.length) * 100;
        progressIndicator.style.width = progress + '%';
    } else {
        progressIndicator.style.width = '0%';
    }
}

/**
 * Update the navigation on scroll
 */
function updateNavigationOnScroll() {
    if (isNavigating || sectionHeadings.length === 0) return;
    
    const scrollPosition = window.scrollY + 100; // 100px offset for better detection
    
    // Find the current section based on scroll position
    let newIndex = 0;
    for (let i = 0; i < sectionHeadings.length; i++) {
        if (scrollPosition >= sectionHeadings[i].position) {
            newIndex = i;
        } else {
            break;
        }
    }
    
    // If the section has changed, update the navigation
    if (newIndex !== currentSectionIndex) {
        // Remove highlight from current section
        if (currentSectionIndex >= 0 && currentSectionIndex < sectionHeadings.length) {
            sectionHeadings[currentSectionIndex].element.classList.remove('current-section');
        }
        
        // Update current section index
        currentSectionIndex = newIndex;
        
        // Highlight the new current section
        sectionHeadings[currentSectionIndex].element.classList.add('current-section');
        
        // Update navigation state
        updateNavigationState();
    }
}

/**
 * Try to load the previous chapter
 */
function tryLoadPreviousChapter() {
    // Get all chapter links from the sidebar
    const chapterLinks = document.querySelectorAll('.sidebar-menu li.chapter-item a');
    const activeLink = document.querySelector('.sidebar-menu li.active a');
    
    if (activeLink && chapterLinks.length > 0) {
        // Find the index of the active link
        let activeIndex = -1;
        for (let i = 0; i < chapterLinks.length; i++) {
            if (chapterLinks[i] === activeLink) {
                activeIndex = i;
                break;
            }
        }
        
        // If we found the active link and it's not the first one, load the previous chapter
        if (activeIndex > 0) {
            const prevLink = chapterLinks[activeIndex - 1];
            const onclickAttr = prevLink.getAttribute('onclick');
            if (onclickAttr) {
                // Extract the file path from the onclick attribute
                const match = onclickAttr.match(/loadMarkdownFile\('([^']+)'\)/);
                if (match && match[1]) {
                    window.loadMarkdownFile(match[1]);
                }
            }
        }
    }
}

/**
 * Try to load the next chapter
 */
function tryLoadNextChapter() {
    // Get all chapter links from the sidebar
    const chapterLinks = document.querySelectorAll('.sidebar-menu li.chapter-item a');
    const activeLink = document.querySelector('.sidebar-menu li.active a');
    
    if (activeLink && chapterLinks.length > 0) {
        // Find the index of the active link
        let activeIndex = -1;
        for (let i = 0; i < chapterLinks.length; i++) {
            if (chapterLinks[i] === activeLink) {
                activeIndex = i;
                break;
            }
        }
        
        // If we found the active link and it's not the last one, load the next chapter
        if (activeIndex >= 0 && activeIndex < chapterLinks.length - 1) {
            const nextLink = chapterLinks[activeIndex + 1];
            const onclickAttr = nextLink.getAttribute('onclick');
            if (onclickAttr) {
                // Extract the file path from the onclick attribute
                const match = onclickAttr.match(/loadMarkdownFile\('([^']+)'\)/);
                if (match && match[1]) {
                    window.loadMarkdownFile(match[1]);
                }
            }
        }
    }
}

/**
 * Update the hover navigation when a new markdown file is loaded
 */
function updateHoverNavigationOnLoad() {
    // Reset navigation state
    currentSectionIndex = 0;
    isNavigating = false;
    
    // Update section headings
    setTimeout(() => {
        updateSectionHeadings();
        updateNavigationState();
        
        // Highlight the first section
        if (sectionHeadings.length > 0) {
            sectionHeadings[0].element.classList.add('current-section');
        }
    }, 300); // Small delay to ensure the content is fully loaded
}

// Export functions for global access
window.initializeHoverNavigation = initializeHoverNavigation;
window.updateHoverNavigationOnLoad = updateHoverNavigationOnLoad;