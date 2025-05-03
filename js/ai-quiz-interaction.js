// js/ai-quiz-interaction.js

document.addEventListener('DOMContentLoaded', () => {
    const askAiButton = document.getElementById('ask-ai-button');
    const checkCodeAiButton = document.getElementById('check-code-ai-button');
    const aiQuestionArea = document.getElementById('ai-question-area');
    const aiAnswerArea = document.getElementById('ai-answer-area');
    const userCodeInput = document.getElementById('user-code-input');
    const aiCodeFeedback = document.getElementById('ai-code-feedback');

    // Hypothetischer Backend-Endpunkt für die Gemini-API-Proxy
    // Dieser Endpunkt muss serverseitig implementiert werden!
    const GEMINI_PROXY_ENDPOINT = '/api/gemini-proxy';

    const showLoading = (element, message) => {
        element.innerHTML = `<p style="color: #555;">${message}</p>`;
    };

    const showError = (element, error) => {
        console.error('Fehler:', error);
        element.innerHTML = `<p style="color: red;">Fehler: ${error.message}</p>`;
    };

    const displayContent = (element, content, title = '') => {
        // Einfache Konvertierung von Markdown-ähnlichen Code-Blöcken zu HTML <pre>
        const formattedContent = content
            .replace(/```python\n([\s\S]*?)\n```/g, '<pre><code class="language-python">$1</code></pre>')
            .replace(/```\n([\s\S]*?)\n```/g, '<pre>$1</pre>')
            .replace(/\n/g, '<br>'); // Zeilenumbrüche beibehalten

        element.innerHTML = (title ? `<p><strong>${title}</strong></p>` : '') + formattedContent;
        // Ggf. Syntax-Highlighting für Code-Blöcke initialisieren, falls eine Bibliothek verwendet wird
        // z.B. if (typeof hljs !== 'undefined') { hljs.highlightAll(); }
    };

    // --- Funktion zum Stellen einer Frage an die KI ---
    if (askAiButton && aiQuestionArea && aiAnswerArea) {
        askAiButton.addEventListener('click', async () => {
            showLoading(aiQuestionArea, 'KI denkt nach...');
            aiAnswerArea.innerHTML = ''; // Antwortbereich leeren

            try {
                const prompt = "Stelle eine Multiple-Choice-Frage zu den Python-Grundlagen aus Kapitel 1 (Textausgabe, Variablen, Datentypen, Operatoren, Strings) mit 4 Antwortmöglichkeiten (A, B, C, D). Gib nur die Frage und die Optionen zurück.";

                const response = await fetch(GEMINI_PROXY_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt })
                });

                if (!response.ok) throw new Error(`API-Anfrage fehlgeschlagen (${response.status})`);
                const data = await response.json();

                if (!data.text) throw new Error('Keine gültige Antwort von der KI erhalten.');

                displayContent(aiQuestionArea, data.text, 'KI-Frage:');
                // Fügt ein Eingabefeld und einen Button zum Prüfen der Antwort hinzu
                aiAnswerArea.innerHTML = `
                    <textarea id="user-ai-answer" rows="3" style="width: 100%; margin-top: 10px;" placeholder="Deine Antwort hier (z.B. 'C')..."></textarea>
                    <button id="submit-ai-answer" class="quiz-button" style="margin-top: 5px;">Antwort prüfen</button>
                    <div id="ai-answer-feedback" style="margin-top: 10px;"></div>`;

                // Event-Listener für den neuen Submit-Button hinzufügen
                const submitAiAnswerButton = document.getElementById('submit-ai-answer');
                const userAnswerInput = document.getElementById('user-ai-answer');
                const aiAnswerFeedback = document.getElementById('ai-answer-feedback');

                if (submitAiAnswerButton && userAnswerInput && aiAnswerFeedback) {
                    submitAiAnswerButton.addEventListener('click', async () => {
                        const userAnswer = userAnswerInput.value;
                        if (!userAnswer.trim()) {
                            aiAnswerFeedback.innerHTML = '<p style="color: orange;">Bitte gib deine Antwort ein.</p>';
                            return;
                        }
                        showLoading(aiAnswerFeedback, 'KI prüft deine Antwort...');

                        try {
                            const checkPrompt = `Die Frage war:\n${data.text}\n\nDie Antwort des Benutzers ist: ${userAnswer}\n\nIst diese Antwort korrekt? Gib eine kurze Begründung.`;
                            const checkResponse = await fetch(GEMINI_PROXY_ENDPOINT, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ prompt: checkPrompt })
                            });
                            if (!checkResponse.ok) throw new Error(`API-Anfrage fehlgeschlagen (${checkResponse.status})`);
                            const checkData = await checkResponse.json();
                            if (!checkData.text) throw new Error('Keine gültige Antwort von der KI erhalten.');
                            displayContent(aiAnswerFeedback, checkData.text, 'KI-Bewertung:');
                        } catch (error) {
                            showError(aiAnswerFeedback, error);
                        }
                    });
                }

            } catch (error) {
                showError(aiQuestionArea, error);
            }
        });
    }

    // --- Funktion zum Prüfen des Codes durch die KI ---
    if (checkCodeAiButton && userCodeInput && aiCodeFeedback) {
        checkCodeAiButton.addEventListener('click', async () => {
            const userCode = userCodeInput.value;
            if (!userCode.trim()) {
                aiCodeFeedback.innerHTML = '<p style="color: orange;">Bitte gib zuerst deinen Code ein.</p>';
                return;
            }
            showLoading(aiCodeFeedback, 'KI prüft den Code...');

            try {
                const prompt = `Bewerte den folgenden Python-Code bezüglich der Aufgabe (Name/Alter speichern, formatierte Ausgabe, Berechnung Alter+10). Gib konstruktives Feedback und weise auf Fehler oder Verbesserungsmöglichkeiten hin.\n\nCode:\n\`\`\`python\n${userCode}\n\`\`\``;

                const response = await fetch(GEMINI_PROXY_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt })
                });

                if (!response.ok) throw new Error(`API-Anfrage fehlgeschlagen (${response.status})`);
                const data = await response.json();

                if (!data.text) throw new Error('Keine gültige Antwort von der KI erhalten.');
                displayContent(aiCodeFeedback, data.text, 'KI-Feedback:');

            } catch (error) {
                showError(aiCodeFeedback, error);
            }
        });
    }
});