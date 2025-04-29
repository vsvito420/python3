# Operatoren in Python [W3Schools Python Operators](https://www.w3schools.com/python/python_operators.asp)

[Zurück zur Hauptseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md) | [Vorheriges Kapitel: Variablen und Datentypen](Variablen_und_Datentypen.md) | [Nächstes Kapitel: Strings](Strings.md)

---

In diesem Kapitel lernst du die verschiedenen Operatoren in Python kennen, mit denen du Berechnungen durchführen und Werte vergleichen kannst.

## Arithmetische Operatoren

Arithmetische Operatoren werden für mathematische Berechnungen verwendet.

| Operator | Name | Beispiel | Ergebnis |
|----------|------|----------|----------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraktion | `5 - 3` | `2` |
| `*` | Multiplikation | `5 * 3` | `15` |
| `/` | Division | `5 / 3` | `1.6666...` |
| `//` | Ganzzahldivision | `5 // 3` | `1` |
| `%` | Modulo (Rest) | `5 % 3` | `2` |
| <code>**</code> | Potenz | `5 ** 3` | `125` |

```python
# Beispiele für arithmetische Operatoren
a = 10
b = 3

print("a + b =", a + b)   # Addition: 13
print("a - b =", a - b)   # Subtraktion: 7
print("a * b =", a * b)   # Multiplikation: 30
print("a / b =", a / b)   # Division: 3.3333...
print("a // b =", a // b) # Ganzzahldivision: 3
print("a % b =", a % b)   # Modulo (Rest): 1
print("a ** b =", a ** b) # Potenz: 1000
```

## Zuweisungsoperatoren

Zuweisungsoperatoren werden verwendet, um Variablen Werte zuzuweisen.

| Operator | Beispiel | Äquivalent zu |
|----------|----------|---------------|
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 5` | `x = x + 5` |
| `-=` | `x -= 5` | `x = x - 5` |
| `*=` | `x *= 5` | `x = x * 5` |
| `/=` | `x /= 5` | `x = x / 5` |
| `//=` | `x //= 5` | `x = x // 5` |
| `%=` | `x %= 5` | `x = x % 5` |
| `**=` | `x **= 5` | `x = x ** 5` |

```python
# Beispiele für Zuweisungsoperatoren
x = 10
print("Anfangswert:", x)  # 10

x += 5  # x = x + 5
print("Nach x += 5:", x)  # 15

x -= 3  # x = x - 3
print("Nach x -= 3:", x)  # 12

x *= 2  # x = x * 2
print("Nach x *= 2:", x)  # 24

x /= 4  # x = x / 4
print("Nach x /= 4:", x)  # 6.0

x //= 2  # x = x // 2
print("Nach x //= 2:", x)  # 3.0

x %= 2  # x = x % 2
print("Nach x %= 2:", x)  # 1.0

y = 2
y **= 3  # y = y ** 3
print("y nach y **= 3:", y)  # 8
```

## Vergleichsoperatoren

Vergleichsoperatoren werden verwendet, um zwei Werte zu vergleichen. Das Ergebnis ist ein Boolean-Wert (`True` oder `False`).

| Operator | Name | Beispiel | Ergebnis |
|----------|------|----------|----------|
| `==` | Gleich | `5 == 3` | `False` |
| `!=` | Ungleich | `5 != 3` | `True` |
| `>` | Größer als | `5 > 3` | `True` |
| `<` | Kleiner als | `5 < 3` | `False` |
| `>=` | Größer oder gleich | `5 >= 5` | `True` |
| `<=` | Kleiner oder gleich | `5 <= 3` | `False` |

```python
# Beispiele für Vergleichsoperatoren
a = 10
b = 5
c = 10

print("a == b:", a == b)  # False
print("a != b:", a != b)  # True
print("a > b:", a > b)    # True
print("a < b:", a < b)    # False
print("a >= c:", a >= c)  # True
print("a <= c:", a <= c)  # True
```

## Logische Operatoren

Logische Operatoren werden verwendet, um logische Ausdrücke zu kombinieren.

| Operator | Beschreibung | Beispiel | Ergebnis |
|----------|--------------|----------|----------|
| `and` | Gibt `True` zurück, wenn beide Aussagen wahr sind | `x > 5 and x < 10` | `True`, wenn x zwischen 5 und 10 liegt |
| `or` | Gibt `True` zurück, wenn eine der Aussagen wahr ist | `x < 5 or x > 10` | `True`, wenn x kleiner als 5 oder größer als 10 ist |
| `not` | Kehrt das Ergebnis um | `not(x > 5)` | `True`, wenn x nicht größer als 5 ist |

```python
# Beispiele für logische Operatoren
x = 8

print("x > 5 and x < 10:", x > 5 and x < 10)  # True
print("x < 5 or x > 7:", x < 5 or x > 7)      # True
print("not(x > 5):", not(x > 5))              # False
```

## Identitätsoperatoren

Identitätsoperatoren werden verwendet, um zu prüfen, ob zwei Variablen dasselbe Objekt sind.

| Operator | Beschreibung | Beispiel |
|----------|--------------|----------|
| `is` | Gibt `True` zurück, wenn beide Variablen dasselbe Objekt sind | `x is y` |
| `is not` | Gibt `True` zurück, wenn beide Variablen nicht dasselbe Objekt sind | `x is not y` |

```python
# Beispiele für Identitätsoperatoren
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print("a is b:", a is b)      # False (unterschiedliche Objekte, auch wenn der Inhalt gleich ist)
print("a is c:", a is c)      # True (c verweist auf dasselbe Objekt wie a)
print("a is not b:", a is not b)  # True
```

## Mitgliedschaftsoperatoren

Mitgliedschaftsoperatoren werden verwendet, um zu prüfen, ob ein Wert in einer Sequenz (wie Liste, Tupel, String) enthalten ist.

| Operator | Beschreibung | Beispiel |
|----------|--------------|----------|
| `in` | Gibt `True` zurück, wenn ein Wert in der Sequenz vorhanden ist | `x in y` |
| `not in` | Gibt `True` zurück, wenn ein Wert nicht in der Sequenz vorhanden ist | `x not in y` |

```python
# Beispiele für Mitgliedschaftsoperatoren
liste = [1, 2, 3, 4, 5]
text = "Hallo Welt"

print("3 in liste:", 3 in liste)          # True
print("6 in liste:", 6 in liste)          # False
print("6 not in liste:", 6 not in liste)  # True
print("Hallo" in text:", "Hallo" in text)    # True
print("Python" in text:", "Python" in text)  # False
```

## Bitweise Operatoren

Bitweise Operatoren werden verwendet, um Operationen auf Bit-Ebene durchzuführen.

| Operator | Name | Beschreibung |
|----------|------|--------------|
| `&` | AND | Setzt ein Bit auf 1, wenn beide Bits 1 sind |
| `\|` | OR | Setzt ein Bit auf 1, wenn mindestens eines der Bits 1 ist |
| `^` | XOR | Setzt ein Bit auf 1, wenn genau eines der Bits 1 ist |
| `~` | NOT | Invertiert alle Bits |
| `<<` | Linksverschiebung | Verschiebt Bits nach links |
| `>>` | Rechtsverschiebung | Verschiebt Bits nach rechts |

```python
# Beispiele für bitweise Operatoren
a = 10  # 1010 in Binär
b = 3   # 0011 in Binär

print("a & b:", a & b)    # 2 (0010 in Binär)
print("a | b:", a | b)    # 11 (1011 in Binär)
print("a ^ b:", a ^ b)    # 9 (1001 in Binär)
print("~a:", ~a)          # -11 (Komplement)
print("a << 2:", a << 2)  # 40 (101000 in Binär)
print("a >> 2:", a >> 2)  # 2 (10 in Binär)
```

## Spezielle Operatoren

Python hat auch einige spezielle Operatoren, die in bestimmten Kontexten verwendet werden.

### Formatierungsoperator `:`

Der Doppelpunkt (`:`) wird häufig in f-Strings verwendet, um das Format von Werten zu steuern, z. B. für die Präzision von Gleitkommazahlen oder die Ausrichtung von Text.

```python
# Beispiel für den Formatierungsoperator in f-Strings
import math

print(f'Der Wert von Pi ist ungefähr {math.pi:.3f}.')
# Ausgabe: Der Wert von Pi ist ungefähr 3.142.

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}
for name, phone in table.items():
    print(f'{name:10} ==> {phone:10d}')
# Ausgabe:
# Sjoerd     ==>       4127
# Jack       ==>       4098
# Dcab       ==>       7678
```

## Operatorrangfolge

Die Operatorrangfolge bestimmt die Reihenfolge, in der Operationen ausgeführt werden. Hier ist eine vereinfachte Rangfolge (von höchster zu niedrigster Priorität):

1. Klammern `()`
2. Potenz `**`
3. Unäre Operatoren `+x`, `-x`, `~x`
4. Multiplikation, Division, Modulo `*`, `/`, `//`, `%`
5. Addition, Subtraktion `+`, `-`
6. Bitweise Verschiebungen `<<`, `>>`
7. Bitweises AND `&`
8. Bitweises XOR `^`
9. Bitweises OR `|`
10. Vergleichsoperatoren `==`, `!=`, `>`, `>=`, `<`, `<=`, `is`, `is not`, `in`, `not in`
11. Logisches NOT `not`
12. Logisches AND `and`
13. Logisches OR `or`

```python
# Beispiel für Operatorrangfolge
ergebnis = 5 + 3 * 2  # Multiplikation hat Vorrang vor Addition
print("5 + 3 * 2 =", ergebnis)  # 11, nicht 16

ergebnis = (5 + 3) * 2  # Klammern haben höchste Priorität
print("(5 + 3) * 2 =", ergebnis)  # 16
```

## Übungen

1. Berechne das Ergebnis von `15 // 4` und `15 % 4`. Was bedeuten diese Ergebnisse?
2. Erstelle eine Variable `x` mit dem Wert 10 und verwende Zuweisungsoperatoren, um sie zu verdoppeln, dann 5 zu subtrahieren und schließlich durch 3 zu teilen.
3. Schreibe einen Ausdruck, der prüft, ob eine Zahl zwischen 10 und 20 liegt (einschließlich).
4. Verwende bitweise Operatoren, um zwei Zahlen zu vergleichen und das Ergebnis zu erklären.
5. Schreibe einen Ausdruck mit mehreren Operatoren und erkläre die Rangfolge.

## Zusammenfassung

- Arithmetische Operatoren werden für mathematische Berechnungen verwendet
- Zuweisungsoperatoren weisen Variablen Werte zu
- Vergleichsoperatoren vergleichen Werte und geben Boolean-Werte zurück
- Logische Operatoren kombinieren logische Ausdrücke
- Identitätsoperatoren prüfen, ob Variablen dasselbe Objekt sind
- Mitgliedschaftsoperatoren prüfen, ob ein Wert in einer Sequenz enthalten ist
- Bitweise Operatoren führen Operationen auf Bit-Ebene durch
- Die Operatorrangfolge bestimmt die Reihenfolge der Ausführung
