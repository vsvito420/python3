/**
 * Progress tracking functionality for the Python learning platform
 */

// Using global progress variable defined in main.js

/**
 * Load saved progress from localStorage
 */
function loadProgress() {
    const savedProgress = localStorage.getItem('pythonLearningProgress');
    if (savedProgress) {
        window.progress = JSON.parse(savedProgress);
    }
}

/**
 * Save progress to localStorage
 */
function saveProgress() {
    localStorage.setItem('pythonLearningProgress', JSON.stringify(window.progress));
}

/**
 * Mark a chapter as completed
 * @param {string} chapterId - The ID of the chapter to mark as completed
 */
function markChapterAsCompleted(chapterId) {
    window.progress[chapterId] = {
        completed: true,
        timestamp: new Date().toISOString()
    };
    saveProgress();
    updateProgressUI();
}

/**
 * Update the progress display in the UI
 */
function updateProgressUI() {
    const progressElement = document.getElementById('progress-tracker');
    if (!progressElement) return;
    
    const completedChapters = Object.keys(window.progress).length;
    const totalChapters = document.querySelectorAll('.sidebar-menu li').length;
    
    progressElement.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${(completedChapters / totalChapters) * 100}%"></div>
        </div>
        <div class="progress-text">${completedChapters} von ${totalChapters} Kapiteln abgeschlossen</div>
    `;
}

// Export functions for global access
window.loadProgress = loadProgress;
window.saveProgress = saveProgress;
window.markChapterAsCompleted = markChapterAsCompleted;
window.updateProgressUI = updateProgressUI;