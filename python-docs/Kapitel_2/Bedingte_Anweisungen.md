# 🚦 Bedingte Anweisungen: Wenn Python Entscheidungen trifft

[⬅️ Zurück zu Kapitel 2 Übersicht](Kapitel_2.md) | [🏠 Zurück zur Startseite](/python-docs/index.md) | [Weiter zu Schleifen 🔁](Schleifen.md)

Stell dir vor, dein Leben wäre ein Computerspiel. Jeden Tag triffst du unzählige Entscheidungen:
*   **Wenn** es regnet ☔, **dann** nimmst du einen Schirm mit.
*   **Wenn** du hungrig bist 😋, **dann** machst du dir etwas zu essen.
*   **Wenn** die Ampel rot ist 🛑, **dann** bleibst du stehen, **sonst** (wenn sie grün ist ✅) gehst du weiter.

Genau solche Entscheidungen treffen auch Computerprogramme! Dafür brauchen sie **bedingte Anweisungen**. Mit ihnen können wir festlegen, was ein Programm tun soll, *abhängig davon, ob eine bestimmte Bedingung erfüllt ist oder nicht*.

In diesem Kapitel lernst du, wie du deinem Python-Programm beibringst, kluge Entscheidungen zu treffen!

## 🤔 Was ist eine Bedingung?

Eine Bedingung ist im Grunde eine Frage, die mit **Ja** (wahr, oder `True` in Python) oder **Nein** (falsch, oder `False` in Python) beantwortet werden kann.

Zum Beispiel:
*   Ist es draußen kälter als 10 Grad? (Kann wahr oder falsch sein)
*   Ist dein Benutzername "SuperCoder123"? (Kann wahr oder falsch sein)
*   Hast du im Spiel noch Lebenspunkte übrig? (Kann wahr oder falsch sein)

Python prüft diese Bedingungen und führt dann je nach Antwort unterschiedliche Code-Teile aus.

## ⚖️ Vergleichsoperatoren: Dinge miteinander vergleichen

Um Bedingungen zu formulieren, brauchen wir Vergleichsoperatoren. Du kennst sie schon aus dem Matheunterricht, aber in Python sehen sie ein bisschen anders aus:

| Operator | Bedeutung                  | Beispiel (angenommen `alter = 14`, `punkte = 100`) | Ergebnis der Bedingung |
| :------- | :------------------------- | :-------------------------------------------------- | :--------------------- |
| `==`     | Gleich                     | `alter == 14`                                       | `True`                 |
| `!=`     | Ungleich                   | `alter != 10`                                       | `True`                 |
| `<`      | Kleiner als                | `punkte < 200`                                    | `True`                 |
| `>`      | Größer als                 | `alter > 18`                                      | `False`                |
| `<=`     | Kleiner als oder gleich    | `punkte <= 100`                                   | `True`                 |
| `>=`     | Größer als oder gleich     | `alter >= 14`                                     | `True`                 |

**Wichtig:** Das doppelte Gleichheitszeichen `==` wird zum Vergleichen benutzt, während das einfache `=` zum Zuweisen von Werten zu Variablen dient (wie in `alter = 14`). Nicht verwechseln! 😉

```python
alter = 12
print(alter == 12)  # True (Das Alter ist 12)
print(alter > 10)   # True (Das Alter ist größer als 10)
print(alter == 10)  # False (Das Alter ist nicht 10)
```

## 🚦 Die `if`-Anweisung: Wenn etwas wahr ist...

Die einfachste bedingte Anweisung ist die `if`-Anweisung. Sie führt einen Codeblock nur dann aus, **wenn** die Bedingung `True` (wahr) ist.

**Syntax:**

```python
if BEDINGUNG:
    # Dieser Code wird ausgeführt,
    # WENN die BEDINGUNG True ist.
    # Achte auf die Einrückung!
```

**Einrückung ist super wichtig!** Python erkennt anhand der Einrückung (meistens 4 Leerzeichen), welcher Code-Teil zur `if`-Anweisung gehört. Ohne korrekte Einrückung gibt es einen Fehler!

**Beispiel: Taschengeld-Checker** 💰

```python
kontostand = 50
preis_videospiel = 45

if kontostand >= preis_videospiel:
    print("🎉 Juhu! Du kannst dir das Videospiel kaufen!")
    print("Viel Spaß beim Spielen!")

print("--- Programmende ---")
```

*   **Was passiert hier?**
    1.  `kontostand` ist 50, `preis_videospiel` ist 45.
    2.  Die Bedingung `kontostand >= preis_videospiel` (also `50 >= 45`) wird geprüft. Das ist `True`.
    3.  Da die Bedingung `True` ist, werden die beiden `print`-Anweisungen *innerhalb* des `if`-Blocks ausgeführt.
    4.  Die letzte `print`-Anweisung ("--- Programmende ---") wird immer ausgeführt, da sie nicht eingerückt ist und somit nicht zur `if`-Bedingung gehört.

**Was, wenn die Bedingung `False` ist?**

```python
kontostand = 30 # Weniger Geld als das Spiel kostet
preis_videospiel = 45

if kontostand >= preis_videospiel:
    print("🎉 Juhu! Du kannst dir das Videospiel kaufen!")
    print("Viel Spaß beim Spielen!") # Dieser Block wird NICHT ausgeführt

print("--- Programmende ---")
```
Ausgabe:
```
--- Programmende ---
```
Hier ist `30 >= 45` falsch (`False`), also wird der Code im `if`-Block übersprungen.

## 🤷 `if-else`: Wenn etwas wahr ist, ODER SONST...

Oft wollen wir nicht nur etwas tun, *wenn* eine Bedingung wahr ist, sondern auch etwas anderes tun, *wenn sie falsch ist*. Dafür gibt es `if-else`.

**Syntax:**

```python
if BEDINGUNG:
    # Dieser Code wird ausgeführt,
    # WENN die BEDINGUNG True ist.
else:
    # Dieser Code wird ausgeführt,
    # WENN die BEDINGUNG False ist.
    # Achte auch hier auf die Einrückung!
```

**Beispiel: Zutrittskontrolle im Freizeitpark** 🎢

```python
alter = 10
mindestalter_achterbahn = 12

if alter >= mindestalter_achterbahn:
    print("👍 Viel Spaß auf der Achterbahn!")
else:
    print("🙁 Du bist leider noch zu jung für diese Achterbahn.")
    print("Aber es gibt viele andere tolle Attraktionen für dich!")

print("--- Nächster Besucher bitte! ---")
```
*   **Was passiert hier?**
    1.  `alter` ist 10, `mindestalter_achterbahn` ist 12.
    2.  Die Bedingung `alter >= mindestalter_achterbahn` (also `10 >= 12`) ist `False`.
    3.  Da die Bedingung `False` ist, wird der Code im `if`-Block übersprungen und stattdessen der Code im `else`-Block ausgeführt.

**Stell dir vor, der Besucher wäre 14:**
Dann wäre `14 >= 12` wahr (`True`), und es würde "👍 Viel Spaß auf der Achterbahn!" ausgegeben werden. Der `else`-Block würde übersprungen.

## 🧐 `if-elif-else`: Viele Möglichkeiten prüfen

Manchmal haben wir mehr als nur zwei Möglichkeiten. Stell dir vor, du programmierst eine Benotung für einen Test:
*   90 Punkte oder mehr: Note 1 🥇
*   80-89 Punkte: Note 2 🥈
*   70-79 Punkte: Note 3 🥉
*   Weniger als 70 Punkte: Note 4 (oder schlechter) 😥

Hier brauchen wir `if-elif-else`. `elif` ist die Abkürzung für "else if" und erlaubt uns, weitere Bedingungen zu prüfen, falls die vorherigen `if`- oder `elif`-Bedingungen `False` waren.

**Syntax:**

```python
if BEDINGUNG_1:
    # Code für BEDINGUNG_1 ist True
elif BEDINGUNG_2:
    # Code für BEDINGUNG_1 ist False, ABER BEDINGUNG_2 ist True
elif BEDINGUNG_3:
    # Code für BEDINGUNG_1 und BEDINGUNG_2 sind False, ABER BEDINGUNG_3 ist True
else:
    # Code, wenn ALLE vorherigen Bedingungen False waren
```
Du kannst so viele `elif`-Blöcke haben, wie du brauchst. Der `else`-Block am Ende ist optional, aber oft nützlich, um alle anderen Fälle abzudecken.

**Beispiel: Noten-Roboter** 🤖📝

```python
punkte = 75 # Erreichte Punktzahl im Test

if punkte >= 90:
    note = "Note 1 🥇 - Sehr gut!"
elif punkte >= 80: # Wird nur geprüft, wenn punkte < 90
    note = "Note 2 🥈 - Gut!"
elif punkte >= 70: # Wird nur geprüft, wenn punkte < 80
    note = "Note 3 🥉 - Befriedigend!"
elif punkte >= 60: # Wird nur geprüft, wenn punkte < 70
    note = "Note 4 👍 - Ausreichend!"
else: # Wird nur geprüft, wenn punkte < 60
    note = "Note 5 👎 - Nicht bestanden."

print(f"Deine Punktzahl: {punkte}")
print(f"Deine Note: {note}")
```

*   **Wie funktioniert's?**
    1.  `punkte` ist 75.
    2.  `punkte >= 90` (75 >= 90) ist `False`.
    3.  Nächste Bedingung: `punkte >= 80` (75 >= 80) ist `False`.
    4.  Nächste Bedingung: `punkte >= 70` (75 >= 70) ist `True`!
    5.  Der Code im `elif punkte >= 70:`-Block wird ausgeführt: `note` wird zu "Note 3 🥉 - Befriedigend!".
    6.  Alle weiteren `elif`- und der `else`-Block werden übersprungen, da eine passende Bedingung gefunden wurde.

**Wichtig:** Die Reihenfolge der `elif`-Bedingungen ist entscheidend! Python prüft sie von oben nach unten und führt den Code des ersten `True`-Blocks aus.

## 🔗 Logische Operatoren: Bedingungen verknüpfen

Manchmal hängt eine Entscheidung von mehreren Bedingungen gleichzeitig ab.
*   Du darfst ins Kino, **wenn** du deine Hausaufgaben gemacht hast **und** dein Zimmer aufgeräumt ist. (Beides muss wahr sein)
*   Du bekommst ein Eis, **wenn** es warm ist **oder** du besonders brav warst. (Mindestens eines muss wahr sein)
*   Du darfst **nicht** fernsehen, **wenn** du deine Hausaufgaben **nicht** gemacht hast. (Eine Bedingung wird umgekehrt)

Dafür gibt es logische Operatoren: `and`, `or`, `not`.

### `and` (UND)
Die `and`-Bedingung ist nur `True`, wenn **beide** Teilbedingungen `True` sind.

| Bedingung A | Bedingung B | A `and` B |
| :---------- | :---------- | :-------- |
| `True`      | `True`      | `True`    |
| `True`      | `False`     | `False`   |
| `False`     | `True`      | `False`   |
| `False`     | `False`     | `False`   |

**Beispiel: Zugang zum geheimen Clubhaus** 🤫🏡

```python
alter = 12
hat_passwort = True # Angenommen, der Benutzer hat das Passwort

if alter >= 10 and hat_passwort == True:
    print("Willkommen im geheimen Clubhaus!")
else:
    print("Zugang verweigert!")
```
Hier muss das `alter` mindestens 10 sein **UND** `hat_passwort` muss `True` sein, damit man reinkommt.

### `or` (ODER)
Die `or`-Bedingung ist `True`, wenn **mindestens eine** der Teilbedingungen `True` ist.

| Bedingung A | Bedingung B | A `or` B |
| :---------- | :---------- | :------- |
| `True`      | `True`      | `True`   |
| `True`      | `False`     | `True`   |
| `False`     | `True`      | `True`   |
| `False`     | `False`     | `False`  |

**Beispiel: Rabatt im Online-Shop** 🛒💸

```python
ist_neukunde = False
hat_gutscheincode = True

if ist_neukunde == True or hat_gutscheincode == True:
    print("Du erhältst 10% Rabatt auf deinen Einkauf!")
else:
    print("Leider kein Rabatt für dich heute.")
```
Hier gibt es Rabatt, wenn man entweder `ist_neukunde` ist **ODER** einen `hat_gutscheincode`.

### `not` (NICHT)
Der `not`-Operator kehrt den Wahrheitswert einer Bedingung um. Aus `True` wird `False` und aus `False` wird `True`.

| Bedingung A | `not` A |
| :---------- | :------ |
| `True`      | `False` |
| `False`     | `True`  |

**Beispiel: Spiel fortsetzen?** 🎮

```python
game_over = False

if not game_over: # Das Gleiche wie: if game_over == False:
    print("Das Spiel geht weiter! Nächstes Level...")
else:
    print("Game Over! Dein Punktestand ist ...")
```

Man kann logische Operatoren auch kombinieren und Klammern `()` verwenden, um die Reihenfolge der Auswertung zu steuern, genau wie in der Mathematik.
Beispiel: `if (alter > 18 or hat_eltern_erlaubnis) and hat_ticket:`

##  nesting_dolls Nested `if`-Statements: Verschachtelte Bedingungen

Manchmal möchte man eine weitere Entscheidung treffen, *nachdem* bereits eine erste Bedingung geprüft wurde. Das nennt man verschachtelte `if`-Anweisungen.

**Beispiel: Passwort-Check mit Sicherheitsfrage** 🔐❓

```python
benutzername_korrekt = True # Angenommen, der Benutzername war richtig
passwort_korrekt = False    # Angenommen, das Passwort war falsch
sicherheitsfrage_beantwortet = True # Angenommen, die Sicherheitsfrage wurde richtig beantwortet

if benutzername_korrekt:
    print("Benutzername OK.")
    if passwort_korrekt:
        print("Login erfolgreich! Willkommen zurück.")
    else:
        print("Passwort falsch!")
        if sicherheitsfrage_beantwortet:
            print("Sicherheitsfrage richtig beantwortet. Du darfst dein Passwort zurücksetzen.")
        else:
            print("Sicherheitsfrage falsch. Zugang gesperrt.")
else:
    print("Benutzername nicht gefunden.")
```

*   **Was passiert hier?**
    1.  Die äußere `if`-Bedingung `benutzername_korrekt` wird geprüft. Sie ist `True`.
    2.  Der Code im äußeren `if`-Block wird ausgeführt.
    3.  Darin befindet sich eine weitere `if`-Anweisung (`if passwort_korrekt`). Diese ist `False`.
    4.  Also wird der `else`-Teil dieser inneren `if`-Anweisung ausgeführt ("Passwort falsch!").
    5.  Darin ist *noch eine* `if`-Anweisung (`if sicherheitsfrage_beantwortet`). Diese ist `True`.
    6.  Also wird "Sicherheitsfrage richtig beantwortet..." ausgegeben.

Verschachtelte `if`-Anweisungen können schnell unübersichtlich werden. Versuche, sie nicht zu tief zu verschachteln, wenn es nicht unbedingt nötig ist. Manchmal kann man sie auch mit `and` oder `or` vereinfachen.

## ⚠️ Häufige Fehler und wie man sie vermeidet

1.  **`=` statt `==` beim Vergleichen:**
    *   **Falsch:** `if alter = 18:` (Das ist eine Zuweisung, kein Vergleich, und führt zu einem Fehler!)
    *   **Richtig:** `if alter == 18:`

2.  **Fehlende Doppelpunkte `:`:**
    *   **Falsch:** `if alter > 18`
    *   **Richtig:** `if alter > 18:` (Der Doppelpunkt am Ende der `if`, `elif`, `else` Zeile ist Pflicht!)

3.  **Falsche Einrückung (IndentationError):**
    *   **Falsch:**
        ```python
        if wetter == "sonnig":
        print("Geh raus spielen!") # Nicht oder falsch eingerückt
        ```
    *   **Richtig:**
        ```python
        if wetter == "sonnig":
            print("Geh raus spielen!") # Korrekt mit 4 Leerzeichen eingerückt
        ```
    Python ist da sehr streng! Alle Zeilen, die zu einem `if`-, `elif`- oder `else`-Block gehören, müssen gleich weit eingerückt sein.

4.  **Groß- und Kleinschreibung bei Strings:**
    *   `"Ja"` ist nicht dasselbe wie `"ja"`.
    *   **Tipp:** Wandle Benutzereingaben oft in Kleinbuchstaben um, bevor du sie vergleichst: `antwort.lower() == "ja"`.

5.  **Reihenfolge bei `if-elif-else`:**
    *   Wenn du z.B. Alter prüfst, beginne mit der spezifischsten oder höchsten/niedrigsten Bedingung.
    *   **Ungünstig (Kind ist 10):**
        ```python
        alter = 10
        if alter >= 6:
            print("Schulkind")
        elif alter >= 10: # Diese Bedingung wird nie erreicht, wenn alter >= 10 auch >= 6 ist
            print("Mittelschule")
        ```
    *   **Besser (Kind ist 10):**
        ```python
        alter = 10
        if alter >= 10:
            print("Mittelschule")
        elif alter >= 6:
            print("Grundschulkind")
        ```

## 🚀 Übungsaufgaben

Jetzt bist du dran! Versuche, diese kleinen Programme zu schreiben:

1.  **Alters-Checker:**
    *   Frage den Benutzer nach seinem Alter.
    *   Wenn das Alter 18 oder größer ist, gib aus: "Du bist volljährig!"
    *   Sonst gib aus: "Du bist noch nicht volljährig."

2.  **Lieblingsfarbe:**
    *   Definiere eine Variable `meine_lieblingsfarbe = "blau"`.
    *   Frage den Benutzer nach seiner Lieblingsfarbe.
    *   Wenn seine Antwort deiner Lieblingsfarbe entspricht (egal ob groß oder klein geschrieben), gib aus: "Hey, das ist auch meine Lieblingsfarbe!"
    *   Sonst gib aus: "[Antwort des Benutzers] ist auch eine schöne Farbe!"

3.  **Zahlen-Rater (einfach):**
    *   Denk dir eine Zahl zwischen 1 und 5 aus und speichere sie in einer Variable `geheime_zahl`.
    *   Frage den Benutzer, eine Zahl zwischen 1 und 5 einzugeben.
    *   Wenn der Benutzer die Zahl errät, gib "Super, richtig geraten!" aus.
    *   Wenn der Benutzer eine zu kleine Zahl rät, gib "Leider falsch, meine Zahl ist größer." aus.
    *   Wenn der Benutzer eine zu große Zahl rät, gib "Leider falsch, meine Zahl ist kleiner." aus.

4.  **Ticketpreise im Zoo:** 🦁🐘🦒
    *   Kinder unter 3 Jahren: Eintritt frei.
    *   Kinder von 3 bis 12 Jahren: 5 Euro.
    *   Jugendliche von 13 bis 17 Jahren: 8 Euro.
    *   Erwachsene (ab 18 Jahren): 12 Euro.
    *   Schreibe ein Programm, das nach dem Alter des Besuchers fragt und den korrekten Preis ausgibt.

**Musterlösungen (versuche es erst selbst!):**

```python
# Aufgabe 1: Alters-Checker
# alter_eingabe = input("Wie alt bist du? ")
# alter = int(alter_eingabe)
# if alter >= 18:
#     print("Du bist volljährig!")
# else:
#     print("Du bist noch nicht volljährig.")

# Aufgabe 2: Lieblingsfarbe
# meine_lieblingsfarbe = "blau"
# benutzer_farbe = input("Was ist deine Lieblingsfarbe? ")
# if benutzer_farbe.lower() == meine_lieblingsfarbe:
#     print("Hey, das ist auch meine Lieblingsfarbe!")
# else:
#     print(f"{benutzer_farbe} ist auch eine schöne Farbe!")

# Aufgabe 3: Zahlen-Rater
# geheime_zahl = 4
# geratene_zahl_eingabe = input("Rate eine Zahl zwischen 1 und 5: ")
# geratene_zahl = int(geratene_zahl_eingabe)
# if geratene_zahl == geheime_zahl:
#     print("Super, richtig geraten!")
# elif geratene_zahl < geheime_zahl:
#     print("Leider falsch, meine Zahl ist größer.")
# else: # geratene_zahl > geheime_zahl
#     print("Leider falsch, meine Zahl ist kleiner.")

# Aufgabe 4: Ticketpreise Zoo
# alter_zoo_eingabe = input("Wie alt ist der Zoobesucher? ")
# alter_zoo = int(alter_zoo_eingabe)
# preis = 0
# if alter_zoo < 3:
#     preis = 0
#     print("Eintritt frei!")
# elif alter_zoo <= 12: # 3 bis 12
#     preis = 5
#     print(f"Der Eintritt kostet {preis} Euro.")
# elif alter_zoo <= 17: # 13 bis 17
#     preis = 8
#     print(f"Der Eintritt kostet {preis} Euro.")
# else: # ab 18
#     preis = 12
#     print(f"Der Eintritt kostet {preis} Euro.")
```

## ⏭️ Ausblick: Was kommt als Nächstes?

Super gemacht! Du hast gelernt, wie dein Python-Programm Entscheidungen treffen kann. Das ist ein riesiger Schritt beim Programmieren!

Manchmal wollen wir aber, dass ein Programm bestimmte Dinge nicht nur einmal, sondern mehrmals hintereinander tut. Stell dir vor, du willst 100 E-Mails verschicken oder jeden Schüler in einer Liste begrüßen. Das wäre ganz schön viel Tipparbeit mit `if`-Anweisungen!

Genau dafür gibt es **Schleifen**! Mit Schleifen können wir Codeblöcke wiederholt ausführen lassen. Und das ist das Thema unseres nächsten Kapitels!

[⬅️ Zurück zu Kapitel 2 Übersicht](Kapitel_2.md) | [🏠 Zurück zur Startseite](/python-docs/index.md) | [Weiter zu Schleifen 🔁](Schleifen.md)
