# 📦 Variablen und 📊 Datentypen in Python

[⬅️ Zurück zu Kapitel 1](../Kapitel_1/Kapitel_1.md) | [Zur Textausgabe 📝](Textausgabe_InDerKonsole.md) | [Weiter zu Operatoren ➕➖✖️➗](Operatoren.md)

Stell dir vor, du möchtest dir Dinge merken, wie den Namen deines Lieblingsspiels, deine Punktzahl oder wie viele Leben du noch hast. In Python benutzt du dafür **Variablen**. Und damit Python weiß, ob es sich um Text, eine Zahl oder etwas anderes handelt, gibt es **Datentypen**. Klingt kompliziert? Keine Sorge, das ist wie Kisten beschriften und sortieren!

---

## 🎯 Warum sind Variablen und Datentypen wichtig?

Stell dir vor, du programmierst ein kleines Spiel:

*   Du brauchst einen Ort, um den **Namen des Spielers** zu speichern.
*   Du musst die **erreichten Punkte** zählen.
*   Vielleicht willst du wissen, ob der Spieler das **Spiel gewonnen** hat (`Ja` oder `Nein`).

Genau dafür sind Variablen da! Sie sind wie kleine, beschriftete Behälter 🏷️, in denen du Informationen (Werte) für dein Programm speichern kannst. Die Datentypen sagen Python, welche Art von Information in der Kiste ist – ob es Text, eine Zahl oder etwas anderes ist. Das ist super wichtig, damit dein Programm richtig funktioniert und du später noch weißt, was du wo gespeichert hast!

---

## 📦 Was sind Variablen? Eine Alltagsanalogie

Stell dir vor, du hast verschiedene Kisten:

*   Eine Kiste für deine Spielsachen 🧸
*   Eine Kiste für deine Bücher 📚
*   Eine Kiste für deine Stifte ✏️

Jede Kiste hat einen **Namen** (z.B. "Spielsachen") und einen **Inhalt** (die Spielsachen selbst).

In Python ist das ganz ähnlich:
Eine **Variable** ist wie eine beschriftete Kiste.
*   Der **Variablenname** ist das Etikett auf der Kiste (z.B. `spieler_name`).
*   Der **Wert** der Variable ist der Inhalt der Kiste (z.B. "SuperCoder123").

Du kannst den Inhalt der Kiste jederzeit ändern – genau wie du den Wert einer Variable ändern kannst!

---

### 🛠️ Variablen erstellen und Werte zuweisen

In Python ist es kinderleicht, eine Variable zu erstellen. Du denkst dir einfach einen Namen aus und sagst Python mit dem Gleichheitszeichen (`=`), was du darin speichern möchtest.

```python
# Variable für den Namen eines Spielcharakters
spieler_name = "PikaPlays"

# Variable für das Alter des Spielers
alter_des_spielers = 13

# Variable für die erreichte Punktzahl
punkte = 1500

# Variable, die speichert, ob der Spieler ein Power-Up hat
hat_power_up = True
```

Siehst du? Du musst Python nicht extra sagen: "Hey, das hier wird Text!" oder "Das hier wird eine Zahl!". Python ist schlau genug, das meistens selbst zu erkennen. Den "Typ" der Information nennt man **Datentyp**.

---

### 🏷️ Regeln und Tipps für gute Variablennamen

Damit du und Python euch gut versteht, gibt es ein paar Regeln für Variablennamen:

1.  **Erlaubte Zeichen**: Variablennamen dürfen Buchstaben (a-z, A-Z), Zahlen (0-9) und den Unterstrich (`_`) enthalten.
2.  **Anfang**: Sie müssen mit einem Buchstaben oder einem Unterstrich beginnen. **Nicht mit einer Zahl!**
    *   👍 `highscore`, `_level`, `name1`
    *   👎 `1_spieler` (falsch, beginnt mit Zahl)
3.  **Groß- und Kleinschreibung zählt**: `punkte` und `Punkte` sind für Python zwei *unterschiedliche* Variablen! Am besten bleibst du bei einer Schreibweise, meistens Kleinschreibung mit Unterstrichen zur Trennung (das nennt man "snake_case").
    *   `mein_name` ist anders als `Mein_Name`.
4.  **Keine Leerzeichen oder Sonderzeichen**:
    *   👎 `mein name` (falsch, Leerzeichen)
    *   👎 `spieler-punkte` (falsch, Bindestrich)
    *   👍 `mein_name`, `spieler_punkte`
5.  **Keine reservierten Wörter**: Python hat bestimmte Wörter, die eine feste Bedeutung haben (z.B. `print`, `if`, `for`). Diese darfst du nicht als Variablennamen verwenden. Keine Sorge, du lernst sie nach und nach kennen.
    *   👎 `for = 10` (falsch, `for` ist ein reserviertes Wort)
6.  **Sprechende Namen wählen**: Wähle Namen, die verraten, was in der Variable gespeichert ist.
    *   👍 `anzahl_leben`, `gegner_typ`, `letzte_nachricht`
    *   🤔 `x`, `y`, `a1` (geht, ist aber oft unklar, was gemeint ist)

**Beispiele für gute Variablennamen:**

```python
# Gut lesbar und verständlich
name_des_haustiers = "Bello"
anzahl_goldmuenzen = 50
ist_freundlich = True
geschwindigkeit_in_kmh = 20
```

**Beispiele für ungültige Variablennamen:**

```python
# 1. Regel: Darf nicht mit Zahl beginnen
# 1spieler = "Alex" # Das gibt einen Fehler!

# 4. Regel: Keine Sonderzeichen wie '-'
# mein-alter = 12 # Fehler!

# 5. Regel: Kein reserviertes Wort
# print = "Hallo" # Fehler! 'print' ist ein Befehl.
```

---

## 📊 Die wichtigsten Datentypen

Python hat verschiedene eingebaute Datentypen, um unterschiedliche Arten von Informationen zu speichern. Die wichtigsten für den Anfang sind:

### 📝 String (`str`): Für Text und Zeichenketten

Ein String ist einfach eine Folge von Zeichen – also Text. Du erkennst Strings daran, dass sie in Anführungszeichen stehen, entweder einfache (`'`) oder doppelte (`"`).

**Beispiele:**

```python
# Dein Name ist ein String
mein_name = "SuperMax"
print(mein_name)

# Der Name deines Lieblingsspiels
lieblingsspiel = 'Minecraft'
print(lieblingsspiel)

# Auch eine einzelne Zahl in Anführungszeichen ist ein String!
hausnummer_als_text = "23b"
print(hausnummer_als_text)

# Du kannst auch Emojis verwenden!
gruss = "Hallo Welt! 👋"
print(gruss)
```

**Wichtig:** Zahlen in Anführungszeichen (`"123"`) sind Text und keine Zahlen, mit denen du direkt rechnen kannst!

### 🔢 Integer (`int`): Für ganze Zahlen

Integer sind ganze Zahlen, also Zahlen ohne Komma.

**Beispiele:**

```python
# Dein Alter
alter = 13
print(alter)

# Anzahl deiner gesammelten Münzen im Spiel
anzahl_muenzen = 120
print(anzahl_muenzen)

# Auch negative Zahlen sind Integer
temperatur_keller = -5
print(temperatur_keller)
```

### 💧 Float (`float`): Für Zahlen mit Komma (Gleitkommazahlen)

Floats sind Zahlen mit einem Dezimalpunkt (Achtung: In Python benutzt man einen Punkt `.` statt eines Kommas `,` für Dezimalzahlen!).

**Beispiele:**

```python
# Deine Körpergröße in Metern
groesse_in_metern = 1.65  # 1 Meter 65 Zentimeter
print(groesse_in_metern)

# Der Preis eines Spiels
preis_spiel = 29.99
print(preis_spiel)

# Das Ergebnis einer Division kann ein Float sein
ergebnis_division = 10 / 4  # Ergebnis ist 2.5
print(ergebnis_division)
```

### ✅ Boolean (`bool`): Für Wahrheitswerte (Ja/Nein)

Ein Boolean kann nur zwei Werte haben: `True` (wahr) oder `False` (falsch). Sie sind super nützlich, um Bedingungen zu überprüfen.

**Beispiele:**

```python
# Hat der Spieler den Schlüssel gefunden?
hat_schluessel = True
print(hat_schluessel)

# Ist das Spiel vorbei?
spiel_vorbei = False
print(spiel_vorbei)

# Ist der Spieler älter als 12?
ist_aelter_als_12 = alter > 12 # Hier wird `alter` (13) mit 12 verglichen
print(ist_aelter_als_12)      # Das Ergebnis ist True
```
Beachte: `True` und `False` werden großgeschrieben!

---

## 🕵️ Den Datentyp einer Variable herausfinden: `type()`

Manchmal möchtest du vielleicht wissen, welchen Datentyp eine Variable hat. Dafür gibt es die eingebaute Funktion `type()`.

```python
spieler_name = "PikaPlays"
punkte = 1500
groesse = 1.78
hat_power_up = True

print(type(spieler_name))  # Ausgabe: <class 'str'>
print(type(punkte))        # Ausgabe: <class 'int'>
print(type(groesse))       # Ausgabe: <class 'float'>
print(type(hat_power_up))  # Ausgabe: <class 'bool'>

geheimnis = None # Es gibt auch einen speziellen Typ "NoneType"
print(type(geheimnis))     # Ausgabe: <class 'NoneType'>
```
`None` bedeutet so viel wie "kein Wert" oder "nichts". Das ist manchmal nützlich, wenn eine Variable zwar existiert, aber noch keinen richtigen Inhalt hat.

---

## 🔄 Typumwandlung (Type Casting): Datentypen wechseln

Manchmal hast du Daten in einem bestimmten Typ vorliegen, brauchst sie aber in einem anderen. Zum Beispiel, wenn du eine Zahl, die als Text gespeichert ist, für eine Berechnung verwenden möchtest. Das nennt man Typumwandlung oder Type Casting.

Python bietet dir dafür einfache Funktionen:

*   `int()`: Wandelt etwas in einen Integer um (wenn möglich).
*   `float()`: Wandelt etwas in einen Float um (wenn möglich).
*   `str()`: Wandelt etwas in einen String um.
*   `bool()`: Wandelt etwas in einen Boolean um.

**Beispiele:**

```python
# Von String zu Integer
punkte_text = "100"
punkte_zahl = int(punkte_text) # jetzt ist es die Zahl 100
print(punkte_zahl + 50)        # Rechnen ist möglich! Ausgabe: 150

# Von String zu Float
preis_text = "19.99"
preis_zahl = float(preis_text) # jetzt ist es die Zahl 19.99
print(preis_zahl * 2)          # Ausgabe: 39.98

# Von Integer zu String
alter_zahl = 14
alter_text = str(alter_zahl)   # jetzt ist es der Text "14"
print("Du bist " + alter_text + " Jahre alt.") # Text kann man zusammenfügen

# Von Float zu Integer (Vorsicht: Nachkommastellen werden abgeschnitten!)
pi_ungefaehr = 3.14159
pi_ganzzahl = int(pi_ungefaehr)
print(pi_ganzzahl)             # Ausgabe: 3

# Von Zahl zu Boolean
# Jede Zahl außer 0 wird zu True, 0 wird zu False
print(bool(10))      # Ausgabe: True
print(bool(0))       # Ausgabe: False
print(bool(-5))      # Ausgabe: True

# Von String zu Boolean
# Jeder nicht-leere String wird zu True, ein leerer String "" wird zu False
print(bool("Hallo")) # Ausgabe: True
print(bool(""))      # Ausgabe: False
```

**Wichtig:** Nicht jede Umwandlung ist sinnvoll oder möglich! Wenn du versuchst, einen Text wie `"Hallo"` in eine Zahl umzuwandeln (`int("Hallo")`), gibt es einen Fehler, weil das keinen Sinn ergibt.

```python
# Das hier gibt einen Fehler!
# text = "Apfel"
# zahl = int(text) # Python weiß nicht, wie es "Apfel" in eine Zahl umwandeln soll
```

---

## 🚫 Häufige Fehler und wie du sie vermeidest

Beim Arbeiten mit Variablen und Datentypen können am Anfang leicht Fehler passieren. Hier sind ein paar typische Stolpersteine:

1.  **Falsch geschriebene Variablennamen:**
    *   **Fehler:** Du definierst `spieler_name` aber versuchst `spielr_name` zu verwenden.
    *   **Lösung:** Achte genau auf die Schreibweise und Groß-/Kleinschreibung.

2.  **Variable benutzt, bevor sie einen Wert hat (NameError):**
    *   **Fehler:** `print(geheimer_code)` obwohl `geheimer_code` nirgends definiert wurde.
    *   **Lösung:** Stelle sicher, dass jede Variable einen Wert zugewiesen bekommt, bevor du sie benutzt.

3.  **Text (String) mit Zahl (Integer/Float) direkt verrechnen wollen (TypeError):**
    *   **Fehler:** `punkte_text = "50"` und dann `ergebnis = punkte_text + 10`. Python kann nicht einfach Text und eine Zahl addieren.
    *   **Lösung:** Wandle den Text mit `int()` oder `float()` in eine Zahl um, bevor du rechnest: `ergebnis = int(punkte_text) + 10`. Oder wandle die Zahl in einen String um, wenn du sie mit anderem Text verbinden willst: `print("Punkte: " + str(punkte_text))`.

4.  **Anführungszeichen bei Strings vergessen oder falsch gesetzt:**
    *   **Fehler:** `mein_text = Hallo Welt` (Anführungszeichen fehlen).
    *   **Lösung:** Strings immer in einfache (`'...'`) oder doppelte (`"..."`) Anführungszeichen setzen: `mein_text = "Hallo Welt"`.

5.  **Unterschied zwischen `=` und `==` verwechseln:**
    *   `=` ist eine Zuweisung: `alter = 10` (Die Variable `alter` bekommt den Wert 10).
    *   `==` ist ein Vergleich (lernst du später genauer kennen): `alter == 10` (Prüft, ob `alter` den Wert 10 hat).
    *   **Fehler:** `if alter = 10:` (falsch, hier müsste `==` stehen).

**Tipp:** Lies Fehlermeldungen genau durch! Python versucht dir oft zu sagen, was falsch gelaufen ist.

---

## 🏋️‍♀️ Übungsaufgaben

Jetzt bist du dran! Probiere die folgenden Aufgaben aus, um dein Wissen zu testen.

```python
# Aufgabe 1: Deine persönlichen Daten
# a) Erstelle eine Variable für deinen Vornamen (String).
# b) Erstelle eine Variable für dein Alter (Integer).
# c) Erstelle eine Variable für deine Lieblingsfarbe (String).
# d) Erstelle eine Variable, die speichert, ob du gerne Pizza isst (Boolean: True oder False).
# e) Gib alle diese Variablen mit print() und einer netten Beschreibung aus.
#    Beispiel: "Mein Vorname ist: [Vorname]"

# Aufgabe 2: Rechnen mit Taschengeld
# a) Erstelle eine Variable `taschengeld_pro_woche` mit dem Wert 5 (Integer, für 5 Euro).
# b) Erstelle eine Variable `wochen_im_monat` mit dem Wert 4.
# c) Berechne dein Taschengeld pro Monat und speichere es in einer neuen Variable `taschengeld_pro_monat`.
# d) Gib das monatliche Taschengeld aus, z.B. "Mein Taschengeld pro Monat ist: [Betrag] Euro."

# Aufgabe 3: Datentypen-Detektiv
# Gegeben sind folgende Variablen:
wert1 = "100"
wert2 = 25.5
wert3 = 0
wert4 = "False" # Achtung, das ist ein String!
wert5 = ""

# a) Finde für jede Variable mit type() heraus, welchen Datentyp sie hat und gib das Ergebnis aus.
# b) Wandle `wert1` in einen Integer um und addiere 10 dazu. Gib das Ergebnis aus.
# c) Wandle `wert2` in einen Integer um. Was passiert mit den Nachkommastellen? Gib das Ergebnis aus.
# d) Wandle `wert3` in einen Boolean um. Was ist das Ergebnis? Gib es aus.
# e) Wandle `wert4` (den String "False") in einen Boolean um. Was erwartest du, was passiert? Gib das Ergebnis aus.
# f) Wandle `wert5` (einen leeren String) in einen Boolean um. Was ist das Ergebnis? Gib es aus.

# Aufgabe 4: Einkaufsliste
# a) Erstelle eine Variable `artikel1_name` mit dem Wert "Apfel" (String).
# b) Erstelle eine Variable `artikel1_preis` mit dem Wert 0.50 (Float).
# c) Erstelle eine Variable `artikel2_name` mit dem Wert "Banane" (String).
# d) Erstelle eine Variable `artikel2_preis` mit dem Wert 0.30 (Float).
# e) Berechne den Gesamtpreis und speichere ihn in der Variable `gesamtpreis`.
# f) Gib eine schöne Einkaufsliste aus, z.B.:
#    "Einkaufsliste:"
#    "- Apfel: 0.5 Euro"
#    "- Banane: 0.3 Euro"
#    "Gesamt: 0.8 Euro"
#    Tipp: Du musst die Zahlen (Floats) mit str() in Strings umwandeln, um sie mit anderem Text zu verbinden.
```

---

## 🚀 Was kommt als Nächstes?

Super gemacht! Du hast jetzt eine tolle Grundlage zum Thema Variablen und Datentypen. Das sind die Bausteine für fast alles, was du in Python programmieren wirst.

Im nächsten Schritt schauen wir uns an, wie du mit diesen Variablen und Werten rechnen und sie vergleichen kannst. Das Zauberwort dafür ist **Operatoren**!

➡️ [Weiter zu Operatoren ➕➖✖️➗](Operatoren.md)

---
[⬅️ Zurück zu Kapitel 1](../Kapitel_1/Kapitel_1.md)
