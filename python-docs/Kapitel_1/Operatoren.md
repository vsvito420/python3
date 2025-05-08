# ⚙️ Operatoren: Die Werkzeuge für Berechnungen und Vergleiche in Python

[⬅️ Variablen und Datentypen](Variablen_und_Datentypen.md) | [🏠 Startseite](../Kapitel_0/Anfang_Lese_Mich.md) | [Kapitelübersicht](Kapitel_1.md) | [Strings ➡️](Strings.md)

Stell dir vor, du baust mit LEGO® Steinen. Du hast verschiedene Bausteine (das sind deine [Variablen und Datentypen](Variablen_und_Datentypen.md)), aber um etwas Cooles daraus zu machen, brauchst du Werkzeuge, um sie zu verbinden, zu verändern oder zu vergleichen. Genau das sind Operatoren in Python! Sie sind wie magische Zeichen, die deinem Computer sagen, was er mit deinen Daten machen soll.

**Warum sind Operatoren so wichtig?** 🤔

Ohne Operatoren könnten wir keine Berechnungen durchführen (wie das Zusammenzählen von Punkten in einem Spiel 🎮), keine Entscheidungen treffen (ob ein Passwort richtig ist 🔑) oder Daten auf interessante Weise verändern. Sie sind das Herzstück vieler Programme!

In diesem Kapitel lernst du die wichtigsten Operatoren kennen und wie du sie wie ein Profi einsetzt!

---

## 🔢 Arithmetische Operatoren: Rechnen wie ein Mathe-Ass!

Diese Operatoren kennst du bestimmt schon aus dem Matheunterricht. Sie helfen uns, Zahlen zu addieren, subtrahieren, multiplizieren und zu dividieren.

| Operator | Name             | Beispiel (mit `a = 10`, `b = 3`) | Ergebnis | Was passiert?                                  | Emoji |
| :------- | :--------------- | :----------------------------- | :------- | :--------------------------------------------- | :---- |
| `+`      | Addition         | `a + b`                        | `13`     | Zählt zwei Zahlen zusammen.                     | ➕    |
| `-`      | Subtraktion      | `a - b`                        | `7`      | Zieht eine Zahl von einer anderen ab.          | ➖    |
| `*`      | Multiplikation   | `a * b`                        | `30`     | Multipliziert zwei Zahlen.                      | ✖️    |
| `/`      | Division         | `a / b`                        | `3.333…` | Teilt eine Zahl durch eine andere (Ergebnis kann eine Kommazahl sein). | ➗    |
| `//`     | Ganzzahldivision | `a // b`                       | `3`      | Teilt und rundet auf die nächste ganze Zahl ab (ohne Rest). | 📐    |
| `%`      | Modulo (Rest)    | `a % b`                        | `1`      | Gibt den Rest einer Division zurück.            | 🎁    |
| `**`     | Potenz           | `a ** b`                       | `1000`   | Rechnet eine Zahl hoch eine andere (z.B. `10 * 10 * 10`). | 🚀    |

**Beispiel aus dem Alltag:** Stell dir vor, du hast `10` Gummibärchen (`a = 10`) und willst sie gerecht auf `3` Freunde (`b = 3`) aufteilen.

```python
# Arithmetische Operatoren in Aktion
anzahl_gummibaerchen = 10
anzahl_freunde = 3

# Wie viele Gummibärchen bekommt jeder? (Ganzzahldivision)
pro_freund = anzahl_gummibaerchen // anzahl_freunde
print(f"Jeder Freund bekommt {pro_freund} Gummibärchen. 🍬") # Ausgabe: Jeder Freund bekommt 3 Gummibärchen. 🍬

# Wie viele Gummibärchen bleiben übrig? (Modulo)
rest = anzahl_gummibaerchen % anzahl_freunde
print(f"Es bleiben {rest} Gummibärchen übrig. 🧸") # Ausgabe: Es bleiben 1 Gummibärchen übrig. 🧸

# Wenn du die Punkte von drei Spielrunden zusammenrechnest:
punkte_runde1 = 150
punkte_runde2 = 220
punkte_runde3 = 180
gesamtpunkte = punkte_runde1 + punkte_runde2 + punkte_runde3
print(f"Deine Gesamtpunktzahl ist: {gesamtpunkte} Punkte! 🎉") # Ausgabe: Deine Gesamtpunktzahl ist: 550 Punkte! 🎉
```

---

## ✏️ Zuweisungsoperatoren: Werte speichern und verändern

Zuweisungsoperatoren sind wie kleine Helfer, die Werte in deinen Variablen speichern oder sie direkt verändern. Der einfachste ist das Gleichheitszeichen `=`, das du schon kennst. Aber es gibt noch mehr!

| Operator | Beispiel (mit `x = 10` am Anfang) | Äquivalent zu | Wert von `x` danach | Was passiert?                                  | Emoji |
| :------- | :------------------------------ | :------------ | :---------------- | :--------------------------------------------- | :---- |
| `=`      | `x = 10`                        | `x = 10`      | `10`              | Weist der Variable `x` den Wert `10` zu.        | 📥    |
| `+=`     | `x += 5`                        | `x = x + 5`   | `15`              | Addiert `5` zum aktuellen Wert von `x` hinzu.   | ➕=   |
| `-=`     | `x -= 2`                        | `x = x - 2`   | `8`               | Subtrahiert `2` vom aktuellen Wert von `x`.     | ➖=   |
| `*=`     | `x *= 3`                        | `x = x * 3`   | `30`              | Multipliziert den aktuellen Wert von `x` mit `3`.| ✖️=   |
| `/=`     | `x /= 2`                        | `x = x / 2`   | `5.0`             | Teilt den aktuellen Wert von `x` durch `2`.     | ➗=   |
| `//=`    | `x //= 3`                       | `x = x // 3`  | `3`               | Führt eine Ganzzahldivision durch und speichert das Ergebnis. | 📐=   |
| `%=`     | `x %= 3`                        | `x = x % 3`   | `1`               | Berechnet den Modulo und speichert das Ergebnis. | 🎁=   |
| `**=`    | `x **= 2`                       | `x = x ** 2`  | `100`             | Potenziert `x` mit `2` und speichert das Ergebnis. | 🚀=   |

**Beispiel: Lebenspunkte in einem Spiel** 👾

Stell dir vor, `lebenspunkte` ist eine Variable, die deine aktuellen Lebenspunkte im Spiel speichert.

```python
# Zuweisungsoperatoren managen Lebenspunkte
lebenspunkte = 100
print(f"Start-Lebenspunkte: {lebenspunkte} ❤️") # Ausgabe: Start-Lebenspunkte: 100 ❤️

# Du findest einen Heiltrank, der 20 Punkte gibt!
lebenspunkte += 20
print(f"Nach dem Heiltrank: {lebenspunkte} ❤️") # Ausgabe: Nach dem Heiltrank: 120 ❤️

# Oh nein, ein Gegner trifft dich und zieht 35 Punkte ab!
lebenspunkte -= 35
print(f"Nach dem Treffer: {lebenspunkte} ❤️") # Ausgabe: Nach dem Treffer: 85 ❤️

# Du findest einen Schild, der deine Punkte verdoppelt (für kurze Zeit)
lebenspunkte *= 2
print(f"Mit Schild: {lebenspunkte} ❤️") # Ausgabe: Mit Schild: 170 ❤️
```

---

## 🤔 Vergleichsoperatoren: Dinge miteinander vergleichen

Manchmal müssen wir wissen, ob zwei Dinge gleich sind, ob eine Zahl größer ist als eine andere oder ob zwei Namen identisch sind. Dafür gibt es Vergleichsoperatoren. Das Ergebnis eines Vergleichs ist immer ein **Boolean-Wert**: entweder `True` (wahr) ✅ oder `False` (falsch) ❌.

| Operator | Name                  | Beispiel (mit `alter_max = 12`, `alter_anna = 14`) | Ergebnis | Was wird geprüft?                                 | Emoji |
| :------- | :-------------------- | :----------------------------------------------- | :------- | :---------------------------------------------- | :---- |
| `==`     | Gleich                | `alter_max == 12`                                | `True`   | Sind die Werte auf beiden Seiten gleich?         | 🤝    |
| `!=`     | Ungleich              | `alter_max != alter_anna`                        | `True`   | Sind die Werte auf beiden Seiten ungleich?       | 💔    |
| `>`      | Größer als            | `alter_anna > alter_max`                         | `True`   | Ist der linke Wert größer als der rechte?       |🔼    |
| `<`      | Kleiner als           | `alter_max < alter_anna`                         | `True`   | Ist der linke Wert kleiner als der rechte?      |🔽    |
| `>=`     | Größer oder gleich    | `alter_max >= 12`                                | `True`   | Ist der linke Wert größer oder gleich dem rechten?| 👍    |
| `<=`     | Kleiner oder gleich   | `alter_anna <= 14`                               | `True`   | Ist der linke Wert kleiner oder gleich dem rechten?| 👎    |

**Beispiel: Zutritt zu einer Achterbahn** 🎢

Um mit einer bestimmten Achterbahn fahren zu dürfen, muss man mindestens `12` Jahre alt sein und eine Körpergröße von mindestens `1.40` Metern haben.

```python
# Vergleichsoperatoren entscheiden über den Achterbahn-Zutritt
mindest_alter = 12
mindest_groesse = 1.40 # in Metern

dein_alter = 13
deine_groesse = 1.55

# Prüfen wir, ob du alt genug bist
ist_alt_genug = dein_alter >= mindest_alter
print(f"Alt genug? {ist_alt_genug} ({dein_alter} Jahre)") # Ausgabe: Alt genug? True (13 Jahre)

# Prüfen wir, ob du groß genug bist
ist_gross_genug = deine_groesse >= mindest_groesse
print(f"Groß genug? {ist_gross_genug} ({deine_groesse}m)") # Ausgabe: Groß genug? True (1.55m)

# Ist dein Freund Max (11 Jahre, 1.35m) auch startklar?
alter_max = 11
groesse_max = 1.35

max_alt_genug = alter_max >= mindest_alter
print(f"Ist Max alt genug? {max_alt_genug}") # Ausgabe: Ist Max alt genug? False

max_gross_genug = groesse_max >= mindest_groesse
print(f"Ist Max groß genug? {max_gross_genug}") # Ausgabe: Ist Max groß genug? False

# Sind dein Alter und das Alter von Max gleich?
alter_vergleich = dein_alter == alter_max
print(f"Seid ihr gleich alt? {alter_vergleich}") # Ausgabe: Seid ihr gleich alt? False
```

---

## 🧠 Logische Operatoren: Bedingungen verknüpfen

Logische Operatoren helfen uns, mehrere Vergleiche (Boolean-Werte) miteinander zu verbinden. So können wir komplexere Entscheidungen treffen.

| Operator | Beschreibung                                       | Beispiel (`alter = 13`, `hat_ticket = True`)                 | Ergebnis | Emoji |
| :------- | :------------------------------------------------- | :----------------------------------------------------------- | :------- | :---- |
| `and`    | Gibt `True` zurück, wenn **beide** Aussagen wahr sind. | `alter >= 12 and hat_ticket == True`                         | `True`   | 🔗    |
| `or`     | Gibt `True` zurück, wenn **mindestens eine** der Aussagen wahr ist. | `alter < 10 or alter > 65` (für einen Rabatt)             | `False`  | 🔀    |
| `not`    | Kehrt das Ergebnis einer Aussage um. `True` wird `False`, `False` wird `True`. | `not hat_ticket == False` (bedeutet: `hat_ticket` ist nicht `False`, also `True`) | `True`   | 🚫    |

**Beispiel: Achterbahn-Zutritt (Fortsetzung)** 🎢

Jetzt kombinieren wir die Bedingungen für die Achterbahnfahrt: Du musst alt GENUG **UND** groß GENUG sein.

```python
# Logische Operatoren für komplexere Entscheidungen
mindest_alter = 12
mindest_groesse = 1.40

dein_alter = 13
deine_groesse = 1.55
hat_ticket = True

# Bedingung 1: Alt genug?
ist_alt_genug = dein_alter >= mindest_alter # True

# Bedingung 2: Groß genug?
ist_gross_genug = deine_groesse >= mindest_groesse # True

# Darfst du fahren? Beide Bedingungen müssen True sein!
darf_fahren_und = ist_alt_genug and ist_gross_genug and hat_ticket
print(f"Darfst du mit 'and' fahren? {darf_fahren_und}") # Ausgabe: Darfst du mit 'and' fahren? True

# Beispiel für 'or': Gibt es einen Rabatt für Kinder ODER Senioren?
# Angenommen, Kinder unter 10 oder Senioren über 65 zahlen weniger.
bekommt_rabatt = (dein_alter < 10) or (dein_alter > 65)
print(f"Bekommt Rabatt? {bekommt_rabatt}") # Ausgabe: Bekommt Rabatt? False (da 13 weder <10 noch >65 ist)

# Beispiel für 'not': Du hast kein Ticket.
hat_kein_ticket = not hat_ticket
print(f"Hat kein Ticket? {hat_kein_ticket}") # Ausgabe: Hat kein Ticket? False (da hat_ticket True ist)
```

---

## 🚦 Operatorrangfolge: Wer kommt zuerst dran?

Genau wie in Mathe gibt es auch in Python eine Reihenfolge, in der Operatoren ausgeführt werden. Stell dir vor, du hast `5 + 3 * 2`. Wird zuerst `5 + 3` (also `8`) und dann `* 2` (also `16`) gerechnet? Oder zuerst `3 * 2` (also `6`) und dann `5 + 6` (also `11`)?

Python folgt bestimmten Regeln (auch "Präzedenz" genannt):

1.  **Klammern `()`**: Alles in Klammern wird zuerst berechnet. Damit kannst du die Reihenfolge selbst bestimmen! 🥇
2.  **Potenz `**`**: Hochzahlen kommen als Nächstes. 🥈
3.  **Multiplikation `*`, Division `/`, Ganzzahldivision `//`, Modulo `%`**: Diese haben die gleiche Priorität und werden von links nach rechts abgearbeitet. 🥉
4.  **Addition `+`, Subtraktion `-`**: Diese kommen zuletzt und werden ebenfalls von links nach rechts abgearbeitet.

**Merke dir:** **KLA**mmern **PO**tenzen **PU**nktrechnung (Multiplikation, Division) **STRI**chrechnung (Addition, Subtraktion) -> **KLAPOPUSTRI** (Eine kleine Eselsbrücke 😉)

```python
# Operatorrangfolge ist wichtig!
ergebnis1 = 5 + 3 * 2
print(f"5 + 3 * 2 = {ergebnis1}")  # Ausgabe: 5 + 3 * 2 = 11 (Multiplikation zuerst)

ergebnis2 = (5 + 3) * 2
print(f"(5 + 3) * 2 = {ergebnis2}") # Ausgabe: (5 + 3) * 2 = 16 (Klammern zuerst)

# Ein komplexeres Beispiel: Notendurchschnitt berechnen
note_mathe = 2
note_deutsch = 1
note_englisch = 3

# FALSCH ohne Klammern (erst 3/3, dann Addition)
durchschnitt_falsch = note_mathe + note_deutsch + note_englisch / 3
print(f"Falscher Durchschnitt: {durchschnitt_falsch}") # Ausgabe: Falscher Durchschnitt: 4.0 (2 + 1 + (3/3)=1 -> 2+1+1=4)

# RICHTIG mit Klammern
durchschnitt_richtig = (note_mathe + note_deutsch + note_englisch) / 3
print(f"Richtiger Durchschnitt: {durchschnitt_richtig:.2f}") # Ausgabe: Richtiger Durchschnitt: 2.00 ( (2+1+3)=6 -> 6/3=2 )
# :.2f formatiert die Ausgabe auf 2 Nachkommastellen
```
**Tipp:** Wenn du unsicher bist, benutze einfach Klammern `()`, um klarzustellen, was zuerst berechnet werden soll. Das macht deinen Code auch leichter lesbar! 🤓

---
## ➕➖文字列 Operatoren mit verschiedenen Datentypen

Operatoren können sich unterschiedlich verhalten, je nachdem, mit welchen [Datentypen](Variablen_und_Datentypen.md) du sie verwendest.

**1. Zahlen (Integer `int` und Float `float`):**
   Hier funktionieren die arithmetischen Operatoren (`+`, `-`, `*`, `/`, `//`, `%`, `**`) wie erwartet aus der Mathematik.
   ```python
   zahl1 = 10    # int
   zahl2 = 5.5   # float
   summe = zahl1 + zahl2
   print(f"{zahl1} + {zahl2} = {summe}") # Ausgabe: 10 + 5.5 = 15.5 (Ergebnis ist ein float)
   ```

**2. Strings (Text `str`):**
   - Der `+` Operator kann Strings zusammenfügen (konkatenieren).
   - Der `*` Operator kann einen String mehrmals wiederholen.
   ```python
   vorname = "Max"
   nachname = "Mustermann"
   ganzer_name = vorname + " " + nachname # Leerzeichen nicht vergessen!
   print(f"Hallo, {ganzer_name}!") # Ausgabe: Hallo, Max Mustermann!

   ruf = "Hilfe! "
   dringender_ruf = ruf * 3
   print(dringender_ruf) # Ausgabe: Hilfe! Hilfe! Hilfe!
   ```
   Andere arithmetische Operatoren wie `-` oder `/` ergeben bei Strings einen Fehler!

**3. Booleans (`bool`):**
   Booleans (`True` oder `False`) werden intern oft wie Zahlen behandelt (`True` als `1`, `False` als `0`). Das kann bei Berechnungen manchmal überraschende Ergebnisse liefern, wird aber seltener direkt genutzt.
   ```python
   print(f"True + True = {True + True}")     # Ausgabe: True + True = 2
   print(f"False + 5 = {False + 5}")       # Ausgabe: False + 5 = 5
   print(f"True * 3 = {True * 3}")        # Ausgabe: True * 3 = 3
   # print("Text" + True) # Das gibt einen Fehler! Man kann nicht direkt Strings und Booleans addieren.
   ```
   **Wichtig:** Man kann nicht direkt einen String und eine Zahl (oder Boolean) mit `+` addieren, ohne die Zahl vorher in einen String umzuwandeln (z.B. mit `str(zahl)`). Mehr dazu lernst du im Kapitel [Strings](Strings.md).

---

## ⚠️ Häufige Fehler und wie du sie vermeidest

Beim Arbeiten mit Operatoren können leicht kleine Fehler passieren. Hier sind ein paar typische Stolpersteine:

1.  **Verwechslung von `=` und `==`:**
    *   `=` ist der **Zuweisungsoperator**: `alter = 10` (speichert 10 in `alter`).
    *   `==` ist der **Vergleichsoperator**: `alter == 10` (prüft, ob `alter` den Wert 10 hat, Ergebnis ist `True` oder `False`).
    *   **Fehler:** `if alter = 10:` (Das ist eine Zuweisung in einer `if`-Abfrage und meistens falsch!)
    *   **Korrekt:** `if alter == 10:`

2.  **Division durch Null (`ZeroDivisionError`):**
    *   Du kannst nicht durch Null teilen. Python gibt hier einen Fehler aus.
    *   **Beispiel:** `ergebnis = 10 / 0` führt zu `ZeroDivisionError`.
    *   **Vermeidung:** Prüfe vorher, ob der Teiler (die Zahl, durch die geteilt wird) nicht Null ist, bevor du eine Division ausführst.

3.  **Falsche Datentypen gemischt (`TypeError`):**
    *   Nicht alle Operatoren funktionieren mit allen Datentypen.
    *   **Beispiel:** `print("Mein Alter: " + 12)` gibt einen `TypeError`, weil man einen String nicht direkt mit einer Zahl addieren kann.
    *   **Korrekt:** `print("Mein Alter: " + str(12))` (wandelt die Zahl 12 in den String "12" um).
    *   **Oder besser mit f-String:** `alter = 12; print(f"Mein Alter: {alter}")`

4.  **Operatorrangfolge nicht beachtet:**
    *   Wie oben erklärt, `2 + 3 * 5` ist `17`, nicht `25`.
    *   **Vermeidung:** Nutze Klammern `()`, um die gewünschte Reihenfolge klarzumachen, z.B. `(2 + 3) * 5`. Das macht den Code auch besser lesbar.

5.  **Modulo bei negativen Zahlen:**
    *   Das Ergebnis von `%` mit negativen Zahlen kann manchmal anders sein, als man es von positiven Zahlen gewohnt ist. Das Vorzeichen des Ergebnisses ist meist das gleiche wie das Vorzeichen des Divisors (zweite Zahl).
    *   **Beispiel:** `-7 % 3` ist `2`, aber `7 % -3` ist `-2`. Für Anfänger ist das erstmal nicht so wichtig, aber gut zu wissen für später.

Indem du auf diese Punkte achtest, kannst du viele typische Fehler vermeiden und saubereren Code schreiben! 👍

---
## 🔍 Identitätsoperatoren: Sind es dieselben Objekte? (Für Fortgeschrittene)

Identitätsoperatoren prüfen nicht, ob zwei Variablen den *gleichen Inhalt* haben, sondern ob sie auf das *exakt selbe Objekt* im Speicher des Computers zeigen. Das ist ein feiner, aber wichtiger Unterschied, besonders wenn du mit veränderlichen Objekten wie Listen arbeitest.

| Operator | Beschreibung                                                 | Beispiel (`a = [1,2]`, `b = [1,2]`, `c = a`) | Ergebnis | Emoji |
| :------- | :----------------------------------------------------------- | :----------------------------------------- | :------- | :---- |
| `is`     | Gibt `True` zurück, wenn beide Variablen **dasselbe Objekt** sind. | `a is c`                                   | `True`   | 🆔    |
|          |                                                              | `a is b`                                   | `False`  |       |
| `is not` | Gibt `True` zurück, wenn beide Variablen **nicht dasselbe Objekt** sind. | `a is not b`                               | `True`   | 🚫🆔   |

```python
# Identitätsoperatoren
liste_a = [10, 20, 30]
liste_b = [10, 20, 30] # Gleicher Inhalt, aber neues Objekt
liste_c = liste_a      # liste_c zeigt auf dasselbe Objekt wie liste_a

print(f"liste_a == liste_b: {liste_a == liste_b}") # True (Inhalt ist gleich)
print(f"liste_a is liste_b: {liste_a is liste_b}") # False (es sind zwei verschiedene Listen-Objekte)

print(f"liste_a == liste_c: {liste_a == liste_c}") # True (Inhalt ist gleich)
print(f"liste_a is liste_c: {liste_a is liste_c}") # True (beide zeigen auf dasselbe Listen-Objekt)

# Wenn du liste_c änderst, ändert sich auch liste_a!
liste_c.append(40)
print(f"liste_a nach Änderung von liste_c: {liste_a}") # Ausgabe: [10, 20, 30, 40]
print(f"liste_b ist davon unberührt: {liste_b}")      # Ausgabe: [10, 20, 30]
```
Für Zahlen und kurze Strings kann Python aus Optimierungsgründen manchmal dasselbe Objekt wiederverwenden, daher kann `is` hier manchmal `True` ergeben, auch wenn man es nicht erwartet. Verlass dich bei Inhaltsvergleichen aber immer auf `==`!

---

## 🕵️ Mitgliedschaftsoperatoren: Ist etwas Teil von etwas anderem? (Für Fortgeschrittene)

Mitgliedschaftsoperatoren prüfen, ob ein bestimmter Wert in einer Sequenz (wie einem String, einer Liste oder einem Tupel) enthalten ist.

| Operator | Beschreibung                                                 | Beispiel (`name = "Python"`, `buchstaben = ['P', 'y']`) | Ergebnis | Emoji |
| :------- | :----------------------------------------------------------- | :--------------------------------------------------- | :------- | :---- |
| `in`     | Gibt `True` zurück, wenn ein Wert **in** der Sequenz vorhanden ist. | `'P' in name`                                        | `True`   | ✅📍   |
|          |                                                              | `'z' in name`                                        | `False`  |       |
| `not in` | Gibt `True` zurück, wenn ein Wert **nicht in** der Sequenz vorhanden ist. | `'a' not in buchstaben`                              | `True`   | 🚫📍   |

```python
# Mitgliedschaftsoperatoren
mein_name = "Alex"
lieblingsfarben = ["blau", "grün", "rot"]

print(f"'e' in mein_name: {'e' in mein_name}") # True, weil 'e' in "Alex" vorkommt
print(f"'x' in mein_name: {'x' in mein_name}") # True

print(f"'gelb' in lieblingsfarben: {'gelb' in lieblingsfarben}") # False
print(f"'blau' in lieblingsfarben: {'blau' in lieblingsfarben}") # True

print(f"'z' not in mein_name: {'z' not in mein_name}") # True, 'z' ist nicht in "Alex"
print(f"'grün' not in lieblingsfarben: {'grün' not in lieblingsfarben}") # False, weil grün enthalten ist
```

Identitäts- und Mitgliedschaftsoperatoren werden dir später bei komplexeren Datenstrukturen und Algorithmen sehr nützlich sein!

---

## 💻 Bitweise Operatoren (Sehr fortgeschritten 🚀🌌)

Bitweise Operatoren arbeiten direkt auf der Ebene der Bits (den Nullen und Einsen, aus denen Zahlen im Computer bestehen). Für den Anfang brauchst du diese wahrscheinlich nicht, aber es ist gut zu wissen, dass es sie gibt, falls du mal auf sie stößt oder sehr hardwarenahe Programmierung machst.

| Operator | Name               | Beispiel (`a=10 (1010)`, `b=3 (0011)`) | Ergebnis (Dezimal) |
| :------- | :----------------- | :----------------------------------- | :----------------- |
| `&`      | Bitweises UND      | `a & b`                              | `2 (0010)`         |
| `\|`      | Bitweises ODER     | `a \| b`                             | `11 (1011)`        |
| `^`      | Bitweises XOR      | `a ^ b`                              | `9 (1001)`         |
| `~`      | Bitweise Negation  | `~a`                                 | `-11`              |
| `<<`     | Linksverschiebung  | `a << 1`                             | `20 (10100)`       |
| `>>`     | Rechtsverschiebung | `a >> 1`                             | `5 (0101)`         |

```python
# Bitweise Operatoren (nur zur Demo, nicht erschrecken!)
a = 10  # Binär: 1010
b = 3   # Binär: 0011 (mit führenden Nullen für gleiche Länge gedacht)

print(f"a & b: {a & b}")    # Bitweises UND: 1010 & 0011 = 0010 (entspricht 2)
print(f"a | b: {a | b}")    # Bitweises ODER: 1010 | 0011 = 1011 (entspricht 11)
```
Diese Operatoren sind sehr speziell und werden meist in Bereichen wie Netzwerkprogrammierung, Kryptographie oder bei der direkten Manipulation von Hardware-Registern verwendet.

---

## 🧑‍🎓 Übungsaufgaben: Teste dein Wissen!

Jetzt bist du dran! Versuche, die folgenden Aufgaben zu lösen, um dein Verständnis von Operatoren zu festigen.

1.  **Taschengeld-Check:**
    *   Du bekommst `15` Euro Taschengeld pro Monat.
    *   Du gibst `3` Euro für Süßigkeiten und `5` Euro für ein Comic-Heft aus.
    *   Wie viel Geld hast du am Ende des Monats übrig? Schreibe Python-Code, um das zu berechnen.
    ```python
    # Deine Lösung hier
    taschengeld = 15
    ausgabe_suesses = 3
    ausgabe_comic = 5
    # ... berechne den Rest
    ```

2.  **Punkte-Booster:**
    *   In einem Spiel hast du `punkte = 1250`.
    *   Du sammelst einen Bonus, der deine Punkte verdoppelt (`*= 2`).
    *   Danach bekommst du nochmal `250` Extrapunkte (`+= 250`).
    *   Wie viele Punkte hast du jetzt?
    ```python
    # Deine Lösung hier
    punkte = 1250
    # ... wende die Operatoren an
    ```

3.  **Altersüberprüfung für einen Film:**
    *   Ein Film ist freigegeben ab `12` Jahren (`fsk = 12`).
    *   Dein Freund ist `11` Jahre alt (`alter_freund = 11`).
    *   Schreibe einen Vergleich, der prüft, ob dein Freund den Film sehen darf. Das Ergebnis soll `True` oder `False` sein.
    *   Erweitere die Prüfung: Darf er den Film sehen, wenn er von einem Erwachsenen (`erwachsener_dabei = True`) begleitet wird? (Nehmen wir für diese Aufgabe an, die Regel ist: unter FSK-Alter nur mit Erwachsenem ODER man ist alt genug).
    ```python
    # Deine Lösung hier
    fsk = 12
    alter_freund = 11
    erwachsener_dabei = True # Ändere das mal zu False und schau was passiert
    # ... schreibe die Vergleiche
    ```

4.  **Klammer-Chaos auflösen:**
    *   Was ist das Ergebnis von `100 - 20 * 3 + 10 / 2`? Berechne es zuerst im Kopf oder auf Papier und dann mit Python.
    *   Setze Klammern, sodass das Ergebnis `(100 - 20) * (3 + 10) / 2` berechnet wird. Was kommt jetzt raus?
    ```python
    # Deine Lösung hier
    ```

5.  **String-Spielerei:**
    *   Erstelle eine Variable `tier = "Katze"`.
    *   Lasse Python `3` mal das Wort "Miau " ausgeben, indem du den String mit einer Zahl multiplizierst.
    *   Füge an den String `tier` noch "n-Fan" an, sodass "Katzen-Fan" entsteht.
    ```python
    # Deine Lösung hier
    tier = "Katze"
    # ...
    ```

---

## 🚀 Was kommt als Nächstes?

Super gemacht! Du hast jetzt die grundlegenden Werkzeuge – die Operatoren – kennengelernt, mit denen du in Python richtig coole Sachen anstellen kannst.

Im nächsten Kapitel geht es um **[Strings (Zeichenketten)](Strings.md)**. Du wirst lernen, wie du noch mehr mit Text arbeiten kannst, ihn veränderst, durchsuchst und formatierst. Das ist super wichtig, um Programme zu schreiben, die mit Benutzern interagieren oder Textinformationen verarbeiten!

[⬅️ Variablen und Datentypen](Variablen_und_Datentypen.md) | [🏠 Startseite](../Kapitel_0/Anfang_Lese_Mich.md) | [Kapitelübersicht](Kapitel_1.md) | [Strings ➡️](Strings.md)
