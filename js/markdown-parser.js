/**
 * Markdown parsing functionality for the Python learning platform
 */

/**
 * Parse markdown into HTML
 * @param {string} markdown - The markdown content to parse
 * @returns {string} - The parsed HTML
 */
function parseMarkdown(markdown) {
    console.log("Starting markdown parsing...");
    
    // Ensure codeBlocks array exists and reset it for this parsing operation
    if (!window.codeBlocks) {
        window.codeBlocks = [];
        console.log("Created new codeBlocks array");
    } else {
        // Clear the array but keep the reference
        window.codeBlocks.length = 0;
        console.log("Reset existing codeBlocks array");
    }
    
    // Temporary placeholders for code blocks
    const codePlaceholders = [];
    
    // Temporary placeholders for inline code to protect them from code block processing
    const inlineCodePlaceholders = [];
    
    // Protect inline code from code block processing
    let tempMarkdown = markdown.replace(/`([^`\n]+?)`/g, (match, code) => {
        const placeholder = `__INLINE_CODE_${inlineCodePlaceholders.length}__`;
        inlineCodePlaceholders.push(code);
        return placeholder;
    });
    
    // Log the markdown content for debugging purposes
    console.log("Processing markdown:", tempMarkdown.substring(0, 200) + "...");
    
    // Replace all code blocks with three backticks, regardless of language
    // Important: This regex must come before the more specific regex for languages
    let processedMarkdown = tempMarkdown;
    
    // Replace code blocks with three backticks and a language designation
    // We use a simpler approach with String.replace and a function
    processedMarkdown = tempMarkdown.replace(/```([\w-]*)\n([\s\S]*?)```/g, function(match, language, code) {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        language = language.trim() || 'text';
        code = code.trim();
        
        console.log(`Code block found with language: "${language}", Code: "${code.substring(0, 50)}..."`);
        
        codePlaceholders.push({
            type: 'code',
            code: code,
            language: language
        });
        
        return placeholder;
    });
    
    // Replace code blocks with one backtick and a language designation
    processedMarkdown = processedMarkdown.replace(/`(\w+)\n([\s\S]*?)\n`/g, (match, language, code) => {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        codePlaceholders.push({ type: 'code', code: code.trim(), language: language || 'text' });
        return placeholder;
    });
    
    // Replace code blocks that only start with the word "python" on its own line
    processedMarkdown = processedMarkdown.replace(/^python\s*$([\s\S]*?)(?=^[a-zA-Z]|\n\s*\n|$)/gm, (match, code) => {
        if (code.trim()) {
            const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
            codePlaceholders.push({ type: 'code', code: code.trim(), language: 'python' });
            return placeholder;
        }
        return match;
    });
    
    // Restore inline code
    inlineCodePlaceholders.forEach((code, index) => {
        processedMarkdown = processedMarkdown.replace(`__INLINE_CODE_${index}__`, `<code>${code}</code>`);
    });
    
    // Replace headings
    processedMarkdown = processedMarkdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    processedMarkdown = processedMarkdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    processedMarkdown = processedMarkdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Replace links with corrected paths
    processedMarkdown = processedMarkdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // Internal links to markdown files
        if (url.endsWith('.md')) {
            // Correct the path for the linked file
            const correctedUrl = window.correctPath(url);
            return `<a href="javascript:void(0)" onclick="loadMarkdownFile('${correctedUrl}')">${text}</a>`;
        }
        // External links
        return `<a href="${url}" target="_blank">${text}</a>`;
    });
    
    // Replace lists
    processedMarkdown = processedMarkdown.replace(/^\s*-\s*(.*$)/gm, '<li>$1</li>');
    processedMarkdown = processedMarkdown.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    processedMarkdown = processedMarkdown.replace(/^\s*\d+\.\s*(.*$)/gm, '<li>$1</li>');
    processedMarkdown = processedMarkdown.replace(/(<li>.*<\/li>\n)+/g, '<ol>$&</ol>');
    
    // Replace paragraphs
    processedMarkdown = processedMarkdown.replace(/^(?!<[a-z]|\s*$)(.+)$/gm, '<p>$1</p>');
    
    // Replace emphasis
    processedMarkdown = processedMarkdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedMarkdown = processedMarkdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Inline code was already replaced above
    
    // Replace horizontal lines
    processedMarkdown = processedMarkdown.replace(/^---$/gm, '<hr>');
    
    // Replace the code block placeholders with actual code editors
    codePlaceholders.forEach((placeholder, index) => {
        if (placeholder.type === 'code') {
            const id = `code-block-${window.codeBlocks.length}`;
            const language = placeholder.language || 'text';
            
            // Log the code block for debugging purposes
            console.log(`Creating code block with ID ${id}, language: ${language}`);
            console.log(`Code start: "${placeholder.code.substring(0, 50)}..."`);
            
            // Add the code block to the global list
            window.codeBlocks.push({
                id,
                code: placeholder.code,
                language: language
            });
            
            // Replace the placeholder with a container for the code editor
            processedMarkdown = processedMarkdown.replace(
                `__CODE_BLOCK_${index}__`,
                `<div id="${id}" class="code-editor-container" data-language="${language}"></div>`
            );
        }
    });
    
    // Add navigation buttons
    processedMarkdown += `
        <div class="chapter-navigation">
            <button id="mark-completed" class="mark-completed-button">Kapitel als abgeschlossen markieren</button>
        </div>
    `;
    
    return processedMarkdown;
}

// Export functions for global access
window.parseMarkdown = parseMarkdown;