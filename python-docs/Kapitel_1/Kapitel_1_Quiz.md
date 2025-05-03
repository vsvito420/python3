- [Zurück zu Kapitel 1](Kapitel_1.md)

# Quiz zu Kapitel 1: Grundlagen

Teste dein Wissen zu den Grundlagen von Python! Dieses Quiz besteht aus zwei Teilen:
1. Multiple-Choice-Fragen zu den Grundlagen
2. Eine praktische Programmieraufgabe

## Teil 1: Multiple-Choice-Fragen

<div class="quiz-container" data-quiz-id="kapitel1">
  <div class="quiz-question" data-question-id="1">
    <h3>Frage 1: Textausgabe in der Konsole</h3>
    <p>Welche Funktion wird in Python verwendet, um Text in der Konsole auszugeben?</p>
    <div class="quiz-options">
      <div class="quiz-option"><input type="radio" name="q1" value="A" id="q1-A"><label for="q1-A">A: <code>write()</code></label></div>
      <div class="quiz-option"><input type="radio" name="q1" value="B" id="q1-B"><label for="q1-B">B: <code>console.log()</code></label></div>
      <div class="quiz-option"><input type="radio" name="q1" value="C" id="q1-C"><label for="q1-C">C: <code>print()</code></label></div>
      <div class="quiz-option"><input type="radio" name="q1" value="D" id="q1-D"><label for="q1-D">D: <code>output()</code></label></div>
    </div>
  </div>

  <div class="quiz-question" data-question-id="2">
    <h3>Frage 2: Variablen und Datentypen</h3>
    <p>Welcher der folgenden Datentypen ist in Python KEIN grundlegender Datentyp?</p>
    <div class="quiz-options">
      <div class="quiz-option"><input type="radio" name="q2" value="A" id="q2-A"><label for="q2-A">A: <code>int</code></label></div>
      <div class="quiz-option"><input type="radio" name="q2" value="B" id="q2-B"><label for="q2-B">B: <code>float</code></label></div>
      <div class="quiz-option"><input type="radio" name="q2" value="C" id="q2-C"><label for="q2-C">C: <code>array</code></label></div>
      <div class="quiz-option"><input type="radio" name="q2" value="D" id="q2-D"><label for="q2-D">D: <code>bool</code></label></div>
    </div>
  </div>

  <div class="quiz-question" data-question-id="3">
    <h3>Frage 3: Operatoren</h3>
    <p>Was ist das Ergebnis von <code>5 // 2</code> in Python?</p>
    <div class="quiz-options">
      <div class="quiz-option"><input type="radio" name="q3" value="A" id="q3-A"><label for="q3-A">A: <code>2.5</code></label></div>
      <div class="quiz-option"><input type="radio" name="q3" value="B" id="q3-B"><label for="q3-B">B: <code>2</code></label></div>
      <div class="quiz-option"><input type="radio" name="q3" value="C" id="q3-C"><label for="q3-C">C: <code>2.0</code></label></div>
      <div class="quiz-option"><input type="radio" name="q3" value="D" id="q3-D"><label for="q3-D">D: <code>3</code></label></div>
    </div>
  </div>

  <div class="quiz-question" data-question-id="4">
    <h3>Frage 4: Strings</h3>
    <p>Wie erstellt man einen mehrzeiligen String in Python?</p>
    <div class="quiz-options">
      <div class="quiz-option"><input type="radio" name="q4" value="A" id="q4-A"><label for="q4-A">A: Mit einfachen Anführungszeichen: <code>'text'</code></label></div>
      <div class="quiz-option"><input type="radio" name="q4" value="B" id="q4-B"><label for="q4-B">B: Mit doppelten Anführungszeichen: <code>"text"</code></label></div>
      <div class="quiz-option"><input type="radio" name="q4" value="C" id="q4-C"><label for="q4-C">C: Mit dreifachen Anführungszeichen: <code>"""text"""</code></label></div>
      <div class="quiz-option"><input type="radio" name="q4" value="D" id="q4-D"><label for="q4-D">D: Mit dem Keyword <code>multiline</code></label></div>
    </div>
  </div>

  <div class="quiz-question" data-question-id="5">
    <h3>Frage 5: Kommentare</h3>
    <p>Wie schreibt man einen einzeiligen Kommentar in Python?</p>
    <div class="quiz-options">
      <div class="quiz-option"><input type="radio" name="q5" value="A" id="q5-A"><label for="q5-A">A: <code>// Kommentar</code></label></div>
      <div class="quiz-option"><input type="radio" name="q5" value="B" id="q5-B"><label for="q5-B">B: <code>/* Kommentar */</code></label></div>
      <div class="quiz-option"><input type="radio" name="q5" value="C" id="q5-C"><label for="q5-C">C: <code># Kommentar</code></label></div>
      <div class="quiz-option"><input type="radio" name="q5" value="D" id="q5-D"><label for="q5-D">D: <code>-- Kommentar</code></label></div>
    </div>
  </div>
</div>

## Teil 2: Praktische Programmieraufgabe

<div class="coding-exercise" data-exercise-id="kapitel1-code">
  <p>Schreibe ein Python-Programm, das:</p>
  <ol>
    <li>Deinen Namen in einer Variable speichert</li>
    <li>Dein Alter in einer Variable speichert</li>
    <li>Eine formatierte Ausgabe erstellt, die deinen Namen und dein Alter enthält</li>
    <li>Eine Berechnung durchführt, wie alt du in 10 Jahren sein wirst</li>
    <li>Das Ergebnis in der Konsole ausgibt</li>
  </ol>

```python
# Schreibe hier dein Programm
# Beispiel:
# name = "Max"
# alter = 25
# ...

```
</div>

## Bewertung deiner Antworten

<div class="quiz-controls">
  <button id="check-quiz" class="quiz-button">Quiz überprüfen</button>
  <div id="quiz-result" class="quiz-result"></div>
</div>

<div class="quiz-feedback" style="display: none;">
  <h3>Korrekte Antworten für Multiple-Choice-Fragen:</h3>
  <ul>
    <li>Frage 1: C (<code>print()</code> wird verwendet, um Text in der Konsole auszugeben)</li>
    <li>Frage 2: C (<code>array</code> ist kein grundlegender Datentyp in Python, sondern <code>list</code>)</li>
    <li>Frage 3: B (Das Ergebnis von <code>5 // 2</code> ist <code>2</code>, da es eine Ganzzahldivision ist)</li>
    <li>Frage 4: C (Mehrzeilige Strings werden mit dreifachen Anführungszeichen erstellt)</li>
    <li>Frage 5: C (Einzeilige Kommentare beginnen mit <code>#</code>)</li>
  </ul>
  
  <h3>Beispiellösung für die Programmieraufgabe:</h3>
  <pre><code class="language-python">
# Speichere Namen und Alter in Variablen
name = "Max"
alter = 25

# Erstelle eine formatierte Ausgabe
print(f"Mein Name ist {name} und ich bin {alter} Jahre alt.")

# Berechne das Alter in 10 Jahren
alter_in_10_jahren = alter + 10

# Gib das Ergebnis aus
print(f"In 10 Jahren werde ich {alter_in_10_jahren} Jahre alt sein.")
  </code></pre>
  
  <div class="next-steps">
    <p>Wenn du mindestens 70% der Fragen richtig beantwortet hast, kannst du zum nächsten Kapitel weitergehen:</p>
    <a href="../Kapitel_2/Kapitel_2.md" class="next-chapter-button">Zum nächsten Kapitel</a>
  </div>
</div>

<script>
// Quiz-Daten für das Quiz-System
window.quizData = window.quizData || {};
window.quizData["kapitel1"] = {
  title: "Quiz zu Kapitel 1: Grundlagen",
  questions: [
    {
      id: "1",
      correctAnswer: "C",
      explanation: "In Python wird die print()-Funktion verwendet, um Text in der Konsole auszugeben."
    },
    {
      id: "2",
      correctAnswer: "C",
      explanation: "array ist kein grundlegender Datentyp in Python. Stattdessen gibt es list für ähnliche Funktionalität."
    },
    {
      id: "3",
      correctAnswer: "B",
      explanation: "Der Operator // führt eine Ganzzahldivision durch, daher ist das Ergebnis von 5 // 2 gleich 2."
    },
    {
      id: "4",
      correctAnswer: "C",
      explanation: "Mehrzeilige Strings werden in Python mit dreifachen Anführungszeichen (''' oder \"\"\") erstellt."
    },
    {
      id: "5",
      correctAnswer: "C",
      explanation: "In Python beginnen einzeilige Kommentare mit dem #-Zeichen."
    }
  ],
  codeExercise: {
    id: "kapitel1-code",
    checkFunction: function(code, output) {
      // Prüfe, ob der Code die Anforderungen erfüllt
      let hasName = /\w+\s*=\s*["'][\w\s]+["']/.test(code);
      let hasAge = /\w+\s*=\s*\d+/.test(code);
      let hasFormatted = /print\s*\(\s*f["'].*\{.*\}.*["']\s*\)/.test(code);
      let hasCalculation = /\+\s*10/.test(code);
      let hasOutput = output && output.length > 0;
      
      return {
        passed: hasName && hasAge && hasFormatted && hasCalculation && hasOutput,
        feedback: hasName && hasAge && hasFormatted && hasCalculation && hasOutput
          ? "Sehr gut! Dein Code erfüllt alle Anforderungen."
          : "Dein Code erfüllt nicht alle Anforderungen. Überprüfe, ob du: 1) Namen und Alter in Variablen speicherst, 2) eine formatierte Ausgabe erstellst, 3) das Alter in 10 Jahren berechnest, 4) das Ergebnis ausgibst."
      };
    }
  }
};

// Event-Listener für den Quiz-Button
document.addEventListener('DOMContentLoaded', function() {
  const checkButton = document.getElementById('check-quiz');
  if (checkButton) {
    checkButton.addEventListener('click', function() {
      // Zeige die Feedback-Sektion in jedem Fall an
      document.querySelector('.quiz-feedback').style.display = 'block';
      
      if (typeof window.evaluateQuiz === 'function') {
        // Verwende die Funktion aus dem Quiz-System
        // Der zweite Parameter 'true' erlaubt leere Einreichungen
        window.evaluateQuiz('kapitel1', true);
      } else {
        // Fallback, wenn das Quiz-System nicht geladen ist
        const resultElement = document.getElementById('quiz-result');
        resultElement.textContent = 'Das Quiz-System konnte nicht geladen werden. Bitte aktualisiere die Seite oder kontaktiere den Administrator.';
        resultElement.style.display = 'block';
        resultElement.className = 'quiz-result error';
      }
    });
  }
});
</script>

<style>
/* Quiz-Styling */
.quiz-container {
  margin-bottom: 30px;
}

.quiz-question {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.quiz-options {
  margin-left: 20px;
  line-height: 1.8;
}

.quiz-option {
  margin: 8px 0;
}

.quiz-option label {
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;
}

.coding-exercise {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.quiz-controls {
  margin: 30px 0;
}

.quiz-button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.quiz-button:hover {
  background-color: #45a049;
}

.quiz-result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  display: none;
}

.quiz-result.success {
  background-color: #e8f5e9;
  border-left: 6px solid #4CAF50;
}

.quiz-result.error {
  background-color: #ffebee;
  border-left: 6px solid #f44336;
}

.quiz-feedback {
  margin-top: 30px;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 6px solid #2196F3;
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
</style>

> **Hinweis:** Dieses Quiz verwendet das Quiz-System der Plattform. Wenn du Probleme beim Überprüfen deiner Antworten hast, stelle sicher, dass JavaScript aktiviert ist und die Datei js/quiz-system.js korrekt geladen wurde.