- [Zurück zu Kapitel 1](Kapitel_1.md)

# Quiz zu Kapitel 1: Grundlagen

Teste dein Wissen zu den Grundlagen von Python! Dieses Quiz besteht aus zwei Teilen:
1. Multiple-Choice-Fragen zu den Grundlagen
2. Eine praktische Programmieraufgabe

## Teil 1: Multiple-Choice-Fragen

Beantworte die folgenden Fragen, indem du den Code-Block am Ende dieses Abschnitts ausfüllst.

### Frage 1: Textausgabe in der Konsole
Welche Funktion wird in Python verwendet, um Text in der Konsole auszugeben?
- A: `write()`
- B: `console.log()`
- C: `print()`
- D: `output()`

### Frage 2: Variablen und Datentypen
Welcher der folgenden Datentypen ist in Python KEIN grundlegender Datentyp?
- A: `int`
- B: `float`
- C: `array`
- D: `bool`

### Frage 3: Operatoren
Was ist das Ergebnis von `5 // 2` in Python?
- A: `2.5`
- B: `2`
- C: `2.0`
- D: `3`

### Frage 4: Strings
Wie erstellt man einen mehrzeiligen String in Python?
- A: Mit einfachen Anführungszeichen: `'text'`
- B: Mit doppelten Anführungszeichen: `"text"`
- C: Mit dreifachen Anführungszeichen: `"""text"""`
- D: Mit dem Keyword `multiline`

### Frage 5: Kommentare
Wie schreibt man einen einzeiligen Kommentar in Python?
- A: `// Kommentar`
- B: `/* Kommentar */`
- C: `# Kommentar`
- D: `-- Kommentar`

Trage deine Antworten in den folgenden Code-Block ein:

```python
# Ersetze die Platzhalter mit deinen Antworten (A, B, C oder D)
antworten = {
    "Frage 1": "",  # Textausgabe in der Konsole
    "Frage 2": "",  # Variablen und Datentypen
    "Frage 3": "",  # Operatoren
    "Frage 4": "",  # Strings
    "Frage 5": ""   # Kommentare
}

# Gib deine Antworten aus, damit sie in der Konsole erscheinen
print("Meine Antworten:")
for frage, antwort in antworten.items():
    print(f"{frage}: {antwort}")
```

## Teil 2: Praktische Programmieraufgabe

Schreibe ein Python-Programm, das:
1. Deinen Namen in einer Variable speichert
2. Dein Alter in einer Variable speichert
3. Eine formatierte Ausgabe erstellt, die deinen Namen und dein Alter enthält
4. Eine Berechnung durchführt, wie alt du in 10 Jahren sein wirst
5. Das Ergebnis in der Konsole ausgibt

Verwende dafür den folgenden Code-Block:

```python
# Schreibe hier dein Programm
# Beispiel:
# name = "Max"
# alter = 25
# ...

```

## Bewertung mit der Gemini API

Wenn du beide Teile des Quiz bearbeitet hast, kannst du deine Antworten mit der Gemini API bewerten lassen. Klicke auf den Button unten, um deine Antworten zu bewerten:

<div id="quiz-evaluation">
  <button id="evaluate-quiz" onclick="evaluateQuiz()">Quiz bewerten</button>
  <div id="evaluation-result" style="display: none; margin-top: 20px; padding: 15px; border-radius: 4px;"></div>
</div>

<script>
async function evaluateQuiz() {
  // API-Konfiguration
  // Der API-Key wird aus der Umgebungsvariable geladen
  const MODEL_ID = "gemini-2.5-flash-preview-04-17";
  
  // Funktion zum Abrufen des API-Keys
  async function getApiKey() {
    try {
      // Versuche, den API-Key aus dem Server zu laden
      const response = await fetch('/api/get-gemini-key');
      if (response.ok) {
        const data = await response.json();
        return data.apiKey;
      }
    } catch (error) {
      console.error("Fehler beim Laden des API-Keys vom Server:", error);
    }
    
    // Fallback: Verwende einen Platzhalter und informiere den Benutzer
    alert("Der API-Key konnte nicht geladen werden. Bitte kontaktiere den Administrator.");
    return null;
  }
  
  // Hole den API-Key
  const GEMINI_API_KEY = await getApiKey();
  if (!GEMINI_API_KEY) {
    return; // Breche ab, wenn kein API-Key verfügbar ist
  }
  
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;
  
  // Sammle die Multiple-Choice-Antworten
  let mcAnswers = {};
  try {
    // Versuche, die Antworten aus dem ersten Code-Block zu extrahieren
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length > 0) {
      const answerCodeText = codeBlocks[0].textContent;
      // Extrahiere die Antworten mit einem regulären Ausdruck
      const answerRegex = /"Frage (\d+)":\s*"([A-D])"/g;
      let match;
      while ((match = answerRegex.exec(answerCodeText)) !== null) {
        mcAnswers[`Frage ${match[1]}`] = match[2];
      }
    }
  } catch (error) {
    console.error("Fehler beim Extrahieren der Multiple-Choice-Antworten:", error);
  }
  
  // Sammle den Code aus dem zweiten Code-Block
  let userCode = "";
  try {
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length > 1) {
      userCode = codeBlocks[1].textContent;
    }
  } catch (error) {
    console.error("Fehler beim Extrahieren des Codes:", error);
  }
  
  // Sammle die Konsolenausgabe, falls vorhanden
  let consoleOutput = "";
  try {
    const outputElements = document.querySelectorAll('.output');
    if (outputElements.length > 0) {
      consoleOutput = outputElements[0].textContent;
    }
  } catch (error) {
    console.error("Fehler beim Extrahieren der Konsolenausgabe:", error);
  }
  
  // Bereite die Anfrage an die Gemini API vor
  const quizResults = `
Multiple-Choice-Antworten:
${Object.entries(mcAnswers).map(([frage, antwort]) => `${frage}: ${antwort}`).join('\n')}

Programmieraufgabe:
${userCode}

Konsolenausgabe:
${consoleOutput || "(Keine Ausgabe)"}
`;

  const requestData = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Bewerte die folgenden Quiz-Antworten für ein Python-Grundlagen-Quiz. Die korrekten Antworten sind: Frage 1: C, Frage 2: C, Frage 3: B, Frage 4: C, Frage 5: C. Für die Programmieraufgabe sollte der Code einen Namen und ein Alter in Variablen speichern, eine formatierte Ausgabe erstellen und berechnen, wie alt die Person in 10 Jahren sein wird. Gib eine detaillierte Bewertung und sage, ob der Benutzer bestanden hat (mindestens 70% korrekt).\n\n${quizResults}`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024
    }
  };

  // Zeige Ladeanzeige
  const resultElement = document.getElementById('evaluation-result');
  resultElement.style.display = 'block';
  resultElement.style.backgroundColor = '#f0f0f0';
  resultElement.innerHTML = '<p>Bewertung wird durchgeführt...</p>';

  try {
    // Sende die Anfrage an die Gemini API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API-Fehler: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const evaluationText = data.candidates[0].content.parts[0].text;
    
    // Bestimme, ob der Benutzer bestanden hat
    const passed = evaluationText.toLowerCase().includes('bestanden');
    
    // Zeige das Ergebnis an
    resultElement.style.backgroundColor = passed ? '#e6ffe6' : '#ffe6e6';
    resultElement.innerHTML = `
      <h3>${passed ? 'Quiz bestanden! 🎉' : 'Quiz nicht bestanden'}</h3>
      <div style="white-space: pre-wrap;">${evaluationText}</div>
      ${passed ? `<p>Du kannst jetzt zum <a href="../Kapitel_2/Kapitel_2.md">nächsten Kapitel</a> weitergehen.</p>` : ''}
    `;
  } catch (error) {
    console.error("Fehler bei der API-Anfrage:", error);
    resultElement.style.backgroundColor = '#ffe6e6';
    resultElement.innerHTML = `
      <h3>Fehler bei der Bewertung</h3>
      <p>Es ist ein Fehler aufgetreten: ${error.message}</p>
      <p>Bitte versuche es später noch einmal oder wende dich an den Support.</p>
    `;
  }
}
</script>

<style>
#quiz-evaluation button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

#quiz-evaluation button:hover {
  background-color: #45a049;
}

#evaluation-result {
  border-left: 6px solid #2196F3;
  line-height: 1.5;
}
</style>

Nach der Bewertung durch die Gemini API kannst du bei erfolgreicher Bewertung zum [nächsten Kapitel](../Kapitel_2/Kapitel_2.md) weitergehen.

> Hinweis: Du musst das Quiz erfolgreich abschließen, um zum nächsten Kapitel zu gelangen. Die KI bewertet sowohl die Richtigkeit deiner Antworten als auch die Funktionalität und Qualität deines Codes.