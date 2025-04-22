/**
 * Navigation and sidebar functionality for the Python learning platform
 */

/**
 * Update the active menu item
 * @param {string} filePath - The path of the currently loaded file
 */
function updateActiveMenuItem(filePath) {
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll(`.sidebar-menu a[onclick*="${filePath}"]`).forEach(link => {
        link.parentElement.classList.add('active');
    });
    
    // If no exact match, try to match by filename
    if (document.querySelectorAll('.sidebar-menu li.active').length === 0) {
        const fileName = filePath.split('/').pop();
        document.querySelectorAll(`.sidebar-menu a[onclick*="${fileName}"]`).forEach(link => {
            link.parentElement.classList.add('active');
        });
    }
}

/**
 * Create sidebar menu from the table of contents
 */
function createSidebarMenu() {
    const links = document.querySelectorAll('#content a[onclick*="loadMarkdownFile"]');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    
    if (!sidebarMenu || links.length === 0) return;
    
    // Empty the menu
    sidebarMenu.innerHTML = '';
    
    // Add home page link
    const homeItem = document.createElement('li');
    homeItem.classList.add('active', 'menu-home');
    homeItem.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md')">Hauptseite</a>`;
    sidebarMenu.appendChild(homeItem);
    
    // Group links by chapter
    const chapters = {};
    
    links.forEach(link => {
        const filePath = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        const text = link.textContent;
        
        // Skip links to the home page (but still include other Kapitel_0 files)
        if (filePath.includes('Anfang_Lese_Mich.md')) return;
        
        // Extract chapter from file path
        const pathParts = filePath.split('/');
        const chapterDir = pathParts[pathParts.length - 2]; // e.g., "Kapitel_1"
        
        // Create chapter group if it doesn't exist
        if (!chapters[chapterDir]) {
            chapters[chapterDir] = [];
        }
        
        // Add link to chapter group
        chapters[chapterDir].push({
            filePath,
            text,
            chapterId: pathParts[pathParts.length - 1].replace('.md', '')
        });
    });
    
    // Sort chapters by name
    const sortedChapterKeys = Object.keys(chapters).sort((a, b) => {
        // Extract chapter numbers for sorting
        const numA = parseInt(a.split('_')[1]);
        const numB = parseInt(b.split('_')[1]);
        return numA - numB;
    });
    
    // Add chapters and their links to the menu
    sortedChapterKeys.forEach(chapterKey => {
        // Skip non-chapter directories like "z_Projekt_Daten"
        if (!chapterKey.startsWith('Kapitel_')) return;
        
        // Create chapter header
        const chapterNum = chapterKey.split('_')[1];
        const chapterHeader = document.createElement('li');
        chapterHeader.classList.add('chapter-header');
        chapterHeader.innerHTML = `<span>Kapitel ${chapterNum}</span>`;
        sidebarMenu.appendChild(chapterHeader);
        
        // Add chapter links
        chapters[chapterKey].forEach(item => {
            const menuItem = document.createElement('li');
            menuItem.classList.add('chapter-item');
            menuItem.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('${item.filePath}')">${item.text}</a>`;
            
            // Mark as completed if applicable
            if (window.progress && window.progress[item.chapterId] && window.progress[item.chapterId].completed) {
                menuItem.classList.add('completed');
                menuItem.innerHTML += ' ✓';
            }
            
            sidebarMenu.appendChild(menuItem);
        });
    });
    
    // Add event listeners to all navigation links to ensure they load only when clicked
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        const originalOnclick = link.getAttribute('onclick');
        link.setAttribute('onclick', `event.preventDefault(); ${originalOnclick}`);
    });
}

/**
 * Initialize sidebar toggle functionality
 */
function initializeSidebarToggle() {
    // Mobile sidebar toggle
    document.getElementById('toggle-sidebar-mobile').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });
    
    // Desktop sidebar toggle
    document.getElementById('toggle-sidebar-desktop').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });
    
    // Set initial sidebar state based on screen size
    setInitialSidebarState();
    
    // Update state on window resize
    window.addEventListener('resize', setInitialSidebarState);
}

/**
 * Set the initial state of the sidebar based on screen size
 */
function setInitialSidebarState() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 992) {
        // Hide on small screens
        sidebar.classList.remove('active');
    } else {
        // Show on large screens
        sidebar.classList.add('active');
    }
}

// Export functions for global access
window.updateActiveMenuItem = updateActiveMenuItem;
window.createSidebarMenu = createSidebarMenu;
window.initializeSidebarToggle = initializeSidebarToggle;
window.setInitialSidebarState = setInitialSidebarState;