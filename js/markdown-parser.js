/**
 * Markdown parsing functionality for the Python learning platform
 */

/**
 * Parse markdown into HTML
 * @param {string} markdown - The markdown content to parse
 * @returns {string} - The parsed HTML
 */
function parseMarkdown(markdown) {
    // Use performance measurement for debugging
    const startTime = performance.now();
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

    // Validate input
    if (!markdown || typeof markdown !== 'string') {
        console.error("Invalid markdown input:", markdown);
        return '<div class="error">Error: Invalid markdown content</div>';
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

    // Special handling for code blocks that are displayed as examples in markdown
    // This handles cases like: ```\n```python\n...\n```\n```
    // or cases like: ```python\n...\n```
    tempMarkdown = tempMarkdown.replace(/```\s*\n```(\w+)\s*\n([\s\S]*?)```\s*\n```/g, (match, language, code) => {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        console.log(`Found nested code block example with language: ${language}`);

        if (language.toLowerCase() === 'python') {
            codePlaceholders.push({
                type: 'code',
                code: code.trim(),
                language: 'python'
            });
        } else {
            codePlaceholders.push({
                type: 'pre',
                code: code.trim(),
                language: language || 'text'
            });
        }

        return placeholder;
    });

    // Handle the specific case where a code block is shown with backticks like: ```python...```
    tempMarkdown = tempMarkdown.replace(/```(\w+)([\s\S]*?)```/g, (match, language, code) => {
        // Only process if it looks like a code example (contains newlines)
        if (code.includes('\n')) {
            const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
            console.log(`Found code block with language: ${language}`);

            if (language.toLowerCase() === 'python') {
                codePlaceholders.push({
                    type: 'code',
                    code: code.trim(),
                    language: 'python'
                });
            } else {
                codePlaceholders.push({
                    type: 'pre',
                    code: code.trim(),
                    language: language || 'text'
                });
            }

            return placeholder;
        }
        return match; // Return unchanged if it doesn't look like a code block
    });

    // Log the markdown content for debugging purposes
    console.log("Processing markdown:", tempMarkdown.substring(0, 200) + "...");

    let processedMarkdown = tempMarkdown;

    // --- Table Parsing Logic ---
    // Improved regex to find markdown tables with better handling of different formats
    // This regex is more specific to ensure only actual tables are matched
    // It requires a header row, a separator row with dashes, and at least one data row
    const tableRegex = /^\s*\|(.+)\|\s*$\n^\s*\|(?:\s*[-:]+[-\s|:]*)+\|\s*$\n((?:^\s*\|.+\|\s*$\n?)+)/gm;


    processedMarkdown = processedMarkdown.replace(tableRegex, (match) => {
        try {
            // Split the table into lines
            const lines = match.trim().split('\n');
            if (lines.length < 3) return match; // Not a valid table

            const headerLine = lines[0].trim();
            const separatorLine = lines[1].trim();
            const dataLines = lines.slice(2);

            // Process header row
            let headers = headerLine.split('|').map(cell => cell.trim());
            // Remove empty cells from start/end if the table has leading/trailing pipes
            if (headers[0] === '') headers.shift();
            if (headers[headers.length - 1] === '') headers.pop();

            // Process separator row for alignment
            let separators = separatorLine.split('|').map(cell => cell.trim());
            if (separators[0] === '') separators.shift();
            if (separators[separators.length - 1] === '') separators.pop();

            // Determine alignment for each column
            const alignments = separators.map(separator => {
                if (separator.startsWith(':') && separator.endsWith(':')) return 'center';
                if (separator.endsWith(':')) return 'right';
                return 'left'; // Default or explicitly left-aligned
            });

            // Build HTML table with better styling
            let tableHtml = '<div class="markdown-table-container">\n<table class="markdown-table">\n<thead>\n<tr>\n';

            // Add header cells
            headers.forEach((header, index) => {
                const align = index < alignments.length ? alignments[index] : 'left';
                tableHtml += `<th style="text-align: ${align};">${header}</th>\n`;
            });
            tableHtml += '</tr>\n</thead>\n<tbody>\n';

            // Process data rows
            dataLines.forEach(line => {
                line = line.trim();
                if (!line) return; // Skip empty lines

                // Handle code blocks with pipes
                const processedLine = line.replace(/`([^`]+)`/g, (match, content) => {
                    return `<code>${content.replace(/\|/g, '&#124;')}</code>`;
                });

                let cells = processedLine.split('|').map(cell => cell.trim());
                if (cells[0] === '') cells.shift();
                if (cells[cells.length - 1] === '') cells.pop();

                tableHtml += '<tr>\n';
                cells.forEach((cell, index) => {
                    // Restore pipes in code blocks
                    const processedCell = cell.replace(/<code>(.*?)<\/code>/g, (match, content) => {
                        return `<code>${content.replace(/&#124;/g, '|')}</code>`;
                    });

                    const align = index < alignments.length ? alignments[index] : 'left';
                    tableHtml += `<td style="text-align: ${align};">${processedCell}</td>\n`;
                });
                tableHtml += '</tr>\n';
            });

            tableHtml += '</tbody>\n</table>\n</div>\n';
            return tableHtml;
        } catch (error) {
            console.error('Error parsing markdown table:', error);
            return match; // Return the original markdown if parsing fails
        }
    });

    // Replace all code blocks with three backticks, regardless of language
    // Important: This regex must come before the more specific regex for languages
    //
    // Note: We've added special handling for code blocks in the tempMarkdown processing above
    // to better handle nested code blocks and examples of code blocks in markdown

    // Replace code blocks with three backticks and a language designation
    // We use a simpler approach with String.replace and a function
    processedMarkdown = processedMarkdown.replace(/```([\w-]*)\n([\s\S]*?)```/g, function(match, language, code) {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        language = language.trim() || 'text';
        code = code.trim();

        console.log(`Code block found with language: "${language}", Code: "${code.substring(0, 50)}..."`);

        // Always treat Python code blocks as interactive
        if (language.toLowerCase() === 'python') {
            codePlaceholders.push({
                type: 'code',
                code: code,
                language: 'python'
            });
        } else {
            // For non-Python code blocks, just render as pre/code
            codePlaceholders.push({
                type: 'pre',
                code: code,
                language: language
            });
        }

        return placeholder;
    });

    // Replace code blocks with one backtick and a language designation
    processedMarkdown = processedMarkdown.replace(/`(\w+)\n([\s\S]*?)\n`/g, (match, language, code) => {
        const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
        // Always treat Python code blocks as interactive
        if (language.toLowerCase() === 'python') {
            codePlaceholders.push({ type: 'code', code: code.trim(), language: 'python' });
        } else {
            codePlaceholders.push({ type: 'pre', code: code.trim(), language: language || 'text' });
        }
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

    // Replace headings - ensure they're properly styled with appropriate classes
    processedMarkdown = processedMarkdown.replace(/^# (.*$)/gm, '<h1 class="markdown-heading markdown-h1">$1</h1>');
    processedMarkdown = processedMarkdown.replace(/^## (.*$)/gm, '<h2 class="markdown-heading markdown-h2">$1</h2>');
    processedMarkdown = processedMarkdown.replace(/^### (.*$)/gm, '<h3 class="markdown-heading markdown-h3">$1</h3>');
    processedMarkdown = processedMarkdown.replace(/^#### (.*$)/gm, '<h4 class="markdown-heading markdown-h4">$1</h4>');
    processedMarkdown = processedMarkdown.replace(/^##### (.*$)/gm, '<h5 class="markdown-heading markdown-h5">$1</h5>');
    processedMarkdown = processedMarkdown.replace(/^###### (.*$)/gm, '<h6 class="markdown-heading markdown-h6">$1</h6>');

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

    // Replace lists - with improved handling to prevent nesting issues
    
    // First, mark unordered list items with a special class
    processedMarkdown = processedMarkdown.replace(/^\s*-\s*(.*$)/gm, '<li class="ul-item">$1</li>');
    
    // Then, mark ordered list items with a different class
    processedMarkdown = processedMarkdown.replace(/^\s*\d+\.\s*(.*$)/gm, '<li class="ol-item">$1</li>');
    
    // Now wrap consecutive unordered list items in ul tags
    processedMarkdown = processedMarkdown.replace(/(<li class="ul-item">.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    // And wrap consecutive ordered list items in ol tags
    processedMarkdown = processedMarkdown.replace(/(<li class="ol-item">.*<\/li>\n)+/g, '<ol>$&</ol>');
    
    // Finally, remove the temporary classes
    processedMarkdown = processedMarkdown.replace(/class="ul-item"/g, '');
    processedMarkdown = processedMarkdown.replace(/class="ol-item"/g, '');

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
        } else if (placeholder.type === 'pre') {
            // Regular code block (non-interactive)
            const language = placeholder.language || 'text';
            const languageClass = language ? ` class="language-${language}"` : '';

            // Replace the placeholder with a pre/code block
            processedMarkdown = processedMarkdown.replace(
                `__CODE_BLOCK_${index}__`,
                `<pre><code${languageClass}>${placeholder.code.replace(/</g, '<').replace(/>/g, '>')}</code></pre>`
            );
        }
    });

    // Navigation buttons are now added to each section

    // Split content into sections based on headings for vertical scroll navigation
    let sections = [];
    let currentSection = '';
    
    // Split by h1, h2, and h3 headings
    const lines = processedMarkdown.split('\n');
    let currentHeading = 'Einleitung';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if this line is a heading
        if (line.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/)) {
            // If we have content in the current section, add it to sections
            if (currentSection.trim()) {
                sections.push({
                    heading: currentHeading,
                    content: currentSection
                });
            }
            
            // Extract the heading text
            const headingMatch = line.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/);
            currentHeading = headingMatch ? headingMatch[1] : 'Abschnitt';
            
            // Start a new section with this heading
            currentSection = line;
        } else {
            // Add this line to the current section
            currentSection += '\n' + line;
        }
    }
    
    // Add the last section
    if (currentSection.trim()) {
        sections.push({
            heading: currentHeading,
            content: currentSection
        });
    }
    
    // If no sections were created (no headings), create a single section
    if (sections.length === 0 && processedMarkdown.trim()) {
        sections.push({
            heading: 'Inhalt',
            content: processedMarkdown
        });
    }
    
    // Build the final HTML with sections
    let sectionedContent = '';
    
    sections.forEach((section, index) => {
        const isLastSection = index === sections.length - 1;
        
        // Verwende den ursprünglichen Inhalt ohne Grid-Layout
        let gridContent = section.content;
        
        // Create a section with the content-section class for scroll navigation
        sectionedContent += `<div class="content-section" id="section-${index}">
            ${gridContent}
            
            ${isLastSection ? `
            <div class="chapter-navigation">
                <button id="mark-completed" class="mark-completed-button">Kapitel als abgeschlossen markieren</button>
            </div>
            ` : ''}
        </div>`;
    });
    
    // Wrap the entire content in a div with markdown-content class for proper styling
    processedMarkdown = `<div class="markdown-content">${sectionedContent}</div>`;

    // Log performance metrics
    const endTime = performance.now();
    console.log(`Markdown parsing completed in ${(endTime - startTime).toFixed(2)}ms`);

    return processedMarkdown;
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - The HTML content to sanitize
 * @returns {string} - The sanitized HTML
 */
function sanitizeHtml(html) {
    // Create a temporary element
    const tempElement = document.createElement('div');
    tempElement.textContent = html;
    return tempElement.innerHTML;
}

// Export functions for global access
window.parseMarkdown = parseMarkdown;
window.sanitizeHtml = sanitizeHtml;