/**
 * Editor resize functionality for the Python learning platform
 */

/**
 * Initialize resize functionality for the editor
 */
function initializeEditorResize() {
    // Resize functionality for the editor (internal)
    const resizeHandle = document.getElementById('editor-resize-handle');
    let editorStartY, editorStartHeight;

    if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', function(e) {
            editorStartY = e.clientY;
            editorStartHeight = document.getElementById('standalone-editor').offsetHeight;
            document.addEventListener('mousemove', resizeEditor);
            document.addEventListener('mouseup', stopResize);
            e.preventDefault();
        });
    }

    function resizeEditor(e) {
        const newHeight = editorStartHeight + (e.clientY - editorStartY);
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
    
    // Resize functionality for the boundary between editor and content (vertical)
    const verticalResizeHandle = document.getElementById('vertical-resize-handle');
    let boundaryStartY, boundaryStartHeight, container, editorSidebar, contentArea;

    // Only enable on desktop devices
    if (verticalResizeHandle) {
        verticalResizeHandle.addEventListener('mousedown', function(e) {
            // Only proceed if we're on a desktop device
            if (window.innerWidth < 992) return;
            
            boundaryStartY = e.clientY;
            container = document.querySelector('.container');
            editorSidebar = document.getElementById('code-editor-sidebar');
            contentArea = document.getElementById('content');
            
            // Get current height of the editor sidebar
            const computedStyle = window.getComputedStyle(editorSidebar);
            boundaryStartHeight = parseInt(computedStyle.height, 10);
            
            document.addEventListener('mousemove', resizeVertical);
            document.addEventListener('mouseup', stopVerticalResize);
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });
    }

    function resizeVertical(e) {
        // Only proceed if we're on a desktop device
        if (window.innerWidth < 992) return;
        
        const deltaY = boundaryStartY - e.clientY;
        const newHeight = Math.max(150, Math.min(600, boundaryStartHeight + deltaY)); // Min 150px, Max 600px
        
        // Update the editor height
        editorSidebar.style.height = `${newHeight}px`;
        
        // Update the container padding to match
        container.style.paddingBottom = `${newHeight}px`;
        
        // Update the editor layout
        if (window.editors && window.editors['standalone-editor']) {
            window.editors['standalone-editor'].layout();
        }
    }

    function stopVerticalResize() {
        document.removeEventListener('mousemove', resizeVertical);
        document.removeEventListener('mouseup', stopVerticalResize);
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
            const editorSidebar = document.getElementById('code-editor-sidebar');
            if (!editorSidebar.classList.contains('collapsed')) {
                verticalResizeHandle.style.display = 'block';
                // Position the resize handle at the top of the editor sidebar
                verticalResizeHandle.style.top = '0';
                verticalResizeHandle.style.left = '0';
                verticalResizeHandle.style.width = '100%';
                
                // Adjust sidebar position based on window width
                if (window.innerWidth >= 992) {
                    editorSidebar.style.left = '250px'; // Width of the sidebar
                } else {
                    editorSidebar.style.left = '0';
                }
            }
        }
    }
    
    // Update container padding to match editor height
    const editorSidebar = document.getElementById('code-editor-sidebar');
    const container = document.querySelector('.container');
    if (editorSidebar && container && !editorSidebar.classList.contains('collapsed')) {
        const computedStyle = window.getComputedStyle(editorSidebar);
        const height = parseInt(computedStyle.height, 10);
        container.style.paddingBottom = `${height}px`;
    }
}

// Export functions for global access
window.initializeEditorResize = initializeEditorResize;
window.checkWindowSize = checkWindowSize;