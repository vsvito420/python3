/**
 * Markdown loading and parsing functionality for the Python learning platform
 * Includes enhanced table and code block handling.
 */

// Global array to store code block information
window.codeBlocks = [];

/**
 * Fetches and parses a markdown file.
 * @param {string} filePath - The path to the markdown file.
 * @returns {Promise<string>} - A promise that resolves with the parsed HTML content.
 */
async function loadAndParseMarkdown(filePath) {
    const startTime = performance.now(); // Start performance timer
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdown = await response.text();
        const parsedHtml = parseMarkdown(markdown);
        const endTime = performance.now(); // End performance timer
        console.log(`loadAndParseMarkdown completed in ${(endTime - startTime).toFixed(2)}ms`);
        return parsedHtml;
    } catch (error) {
        console.error('Error loading or parsing markdown:', error);
        return `<p class="error">Error loading content: ${error.message}</p>`;
    }
}

/**
 * Parses markdown text into HTML.
 * @param {string} markdown - The markdown text to parse.
 * @returns {string} - The parsed HTML content.
 */
function parseMarkdown(markdown) {
    const startTime = performance.now(); // Start performance timer for parsing

    // Basic markdown parsing (can be replaced with a library later)
    let tempMarkdown = markdown;

    // Store inline code blocks to prevent parsing issues
    const inlineCodePlaceholders = [];
    tempMarkdown = tempMarkdown.replace(/`([^`]+)`/g, (match, code) => {
        const placeholder = `__INLINE_CODE_${inlineCodePlaceholders.length}__`;
        inlineCodePlaceholders.push(code);
        return placeholder;
    });

    // Store code blocks to prevent parsing issues
    const codePlaceholders = [];

    // Handle tables
    tempMarkdown = tempMarkdown.replace(/^\|(.+)\n\|(.*?)\n((?:\|.*(?:\n|$))*)/gm, (match, headerLine, separatorLine, dataLines) => {
        try {
            const headers = headerLine.split('|').map(h => h.trim()).filter(h => h !== '');
            const separators = separatorLine.split('|').map(s => s.trim()).filter(s => s !== '');
            const dataLinesArray = dataLines.trim().split('\n');

            // Determine column alignment
            const alignments = separators.map(separator => {
                if (separator.startsWith(':') && separator.endsWith(':')) return 'center';
                if (separator.startsWith(':')) return 'left'; // Markdown spec says left if only start is colon
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
            dataLinesArray.forEach(line => {
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
    processedMarkdown = tempMarkdown.replace(/```([\w-]*)\n([\s\S]*?)```/g, function (match, language, code) {
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
            // Remove .md extension and add # to make it a fragment identifier
            const internalPath = url.replace(/\.md$/, '').replace(/\//g, '-');
            return `<a href="#${internalPath}">${text}</a>`;
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

    // Add navigation buttons
    processedMarkdown += `
        <div class="chapter-navigation">
            <button id="mark-completed" class="mark-completed-button">Kapitel als abgeschlossen markieren</button>
        </div>
    `;

    // Wrap the entire content in a div with markdown-content class for proper styling
    processedMarkdown = `<div class="markdown-content">${processedMarkdown}</div>`;

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