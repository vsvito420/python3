/**
 * Editor resize functionality for the Python learning platform
 */

/**
 * Initialize resize functionality for the editor
 */
function initializeEditorResize() {
    // Resize functionality for the editor (vertical)
    const resizeHandle = document.getElementById('editor-resize-handle');
    let startY, startHeight;

    if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', function(e) {
            startY = e.clientY;
            startHeight = document.getElementById('standalone-editor').offsetHeight;
            document.addEventListener('mousemove', resizeEditor);
            document.addEventListener('mouseup', stopResize);
            e.preventDefault();
        });
    }

    function resizeEditor(e) {
        const newHeight = startHeight + (e.clientY - startY);
        if (newHeight > 100) { // Minimum height
            document.getElementById('standalone-editor').style.height = newHeight + 'px';
            if (window.editors && window.editors['standalone-editor']) {
                window.editors['standalone-editor'].layout();
            }
        }
    }

    function stopResize() {
        document.removeEventListener('mousemove', resizeEditor);
        document.removeEventListener('mouseup', stopResize);
    }
    
    // Resize functionality for the boundary between editor and content (horizontal)
    const verticalResizeHandle = document.getElementById('vertical-resize-handle');
    let startX, startWidth, container, editorSidebar, contentArea;

    // Only enable on desktop devices
    if (verticalResizeHandle) {
        verticalResizeHandle.addEventListener('mousedown', function(e) {
            // Only proceed if we're on a desktop device
            if (window.innerWidth < 992) return;
            
            startX = e.clientX;
            container = document.querySelector('.container');
            editorSidebar = document.getElementById('code-editor-sidebar');
            contentArea = document.getElementById('content');
            
            // Get current width of the editor sidebar
            const computedStyle = window.getComputedStyle(editorSidebar);
            startWidth = parseInt(computedStyle.width, 10);
            
            document.addEventListener('mousemove', resizeHorizontal);
            document.addEventListener('mouseup', stopHorizontalResize);
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });
    }

    function resizeHorizontal(e) {
        // Only proceed if we're on a desktop device
        if (window.innerWidth < 992) return;
        
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(200, Math.min(800, startWidth + deltaX)); // Min 200px, Max 800px
        
        // Update the grid template
        const sidebarWidth = 250; // Width of the left sidebar
        container.style.gridTemplateColumns = `${sidebarWidth}px ${newWidth}px 1fr`;
        
        // Update the editor layout
        if (window.editors && window.editors['standalone-editor']) {
            window.editors['standalone-editor'].layout();
        }
    }

    function stopHorizontalResize() {
        document.removeEventListener('mousemove', resizeHorizontal);
        document.removeEventListener('mouseup', stopHorizontalResize);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
}

/**
 * Check window size and adjust the display of the resize handle
 */
function checkWindowSize() {
    const verticalResizeHandle = document.getElementById('vertical-resize-handle');
    if (verticalResizeHandle) {
        if (window.innerWidth < 992) {
            verticalResizeHandle.style.display = 'none';
        } else {
            // Only show if the editor is not collapsed
            if (!document.getElementById('code-editor-sidebar').classList.contains('collapsed')) {
                verticalResizeHandle.style.display = 'block';
            }
        }
    }
}

// Export functions for global access
window.initializeEditorResize = initializeEditorResize;
window.checkWindowSize = checkWindowSize;