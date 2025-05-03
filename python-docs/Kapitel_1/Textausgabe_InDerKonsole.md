# Textausgabe in der Konsole

[Startseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md)

[<- Erste Schritte mit Python](/Projekte/Kapitel_0/Erste_Schritte_Win_PC.md)
 
[-> Variablen und Datentypen](Variablen_und_Datentypen.md)

In diesem Kapitel lernst du, wie du Text in der Python-Konsole ausgeben kannst. Die Textausgabe ist eine der grundlegendsten Funktionen in Python und wird mit der `print()`-Funktion realisiert.

## Die print()-Funktion

Die `print()`-Funktion ist eine der am häufigsten verwendeten Funktionen in Python. Sie ermöglicht es dir, Text und andere Daten in der Konsole auszugeben.

### Einfache Textausgabe

```python
print("Hallo Welt!")  # Dies gibt "Hallo Welt!" in der Konsole aus
```

### Mehrere Werte ausgeben

```python
print("Willkommen", "zum", "Python-Tutorial")  # Mehrere Werte werden durch Leerzeichen getrennt
```

### Zahlen ausgeben

```python
print(42)  # Zahlen können direkt ohne Anführungszeichen ausgegeben werden
```

### Variablen ausgeben

```python
name = "Max"
alter = 25
print("Name:", name, "Alter:", alter)  # Kombination von Text und Variablen
```

## Formatierte Ausgabe

### f-Strings (ab Python 3.6)

Eine moderne und leicht lesbare Methode zur Formatierung von Strings:

```python
name = "Max"
alter = 25
print(f"Mein Name ist {name} und ich bin {alter} Jahre alt.")
```

### format()-Methode

Eine ältere, aber immer noch weit verbreitete Methode:

```python
name = "Max"
alter = 25
print("Mein Name ist {} und ich bin {} Jahre alt.".format(name, alter))
```

### %-Operator

Eine noch ältere Methode, die aus der C-Programmierung stammt:

```python
name = "Max"
alter = 25
print("Mein Name ist %s und ich bin %d Jahre alt." % (name, alter))
```

## Zeilenumbrüche und Sonderzeichen

### Zeilenumbrüche mit \n

```python
print("Erste Zeile\nZweite Zeile")  # \n erzeugt einen Zeilenumbruch
```

### Ausgabe ohne Zeilenumbruch am Ende

```python
print("Dies wird ausgegeben", end=" ")
print("in der gleichen Zeile.")
```

### Weitere Sonderzeichen

- `\t` - Tabulator
- `\\` - Backslash
- `\"` - Anführungszeichen
- `\'` - Apostroph

## Beispielprogramm

Hier ist ein vollständiges Beispielprogramm, das verschiedene Arten der Textausgabe demonstriert:

```python
# Kapitel 1 - Textausgabe in der Konsole

# Beispiel 1: Einfache Textausgabe
print("Hallo Welt!")  # Dies gibt "Hallo Welt!" in der Konsole aus

# Beispiel 2: Mehrere Werte ausgeben
print("Willkommen", "zum", "Python-Tutorial")  # Mehrere Werte werden durch Leerzeichen getrennt

# Beispiel 3: Zahlen ausgeben
print(42)  # Zahlen können direkt ohne Anführungszeichen ausgegeben werden

# Beispiel 4: Variablen ausgeben
name = "Max"
alter = 25
print("Name:", name, "Alter:", alter)  # Kombination von Text und Variablen

# Beispiel 5: Formatierte Ausgabe mit f-Strings (ab Python 3.6)
print(f"Mein Name ist {name} und ich bin {alter} Jahre alt.")

# Beispiel 6: Zeilenumbrüche
print("Erste Zeile\nZweite Zeile")  # \n erzeugt einen Zeilenumbruch

# Beispiel 7: Ausgabe ohne Zeilenumbruch am Ende
print("Dies wird ausgegeben", end=" ")
print("in der gleichen Zeile.")
```

Du kannst diesen Code in einer Datei mit der Endung `.py` speichern (z.B. `textausgabe.py`) und dann in Python ausführen.

## Übungen

1. Gib deinen Namen und dein Alter in der Konsole aus.
2. Erstelle eine formatierte Ausgabe mit f-Strings, die deinen Namen, dein Alter und deine Lieblingssprache enthält.
3. Schreibe ein Programm, das eine kleine Geschichte mit mehreren Zeilen ausgibt.
4. Experimentiere mit verschiedenen Formatierungsmethoden und vergleiche sie.

## Zusammenfassung

- Die `print()`-Funktion wird verwendet, um Text und andere Daten in der Konsole auszugeben
- Mehrere Werte können mit Kommas getrennt übergeben werden
- Es gibt verschiedene Methoden zur Formatierung von Strings: f-Strings, format()-Methode und %-Operator
- Mit Escape-Sequenzen wie `\n` können Sonderzeichen und Zeilenumbrüche eingefügt werden
- Der `end`-Parameter kann verwendet werden, um das Verhalten am Ende der Ausgabe zu ändern