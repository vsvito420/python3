/**
 * Vertikale Scroll-Navigation
 * 
 * Dieses Modul implementiert die vertikale Scroll-Navigation zwischen Abschnitten und Kapiteln.
 * Es ersetzt die bisherige Hover-Navigation mit einem natürlicheren Leseerlebnis von oben nach unten.
 */

// Konfiguration
const SCROLL_CONFIG = {
    animationDuration: 500,
    navigationOffset: 20,
    sectionClass: 'content-section',
    nextButtonClass: 'next-section-button',
    prevButtonClass: 'prev-section-button',
    nextChapterClass: 'next-chapter-button',
    prevChapterClass: 'prev-chapter-button',
    progressIndicatorClass: 'progress-indicator'
};

// Speichert den aktuellen Abschnitt
let currentSectionIndex = 0;
let sections = [];

/**
 * Initialisiert die vertikale Scroll-Navigation
 */
function initScrollNavigation() {
    // Sammle alle Abschnitte
    sections = document.querySelectorAll('.' + SCROLL_CONFIG.sectionClass);
    
    if (sections.length === 0) return;
    
    // Füge Navigationsbuttons zu jedem Abschnitt hinzu
    addNavigationButtons();
    
    // Füge Scroll-Event-Listener hinzu
    window.addEventListener('scroll', handleScroll);
    
    // Füge Tastatur-Event-Listener hinzu
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Initialisiere den Fortschrittsindikator
    initProgressIndicator();
    
    // Setze den initialen Abschnitt basierend auf der Scroll-Position
    updateCurrentSection();
}

/**
 * Fügt Navigationsbuttons zu jedem Abschnitt hinzu
 */
function addNavigationButtons() {
    sections.forEach((section, index) => {
        const navigationContainer = document.createElement('div');
        navigationContainer.className = 'section-navigation';
        
        // Vorheriger Abschnitt Button (außer beim ersten Abschnitt)
        if (index > 0) {
            const prevButton = createNavigationButton('Vorheriger Abschnitt', SCROLL_CONFIG.prevButtonClass, () => {
                scrollToSection(index - 1);
            });
            navigationContainer.appendChild(prevButton);
        }
        
        // Nächster Abschnitt Button (außer beim letzten Abschnitt)
        if (index < sections.length - 1) {
            const nextButton = createNavigationButton('Nächster Abschnitt', SCROLL_CONFIG.nextButtonClass, () => {
                scrollToSection(index + 1);
            });
            navigationContainer.appendChild(nextButton);
        } else {
            // Beim letzten Abschnitt: Button für nächstes Kapitel
            const nextChapterButton = createNavigationButton('Nächstes Kapitel', SCROLL_CONFIG.nextChapterClass, () => {
                navigateToNextChapter();
            });
            navigationContainer.appendChild(nextChapterButton);
        }
        
        // Füge die Navigationsbuttons am Ende des Abschnitts hinzu
        section.appendChild(navigationContainer);
    });
    
    // Füge einen Button für das vorherige Kapitel am Anfang des ersten Abschnitts hinzu
    if (sections.length > 0) {
        const firstSection = sections[0];
        const prevChapterContainer = document.createElement('div');
        prevChapterContainer.className = 'chapter-navigation top';
        
        const prevChapterButton = createNavigationButton('Vorheriges Kapitel', SCROLL_CONFIG.prevChapterClass, () => {
            navigateToPrevChapter();
        });
        
        prevChapterContainer.appendChild(prevChapterButton);
        firstSection.insertBefore(prevChapterContainer, firstSection.firstChild);
    }
}

/**
 * Erstellt einen Navigationsbutton
 */
function createNavigationButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', clickHandler);
    return button;
}

/**
 * Scrollt zu einem bestimmten Abschnitt
 */
function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    
    const section = sections[index];
    const offsetTop = section.offsetTop - SCROLL_CONFIG.navigationOffset;
    
    // Smooth Scroll zu dem Abschnitt
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    currentSectionIndex = index;
    updateProgressIndicator();
}

/**
 * Navigiert zum nächsten Kapitel
 */
function navigateToNextChapter() {
    // Suche nach dem nächsten Kapitel-Link in der Sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    let currentChapterIndex = -1;
    
    // Finde den aktuellen Kapitel-Link
    sidebarLinks.forEach((link, index) => {
        if (link.classList.contains('active')) {
            currentChapterIndex = index;
        }
    });
    
    // Navigiere zum nächsten Kapitel, wenn vorhanden
    if (currentChapterIndex >= 0 && currentChapterIndex < sidebarLinks.length - 1) {
        sidebarLinks[currentChapterIndex + 1].click();
    }
}

/**
 * Navigiert zum vorherigen Kapitel
 */
function navigateToPrevChapter() {
    // Suche nach dem vorherigen Kapitel-Link in der Sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    let currentChapterIndex = -1;
    
    // Finde den aktuellen Kapitel-Link
    sidebarLinks.forEach((link, index) => {
        if (link.classList.contains('active')) {
            currentChapterIndex = index;
        }
    });
    
    // Navigiere zum vorherigen Kapitel, wenn vorhanden
    if (currentChapterIndex > 0) {
        sidebarLinks[currentChapterIndex - 1].click();
    }
}

/**
 * Behandelt Scroll-Events
 */
function handleScroll() {
    updateCurrentSection();
    updateProgressIndicator();
}

/**
 * Aktualisiert den aktuellen Abschnitt basierend auf der Scroll-Position
 */
function updateCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionIndex = i;
            break;
        }
    }
}

/**
 * Behandelt Tastatur-Navigation
 */
function handleKeyNavigation(event) {
    // Pfeil nach unten oder Leertaste: Nächster Abschnitt
    if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        scrollToSection(currentSectionIndex + 1);
    }
    
    // Pfeil nach oben: Vorheriger Abschnitt
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        scrollToSection(currentSectionIndex - 1);
    }
    
    // Pfeil nach rechts: Nächstes Kapitel
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateToNextChapter();
    }
    
    // Pfeil nach links: Vorheriges Kapitel
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateToPrevChapter();
    }
}

/**
 * Initialisiert den Fortschrittsindikator
 */
function initProgressIndicator() {
    const progressContainer = document.createElement('div');
    progressContainer.className = SCROLL_CONFIG.progressIndicatorClass;
    
    // Erstelle Indikatoren für jeden Abschnitt
    sections.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => {
            scrollToSection(index);
        });
        progressContainer.appendChild(indicator);
    });
    
    // Füge den Fortschrittsindikator zur Seite hinzu
    document.body.appendChild(progressContainer);
    
    // Aktualisiere den Fortschrittsindikator
    updateProgressIndicator();
}

/**
 * Aktualisiert den Fortschrittsindikator
 */
function updateProgressIndicator() {
    const indicators = document.querySelectorAll('.' + SCROLL_CONFIG.progressIndicatorClass + ' .indicator');
    
    indicators.forEach((indicator, index) => {
        if (index === currentSectionIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
        
        // Markiere abgeschlossene Abschnitte
        if (index < currentSectionIndex) {
            indicator.classList.add('completed');
        } else {
            indicator.classList.remove('completed');
        }
    });
}

// Exportiere die Funktionen
window.scrollNavigation = {
    init: initScrollNavigation,
    scrollToSection: scrollToSection,
    navigateToNextChapter: navigateToNextChapter,
    navigateToPrevChapter: navigateToPrevChapter
};

// Initialisiere die Scroll-Navigation, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initScrollNavigation);