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

Wenn du beide Teile des Quiz bearbeitet hast, kannst du deine Antworten mit der Gemini API bewerten lassen. Führe dazu den folgenden Code-Block aus:

```bash
#!/bin/bash
set -e -E


MODEL_ID="gemini-2.5-flash-preview-04-17"
GENERATE_CONTENT_API="streamGenerateContent"

# Sammle die Quizergebnisse
QUIZ_RESULTS=$(cat << EOF
Multiple-Choice-Antworten:
$(python -c "
antworten = {
    'Frage 1': '$(grep -A6 'antworten = {' python-docs/Kapitel_1/Kapitel_1_Quiz.md | grep 'Frage 1' | cut -d'\"' -f4)',
    'Frage 2': '$(grep -A6 'antworten = {' python-docs/Kapitel_1/Kapitel_1_Quiz.md | grep 'Frage 2' | cut -d'\"' -f4)',
    'Frage 3': '$(grep -A6 'antworten = {' python-docs/Kapitel_1/Kapitel_1_Quiz.md | grep 'Frage 3' | cut -d'\"' -f4)',
    'Frage 4': '$(grep -A6 'antworten = {' python-docs/Kapitel_1/Kapitel_1_Quiz.md | grep 'Frage 4' | cut -d'\"' -f4)',
    'Frage 5': '$(grep -A6 'antworten = {' python-docs/Kapitel_1/Kapitel_1_Quiz.md | grep 'Frage 5' | cut -d'\"' -f4)'
}
for frage, antwort in antworten.items():
    print(f'{frage}: {antwort}')
")

Programmieraufgabe:
$(sed -n '/^```python$/,/^```$/p' python-docs/Kapitel_1/Kapitel_1_Quiz.md | grep -v '```')
EOF
)

# Erstelle die Anfrage an die Gemini API
cat << EOF > request.json
{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Bewerte die folgenden Quiz-Antworten für ein Python-Grundlagen-Quiz. Die korrekten Antworten sind: Frage 1: C, Frage 2: C, Frage 3: B, Frage 4: C, Frage 5: C. Für die Programmieraufgabe sollte der Code einen Namen und ein Alter in Variablen speichern, eine formatierte Ausgabe erstellen und berechnen, wie alt die Person in 10 Jahren sein wird. Gib eine detaillierte Bewertung und sage, ob der Benutzer bestanden hat (mindestens 70% korrekt).\n\n$QUIZ_RESULTS"
          }
        ]
      }
    ],
    "generationConfig": {
      "responseMimeType": "text/plain"
    }
}
EOF

# Sende die Anfrage an die Gemini API
curl \
-X POST \
-H "Content-Type: application/json" \
"https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}" -d '@request.json'
```

Nach der Bewertung durch die Gemini API kannst du bei erfolgreicher Bewertung zum [nächsten Kapitel](../Kapitel_2/Kapitel_2.md) weitergehen.

> Hinweis: Du musst das Quiz erfolgreich abschließen, um zum nächsten Kapitel zu gelangen. Die KI bewertet sowohl die Richtigkeit deiner Antworten als auch die Funktionalität und Qualität deines Codes.