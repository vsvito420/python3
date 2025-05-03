- [Zurück zu Kapitel 1](Kapitel_1.md)

# Quiz zu Kapitel 1: Grundlagen (KI-gestützt)

Teste dein Wissen zu den Grundlagen von Python! Dieses Quiz interagiert mit einer KI, um dir Fragen zu stellen und dein Verständnis zu prüfen.

## Teil 1: KI-gestützte Fragen

Hier werden in Zukunft Fragen von der KI (Gemini) gestellt.

<div class="quiz-container-ai" data-quiz-id="kapitel1-ai">
  <p><strong>Hinweis:</strong> Die KI-Integration befindet sich noch in der Entwicklung.</p>
  <!-- Bereich für KI-Fragen und Antworten -->
  <div id="ai-question-area">
    <p>Klicke auf den Button, um eine Frage von der KI zu erhalten.</p>
    <button id="ask-ai-button" class="quiz-button">Frage von KI stellen</button>
  </div>
  <div id="ai-answer-area" style="margin-top: 20px;">
    <!-- Hier wird die Antwort/Bewertung der KI angezeigt -->
  </div>
</div>

## Teil 2: Praktische Programmieraufgabe (mit KI-Feedback)

<div class="coding-exercise" data-exercise-id="kapitel1-code-ai">
  <p>Schreibe ein Python-Programm, das:</p>
  <ol>
    <li>Deinen Namen in einer Variable speichert</li>
    <li>Dein Alter in einer Variable speichert</li>
    <li>Eine formatierte Ausgabe erstellt, die deinen Namen und dein Alter enthält</li>
    <li>Eine Berechnung durchführt, wie alt du in 10 Jahren sein wirst</li>
    <li>Das Ergebnis in der Konsole ausgibt</li>
  </ol>

  <p>Füge deinen Code hier ein und lasse ihn von der KI überprüfen:</p>
  <!-- Hier könnte ein Code-Editor oder ein Textfeld für den Code stehen -->
  <textarea id="user-code-input" rows="10" style="width: 100%; font-family: monospace;"></textarea>
  <button id="check-code-ai-button" class="quiz-button" style="margin-top: 10px;">Code von KI prüfen lassen</button>

  <div id="ai-code-feedback" style="margin-top: 20px;">
    <!-- Hier wird das Feedback der KI zum Code angezeigt -->
  </div>
</div>

## Nächste Schritte

<div class="next-steps">
  <p>Sobald du dich sicher fühlst, kannst du zum nächsten Kapitel weitergehen:</p>
  <a href="../Kapitel_2/Kapitel_2.md" class="next-chapter-button">Zum nächsten Kapitel</a>
</div>

<!-- Hinweis: Die eigentliche Logik zur Kommunikation mit der Gemini-API
     muss noch in einer separaten JavaScript-Datei oder serverseitig implementiert
     und hier eingebunden werden. -->

<style>
/* Grundlegendes Styling (kann in zentrale CSS-Datei verschoben werden) */
.quiz-container-ai, .coding-exercise {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.quiz-button {
  background-color: #007bff; /* Blauer Button für KI-Aktionen */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.quiz-button:hover {
  background-color: #0056b3;
}

.next-steps {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0fff0;
  border-radius: 8px;
  border-left: 6px solid #4CAF50;
}

.next-chapter-button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.next-chapter-button:hover {
  background-color: #45a049;
}

textarea {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
}
</style>
&lt;script src="../../js/ai-quiz-interaction.js" defer&gt;&lt;/script&gt;