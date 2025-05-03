# Variablen und Datentypen in Python
[Zurück zur Hauptseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md)

[Vorheriges Kapitel: Textausgabe](Textausgabe_InDerKonsole.md)

[Nächstes Kapitel: Operatoren](Operatoren.md)

In diesem Kapitel lernst du, wie du Variablen in Python erstellst und verwendest, sowie die grundlegenden Datentypen kennenlernst.

## Was sind Variablen?

Variablen sind Container, die Werte speichern. In Python musst du Variablen nicht deklarieren oder ihren Typ angeben - du weist ihnen einfach einen Wert zu.

### Variablen erstellen

```python
# Eine Variable erstellen und einen Wert zuweisen
name = "Anna"
alter = 30
groesse = 1.75
ist_student = True
```

### Variablennamen in Python

- Müssen mit einem Buchstaben oder Unterstrich beginnen
- Dürfen Buchstaben, Zahlen und Unterstriche enthalten
- Sind Groß- und Kleinschreibung-sensitiv (name und Name sind unterschiedliche Variablen)
- Sollten keine reservierten Wörter sein (wie `if`, `for`, `while`, etc.)

```python
# Gültige Variablennamen
mein_name = "Max"
_alter = 25
anzahlÄpfel = 5
KONSTANTE = 3.14

# Ungültige Variablennamen
# 1name = "Max"  # Beginnt mit einer Zahl
# mein-name = "Max"  # Enthält einen Bindestrich
# if = 5  # Reserviertes Wort
```

## Grundlegende Datentypen

### Python hat verschiedene eingebaute Datentypen:

### 1. Zahlen

#### Integer (Ganzzahlen)

Ganzzahlen wie 1, 2, 3..

```python
alter = 30
anzahl = -5
```

#### Float (Gleitkommazahlen)

Kommazahlen wie 0,7

```python
groesse = 1.75
temperatur = -2.5
```

#### Complex (Komplexe Zahlen)
```python
komplex = 3 + 4j
```

### 2. Strings (Zeichenketten)

Strings sind Sequenzen von Zeichen, die in einfachen oder doppelten Anführungszeichen stehen.

```python
vorname = "Max"
nachname = 'Mustermann'
adresse = "Musterstraße 123"
```

### 3. Boolean (Wahrheitswerte)

Boolean-Werte können nur `True` oder `False` sein.

```python
ist_student = True
hat_bestanden = False
```

### 4. None

-`None` ist ein spezieller Wert, der "**nichts**" oder "**keine Wert**" repräsentiert.

```python
ergebnis = None
```

## Datentyp einer Variable überprüfen

Mit der Funktion `type()` kannst du den Datentyp einer Variable überprüfen:

```python
name = "Anna"
alter = 30
groesse = 1.75
ist_student = True

print(type(name))       # <class 'str'>
print(type(alter))      # <class 'int'>
print(type(groesse))    # <class 'float'>
print(type(ist_student)) # <class 'bool'>
```

## Typumwandlung (Type Casting)

Du kannst Werte von einem Datentyp in einen anderen umwandeln:

```python
# String zu Integer
alter_str = "30"
alter_int = int(alter_str)  # 30 als Integer

# Integer zu String
nummer = 42
nummer_str = str(nummer)  # "42" als String

# String zu Float
preis_str = "19.99"
preis_float = float(preis_str)  # 19.99 als Float

# Float zu Integer (schneidet Dezimalstellen ab)
wert = 7.8
wert_int = int(wert)  # 7 als Integer
```

## Übungen
```python
# 1. Erstelle Variablen für deinen Namen, dein Alter, deine Körpergröße und ob du Student bist.

# 2. Gib den Typ jeder Variable aus.

# 3. Wandle dein Alter in einen String um und füge " Jahre" hinzu.

# 4. Wandle den String "3.14159" in eine Gleitkommazahl um.

# 5. Erstelle eine Variable mit dem Wert `None` und überprüfe ihren Typ.

```
## Beispielprogramm

```python
# Variablen mit verschiedenen Datentypen
name = "Max Mustermann"
alter = 25
groesse = 1.82
ist_student = True

# Ausgabe der Variablen und ihrer Typen
print("Name:", name, "Typ:", type(name))
print("Alter:", alter, "Typ:", type(alter))
print("Größe:", groesse, "Typ:", type(groesse))
print("Student:", ist_student, "Typ:", type(ist_student))

# Typumwandlung
alter_str = str(alter)
print("Alter als String:", alter_str, "Typ:", type(alter_str))

# Berechnungen mit verschiedenen Datentypen
geburtsjahr = 2023 - alter
print("Geburtsjahr:", geburtsjahr)

# Formatierte Ausgabe
print(f"{name} ist {alter} Jahre alt, {groesse}m groß und {'ist' if ist_student else 'ist kein'} Student.")
```

## Zusammenfassung

- Variablen in Python müssen nicht deklariert werden
- Python hat verschiedene grundlegende Datentypen: Integer, Float, String, Boolean, None
- Mit `type()` kannst du den Datentyp einer Variable überprüfen
- Typumwandlung ist mit Funktionen wie `int()`, `float()`, `str()` und `bool()` möglich
