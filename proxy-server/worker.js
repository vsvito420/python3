/**
 * Gemini API Proxy Worker für Cloudflare Workers
 * 
 * Dieser Worker ermöglicht den Zugriff auf die Gemini API von einer statischen Website aus,
 * ohne den API-Schlüssel im Frontend offenzulegen.
 */

// CORS-Header für den Worker
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Respond to OPTIONS requests
 */
async function handleOptions(request) {
    return new Response(null, {
        headers: corsHeaders,
        status: 204,
    });
}

/**
 * Handle the API request to Gemini
 */
async function handleRequest(request) {
    try {
        // Nur POST-Anfragen für den Proxy akzeptieren
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed. Use POST.', { status: 405, headers: corsHeaders });
        }

        // Prüfen, ob der API-Schlüssel konfiguriert ist
        const apiKey = GEMINI_API_KEY;
        if (!apiKey) {
            return new Response('Server Error: API Key nicht konfiguriert.', {
                status: 500,
                headers: corsHeaders
            });
        }

        // Request-Body parsen
        const requestData = await request.json();

        if (!requestData.prompt) {
            return new Response('Bad Request: "prompt" fehlt im Request-Body.', {
                status: 400,
                headers: corsHeaders
            });
        }

        // Gemini API URL mit API-Schlüssel
        const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // Request-Body für Gemini vorbereiten
        const geminiRequestBody = {
            contents: [{
                parts: [{ text: requestData.prompt }]
            }]
        };

        // Anfrage an Gemini API senden
        const geminiResponse = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geminiRequestBody),
        });

        // Fehlerbehandlung für Gemini API
        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            return new Response(`Fehler bei der Gemini API: ${errorText}`, {
                status: geminiResponse.status,
                headers: corsHeaders
            });
        }

        // Antwort von Gemini verarbeiten
        const geminiData = await geminiResponse.json();

        // Text aus der Gemini-Antwort extrahieren
        let generatedText = '';
        if (geminiData.candidates &&
            geminiData.candidates[0] &&
            geminiData.candidates[0].content &&
            geminiData.candidates[0].content.parts &&
            geminiData.candidates[0].content.parts[0]) {
            generatedText = geminiData.candidates[0].content.parts[0].text;
        } else {
            return new Response('Unerwartete Antwortstruktur von Gemini API.', {
                status: 500,
                headers: corsHeaders
            });
        }

        // Erfolgreiche Antwort zurückgeben
        return new Response(JSON.stringify({ text: generatedText }), {
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    } catch (error) {
        // Allgemeine Fehlerbehandlung
        return new Response(`Serverfehler: ${error.message}`, {
            status: 500,
            headers: corsHeaders
        });
    }
}

// Event-Listener für Fetch-Events
addEventListener('fetch', (event) => {
    // OPTIONS-Anfragen für CORS behandeln
    if (event.request.method === 'OPTIONS') {
        event.respondWith(handleOptions(event.request));
    } else if (new URL(event.request.url).pathname === '/api/gemini-proxy') {
        // Nur Anfragen an /api/gemini-proxy weitergeben
        event.respondWith(handleRequest(event.request));
    } else {
        // 404 für alle anderen Pfade
        event.respondWith(
            new Response('Not Found', { status: 404, headers: corsHeaders })
        );
    }
});