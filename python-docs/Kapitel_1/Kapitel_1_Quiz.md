- [Zurück zu Kapitel 1](Kapitel_1.md)

# Quiz zu Kapitel 1: Grundlagen

Teste dein Wissen zu den Grundlagen von Python! Beantworte die folgenden Fragen, um dein Verständnis zu überprüfen.

<div class="quiz-container">

## Frage 1: Textausgabe in der Konsole
Welche Funktion wird in Python verwendet, um Text in der Konsole auszugeben?

<div class="quiz-options">
<label><input type="radio" name="q1" value="A"> `write()`</label>
<label><input type="radio" name="q1" value="B"> `console.log()`</label>
<label><input type="radio" name="q1" value="C"> `print()`</label>
<label><input type="radio" name="q1" value="D"> `output()`</label>
</div>

## Frage 2: Variablen und Datentypen
Welcher der folgenden Datentypen ist in Python KEIN grundlegender Datentyp?

<div class="quiz-options">
<label><input type="radio" name="q2" value="A"> `int`</label>
<label><input type="radio" name="q2" value="B"> `float`</label>
<label><input type="radio" name="q2" value="C"> `array`</label>
<label><input type="radio" name="q2" value="D"> `bool`</label>
</div>

## Frage 3: Operatoren
Was ist das Ergebnis von `5 // 2` in Python?

<div class="quiz-options">
<label><input type="radio" name="q3" value="A"> `2.5`</label>
<label><input type="radio" name="q3" value="B"> `2`</label>
<label><input type="radio" name="q3" value="C"> `2.0`</label>
<label><input type="radio" name="q3" value="D"> `3`</label>
</div>

## Frage 4: Strings
Wie erstellt man einen mehrzeiligen String in Python?

<div class="quiz-options">
<label><input type="radio" name="q4" value="A"> Mit einfachen Anführungszeichen: `'text'`</label>
<label><input type="radio" name="q4" value="B"> Mit doppelten Anführungszeichen: `"text"`</label>
<label><input type="radio" name="q4" value="C"> Mit dreifachen Anführungszeichen: `"""text"""`</label>
<label><input type="radio" name="q4" value="D"> Mit dem Keyword `multiline`</label>
</div>

## Frage 5: Kommentare
Wie schreibt man einen einzeiligen Kommentar in Python?

<div class="quiz-options">
<label><input type="radio" name="q5" value="A"> `// Kommentar`</label>
<label><input type="radio" name="q5" value="B"> `/* Kommentar */`</label>
<label><input type="radio" name="q5" value="C"> `# Kommentar`</label>
<label><input type="radio" name="q5" value="D"> `-- Kommentar`</label>
</div>

## Deine Antworten

<div class="quiz-answers">
<textarea id="quiz-answers" rows="6" placeholder="Trage deine Antworten hier ein:
Frage 1:
Frage 2:
Frage 3:
Frage 4:
Frage 5: "></textarea>
</div>

<div class="quiz-submit">
<button id="submit-quiz" onclick="submitQuiz()">Quiz abschicken</button>
</div>

<div id="quiz-result" class="quiz-result" style="display: none;">
<h3>Ergebnis:</h3>
<p id="quiz-score"></p>
<div id="quiz-feedback"></div>
</div>

</div>

<script>
function submitQuiz() {
  // Diese Funktion würde normalerweise die Antworten auswerten
  // In diesem Fall sammeln wir nur die Antworten für die Gemini API
  
  const answers = document.getElementById('quiz-answers').value;
  
  // Hier würde die Auswertung durch die Gemini API erfolgen
  // Für Demonstrationszwecke zeigen wir nur eine Nachricht an
  
  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('quiz-score').innerHTML =
    'Deine Antworten wurden gespeichert und werden von der KI ausgewertet.';
  document.getElementById('quiz-feedback').innerHTML =
    'Bei erfolgreicher Bewertung kannst du zum <a href="../Kapitel_2/Kapitel_2.md">nächsten Kapitel</a> weitergehen.';
}
</script>

<style>
.quiz-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.quiz-options label {
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.quiz-answers textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
}

.quiz-submit button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.quiz-submit button:hover {
  background-color: #45a049;
}

.quiz-result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  background-color: #e7f3fe;
  border-left: 6px solid #2196F3;
}
</style>