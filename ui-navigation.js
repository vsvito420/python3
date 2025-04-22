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
    homeItem.classList.add('active');
    homeItem.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md')">Hauptseite</a>`;
    sidebarMenu.appendChild(homeItem);
    
    // Add links from the table of contents
    links.forEach(link => {
        const filePath = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        const text = link.textContent;
        
        // Skip links to the home page
        if (filePath.includes('Anfang_Lese_Mich.md')) return;
        
        const item = document.createElement('li');
        item.innerHTML = `<a href="javascript:void(0)" onclick="loadMarkdownFile('${filePath}')">${text}</a>`;
        
        // Mark as completed if applicable
        const chapterId = filePath.split('/').pop().replace('.md', '');
        if (window.progress && window.progress[chapterId] && window.progress[chapterId].completed) {
            item.classList.add('completed');
            item.innerHTML += ' ✓';
        }
        
        sidebarMenu.appendChild(item);
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