# Python Learning Platform

A simple, interactive web-based platform for learning Python. This platform allows users to write and execute Python code directly in the browser using Pyodide and the Monaco code editor.

## Features

- Interactive Python code execution in the browser
- Monaco code editor with syntax highlighting
- Responsive layout with:
  - Left: Collapsible navigation sidebar
  - Middle: Code editor and output
  - Right: Instructions panel
- Multiple lessons with progressive learning
- No server-side code required (all Python execution happens client-side)

## Project Structure

- `index.html` - Main HTML file with the page structure
- `styles.css` - CSS styling for the website
- `script.js` - JavaScript code for editor initialization and Python execution

## How It Works

This platform uses:

- [Pyodide](https://pyodide.org/) - A Python distribution for the browser, compiled to WebAssembly
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The code editor that powers VS Code, for a rich editing experience

## Local Development

To run this project locally:

1. Clone this repository
2. Open the project folder in your preferred code editor
3. Use a local development server to serve the files (due to CORS restrictions)

You can use any of these methods to start a local server:

**Using Python:**
```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

**Using Node.js:**
```bash
# Install http-server globally if you haven't already
npm install -g http-server

# Start the server
http-server
```

Then open your browser and navigate to `http://localhost:8000` (or the port shown in your terminal).

## Deploying to Cloudflare Pages

To deploy this website to Cloudflare Pages:

1. Create a Cloudflare account if you don't have one already
2. Go to the Cloudflare Dashboard and navigate to Pages
3. Click "Create a project"
4. Connect your GitHub account and select this repository
5. Configure your build settings:
   - Build command: Leave empty (no build required)
   - Build output directory: Leave as the default (usually `/`)
6. Click "Save and Deploy"

Cloudflare Pages will automatically deploy your site and provide you with a URL.

### Manual Deployment

If you prefer to deploy manually:

1. Go to Cloudflare Pages in your dashboard
2. Click "Create a project"
3. Select "Direct Upload"
4. Drag and drop all the files from this project
5. Click "Deploy site"

## Customizing the Platform

### Adding New Lessons

To add new lessons, edit the `index.html` file:

1. Add a new lesson item to the sidebar menu
2. Create a new lesson container with the appropriate ID
3. Add the lesson content, editor, and output elements
4. Update the `defaultCode` object in `script.js` with the default code for the new lesson

### Modifying the Layout

The layout uses CSS Grid and is fully responsive. You can modify the layout by editing the CSS in `styles.css`.

## License

This project is open source and available under the MIT License.