- [Zurück zu Kapitel 1](Kapitel_1.md)

# 🏆 Quiz zu Kapitel 1: Teste dein Python-Wissen! 🐍

Hallo angehende Python-Profis! 👋

Herzlichen Glückwunsch, du hast Kapitel 1 gemeistert und die ersten wichtigen Grundlagen der Python-Programmierung gelernt. Das ist ein großer Schritt! 🎉

**Warum dieses Quiz?**
Dieses Quiz ist deine Chance, dein neu erworbenes Wissen auf die Probe zu stellen. Es hilft dir dabei:
*   **Wissen zu festigen:** Durch das Beantworten der Fragen wiederholst du die wichtigsten Konzepte.
*   **Verständnis zu prüfen:** Du siehst, welche Themen du schon gut verstanden hast und wo du vielleicht noch einmal genauer hinschauen solltest.
*   **Selbstvertrauen zu gewinnen:** Erfolgreich gemeisterte Fragen motivieren und zeigen dir, was du schon alles kannst!

Nimm dir Zeit, lies die Fragen genau durch und versuche, sie bestmöglich zu beantworten. Keine Sorge, wenn nicht alles auf Anhieb klappt – das ist Teil des Lernprozesses. Am Ende jeder Frage findest du die richtige Antwort und eine Erklärung.

Viel Spaß und Erfolg! 🚀

---

## 🧠 Teil 1: Dein Wissen ist gefragt!

### 📜 Abschnitt 1: Textausgabe in der Konsole

**Frage 1 (Multiple Choice):**
Welche Funktion wird in Python verwendet, um Text in der Konsole auszugeben?
a) `display()`
b) `echo()`
c) `print()`
d) `show()`

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:** c) `print()`
  **Erklärung:** Die `print()`-Funktion ist die Standardfunktion in Python, um Informationen, meist Text (Strings), auf der Konsole anzuzeigen.
</details>

**Frage 2 (Code-Ausgabe vorhersagen):**
Was wird der folgende Code ausgeben?
```python
print("Hallo", "Welt!")
print("Python ist cool.")
```

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:**
  ```
  Hallo Welt!
  Python ist cool.
  ```
  **Erklärung:** Die `print()`-Funktion gibt standardmäßig jedes Argument getrennt durch ein Leerzeichen aus. Ein zweiter `print()`-Befehl erzeugt eine neue Zeile.
</details>

**Frage 3 (Fehler im Code finden):**
Finde den Fehler im folgenden Code:
```python
print "Hallo Python-Fans!"
```

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:** Der `print`-Befehl benötigt Klammern um den auszugebenden Text.
  **Korrigierter Code:**
  ```python
  print("Hallo Python-Fans!")
  ```
  **Erklärung:** In Python 3 ist `print` eine Funktion und erfordert daher Klammern `()`, um die Argumente zu umschließen.
</details>

---

### 📦 Abschnitt 2: Variablen und Datentypen

**Frage 4 (Multiple Choice):**
Welcher der folgenden Namen ist ein gültiger Variablenname in Python?
a) `mein alter`
b) `2jahre`
c) `alter_2`
d) `class`

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:** c) `alter_2`
  **Erklärung:** Variablennamen dürfen keine Leerzeichen enthalten (wie in a), nicht mit einer Zahl beginnen (wie in b) und keine reservierten Schlüsselwörter sein (wie `class` in d). `alter_2` ist gültig.
</details>

**Frage 5 (Code-Ausgabe vorhersagen):**
Was ist der Datentyp der Variable `ergebnis` im folgenden Code?
```python
zahl1 = 10
zahl2 = 5.5
ergebnis = zahl1 + zahl2
print(type(ergebnis))
```

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:**
  ```
  <class 'float'>
  ```
  **Erklärung:** Wenn eine Ganzzahl (`int`) und eine Fließkommazahl (`float`) addiert werden, ist das Ergebnis immer eine Fließkommazahl (`float`), um Genauigkeit zu gewährleisten. `type()` gibt den Datentyp einer Variable zurück.
</details>

**Frage 6 (Anwendung):**
Schreibe Python-Code, der eine Variable namens `lieblingsfarbe` erstellt und ihr den Wert deiner Lieblingsfarbe als Text zuweist. Gib dann den Inhalt der Variable aus.

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Beispielhafte Antwort:**
  ```python
  lieblingsfarbe = "Blau" # Ersetze "Blau" mit deiner Lieblingsfarbe
  print(lieblingsfarbe)
  ```
  **Erklärung:** Zuerst wird eine Variable `lieblingsfarbe` deklariert und ihr ein String-Wert (deine Farbe) zugewiesen. Dann wird `print()` verwendet, um diesen Wert auszugeben.
</details>

---

### ⚙️ Abschnitt 3: Operatoren

**Frage 7 (Multiple Choice):**
Welcher Operator wird für die Multiplikation in Python verwendet?
a) `x`
b) `*`
c) `#`
d) `&`

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:** b) `*`
  **Erklärung:** Das Sternchen `*` ist der Multiplikationsoperator in Python.
</details>

**Frage 8 (Code-Ausgabe vorhersagen):**
Was wird der folgende Code ausgeben?
```python
a = 15
b = 4
print(a % b)
```

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:**
  ```
  3
  ```
  **Erklärung:** Der Modulo-Operator `%` gibt den Rest einer Division zurück. 15 geteilt durch 4 ist 3 mit einem Rest von 3.
</details>

**Frage 9 (Fehler im Code finden):**
Welchen Wert hat die Variable `c` nach Ausführung dieses Codes?
```python
a = "5"
b = "3"
c = a + b
```

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Antwort:** `c` hat den Wert `"53"` (ein String).
  **Erklärung:** Die Variablen `a` und `b` sind Strings (Texte), nicht Zahlen. Der `+` Operator konkateniert (verbindet) Strings. Wenn du eine mathematische Addition wolltest, müsstest du die Strings zuerst in Zahlen umwandeln, z.B. mit `int()`.
  ```python
  a = "5"
  b = "3"
  # c = int(a) + int(b) # Würde 8 ergeben
  c = a + b # Ergibt "53"
  print(c)
  ```
</details>

**Frage 10 (Anwendung):**
Du hast 20 Äpfel und möchtest sie gleichmäßig auf 3 Freunde aufteilen. Schreibe Python-Code, der berechnet, wie viele Äpfel jeder Freund bekommt und wie viele Äpfel übrig bleiben. Gib beide Ergebnisse mit einer beschreibenden Nachricht aus.

<details>
  <summary>Klicke hier für die Antwort und Erklärung</summary>
  **Beispielhafte Antwort:**
  ```python
  aepfel_gesamt = 20
  freunde = 3

  aepfel_pro_freund = aepfel_gesamt // freunde  # Ganzzahlige Division
  aepfel_uebrig = aepfel_gesamt % freunde      # Modulo für den Rest

  print("Jeder Freund bekommt", aepfel_pro_freund, "Äpfel.")
  print("Es bleiben", aepfel_uebrig, "Äpfel übrig.")
  ```
  **Erklärung:**
  *   `//` (Ganzzahlige Division) wird verwendet, um herauszufinden, wie viele ganze Äpfel jeder Freund bekommt.
  *   `%` (Modulo-Operator) wird verwendet, um den Rest zu ermitteln.
</details>

---

## 📊 Deine Auswertung

Zähle deine richtigen Antworten und finde heraus, wie gut du abgeschnitten hast!

*   **0-5 Punkte:** 🥉 Ups, da gibt es noch ein paar Lücken. Keine Sorge! Wiederhole [Kapitel 1](Kapitel_1.md) noch einmal in Ruhe und versuche die Fragen dann erneut. Übung macht den Meister!
*   **6-8 Punkte:** 👍 Gut gemacht! Du hast die meisten Konzepte schon gut verstanden. Schau dir die Erklärungen zu den Fragen an, bei denen du unsicher warst.
*   **9-10 Punkte:** 🏆 Ausgezeichnet! Du bist ein Python-Grundlagen-Champion! Du bist bestens vorbereitet für die nächsten Schritte.

---

## 🚀 Teil 2: Praktische Programmieraufgabe (Teste deine Fähigkeiten!)

Jetzt ist es an der Zeit, das Gelernte praktisch anzuwenden.

<div class="coding-exercise" data-exercise-id="kapitel1-code-eigen">
  <p><strong>Deine Aufgabe:</strong></p>
  <p>Schreibe ein Python-Programm, das:</p>
  <ol>
    <li>Deinen Vornamen in einer Variable namens `vorname` speichert.</li>
    <li>Dein aktuelles Alter (als Zahl) in einer Variable namens `alter` speichert.</li>
    <li>Eine Variable `jahr` erstellt und das aktuelle Jahr (z.B. 2025) darin speichert.</li>
    <li>Berechnet, in welchem Jahr du geboren wurdest, und das Ergebnis in einer Variable `geburtsjahr` speichert.</li>
    <li>Eine formatierte Ausgabe erstellt, die so aussieht (ersetze die Beispielwerte mit deinen):
        "Hallo [Vorname], du bist [Alter] Jahre alt und wurdest im Jahr [Geburtsjahr] geboren."</li>
    <li>Berechnet, wie alt du in 5 Jahren sein wirst und dies ausgibt:
        "In 5 Jahren wirst du [Alter in 5 Jahren] Jahre alt sein."</li>
  </ol>

  <p><strong>Tipp:</strong> Denke an die Datentypen und wie du Zahlen und Text zusammenfügen kannst (z.B. mit Kommas in `print()` oder indem du Zahlen in Strings umwandelst mit `str()`).</p>

  <p>Unten findest du ein Feld, in dem du deinen Code schreiben und testen könntest (wenn die Webseite interaktiv wäre). Für jetzt, schreibe deinen Code in deiner Python-Umgebung (z.B. Thonny oder VS Code) und vergleiche ihn dann mit der Lösung.</p>
  
  <details>
    <summary>Klicke hier für eine Beispiellösung</summary>
    ```python
    vorname = "Alex"  # Ersetze mit deinem Vornamen
    alter = 13       # Ersetze mit deinem Alter
    jahr = 2025      # Aktuelles Jahr (ggf. anpassen)

    geburtsjahr = jahr - alter

    print("Hallo", vorname, ", du bist", alter, "Jahre alt und wurdest im Jahr", geburtsjahr, "geboren.")

    alter_in_5_jahren = alter + 5
    print("In 5 Jahren wirst du", alter_in_5_jahren, "Jahre alt sein.")
    ```
  </details>
</div>

---
## 💡 Teil 3: KI-gestützte Fragen (Optional)

Wenn du noch mehr üben möchtest, kannst du hier Fragen von einer KI (Künstlichen Intelligenz) erhalten.

<div class="quiz-container-ai" data-quiz-id="kapitel1-ai">
  <p><strong>Hinweis:</strong> Die KI-Integration befindet sich noch in der Entwicklung. Die Fragen hier sind experimentell.</p>
  <div id="ai-question-area">
    <p>Klicke auf den Button, um eine Frage von der KI zu erhalten.</p>
    <button id="ask-ai-button" class="quiz-button">Frage von KI stellen</button>
  </div>
  <div id="ai-answer-area" style="margin-top: 20px;">
    <!-- Hier wird die Antwort/Bewertung der KI angezeigt -->
  </div>
</div>

## 💻 Teil 4: Praktische Programmieraufgabe (mit KI-Feedback - Optional)

Hier ist die Programmieraufgabe aus dem vorherigen Stand der Datei. Du kannst deinen Code hier eingeben und (theoretisch) von einer KI prüfen lassen.

<div class="coding-exercise" data-exercise-id="kapitel1-code-ai">
  <p>Schreibe ein Python-Programm, das:</p>
  <ol>
    <li>Deinen Namen in einer Variable speichert</li>
    <li>Dein Alter in einer Variable speichert</li>
    <li>Eine formatierte Ausgabe erstellt, die deinen Namen und dein Alter enthält</li>
    <li>Eine Berechnung durchführt, wie alt du in 10 Jahren sein wirst</li>
    <li>Das Ergebnis in der Konsole ausgibt</li>
  </ol>

  <p>Füge deinen Code hier ein und lasse ihn von der KI überprüfen (Funktionalität in Entwicklung):</p>
  <textarea id="user-code-input" rows="10" style="width: 100%; font-family: monospace;"></textarea>
  <button id="check-code-ai-button" class="quiz-button" style="margin-top: 10px;">Code von KI prüfen lassen</button>

  <div id="ai-code-feedback" style="margin-top: 20px;">
    <!-- Hier wird das Feedback der KI zum Code angezeigt -->
  </div>
</div>

---

## 🌟 Weiterführende Übungen (Für Neugierige)

Du hast noch nicht genug? Super! Hier sind ein paar zusätzliche Herausforderungen:

1.  **Der kleine Einkaufsrechner:**
    *   Erstelle Variablen für die Preise von drei verschiedenen Artikeln (z.B. Apfel, Banane, Orange).
    *   Erstelle Variablen für die Anzahl, die du von jedem Artikel kaufen möchtest.
    *   Berechne die Gesamtkosten für jeden Artikel (Preis \* Anzahl).
    *   Berechne die Gesamtkosten des Einkaufs.
    *   Gib eine schöne Übersicht aus, z.B.:
        ```
        Einkaufszettel:
        3 x Apfel: 1.50 Euro
        2 x Banane: 1.00 Euro
        5 x Orange: 2.50 Euro
        --------------------
        Gesamt: 5.00 Euro
        ```

2.  **String-Magie:**
    *   Speichere deinen Vor- und Nachnamen in zwei separaten Variablen.
    *   Kombiniere sie zu einer neuen Variable `voller_name`.
    *   Gib deinen vollen Namen aus.
    *   Gib deinen vollen Namen in Großbuchstaben aus (Tipp: Suche nach Python String-Methoden wie `.upper()`).
    *   Gib aus, wie viele Buchstaben dein voller Name hat (Tipp: `len()` Funktion).

3.  **Temperaturumrechner (einfach):**
    *   Speichere eine Temperatur in Grad Celsius in einer Variable.
    *   Die Formel zur Umrechnung in Fahrenheit ist: `F = (C * 9/5) + 32`.
    *   Berechne die Temperatur in Fahrenheit und gib sie aus.

---

## 📚 Nächste Schritte

Super gemacht! Du hast das Quiz zu Kapitel 1 erfolgreich bearbeitet. Wenn du dich bereit fühlst, die Welt der bedingten Anweisungen und Schleifen zu entdecken, dann geht es hier weiter:

<div class="next-steps">
  <p>Auf zum nächsten Abenteuer:</p>
  <a href="../Kapitel_2/Kapitel_2.md" class="next-chapter-button">🚀 Weiter zu Kapitel 2: Kontrollstrukturen</a>
</div>

<!-- Hinweis: Die eigentliche Logik zur Kommunikation mit der Gemini-API
     muss noch in einer separaten JavaScript-Datei oder serverseitig implementiert
     und hier eingebunden werden. -->

<style>
/* Grundlegendes Styling (kann in zentrale CSS-Datei verschoben werden) */
.quiz-container-ai, .coding-exercise {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa; /* Heller Hintergrund für Quiz-Boxen */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-left: 5px solid #007bff; /* Blauer Akzent links */
}

.coding-exercise[data-exercise-id="kapitel1-code-eigen"] {
    border-left-color: #28a745; /* Grüner Akzent für die Haupt-Programmieraufgabe */
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
  padding: 20px;
  background-color: #e9f7ef; /* Sanftes Grün für "Nächste Schritte" */
  border-radius: 8px;
  border-left: 6px solid #4CAF50; /* Dunkelgrüner Akzent */
  text-align: center;
}

.next-chapter-button {
  display: inline-block;
  background-color: #4CAF50; /* Kräftiges Grün für den Button */
  color: white;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.next-chapter-button:hover {
  background-color: #45a049;
  transform: translateY(-2px); /* Leichter Schwebeeffekt */
}

textarea {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    font-size: 15px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}

details {
  background-color: #f0f0f0; /* Heller Hintergrund für Details/Spoiler */
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

details summary {
  cursor: pointer;
  font-weight: bold;
  color: #0056b3;
}

details p, details pre {
  margin-top: 8px;
}

h1, h2, h3 {
    color: #333;
}
h1 {
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
    margin-bottom: 20px;
}
h2 {
    color: #0056b3;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 5px;
}
h3 {
    color: #28a745; /* Grün für Unterüberschriften der Quizabschnitte */
    margin-top: 20px;
    margin-bottom: 10px;
}

/* Stil für die Auswertungs-Emojis */
.auswertung-tabelle td {
    padding: 5px;
    vertical-align: top;
}
</style>
<script src="../../js/ai-quiz-interaction.js" defer></script>