// Lädt Umgebungsvariablen aus einer .env-Datei in process.env
// Erstelle eine .env-Datei im Stammverzeichnis und füge deinen API-Schlüssel hinzu:
// GEMINI_API_KEY=DEIN_GOOGLE_API_SCHLUESSEL
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Du kannst einen anderen Port wählen, falls 3000 belegt ist

// Middleware, um JSON-Request-Bodies zu parsen
app.use(express.json());

// API-Endpunkt für den Gemini-Proxy
app.post('/api/gemini-proxy', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  if (!apiKey) {
    console.error('Fehler: GEMINI_API_KEY ist nicht gesetzt.');
    return res.status(500).json({ error: 'API-Schlüssel für Gemini nicht konfiguriert.' });
  }

  const userPrompt = req.body.prompt;

  if (!userPrompt) {
    return res.status(400).json({ error: 'Kein "prompt" im Request-Body gefunden.' });
  }

  try {
    console.log(`Sende Anfrage an Gemini mit Prompt: "${userPrompt.substring(0, 50)}..."`);

    const geminiRequestBody = {
      contents: [{
        parts: [{ text: userPrompt }]
      }]
    };

    const geminiResponse = await axios.post(geminiApiUrl, geminiRequestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Extrahiere den Text aus der Gemini-Antwort
    // Beachte: Die Struktur der Antwort kann sich ändern. Passe dies ggf. an.
    let generatedText = '';
    if (geminiResponse.data && geminiResponse.data.candidates && geminiResponse.data.candidates[0] && geminiResponse.data.candidates[0].content && geminiResponse.data.candidates[0].content.parts && geminiResponse.data.candidates[0].content.parts[0]) {
      generatedText = geminiResponse.data.candidates[0].content.parts[0].text;
      console.log(`Antwort von Gemini erhalten: "${generatedText.substring(0, 50)}..."`);
    } else {
      console.warn('Konnte keinen Text aus der Gemini-Antwort extrahieren. Struktur:', JSON.stringify(geminiResponse.data, null, 2));
      // Sende trotzdem die Rohdaten oder eine Standardnachricht, falls gewünscht
      // generatedText = JSON.stringify(geminiResponse.data); // Optional: Rohdaten senden
      return res.status(500).json({ error: 'Unerwartete Antwortstruktur von Gemini.' });
    }


    // Sende die Antwort an das Frontend
    res.json({ text: generatedText });

  } catch (error) {
    console.error('Fehler beim Aufruf der Gemini API:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
       error: 'Fehler bei der Kommunikation mit der Gemini API.',
       details: error.response ? error.response.data : error.message
    });
  }
});

// Starte den Server
app.listen(port, () => {
  console.log(`Gemini Proxy Server läuft auf http://localhost:${port}`);
  console.log('Endpunkt verfügbar unter: POST /api/gemini-proxy');
  console.log('Stelle sicher, dass die Umgebungsvariable GEMINI_API_KEY gesetzt ist (z.B. in einer .env Datei).');
});