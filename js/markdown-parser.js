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
        // Emphasis (moved before list processing for simplicity, can be refined if needed)
        processedMarkdown = processedMarkdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processedMarkdown = processedMarkdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 5. Advanced List Processing
        function processListSegment(segment) {
            const lines = segment.split('\n');
            let html = '';
            const listStack = []; // { type: 'ul' | 'ol', indent: number }

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine === '') { // Preserve intentional empty lines within list processing logic
                    if (listStack.length > 0) html += '\n'; // Could be between items or part of multi-line item
                    continue;
                }

                const itemRegex = /^(\s*)([-*+]|\d+\.)\s+(.*)/;
                const match = line.match(itemRegex); // Match on original line to get correct indentation

                if (match) {
                    const indentLength = match[1].length;
                    const bulletOrOrder = match[2];
                    let itemContent = match[3]; // This is the rest of the line

                    const listType = isNaN(parseInt(bulletOrOrder, 10)) ? 'ul' : 'ol';

                    // Close nested lists if current indent is less
                    while (listStack.length > 0 && indentLength < listStack[listStack.length - 1].indent) {
                        html += `</${listStack.pop().type}>\n</li>\n`;
                    }

                    // Start a new list or a nested list
                    if (listStack.length === 0 || listType !== listStack[listStack.length - 1].type || indentLength > listStack[listStack.length - 1].indent) {
                        if (listStack.length > 0 && listType === listStack[listStack.length - 1].type && indentLength < listStack[listStack.length - 1].indent) {
                            //This case should be handled by the while loop above, but as a safeguard:
                            html += `</${listStack.pop().type}>\n</li>\n`;
                        }
                        if (listStack.length > 0 && indentLength === listStack[listStack.length - 1].indent && listType !== listStack[listStack.length - 1].type) {
                            // Different list type at same indent level, close previous
                            html += `</${listStack.pop().type}>\n</li>\n`;
                        }

                        html += (listStack.length > 0 ? '' : '') + `<${listType}>\n`;
                        listStack.push({ type: listType, indent: indentLength });
                    } else if (indentLength < listStack[listStack.length - 1].indent) {
                        // This case should be handled by the while loop above.
                        // It implies de-indenting to a previous list level of the same type.
                    }


                    html += `<li>${itemContent}`;
                    // Subsequent lines that are more indented are part of this list item
                    // This simple parser doesn't handle complex multi-line items elegantly without further lookahead or state.
                    // For now, we assume a list item ends at a newline unless the next line is also a list item.
                    // The paragraph logic later will handle non-list text.
                    html += `</li>\n`; // Close li immediately for this simplified model

                } else {
                    // Not a list item, close all open lists
                    while (listStack.length > 0) {
                        html += `</${listStack.pop().type}>\n` + (listStack.length > 0 ? '</li>\n' : '');
                    }
                    // This line will be handled by paragraph logic if it's not empty
                    // We need to ensure this non-list content is preserved.
                    // The current logic processes the *whole* markdown for lists at once.
                    // It might be better to split by non-list blocks first.
                    // For now, we output the non-list line to be handled later.
                    html += line + '\n'; // Add non-list line back
                }
            }

            // Close any remaining open lists
            while (listStack.length > 0) {
                html += `</${listStack.pop().type}>\n` + (listStack.length > 0 ? '</li>\n' : '');
            }
            return html.trim();
        }


        // We need to split the markdown by sections that are definitively NOT lists,
        // like headings, code blocks, tables, hr, etc., and then process potential list segments.
        // This is a more complex tokenization problem.
        // A simpler, yet potentially flawed approach for now:
        // Let the paragraph logic run, and then try to fix lists. This is what was failing.

        // New Strategy: Process lists on lines that look like list items,
        // and then ensure paragraph logic doesn't mess them up.

        let listLines = [];
        let nonListAccumulator = [];
        const lines = processedMarkdown.split('\n');
        let finalProcessedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
                if (nonListAccumulator.length > 0) {
                    finalProcessedLines.push(nonListAccumulator.join('\n'));
                    nonListAccumulator = [];
                }
                listLines.push(line);
            } else {
                if (listLines.length > 0) {
                    finalProcessedLines.push(processListSegment(listLines.join('\n')));
                    listLines = [];
                }
                nonListAccumulator.push(line);
            }
        }
        if (listLines.length > 0) {
            finalProcessedLines.push(processListSegment(listLines.join('\n')));
        }
        if (nonListAccumulator.length > 0) {
            finalProcessedLines.push(nonListAccumulator.join('\n'));
        }
        processedMarkdown = finalProcessedLines.join('\n');


        // 6. Replace Code Block Placeholders
        codePlaceholders.forEach((placeholder, index) => {
            const placeholderString = `__CODE_BLOCK_${index}__`;
            if (placeholder.type === 'code') { // Interactive Python
                const id = `code-block-${window.codeBlocks.length}`; // Use global counter
                const language = placeholder.language;
                console.log(`Creating interactive code block ID ${id} for slide ${slideIndex + 1}`);
                window.codeBlocks.push({ id, code: placeholder.code, language: language });
                processedMarkdown = processedMarkdown.replace(new RegExp(`<p>\\s*${placeholderString}\\s*<\\/p>|${placeholderString}`),
                    `<div id="${id}" class="code-editor-container" data-language="${language}"></div>`);
            } else { // Non-interactive pre/code
                const language = placeholder.language;
                const languageClass = language ? ` class="language-${language}"` : '';
                const escapedCode = placeholder.code.replace(/</g, '<').replace(/>/g, '>'); // Corrected escaping
                processedMarkdown = processedMarkdown.replace(new RegExp(`<p>\\s*${placeholderString}\\s*<\\/p>|${placeholderString}`),
                    `<pre><code${languageClass}>${escapedCode}</code></pre>`);
            }
        });

        // 7. Paragraphs (apply last, carefully)
        processedMarkdown = processedMarkdown.split('\n').map(line => {
            const trimmedLine = line.trim();
            if (trimmedLine === '') {
                return ''; // Preserve or remove empty lines based on desired behavior.
            }
            // Check if the line is already part of a known block structure or is a block tag itself
            const isBlockTag = /^\s*<(ul|ol|li|h[1-6]|table|thead|tbody|tr|th|td|pre|div|figure|figcaption|blockquote|hr|p)(\s|>)/i.test(trimmedLine);
            const isClosingBlockTag = /^\s*<\/(ul|ol|li|h[1-6]|table|thead|tbody|tr|th|td|pre|div|figure|figcaption|blockquote|hr|p)>/i.test(trimmedLine);

            if (trimmedLine && !isBlockTag && !isClosingBlockTag) {
                // Further check: if it's inside a list item, don't wrap. This is hard without full context.
                // The list processing should ideally handle multi-line list items internally.
                return `<p>${trimmedLine}</p>`;
            }
            return line; // Keep lines that are empty, already tags, or part of block elements
        }).join('\n');

        // Cleanup: Remove <p> tags that might have been wrongly inserted around block elements or are empty.
        processedMarkdown = processedMarkdown.replace(/<p>\s*(<(ul|ol|h[1-6]|div|pre|table|blockquote|hr)(?:[^>]*>[\s\S]*?<\/\2>)?)\s*<\/p>/gi, '$1');
        // Remove <p> tags around list items if the list processing didn't prevent it.
        processedMarkdown = processedMarkdown.replace(/<p>\s*(<li(?:[^>]*)?>[\s\S]*?<\/li>)\s*<\/p>/gi, '$1');
        processedMarkdown = processedMarkdown.replace(/<p>\s*<\/p>/gi, ''); // Remove empty p tags

        // 8. Wrap slide content
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