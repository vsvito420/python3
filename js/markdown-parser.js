/**
 * Markdown parsing functionality for the Python learning platform
 */

/**
 * Parse markdown into HTML
 * @param {string} markdown - The markdown content to parse
 * @returns {string} - The parsed HTML
 */
function parseMarkdown(markdown) {
    const startTime = performance.now();
    console.log("Starting markdown parsing...");

    // Ensure codeBlocks array exists and reset it for this parsing operation
    if (!window.codeBlocks) {
        window.codeBlocks = [];
        console.log("Created new codeBlocks array");
    } else {
        window.codeBlocks.length = 0; // Clear array but keep reference
        console.log("Reset existing codeBlocks array");
    }

    // Validate input
    if (!markdown || typeof markdown !== 'string') {
        console.error("Invalid markdown input:", markdown);
        return '<div class="error">Error: Invalid markdown content</div>';
    }

    // Split the markdown into slides based on '---' separator on its own line
    const slideMarkdownArray = markdown.split(/^\s*---\s*$/gm);
    let finalHtml = ''; // Accumulate HTML for all slides

    console.log(`Split into ${slideMarkdownArray.length} potential slides.`);

    // Process each slide individually
    slideMarkdownArray.forEach((slideMarkdown, slideIndex) => {
        if (!slideMarkdown.trim()) return; // Skip empty slides resulting from split

        console.log(`Processing slide ${slideIndex + 1}...`);

        // --- Per-Slide Processing ---
        const codePlaceholders = [];
        const inlineCodePlaceholders = [];

        // 1. Protect inline code
        let tempMarkdown = slideMarkdown.replace(/`([^`\n]+?)`/g, (match, code) => {
            const placeholder = `__INLINE_CODE_${inlineCodePlaceholders.length}__`;
            inlineCodePlaceholders.push(code);
            return placeholder;
        });

        // 2. Extract Code Blocks (using placeholders)
        // Handle nested code block examples: ```\n```lang...```\n```
        tempMarkdown = tempMarkdown.replace(/```\s*\n```(\w+)\s*\n([\s\S]*?)```\s*\n```/g, (match, language, code) => {
            const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
            codePlaceholders.push({ type: language.toLowerCase() === 'python' ? 'code' : 'pre', code: code.trim(), language: language || 'text' });
            return placeholder;
        });
        // Handle regular code blocks: ```lang...```
        tempMarkdown = tempMarkdown.replace(/```(\w+)?\s*\n([\s\S]*?)```/g, (match, language, code) => {
            if (code.includes('\n') || code.trim().length > 10) { // Heuristic to avoid matching inline ``` ``
                const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
                language = language ? language.trim() : 'text';
                codePlaceholders.push({ type: language.toLowerCase() === 'python' ? 'code' : 'pre', code: code.trim(), language: language });
                return placeholder;
            }
            return match;
        });
        // Handle `lang\n...\n`
        tempMarkdown = tempMarkdown.replace(/`(\w+)\n([\s\S]*?)\n`/g, (match, language, code) => {
            const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
            codePlaceholders.push({ type: language.toLowerCase() === 'python' ? 'code' : 'pre', code: code.trim(), language: language || 'text' });
            return placeholder;
        });
        // Handle python\n...
        tempMarkdown = tempMarkdown.replace(/^python\s*$([\s\S]*?)(?=^[a-zA-Z]|\n\s*\n|$)/gm, (match, code) => {
            if (code.trim()) {
                const placeholder = `__CODE_BLOCK_${codePlaceholders.length}__`;
                codePlaceholders.push({ type: 'code', code: code.trim(), language: 'python' });
                return placeholder;
            }
            return match;
        });

        let processedMarkdown = tempMarkdown;

        // 3. Parse Tables
        const tableRegex = /^\s*\|(.+)\|\s*$\n^\s*\|(?:\s*[-:]+[-\s|:]*)+\|\s*$\n((?:^\s*\|.+\|\s*$\n?)+)/gm;
        processedMarkdown = processedMarkdown.replace(tableRegex, (match) => {
             try { // Keep existing table parsing logic
                const lines = match.trim().split('\n');
                if (lines.length < 3) return match;
                const headerLine = lines[0].trim();
                const separatorLine = lines[1].trim();
                const dataLines = lines.slice(2);
                let headers = headerLine.split('|').map(cell => cell.trim());
                if (headers[0] === '') headers.shift();
                if (headers[headers.length - 1] === '') headers.pop();
                let separators = separatorLine.split('|').map(cell => cell.trim());
                if (separators[0] === '') separators.shift();
                if (separators[separators.length - 1] === '') separators.pop();
                const alignments = separators.map(separator => {
                    if (separator.startsWith(':') && separator.endsWith(':')) return 'center';
                    if (separator.endsWith(':')) return 'right';
                    return 'left';
                });
                let tableHtml = '<div class="markdown-table-container">\n<table class="markdown-table">\n<thead>\n<tr>\n';
                headers.forEach((header, index) => {
                    const align = index < alignments.length ? alignments[index] : 'left';
                    tableHtml += `<th style="text-align: ${align};">${header}</th>\n`;
                });
                tableHtml += '</tr>\n</thead>\n<tbody>\n';
                dataLines.forEach(line => {
                    line = line.trim();
                    if (!line) return;
                    const processedLine = line.replace(/`([^`]+)`/g, (match, content) => `<code>${content.replace(/\|/g, '&#124;')}</code>`);
                    let cells = processedLine.split('|').map(cell => cell.trim());
                    if (cells[0] === '') cells.shift();
                    if (cells[cells.length - 1] === '') cells.pop();
                    tableHtml += '<tr>\n';
                    cells.forEach((cell, index) => {
                        const processedCell = cell.replace(/<code>(.*?)<\/code>/g, (match, content) => `<code>${content.replace(/&#124;/g, '|')}</code>`);
                        const align = index < alignments.length ? alignments[index] : 'left';
                        tableHtml += `<td style="text-align: ${align};">${processedCell}</td>\n`;
                    });
                    tableHtml += '</tr>\n';
                });
                tableHtml += '</tbody>\n</table>\n</div>\n';
                return tableHtml;
            } catch (error) {
                console.error('Error parsing markdown table:', error);
                return match;
            }
        });

        // 4. Basic Markdown Replacements
        // Restore inline code first
        inlineCodePlaceholders.forEach((code, index) => {
            processedMarkdown = processedMarkdown.replace(`__INLINE_CODE_${index}__`, `<code>${code}</code>`);
        });
        // Headings
        processedMarkdown = processedMarkdown.replace(/^# (.*$)/gm, '<h1 class="markdown-heading markdown-h1">$1</h1>');
        processedMarkdown = processedMarkdown.replace(/^## (.*$)/gm, '<h2 class="markdown-heading markdown-h2">$1</h2>');
        processedMarkdown = processedMarkdown.replace(/^### (.*$)/gm, '<h3 class="markdown-heading markdown-h3">$1</h3>');
        processedMarkdown = processedMarkdown.replace(/^#### (.*$)/gm, '<h4 class="markdown-heading markdown-h4">$1</h4>');
        processedMarkdown = processedMarkdown.replace(/^##### (.*$)/gm, '<h5 class="markdown-heading markdown-h5">$1</h5>');
        processedMarkdown = processedMarkdown.replace(/^###### (.*$)/gm, '<h6 class="markdown-heading markdown-h6">$1</h6>');
        // Links
        processedMarkdown = processedMarkdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            if (url.endsWith('.md')) {
                const correctedUrl = window.correctPath ? window.correctPath(url) : url;
                return `<a href="javascript:void(0)" onclick="loadMarkdownFile('${correctedUrl}')">${text}</a>`;
            }
            return `<a href="${url}" target="_blank">${text}</a>`;
        });
        // Lists
        processedMarkdown = processedMarkdown.replace(/^\s*-\s+(.*$)/gm, '<li class="ul-item">$1</li>'); // Added space after -
        processedMarkdown = processedMarkdown.replace(/^\s*\d+\.\s+(.*$)/gm, '<li class="ol-item">$1</li>'); // Added space after .
        // Wrap consecutive list items (handle potential empty lines between items)
        processedMarkdown = processedMarkdown.replace(/(?:<li class="ul-item">.*?<\/li>\s*)+/g, (match) => `<ul>${match.replace(/\s*$/, '')}</ul>`);
        processedMarkdown = processedMarkdown.replace(/(?:<li class="ol-item">.*?<\/li>\s*)+/g, (match) => `<ol>${match.replace(/\s*$/, '')}</ol>`);
        processedMarkdown = processedMarkdown.replace(/class="ul-item"/g, '');
        processedMarkdown = processedMarkdown.replace(/class="ol-item"/g, '');
        // Emphasis
        processedMarkdown = processedMarkdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processedMarkdown = processedMarkdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 5. Replace Code Block Placeholders
        codePlaceholders.forEach((placeholder, index) => {
            const placeholderString = `__CODE_BLOCK_${index}__`;
            if (placeholder.type === 'code') { // Interactive Python
                const id = `code-block-${window.codeBlocks.length}`; // Use global counter
                const language = placeholder.language; // Should be 'python'
                console.log(`Creating interactive code block ID ${id} for slide ${slideIndex + 1}`);
                window.codeBlocks.push({ id, code: placeholder.code, language: language });
                // Ensure the placeholder is replaced even if surrounded by <p> tags initially
                processedMarkdown = processedMarkdown.replace(new RegExp(`<p>\\s*${placeholderString}\\s*<\\/p>|${placeholderString}`),
                                                               `<div id="${id}" class="code-editor-container" data-language="${language}"></div>`);
            } else { // Non-interactive pre/code
                const language = placeholder.language;
                const languageClass = language ? ` class="language-${language}"` : '';
                const escapedCode = placeholder.code.replace(/</g, '<').replace(/>/g, '>');
                 // Ensure the placeholder is replaced even if surrounded by <p> tags initially
                processedMarkdown = processedMarkdown.replace(new RegExp(`<p>\\s*${placeholderString}\\s*<\\/p>|${placeholderString}`),
                                                               `<pre><code${languageClass}>${escapedCode}</code></pre>`);
            }
        });

        // 6. Paragraphs (apply last, carefully)
        processedMarkdown = processedMarkdown.split('\n').map(line => {
            const trimmedLine = line.trim();
            // Wrap line in <p> only if it's not empty, not already a tag, and not just whitespace
            if (trimmedLine && !trimmedLine.startsWith('<') && !trimmedLine.endsWith('>')) {
                 return `<p>${trimmedLine}</p>`;
            }
            return line; // Keep lines that are empty or already tags
        }).join('\n');
        // Clean up paragraphs around block elements more aggressively
        processedMarkdown = processedMarkdown.replace(/<p>\s*(<(?:ul|ol|h[1-6]|div|pre|table)[^>]*>[\s\S]*?<\/(?:ul|ol|h[1-6]|div|pre|table)>)\s*<\/p>/g, '$1');
        processedMarkdown = processedMarkdown.replace(/<p>\s*<\/p>/g, ''); // Remove empty paragraphs

        // 7. Wrap slide content with the necessary wrapper and add to final HTML
        // Add data-index for potential JS targeting
        const slideContent = processedMarkdown.trim();
        finalHtml += `<div class="board-slide" data-index="${slideIndex}">
                       <div class="slide-content-wrapper">${slideContent}</div>
                   </div>\n`;
    }); // End of slideMarkdownArray.forEach

    // Wrap the entire set of slides in the main content div
    const finalWrappedHtml = `<div class="markdown-content">${finalHtml}</div>`;

    const endTime = performance.now();
    console.log(`Markdown parsing completed in ${(endTime - startTime).toFixed(2)}ms. Found ${window.codeBlocks.length} interactive code blocks total.`);

    return finalWrappedHtml;
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