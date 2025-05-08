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
    const sidebarMenu = document.querySelector('.sidebar-menu');

    if (!sidebarMenu) return;

    // Empty the menu
    sidebarMenu.innerHTML = '';

    // Add home page link
    const homeItem = document.createElement('li');
    homeItem.classList.add('active', 'menu-home');
    homeItem.innerHTML = `<a href="?doc=${encodeURIComponent(window.DOCS_BASE_DIR + '/index.md')}" onclick="event.preventDefault(); loadMarkdownFile('${window.DOCS_BASE_DIR}/index.md')">Hauptseite</a>`;
    sidebarMenu.appendChild(homeItem);

    // Definiere die Kapitelstruktur
    const menuStructure = [
        {
            id: 'Kapitel_0',
            title: 'Kapitel 0: Einführung und Erste Schritte',
            items: [
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/index.md`,
                    text: 'Einführung Kapitel 0',
                    chapterId: 'Kapitel_0_index'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Anfang_Lese_Mich.md`,
                    text: 'Willkommen & Übersicht',
                    chapterId: 'Anfang_Lese_Mich'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Kapitel_0.md`,
                    text: 'Was ist Python?',
                    chapterId: 'Kapitel_0_Was_ist_Python'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Erste_Schritte_Win_PC.md`,
                    text: 'Erste Schritte (Windows)',
                    chapterId: 'Erste_Schritte_Win_PC'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Erste_Schritte_Mac.md`,
                    text: 'Erste Schritte (Mac)',
                    chapterId: 'Erste_Schritte_Mac'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Erste_Schritte_Mobile_Replit.md`,
                    text: 'Erste Schritte (Mobile/Replit)',
                    chapterId: 'Erste_Schritte_Mobile_Replit'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Installation_VSCode_Win.md`,
                    text: 'Installation VSCode (Windows)',
                    chapterId: 'Installation_VSCode_Win'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_0/Installation_VSCode_Mac.md`,
                    text: 'Installation VSCode (Mac)',
                    chapterId: 'Installation_VSCode_Mac'
                }
            ]
        },
        {
            id: 'Kapitel_1',
            title: 'Kapitel 1: Grundlagen',
            items: [
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/index.md`,
                    text: 'Einführung Kapitel 1',
                    chapterId: 'Kapitel_1_index'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/Kapitel_1.md`,
                    text: 'Überblick Kapitel 1',
                    chapterId: 'Kapitel_1_Ueberblick'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/Textausgabe_InDerKonsole.md`,
                    text: 'Textausgabe',
                    chapterId: 'Textausgabe_InDerKonsole'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/Variablen_und_Datentypen.md`,
                    text: 'Variablen & Datentypen',
                    chapterId: 'Variablen_und_Datentypen'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/Operatoren.md`,
                    text: 'Operatoren',
                    chapterId: 'Operatoren'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/Strings.md`,
                    text: 'Strings',
                    chapterId: 'Strings'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_1/Kapitel_1_Quiz.md`,
                    text: 'Quiz Kapitel 1',
                    chapterId: 'Kapitel_1_Quiz'
                }
            ]
        },
        {
            id: 'Kapitel_2',
            title: 'Kapitel 2: Kontrollstrukturen',
            items: [
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_2/index.md`,
                    text: 'Einführung Kapitel 2',
                    chapterId: 'Kapitel_2_index'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_2/Kapitel_2.md`,
                    text: 'Überblick Kapitel 2',
                    chapterId: 'Kapitel_2_Ueberblick'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_2/Bedingte_Anweisungen.md`,
                    text: 'Bedingte Anweisungen',
                    chapterId: 'Bedingte_Anweisungen'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_2/Schleifen.md`,
                    text: 'Schleifen',
                    chapterId: 'Schleifen'
                }
            ]
        },
        {
            id: 'Kapitel_3',
            title: 'Kapitel 3: Datenstrukturen',
            items: [
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_3/index.md`,
                    text: 'Einführung Kapitel 3',
                    chapterId: 'Kapitel_3_index'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_3/Kapitel_3.md`,
                    text: 'Überblick Kapitel 3',
                    chapterId: 'Kapitel_3_Ueberblick'
                },
                {
                    filePath: `${window.DOCS_BASE_DIR}/Kapitel_3/Listen.md`,
                    text: 'Listen',
                    chapterId: 'Listen'
                }
            ]
        }
    ];

    // Füge die Kapitel und ihre Links zum Menü hinzu
    menuStructure.forEach(chapter => {
        // Erstelle den Kapitel-Header
        const chapterHeader = document.createElement('li');
        chapterHeader.classList.add('chapter-header');
        chapterHeader.innerHTML = `<span>${chapter.title}</span>`;
        sidebarMenu.appendChild(chapterHeader);

        // Füge die Kapitel-Links hinzu
        chapter.items.forEach(item => {
            const menuItem = document.createElement('li');
            menuItem.classList.add('chapter-item');
            menuItem.innerHTML = `<a href="?doc=${encodeURIComponent(item.filePath)}" onclick="event.preventDefault(); loadMarkdownFile('${item.filePath}')">${item.text}</a>`;

            // Markiere als abgeschlossen, falls zutreffend
            if (window.progress && window.progress[item.chapterId] && window.progress[item.chapterId].completed) {
                menuItem.classList.add('completed');
                menuItem.innerHTML += ' ✓';
            }

            sidebarMenu.appendChild(menuItem);
        });
    });

    // Die event.preventDefault() ist jetzt direkt in den onclick-Attributen enthalten
}

/**
 * Initialize sidebar toggle functionality
 */
function initializeSidebarToggle() {
    // Mobile sidebar toggle
    document.getElementById('toggle-sidebar-mobile').addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('active');
    });

    // Desktop sidebar toggle
    document.getElementById('toggle-sidebar-desktop').addEventListener('click', function () {
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