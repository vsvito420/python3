# 📢 Textausgabe in der Konsole: Dein erstes "Hallo Welt!"

[Startseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md)

[<- Erste Schritte mit Python](/Projekte/Kapitel_0/Erste_Schritte_Win_PC.md)
 
[-> Variablen und Datentypen](Variablen_und_Datentypen.md)

Stell dir vor, du baust einen Roboter 🤖. Damit er etwas tut, musst du ihm Befehle geben, oder? In der Programmierung ist das ähnlich. Dein Computer ist wie ein sehr kluger, aber auch sehr gehorsamer Roboter. Damit er dir zeigen kann, was er gerade macht oder welche Ergebnisse er berechnet hat, brauchen wir eine Möglichkeit, ihm zu sagen: "Hey, zeig mir das mal an!" Genau das machen wir mit der Textausgabe.

In diesem Kapitel tauchen wir in die Welt der Textausgabe mit Python ein. Es ist wie das erste Wort, das dein Roboter lernt zu sagen. Meistens ist das "Hallo Welt!" – ein Klassiker in der Programmierung.

## 🤔 Warum ist Textausgabe so wichtig?

Die Textausgabe ist super wichtig, weil sie dir hilft:

*   **Ergebnisse anzuzeigen**: Wenn dein Programm etwas berechnet (z.B. das Ergebnis von 2 + 2), kannst du es dir mit der Textausgabe anzeigen lassen.
*   **Informationen zu geben**: Du kannst dem Benutzer deines Programms Nachrichten, Anweisungen oder Erklärungen geben. Stell dir vor, du programmierst ein Spiel und möchtest dem Spieler sagen: "Level 1 geschafft! 🎉".
*   **Fehler zu finden (Debugging)**: Manchmal macht ein Programm nicht das, was es soll. Mit Textausgaben an verschiedenen Stellen im Code kannst du nachschauen, was genau passiert und wo der Fehler 🐞 stecken könnte.
*   **Mit dem Benutzer zu interagieren**: Auch wenn wir hier erstmal nur Text *ausgeben*, ist das der erste Schritt, um später auch Eingaben vom Benutzer zu empfangen und so richtige kleine Programme zu schreiben, die auf den Benutzer reagieren.

## 🚀 Die `print()`-Funktion: Dein Sprachrohr zum Computer

In Python ist die Funktion, die wir für die Textausgabe verwenden, kinderleicht zu merken: Sie heißt `print()`. Alles, was du zwischen die Klammern `()` schreibst (und bei Text in Anführungszeichen setzt), wird auf dem Bildschirm, genauer gesagt in der **Konsole**, ausgegeben. Die Konsole ist wie ein kleines Textfenster, in dem dein Programm "sprechen" kann.

### 🌟 Einfache Textausgabe: Sag "Hallo!"

Lass uns direkt starten. Das berühmteste erste Programm ist es, "Hallo Welt!" auszugeben.

```python
print("Hallo Welt!")
```

Wenn du diesen Code ausführst (wie das geht, hast du im [vorherigen Kapitel](python-docs/Kapitel_0/Erste_Schritte_Win_PC.md) gelernt), siehst du in der Konsole:

```
Hallo Welt!
```

Cool, oder? Du hast gerade deinen ersten Python-Befehl gegeben und der Computer hat geantwortet! 🎉

Du kannst natürlich jeden beliebigen Text ausgeben:

```python
print("Python ist super!")
print("Ich lerne gerade programmieren.")
print("Mein Lieblingsessen ist Pizza 🍕.")
```

**Wichtig 💡:** Text, den du direkt ausgeben möchtest (man nennt das auch "String" oder "Zeichenkette"), muss immer in Anführungszeichen stehen. Du kannst einfache (`'`) oder doppelte (`"`) Anführungszeichen verwenden, aber bleibe bei einer Art pro `print()`-Befehl konsistent.

```python
print('Das geht auch mit einfachen Anführungszeichen.')
# print("Das hier funktioniert nicht') # Fehler! Unterschiedliche Anführungszeichen.
```

### 🔢 Zahlen ausgeben: Rechnen leicht gemacht

Du kannst mit `print()` nicht nur Text, sondern auch Zahlen direkt ausgeben. Bei Zahlen brauchst du keine Anführungszeichen.

```python
print(10)
print(3.14159) # Das ist Pi, eine Zahl mit Nachkommastellen
print(100 + 50) # Du kannst sogar direkt in print() rechnen lassen!
```

Ausgabe:

```
10
3.14159
150
```

### 🗣️ Mehrere Dinge auf einmal ausgeben

Manchmal möchte man mehrere Informationen auf einmal ausgeben, vielleicht einen Text und eine Zahl. Das geht, indem du die einzelnen Teile mit einem Komma `,` trennst. `print()` fügt dann automatisch ein Leerzeichen zwischen die Teile ein.

```python
print("Meine Lieblingszahl ist", 7)
print("Ich bin", 13, "Jahre alt.")
print("Das Ergebnis von 5 mal 5 ist:", 5 * 5)
```

Ausgabe:

```
Meine Lieblingszahl ist 7
Ich bin 13 Jahre alt.
Das Ergebnis von 5 mal 5 ist: 25
```

## 📦 Variablen ausgeben: Informationen speichern und zeigen

Stell dir vor, du hast eine Kiste (eine Variable) und legst dort etwas hinein (einen Wert, z.B. deinen Namen). Später möchtest du wissen, was in der Kiste ist. Genau das können wir auch mit `print()` machen! Mehr zu Variablen lernst du im [nächsten Kapitel](Variablen_und_Datentypen.md), aber hier schon mal ein kleiner Vorgeschmack:

```python
spielername = "SuperCoder_007"
punkte = 1500
level = 3

print("Spieler:", spielername)
print("Punkte:", punkte)
print("Aktuelles Level:", level)
print(spielername, "hat", punkte, "Punkte in Level", level, "erreicht!")
```

Ausgabe:

```
Spieler: SuperCoder_007
Punkte: 1500
Aktuelles Level: 3
SuperCoder_007 hat 1500 Punkte in Level 3 erreicht!
```

Siehst du? `spielername`, `punkte` und `level` sind unsere Variablen. Wir haben ihnen Werte zugewiesen und können diese dann mit `print()` ausgeben.

## 📝 Text formatieren: Mach es schön und lesbar!

Manchmal reicht die einfache Ausgabe mit Kommas nicht aus, oder wir wollen mehr Kontrolle darüber, wie der Text aussieht. Python bietet dafür coole Möglichkeiten!

### ✨ f-Strings: Die moderne Art (ab Python 3.6)

f-Strings (formatierte String-Literale) sind super praktisch und machen das Einfügen von Variablen in Text sehr einfach und übersichtlich. Du schreibst einfach ein `f` vor die Anführungszeichen und setzt die Variablen in geschweifte Klammern `{}` direkt in den Text.

```python
name = "Lisa"
alter = 14
haustier = "Katze"

print(f"Hallo, ich bin {name} und bin {alter} Jahre alt.")
print(f"Mein Haustier ist eine {haustier} und sie ist sehr flauschig 😻.")
print(f"In 5 Jahren werde ich {alter + 5} Jahre alt sein.") # Man kann sogar in f-Strings rechnen!
```

Ausgabe:

```
Hallo, ich bin Lisa und bin 14 Jahre alt.
Mein Haustier ist eine Katze und sie ist sehr flauschig 😻.
In 5 Jahren werde ich 20 Jahre alt sein.
```

f-Strings sind meistens die beste Wahl, wenn du Variablen in Text einbauen möchtest, weil sie so gut lesbar sind.

### 📜 Die `format()`-Methode: Der flexible Klassiker

Eine etwas ältere, aber immer noch sehr nützliche Methode ist die `.format()`-Methode. Hier verwendest du ebenfalls geschweifte Klammern `{}` als Platzhalter im Text und übergibst dann die Variablen in der `.format()`-Funktion.

```python
name = "Tom"
alter = 12
hobby = "Fußball spielen"

print("Mein Name ist {} und ich bin {} Jahre alt. Mein Hobby ist {}.".format(name, alter, hobby))

# Man kann den Platzhaltern auch Nummern geben, um die Reihenfolge zu ändern:
print("Mein Hobby ist {2}. Ich bin {1} Jahre alt und heiße {0}.".format(name, alter, hobby))
```

Ausgabe:

```
Mein Name ist Tom und ich bin 12 Jahre alt. Mein Hobby ist Fußball spielen.
Mein Hobby ist Fußball spielen. Ich bin 12 Jahre alt und heiße Tom.
```

### 낡 Der %-Operator: Die ganz alte Schule (selten benötigt)

Es gibt noch eine ältere Methode mit dem `%`-Operator, die du vielleicht in älterem Code siehst. Für den Anfang ist sie aber weniger wichtig.

```python
name = "Anna"
alter = 15
print("Name: %s, Alter: %d" % (name, alter)) # %s für Text (String), %d für ganze Zahlen (decimal)
```

Ausgabe:

```
Name: Anna, Alter: 15
```
Für neue Projekte sind f-Strings oder die `.format()`-Methode meistens besser geeignet.

## 特殊 Sonderzeichen und Zeilenumbrüche: Mehr Kontrolle über die Ausgabe

Manchmal wollen wir, dass unser Text nicht einfach nur in einer Zeile steht.

### 📐 Zeilenumbrüche mit `\n`

Wenn du möchtest, dass dein Text in einer neuen Zeile weitergeht, benutzt du das Sonderzeichen `\n` (steht für "newline"). Das ist wie Enter drücken auf deiner Tastatur, aber mitten im Text.

```python
print("Dies ist die erste Zeile.\nUnd das hier ist die zweite Zeile.")
print("Apfel\nBirne\nBanane")
```

Ausgabe:

```
Dies ist die erste Zeile.
Und das hier ist die zweite Zeile.
Apfel
Birne
Banane
```

### ➡️ Ausgabe ohne automatischen Zeilenumbruch am Ende: `end=""`

Normalerweise macht `print()` am Ende jeder Ausgabe automatisch einen Zeilenumbruch. Wenn du das nicht möchtest, kannst du den `end`-Parameter verwenden.

```python
print("Das steht in einer Zeile...", end="") # Kein Zeilenumbruch
print("...und das auch!")

print("Wort 1", end=" ") # Leerzeichen statt Zeilenumbruch
print("Wort 2", end=" ")
print("Wort 3")
```

Ausgabe:

```
Das steht in einer Zeile......und das auch!
Wort 1 Wort 2 Wort 3
```
Mit `end=" "` sorgst du dafür, dass nach der Ausgabe ein Leerzeichen statt eines Zeilenumbruchs kommt. Du kannst da jeden beliebigen Text einsetzen!

### Andere nützliche Sonderzeichen (Escape-Sequenzen)

Es gibt noch ein paar andere "Escape-Sequenzen" (so nennt man diese Zeichen mit Backslash `\`):

*   `\t`: Fügt einen Tabulator ein (wie die Tab-Taste auf der Tastatur). Das ist nützlich, um Dinge ordentlich untereinander auszurichten.
*   `\\`: Gibt einen einzelnen Backslash aus (weil der Backslash ja sonst für Sonderzeichen zuständig ist).
*   `\"`: Gibt ein doppeltes Anführungszeichen aus (wenn dein Text selbst in doppelten Anführungszeichen steht).
*   `\'`: Gibt ein einfaches Anführungszeichen aus (wenn dein Text selbst in einfachen Anführungszeichen steht).

```python
print("Spalte1\tSpalte2\tSpalte3")
print("WertA\tWertB\tWertC")
print("Der Pfad ist: C:\\Users\\DeinName")
print("Er sagte: \"Hallo!\"")
print('Das ist ein Apostroph: \'')
```

Ausgabe:

```
Spalte1 Spalte2 Spalte3
WertA   WertB   WertC
Der Pfad ist: C:\Users\DeinName
Er sagte: "Hallo!"
Das ist ein Apostroph: '
```

## 🧩 Texte verketten (aneinanderhängen) mit `+`

Du kannst Texte (Strings) auch mit dem Plus-Zeichen `+` verbinden. Das nennt man "Verkettung" oder "Konkatenation".

```python
vorname = "Max"
nachname = "Mustermann"
ganzer_name = vorname + " " + nachname # Wichtig: Leerzeichen selbst hinzufügen!
print(ganzer_name)

gruss = "Hallo"
name = "Welt"
botschaft = gruss + ", " + name + "!"
print(botschaft)
```

Ausgabe:

```
Max Mustermann
Hallo, Welt!
```

**Achtung 😵:** Du kannst mit `+` nicht direkt Text und Zahlen mischen. Das hier gibt einen Fehler:
```python
# print("Ich bin " + 14 + " Jahre alt.") # FEHLER!
```
Dafür musst du die Zahl zuerst in einen Text umwandeln (mit `str()`) oder besser gleich f-Strings verwenden:

```python
alter = 14
print("Ich bin " + str(alter) + " Jahre alt.") # Zahl in Text umwandeln
print(f"Ich bin {alter} Jahre alt.")         # Viel einfacher mit f-String!
```

## 💻 Praktisches Beispiel: Schau dir den Code an!

Alle Beispiele und noch mehr findest du auch in der Python-Datei [`1-Textausgabe_InDerKonsole.py`](1-Textausgabe_InDerKonsole.py) in deinem Projektordner. Öffne sie, schau dir den Code an und experimentiere damit! Ändere Texte, füge neue `print()`-Befehle hinzu und sieh, was passiert.

```python
# Schau in die Datei 1-Textausgabe_InDerKonsole.py für alle Codebeispiele!
# Hier ist ein kleiner Auszug, um dich neugierig zu machen:

# Begrüßung für ein kleines Text-Adventure Spiel
spieler_name = "Alex"
print(f"Willkommen, {spieler_name}, im Land der Python-Abenteuer!")
print("Du stehst vor einer alten, knarrenden Tür.\nWas möchtest du tun?")
print("1. Tür öffnen\t2. Weglaufen") # \t für einen Tabulator
```

## 🧑‍💻 Übungsaufgaben: Jetzt bist du dran!

Jetzt, wo du weißt, wie man Text ausgibt, probiere diese kleinen Aufgaben:

1.  **Dein Steckbrief**:
    *   Schreibe ein Programm, das deinen Namen, dein Alter und deine Lieblingsfarbe in der Konsole ausgibt. Jede Information soll in einer neuen Zeile stehen.
    *   Benutze für eine der Ausgaben einen f-String!
2.  **Lieblingsessen-Liste**:
    *   Gib eine Liste deiner drei Lieblingsessen aus. Jedes Essen soll mit einem Sternchen `*` und einem Leerzeichen davor beginnen und in einer neuen Zeile stehen (z.B. `* Pizza`).
3.  **Kleine Geschichte**:
    *   Denke dir eine ganz kurze Geschichte aus (2-3 Sätze). Gib sie mit `print()` aus.
    *   Versuche, mindestens einen Zeilenumbruch `\n` und einen Tabulator `\t` in deiner Geschichte zu verwenden.
4.  **Rechnungsausgabe**:
    *   Stell dir vor, du kaufst 3 Äpfel zu je 0.50 Euro und 2 Bananen zu je 0.30 Euro.
    *   Lass Python die Gesamtkosten berechnen und gib eine kleine "Rechnung" aus, z.B.:
        ```
        --- Rechnung ---
        Äpfel:  1.50 Euro
        Bananen: 0.60 Euro
        Gesamt:  2.10 Euro
        ```
        (Tipp: Du kannst direkt in `print()` oder mit f-Strings rechnen!)
5.  **Emoji-Kunst 🎨**:
    *   Versuche, mit `print()` und verschiedenen Zeichen (und vielleicht Emojis, wenn deine Konsole sie anzeigt) ein kleines Bild oder Muster zu zeichnen. Zum Beispiel ein einfaches Smiley Gesicht.

## สรุป Zusammenfassung: Das Wichtigste in Kürze

Puh, das war eine Menge über Textausgabe! Hier nochmal die wichtigsten Punkte:

*   🗣️ Die Funktion `print()` ist dein Werkzeug, um Text und andere Werte in der Konsole anzuzeigen.
*   📜 Text (Strings) kommt in Anführungszeichen (`"Hallo"` oder `'Hallo'`). Zahlen nicht (`print(123)`).
*   🤝 Du kannst mehrere Dinge mit Kommas trennen: `print("Alter:", 14)`.
*   📦 Variablen können einfach ausgegeben werden: `name = "Alex"; print(name)`.
*   ✨ **f-Strings** sind super, um Variablen in Text einzubauen: `print(f"Hallo {name}!")`.
*   ➡️ `\n` macht einen Zeilenumbruch, `\t` einen Tabulator.
*   🔚 Mit `end=""` kannst du den automatischen Zeilenumbruch am Ende von `print()` verhindern.
*   ➕ Strings können mit `+` verkettet werden: `"Hallo" + " " + "Welt"`.

## 🚀 Was kommt als Nächstes?

Super gemacht! Du kannst jetzt mit Python "sprechen" lernen. Das ist ein riesiger Schritt!
Im nächsten Kapitel werden wir uns genauer mit **[Variablen und Datentypen](Variablen_und_Datentypen.md)** beschäftigen. Du hast Variablen ja schon kurz kennengelernt – bald wirst du verstehen, wie du Informationen noch besser speichern und verarbeiten kannst. Das wird spannend!