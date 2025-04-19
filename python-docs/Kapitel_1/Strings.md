# Strings in Python [W3Schools Python Strings](https://www.w3schools.com/python/python_strings.asp)

[Zurück zur Hauptseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md) | [Vorheriges Kapitel: Operatoren](Operatoren.md) | [Nächstes Kapitel: Bedingte Anweisungen](/Projekte/Kapitel_2/Bedingte_Anweisungen.md)

---

In diesem Kapitel lernst du, wie du mit Strings (Zeichenketten) in Python arbeiten kannst. Strings sind eine der grundlegendsten Datentypen in Python und werden für die Verarbeitung von Text verwendet.

## Was sind Strings?

Strings sind Sequenzen von Zeichen, die in einfachen (`'`) oder doppelten (`"`) Anführungszeichen eingeschlossen sind. In Python sind Strings unveränderlich (immutable), was bedeutet, dass du einen String nach seiner Erstellung nicht mehr ändern kannst.

```python
# Strings erstellen
name = "Max Mustermann"
adresse = 'Musterstraße 123'
```

## String-Erstellung

Es gibt verschiedene Möglichkeiten, Strings in Python zu erstellen:

```python
# Einfache und doppelte Anführungszeichen
s1 = "Hallo"
s2 = 'Welt'

# Mehrzeilige Strings mit dreifachen Anführungszeichen
mehrzeilig = """Dies ist ein
mehrzeiliger String.
Er kann über mehrere Zeilen gehen."""

# Oder mit dreifachen einfachen Anführungszeichen
mehrzeilig2 = '''Auch dies ist
ein mehrzeiliger String.'''

# Escape-Sequenzen
pfad = "C:\\Programme\\Python"  # Backslash muss escaped werden
zitat = "Er sagte: \"Hallo!\""  # Anführungszeichen escapen
```

## String-Operationen

### Konkatenation (Verkettung)

Du kannst Strings mit dem `+`-Operator verketten:

```python
vorname = "Max"
nachname = "Mustermann"
vollname = vorname + " " + nachname  # "Max Mustermann"
```

### Wiederholung

Mit dem `*`-Operator kannst du einen String wiederholen:

```python
wiederholung = "Ha" * 3  # "HaHaHa"
trennlinie = "-" * 20  # "--------------------"
```

### Länge eines Strings

Die Funktion `len()` gibt die Anzahl der Zeichen in einem String zurück:

```python
text = "Hallo Welt"
laenge = len(text)  # 10
```

## Zugriff auf Zeichen

Du kannst auf einzelne Zeichen in einem String über ihren Index zugreifen. Der Index beginnt bei 0 für das erste Zeichen.

```python
text = "Python"
erstes_zeichen = text[0]  # "P"
drittes_zeichen = text[2]  # "t"
```

Du kannst auch negative Indizes verwenden, um vom Ende des Strings zu zählen:

```python
text = "Python"
letztes_zeichen = text[-1]  # "n"
vorletztes_zeichen = text[-2]  # "o"
```

## String-Slicing

Mit Slicing kannst du Teilstrings extrahieren:

```python
text = "Python Programmierung"

# Syntax: string[start:ende:schritt]
# start ist inklusive, ende ist exklusive

# Die ersten 6 Zeichen
teil1 = text[0:6]  # "Python"
# Oder kürzer:
teil1 = text[:6]  # "Python"

# Zeichen 7 bis 20
teil2 = text[7:20]  # "Programmierung"
# Oder bis zum Ende:
teil2 = text[7:]  # "Programmierung"

# Jedes zweite Zeichen
jedes_zweite = text[::2]  # "Pto rgamirn"

# String umkehren
umgekehrt = text[::-1]  # "gnureimmargorP nohtyP"
```

## String-Methoden

Python bietet viele nützliche Methoden für die Arbeit mit Strings:

### Groß-/Kleinschreibung

```python
text = "Hallo Welt"

gross = text.upper()  # "HALLO WELT"
klein = text.lower()  # "hallo welt"
titel = text.title()  # "Hallo Welt" (jedes Wort beginnt mit Großbuchstaben)
kapitalisiert = text.capitalize()  # "Hallo welt" (nur der erste Buchstabe groß)
```

### Suchen und Ersetzen

```python
text = "Python ist eine großartige Programmiersprache. Python ist einfach zu lernen."

# Suchen
position = text.find("Python")  # 0 (erste Position von "Python")
anzahl = text.count("Python")  # 2 (Anzahl der Vorkommen von "Python")

# Ersetzen
neuer_text = text.replace("Python", "Java")  # Ersetzt alle Vorkommen von "Python" durch "Java"
```

### Überprüfen des Inhalts

```python
# Überprüfen, ob ein String mit bestimmten Zeichen beginnt oder endet
text = "Hallo Welt"
beginnt_mit = text.startswith("Hallo")  # True
endet_mit = text.endswith("Welt")  # True

# Überprüfen des Inhalts
nur_buchstaben = "abc123".isalpha()  # False (enthält auch Zahlen)
nur_zahlen = "123".isdigit()  # True
alphanumerisch = "abc123".isalnum()  # True
grossbuchstaben = "ABC".isupper()  # True
kleinbuchstaben = "abc".islower()  # True
```

### Entfernen von Leerzeichen

```python
text = "   Hallo Welt   "

links_entfernt = text.lstrip()  # "Hallo Welt   "
rechts_entfernt = text.rstrip()  # "   Hallo Welt"
beide_entfernt = text.strip()  # "Hallo Welt"
```

### Teilen und Verbinden

```python
# String in Liste aufteilen
text = "Python,Java,C++,JavaScript"
liste = text.split(",")  # ["Python", "Java", "C++", "JavaScript"]

# Liste zu String verbinden
text = "-".join(liste)  # "Python-Java-C++-JavaScript"
```

## String-Formatierung

Es gibt verschiedene Möglichkeiten, Strings in Python zu formatieren:

### 1. Formatierungsoperator %

```python
name = "Max"
alter = 30
ausgabe = "Mein Name ist %s und ich bin %d Jahre alt." % (name, alter)
# "Mein Name ist Max und ich bin 30 Jahre alt."
```

### 2. format()-Methode

```python
name = "Max"
alter = 30
ausgabe = "Mein Name ist {} und ich bin {} Jahre alt.".format(name, alter)
# "Mein Name ist Max und ich bin 30 Jahre alt."

# Mit benannten Platzhaltern
ausgabe = "Mein Name ist {n} und ich bin {a} Jahre alt.".format(n=name, a=alter)
# "Mein Name ist Max und ich bin 30 Jahre alt."
```

### 3. f-Strings (ab Python 3.6)

```python
name = "Max"
alter = 30
ausgabe = f"Mein Name ist {name} und ich bin {alter} Jahre alt."
# "Mein Name ist Max und ich bin 30 Jahre alt."

# Mit Ausdrücken
ausgabe = f"In 5 Jahren werde ich {alter + 5} Jahre alt sein."
# "In 5 Jahren werde ich 35 Jahre alt sein."
```

## Escape-Sequenzen

Escape-Sequenzen sind spezielle Zeichenkombinationen, die mit einem Backslash (`\`) beginnen:

| Escape-Sequenz | Bedeutung |
|----------------|-----------|
| `\n` | Zeilenumbruch |
| `\t` | Tabulator |
| `\r` | Wagenrücklauf |
| `\\` | Backslash |
| `\'` | Einfaches Anführungszeichen |
| `\"` | Doppeltes Anführungszeichen |
| `\b` | Rückschritt (Backspace) |

```python
# Beispiele für Escape-Sequenzen
print("Erste Zeile\nZweite Zeile")
# Ausgabe:
# Erste Zeile
# Zweite Zeile

print("Name:\tMax")
# Ausgabe:
# Name:	Max

print("C:\\Programme\\Python")
# Ausgabe:
# C:\Programme\Python
```

## Raw Strings

Mit einem `r` vor dem String kannst du einen "raw string" erstellen, in dem Escape-Sequenzen nicht interpretiert werden:

```python
normaler_string = "C:\\Programme\\Python"  # C:\Programme\Python
raw_string = r"C:\Programme\Python"  # C:\Programme\Python
```

Dies ist besonders nützlich für reguläre Ausdrücke und Dateipfade in Windows.

## Übungen

1. Erstelle einen String mit deinem Namen und gib ihn in Großbuchstaben aus.
2. Extrahiere den Nachnamen aus dem String "Max Mustermann" mit Slicing.
3. Zähle, wie oft der Buchstabe "e" im Satz "Entwickeln mit Python macht Spaß" vorkommt.
4. Erstelle einen formatierten String mit f-Strings, der deinen Namen, dein Alter und deine Lieblingssprache enthält.
5. Teile den String "Python,Java,C++,JavaScript" an den Kommas und gib die einzelnen Elemente aus.

## Beispielprogramm

```python
# Ein Programm, das verschiedene String-Operationen demonstriert

# Eingabe
name = input("Gib deinen Namen ein: ")
alter = int(input("Gib dein Alter ein: "))

# String-Operationen
gross = name.upper()
klein = name.lower()
laenge = len(name)
erster_buchstabe = name[0]
letzter_buchstabe = name[-1]

# Ausgabe
print(f"Hallo {name}!")
print(f"Dein Name in Großbuchstaben: {gross}")
print(f"Dein Name in Kleinbuchstaben: {klein}")
print(f"Dein Name hat {laenge} Buchstaben")
print(f"Der erste Buchstabe deines Namens ist {erster_buchstabe}")
print(f"Der letzte Buchstabe deines Namens ist {letzter_buchstabe}")
print(f"In 10 Jahren wirst du {alter + 10} Jahre alt sein")

# String-Formatierung
ausgabe = "Name: {}, Alter: {}".format(name, alter)
print(ausgabe)

# f-String
ausgabe = f"Name: {name}, Alter: {alter}"
print(ausgabe)
```

## Zusammenfassung

- Strings sind Sequenzen von Zeichen, die in Anführungszeichen eingeschlossen sind
- Strings in Python sind unveränderlich (immutable)
- Du kannst auf einzelne Zeichen mit Indizes zugreifen und Teilstrings mit Slicing extrahieren
- Python bietet viele nützliche Methoden für die Arbeit mit Strings
- Es gibt verschiedene Möglichkeiten, Strings zu formatieren: %-Operator, format()-Methode und f-Strings
- Escape-Sequenzen erlauben die Darstellung spezieller Zeichen in Strings
