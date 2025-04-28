+/**
 * Scroll Navigation für die Python-Lernplattform
 * Ermöglicht Navigation zwischen Abschnitten und Kapiteln durch Scrollen
 */

/**
 * Store all section headings and their positions
 */
let sectionHeadings = [];
let currentSectionIndex = 0;
let isNavigating = false;

/**
 * Initialize the scroll navigation
 */
function initializeScrollNavigation() {
    // Get all headings in the content
    updateSectionHeadings();
    
    // Add scroll navigation at the end of each section
    addScrollNavigationElements();
    
    // Update navigation on scroll
    window.addEventListener('scroll', debounce(updateNavigationOnScroll, 100));
    
    // Initial update of the navigation
    updateNavigationState();
    
    console.log('Scroll navigation initialized with', sectionHeadings.length, 'sections');
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
        // Skip headings with text "Ausgabe:" or within code output containers
        if (heading.textContent.trim() === "Ausgabe:" ||
            heading.closest('.output-container') ||
            heading.closest('.code-editor-container')) {
            console.log('Skipping output heading:', heading.textContent);
            return;
        }
        
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
    
    console.log('Found', sectionHeadings.length, 'valid section headings');
}

/**
 * Add scroll navigation elements after each section
 */
function addScrollNavigationElements() {
    // Remove existing navigation elements
    document.querySelectorAll('.scroll-navigation').forEach(nav => nav.remove());
    
    // Get the template
    const template = document.getElementById('scroll-navigation-template');
    if (!template) {
        console.error('Scroll navigation template not found');
        return;
    }
    
    // Add navigation after each section
    sectionHeadings.forEach((section, index) => {
        // Skip the last section
        if (index === sectionHeadings.length - 1) return;
        
        // Find the next element after this section
        let nextElement = sectionHeadings[index + 1].element;
        
        // Create a new navigation element
        const navElement = template.content.cloneNode(true);
        
        // Set up event listeners for navigation buttons
        const prevButton = navElement.querySelector('#prev-section');
        const nextButton = navElement.querySelector('#next-section');
        
        // Update IDs to make them unique
        prevButton.id = 'prev-section-' + index;
        nextButton.id = 'next-section-' + index;
        
        // Add event listeners
        prevButton.addEventListener('click', () => navigateToPreviousSection(index));
        nextButton.addEventListener('click', () => navigateToNextSection(index));
        
        // Disable previous button if we're at the first section
        prevButton.disabled = index === 0;
        
        // Insert the navigation element before the next section
        nextElement.parentNode.insertBefore(navElement, nextElement);
    });
    
    // Add a final navigation element at the end of the content
    if (sectionHeadings.length > 0) {
        const content = document.getElementById('content');
        const navElement = template.content.cloneNode(true);
        
        // Set up event listeners for navigation buttons
        const prevButton = navElement.querySelector('#prev-section');
        const nextButton = navElement.querySelector('#next-section');
        
        // Update IDs to make them unique
        prevButton.id = 'prev-section-last';
        nextButton.id = 'next-section-last';
        
        // Add event listeners
        prevButton.addEventListener('click', () => navigateToPreviousSection(sectionHeadings.length - 1));
        nextButton.addEventListener('click', () => navigateToNextSection(sectionHeadings.length - 1));
        
        // Disable next button since we're at the last section
        nextButton.disabled = true;
        
        // Append the navigation element to the content
        content.appendChild(navElement);
    }
    
    // Update the progress indicators
    updateNavigationState();
}

/**
 * Navigate to the previous section
 */
function navigateToPreviousSection(currentIndex) {
    if (currentIndex > 0) {
        navigateToSection(currentIndex - 1);
    } else {
        // If we're at the first section, try to load the previous chapter
        tryLoadPreviousChapter();
    }
}

/**
 * Navigate to the next section
 */
function navigateToNextSection(currentIndex) {
    if (currentIndex < sectionHeadings.length - 1) {
        navigateToSection(currentIndex + 1);
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
        
        // Get the target element and its position
        const targetElement = sectionHeadings[index].element;
        const targetPosition = sectionHeadings[index].position - 20; // 20px offset for better visibility
        
        // Scroll to the section with a more reliable approach
        try {
            // First try scrollIntoView which works better for elements outside viewport
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Then fine-tune with scrollTo for the offset
            setTimeout(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        } catch (e) {
            // Fallback to direct scrollTo if scrollIntoView fails
            console.warn('ScrollIntoView failed, using fallback:', e);
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Update navigation state
        updateNavigationState();
        
        // Reset navigation flag after animation completes
        // Use a longer timeout to account for longer scrolling distances
        setTimeout(() => {
            isNavigating = false;
        }, 1000);
    }
}

/**
 * Update the navigation state based on the current section
 */
function updateNavigationState() {
    // Update all progress indicators
    const progressIndicators = document.querySelectorAll('.nav-progress-indicator');
    
    if (sectionHeadings.length > 0) {
        const progress = ((currentSectionIndex + 1) / sectionHeadings.length) * 100;
        progressIndicators.forEach(indicator => {
            indicator.style.width = progress + '%';
        });
    } else {
        progressIndicators.forEach(indicator => {
            indicator.style.width = '0%';
        });
    }
}

/**
 * Update the navigation on scroll
 */
function updateNavigationOnScroll() {
    if (isNavigating || sectionHeadings.length === 0) return;
    
    const scrollPosition = window.scrollY + 100; // 100px offset for better detection
    
    // Check if we're at the bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
    
    // Find the current section based on scroll position
    let newIndex = 0;
    for (let i = 0; i < sectionHeadings.length; i++) {
        if (scrollPosition >= sectionHeadings[i].position) {
            newIndex = i;
        } else {
            break;
        }
    }
    
    // If we're at the bottom of the page, select the last section
    if (isAtBottom && sectionHeadings.length > 0) {
        newIndex = sectionHeadings.length - 1;
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
        
        console.log(`Navigation updated to section ${currentSectionIndex}: ${sectionHeadings[currentSectionIndex].text}`);
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
                    console.log(`Navigating to previous chapter: ${match[1]}`);
                    
                    // Add visual feedback for chapter transition
                    const scrollNavs = document.querySelectorAll('.scroll-navigation');
                    if (scrollNavs.length > 0) {
                        // Add a temporary class for transition effect
                        scrollNavs.forEach(nav => {
                            nav.classList.add('chapter-transition');
                            
                            // Reset after transition
                            setTimeout(() => {
                                nav.classList.remove('chapter-transition');
                            }, 1500);
                        });
                    }
                    
                    // Load the previous chapter
                    window.loadMarkdownFile(match[1]);
                    
                    // Reset navigation state after loading
                    setTimeout(() => {
                        isNavigating = false;
                    }, 1000);
                    
                    return true;
                }
            }
        }
    }
    
    return false;
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
                    console.log(`Navigating to next chapter: ${match[1]}`);
                    
                    // Add visual feedback for chapter transition
                    const scrollNavs = document.querySelectorAll('.scroll-navigation');
                    if (scrollNavs.length > 0) {
                        // Add a temporary class for transition effect
                        scrollNavs.forEach(nav => {
                            nav.classList.add('chapter-transition');
                            
                            // Reset after transition
                            setTimeout(() => {
                                nav.classList.remove('chapter-transition');
                            }, 1500);
                        });
                    }
                    
                    // Load the next chapter
                    window.loadMarkdownFile(match[1]);
                    
                    // Reset navigation state after loading
                    setTimeout(() => {
                        isNavigating = false;
                    }, 1000);
                    
                    return true;
                }
            }
        }
    }
    
    return false;
}

/**
 * Update the scroll navigation when a new markdown file is loaded
 */
function updateScrollNavigationOnLoad() {
    // Reset navigation state
    currentSectionIndex = 0;
    isNavigating = false;
    
    // Update section headings
    setTimeout(() => {
        updateSectionHeadings();
        addScrollNavigationElements();
        
        // Highlight the first section
        if (sectionHeadings.length > 0) {
            sectionHeadings[0].element.classList.add('current-section');
        }
    }, 300); // Small delay to ensure the content is fully loaded
}

// Export functions for global access
window.initializeScrollNavigation = initializeScrollNavigation;
window.updateScrollNavigationOnLoad = updateScrollNavigationOnLoad;