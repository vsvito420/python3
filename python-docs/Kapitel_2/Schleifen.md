# 🔁 Schleifen in Python: Die Kunst der Wiederholung

[⬅️ Bedingte Anweisungen](Bedingte_Anweisungen.md) | [Kapitelübersicht](/python-docs/Kapitel_2/index.md) | [Datenstrukturen (Listen) ➡️](/python-docs/Kapitel_3/Listen.md)

Stell dir vor, du müsstest deinem Roboterfreund sagen, er soll 100 Mal "Hallo" sagen. Wäre es nicht mühsam, 100 Mal den Befehl "Sag Hallo" aufzuschreiben? Genau hier kommen Schleifen ins Spiel! Schleifen sind wie magische Werkzeuge in Python, die es uns ermöglichen, Code-Blöcke immer wieder auszuführen, ohne sie ständig neu schreiben zu müssen. Das spart nicht nur Zeit, sondern macht unseren Code auch viel übersichtlicher und mächtiger.

## 🤔 Warum sind Schleifen so wichtig?

Schleifen sind ein fundamentaler Bestandteil fast jeder Programmiersprache. Sie erlauben es uns:

*   **Aufgaben zu automatisieren**: Wiederkehrende Aufgaben, wie das Bearbeiten jedes Elements in einer Liste oder das Einlesen von Benutzereingaben, bis eine bestimmte Bedingung erfüllt ist.
*   **Mit Datenmengen zu arbeiten**: Stell dir vor, du hast eine Liste mit tausend Namen und möchtest jeden Namen ausgeben. Ohne Schleifen wäre das eine endlose Tipparbeit!
*   **Spiele und Animationen zu erstellen**: Bewegungen, wiederholte Aktionen von Charakteren – all das wird oft mit Schleifen realisiert.
*   **Muster zu erzeugen**: Von einfachen Textmustern bis hin zu komplexen grafischen Darstellungen.

**Verbindung zu bedingten Anweisungen:** Schleifen und bedingte Anweisungen ([`if`](python-docs/Kapitel_2/Bedingte_Anweisungen.md:1), [`elif`](python-docs/Kapitel_2/Bedingte_Anweisungen.md:1), [`else`](python-docs/Kapitel_2/Bedingte_Anweisungen.md:1)) arbeiten oft Hand in Hand. Innerhalb einer Schleife kannst du Bedingungen prüfen, um zu entscheiden, ob ein bestimmter Teil des Codes ausgeführt werden soll oder ob die Schleife vielleicht sogar vorzeitig beendet werden muss.

##  analogy Alltagsanalogien für Schleifen

Das Konzept von Schleifen ist uns im Alltag bestens vertraut:

*   **Zähneputzen 🦷**: Du wiederholst die Putzbewegung für eine bestimmte Zeit oder bis deine Zähne sauber sind.
*   **Treppensteigen 🚶‍♀️**: Du wiederholst die Aktion "eine Stufe nehmen", bis du oben angekommen bist.
*   **Ein Lied hören 🎶**: Du hörst dein Lieblingslied vielleicht mehrmals hintereinander (in einer Schleife!).
*   **Geschirr spülen 🍽️**: Du nimmst ein schmutziges Teil, spülst es, stellst es weg – und wiederholst das, bis kein schmutziges Geschirr mehr da ist.

Python kennt hauptsächlich zwei Arten von Schleifen: die `for`-Schleife und die `while`-Schleife.

## 🔢 Die `for`-Schleife: Für eine bekannte Anzahl von Wiederholungen

Die `for`-Schleife ist perfekt, wenn du vorher weißt, wie oft du etwas wiederholen möchtest oder wenn du über jedes Element einer Sequenz (wie einer Liste oder einem Text) gehen willst.

**Die Grundidee:** "Für jedes Element in dieser Sammlung, mache folgendes..."

### Syntax und Einrückung bei `for`-Schleifen

Die allgemeine Syntax sieht so aus:

```python
for variable in sequenz:
    # Code-Block, der wiederholt wird
    # Dieser Code MUSS eingerückt sein!
    print(variable) # Beispiel
```

*   `for`: Das Schlüsselwort, das die Schleife einleitet.
*   `variable`: Ein Name, den du wählst. In jedem Durchlauf der Schleife nimmt diese Variable den Wert des aktuellen Elements aus der `sequenz` an.
*   `in`: Ein weiteres Schlüsselwort.
*   `sequenz`: Etwas, das mehrere Elemente enthält, z.B. eine Liste von Zahlen, eine Liste von Namen oder ein Text (String).
*   Doppelpunkt `:`: Markiert das Ende der `for`-Zeile.
*   **Einrückung (Indentation)**: Super wichtig! Alle Code-Zeilen, die zur Schleife gehören und wiederholt werden sollen, müssen gleichmäßig eingerückt sein (üblicherweise mit 4 Leerzeichen). Python erkennt so, was Teil der Schleife ist.

### `for`-Schleifen mit `range()`

Oft möchten wir einen Code-Block einfach eine bestimmte Anzahl von Malen ausführen. Dafür ist die [`range()`](https://docs.python.org/3/library/functions.html#func-range)-Funktion ideal. Sie erzeugt eine Sequenz von Zahlen.

**Beispiel 1: Zählen von 0 bis 4**

```python
for zahl in range(5):  # range(5) erzeugt Zahlen von 0, 1, 2, 3, 4
    print(zahl)
```

**Ausgabe:**

```
0
1
2
3
4
```

**Beispiel 2: Sterne ✨ zeichnen**

```python
anzahl_sterne = int(input("Wie viele Sterne möchtest du sehen? "))
for i in range(anzahl_sterne):
    print("✨")
```

Wenn du `3` eingibst, ist die Ausgabe:

```
✨
✨
✨
```

*   `range(stop)`: Erzeugt Zahlen von 0 bis `stop-1`.
*   `range(start, stop)`: Erzeugt Zahlen von `start` bis `stop-1`.
*   `range(start, stop, step)`: Erzeugt Zahlen von `start` bis `stop-1`, aber in `step`-Schritten.

```python
print("Zahlen von 2 bis 7:")
for i in range(2, 8): # 2, 3, 4, 5, 6, 7
    print(i)

print("\nJede zweite Zahl von 1 bis 10:")
for i in range(1, 11, 2): # 1, 3, 5, 7, 9
    print(i)
```

### `for`-Schleifen mit Listen 📜

Du kannst sehr elegant durch die Elemente einer Liste gehen:

**Beispiel: Freunde begrüßen**

```python
freunde = ["Anna", "Ben", "Lena", "Max"]
for freund in freunde:
    print(f"Hallo, {freund}! Schön, dich zu sehen. 👋")
```

**Ausgabe:**

```
Hallo, Anna! Schön, dich zu sehen. 👋
Hallo, Ben! Schön, dich zu sehen. 👋
Hallo, Lena! Schön, dich zu sehen. 👋
Hallo, Max! Schön, dich zu sehen. 👋
```
Die Variable `freund` nimmt nacheinander die Werte "Anna", "Ben", "Lena" und "Max" an.

### `for`-Schleifen mit Strings (Text) 🔤

Auch durch die einzelnen Buchstaben eines Textes kannst du iterieren (gehen):

**Beispiel: Buchstaben eines Wortes zählen**

```python
wort = "Python"
anzahl_buchstaben = 0
for buchstabe in wort:
    print(f"Aktueller Buchstabe: {buchstabe}")
    anzahl_buchstaben = anzahl_buchstaben + 1 # oder anzahl_buchstaben += 1

print(f"Das Wort '{wort}' hat {anzahl_buchstaben} Buchstaben.")
```

**Ausgabe:**

```
Aktueller Buchstabe: P
Aktueller Buchstabe: y
Aktueller Buchstabe: t
Aktueller Buchstabe: h
Aktueller Buchstabe: o
Aktueller Buchstabe: n
Das Wort 'Python' hat 6 Buchstaben.
```

## ⏳ Die `while`-Schleife: Solange eine Bedingung wahr ist

Die `while`-Schleife ist dann praktisch, wenn du nicht genau weißt, wie oft der Code wiederholt werden soll, sondern solange, bis eine bestimmte Bedingung `False` (falsch) wird.

**Die Grundidee:** "Solange diese Bedingung wahr ist, mache folgendes..."

### Syntax und Einrückung bei `while`-Schleifen

```python
while bedingung:
    # Code-Block, der wiederholt wird
    # Dieser Code MUSS eingerückt sein!
    # WICHTIG: Innerhalb der Schleife muss etwas passieren,
    # damit die 'bedingung' irgendwann False wird!
    print("Die Schleife läuft...")
```

*   `while`: Das Schlüsselwort, das die Schleife einleitet.
*   `bedingung`: Ein Ausdruck, der entweder `True` (wahr) oder `False` (falsch) ergibt (z.B. `zahl < 10`, `antwort != "ende"`).
*   Doppelpunkt `:`: Markiert das Ende der `while`-Zeile.
*   **Einrückung**: Genau wie bei der `for`-Schleife muss der Code-Block, der wiederholt werden soll, eingerückt sein.

**Ganz wichtig bei `while`-Schleifen:** Du musst sicherstellen, dass die Bedingung irgendwann `False` wird, sonst hast du eine **Endlosschleife** erzeugt, und dein Programm hängt fest! (Mehr dazu später).

**Beispiel 1: Countdown zum Raketenstart 🚀**

```python
countdown = 5
while countdown > 0:
    print(f"{countdown}...")
    countdown = countdown - 1 # Wichtig: Variable verändern!
print("Zündung! 🚀")
```

**Ausgabe:**

```
5...
4...
3...
2...
1...
Zündung! 🚀
```
Hier wird `countdown` in jedem Durchlauf um 1 verringert. Sobald `countdown` nicht mehr größer als 0 ist (also 0 wird), ist die Bedingung `countdown > 0` falsch und die Schleife endet.

**Beispiel 2: Passwort-Abfrage (vereinfacht)**

```python
passwort_eingabe = ""
richtiges_passwort = "Geheim123"

while passwort_eingabe != richtiges_passwort:
    passwort_eingabe = input("Bitte gib das Passwort ein: ")
    if passwort_eingabe == richtiges_passwort:
        print("Zugriff gewährt! ✅")
    else:
        print("Falsches Passwort. Versuche es erneut. ❌")
```
Diese Schleife läuft so lange, bis der Benutzer das richtige Passwort eingibt.

## 🚦 Schleifenkontrolle: `break` und `continue`

Manchmal möchten wir eine Schleife vorzeitig verlassen oder den aktuellen Durchlauf überspringen und mit dem nächsten weitermachen. Dafür gibt es `break` und `continue`.

### `break`: Die Schleife sofort verlassen 🛑

Wenn Python auf ein `break` in einer Schleife trifft, wird die Schleife sofort beendet, egal ob die Schleifenbedingung (bei `while`) noch wahr wäre oder ob es noch Elemente (bei `for`) gäbe. Der Code nach der Schleife wird dann ausgeführt.

**Beispiel: Zahlen suchen und bei Fund stoppen**

```python
zahlen_liste = [1, 5, 12, 7, 25, 10, 8]
gesuchte_zahl = 7
gefunden = False

for zahl in zahlen_liste:
    print(f"Prüfe: {zahl}")
    if zahl == gesuchte_zahl:
        print(f"{gesuchte_zahl} gefunden! 🎉")
        gefunden = True
        break  # Schleife hier verlassen
    print("...nicht die gesuchte Zahl.")

if not gefunden: # 'not gefunden' ist dasselbe wie 'gefunden == False'
    print(f"{gesuchte_zahl} nicht in der Liste.")

print("Nach der Schleife.")
```

**Ausgabe:**

```
Prüfe: 1
...nicht die gesuchte Zahl.
Prüfe: 5
...nicht die gesuchte Zahl.
Prüfe: 12
...nicht die gesuchte Zahl.
Prüfe: 7
7 gefunden! 🎉
Nach der Schleife.
```
Sobald die `7` gefunden wird, sorgt `break` dafür, dass die Zahlen `25`, `10` und `8` gar nicht mehr geprüft werden.

### `continue`: Den aktuellen Durchlauf überspringen ⏭️

Wenn Python auf `continue` trifft, wird der Rest des Codes *innerhalb des aktuellen Schleifendurchlaufs* übersprungen, und die Schleife beginnt sofort mit dem nächsten Durchlauf (falls es einen gibt).

**Beispiel: Nur gerade Zahlen ausgeben**

```python
for i in range(1, 11): # Zahlen von 1 bis 10
    if i % 2 != 0:  # Wenn i nicht durch 2 teilbar ist (ungerade)
        continue    # Überspringe den Rest des Codes für diese ungerade Zahl
    print(f"Gerade Zahl gefunden: {i}")
```

**Ausgabe:**

```
Gerade Zahl gefunden: 2
Gerade Zahl gefunden: 4
Gerade Zahl gefunden: 6
Gerade Zahl gefunden: 8
Gerade Zahl gefunden: 10
```
Wenn `i` ungerade ist, wird `continue` ausgeführt. Das `print()` wird dann für diese ungerade Zahl übersprungen, und die Schleife geht zum nächsten `i`.

## 🌀 Unendliche Schleifen: Die Falle!

Eine unendliche Schleife ist eine Schleife, deren Bedingung *niemals* `False` wird (bei `while`-Schleifen) oder die einfach kein Ende findet. Das Programm bleibt dann in dieser Schleife "hängen" und führt nichts anderes mehr aus.

**Beispiel einer (absichtlichen) unendlichen `while`-Schleife:**

```python
# VORSICHT: Dieser Code erzeugt eine Endlosschleife!
# Du musst das Programm manuell stoppen (oft mit Strg+C oder Cmd+C im Terminal).
# while True:
# print("Ich laufe und laufe und laufe...")
```

**Wie vermeidet man unendliche Schleifen?**

*   **Bei `while`-Schleifen:** Stelle sicher, dass sich innerhalb der Schleife etwas ändert, das die Bedingung irgendwann `False` werden lässt. Meistens ist das eine Variable, die du zählst oder veränderst.
    ```python
    # Falsch (potenziell unendlich, wenn x nicht negativ startet)
    # x = 0
    # while x < 5:
    #     print(x)
    #     # x wird nicht verändert!

    # Richtig
    x = 0
    while x < 5:
        print(x)
        x += 1 # x wird bei jedem Durchlauf erhöht
    ```
*   **Logik prüfen:** Überlege genau, ob deine Bedingung wirklich jemals `False` werden kann.

Wenn dein Programm scheinbar nichts mehr tut oder immer wieder dasselbe ausgibt, könntest du in einer Endlosschleife gefangen sein!

## 🎮 Praktische Beispiele für Schleifen

Schleifen sind super nützlich für alle möglichen Dinge!

**Beispiel 1: Kleines Ratespiel 🎲**

```python
import random # Modul für Zufallszahlen

geheimzahl = random.randint(1, 20) # Zufallszahl zwischen 1 und 20
versuche = 0
geraten = False

print("Rate meine Zahl zwischen 1 und 20! Du hast 5 Versuche.")

while versuche < 5 and not geraten:
    tipp = int(input(f"Versuch {versuche + 1}: Dein Tipp? "))
    versuche += 1

    if tipp == geheimzahl:
        print(f"Richtig! 🎉 Du hast die Zahl {geheimzahl} in {versuche} Versuchen erraten.")
        geraten = True
    elif tipp < geheimzahl:
        print("Zu niedrig! 📉")
    else:
        print("Zu hoch! 📈")

if not geraten:
    print(f"Schade! Du hast es nicht geschafft. Die Zahl war {geheimzahl}. 😔")
```

**Beispiel 2: Einkaufsliste abarbeiten 🛒**

```python
einkaufsliste = ["Äpfel 🍎", "Bananen 🍌", "Milch 🥛", "Brot 🍞"]
print("Meine Einkaufsliste:")
for item_index in range(len(einkaufsliste)): # len() gibt die Länge der Liste
    print(f"{item_index + 1}. {einkaufsliste[item_index]}")

print("\nEinkauf erledigt!")
```
Hier verwenden wir `range(len(einkaufsliste))`, um einen Index für jedes Element zu bekommen und eine nummerierte Liste auszugeben.

##  nested Verschachtelte Schleifen: Schleifen in Schleifen

Du kannst Schleifen auch ineinander "verschachteln". Das bedeutet, eine Schleife befindet sich im Code-Block einer anderen, äußeren Schleife.

**Die Grundidee:** Für jeden Durchlauf der äußeren Schleife wird die innere Schleife komplett einmal durchlaufen.

**Beispiel: Das kleine Einmaleins ✖️**

```python
for i in range(1, 4):  # Äußere Schleife (für die Reihen 1er, 2er, 3er)
    print(f"\n--- {i}er Reihe ---")
    for j in range(1, 11): # Innere Schleife (für die Zahlen 1 bis 10)
        print(f"{i} x {j} = {i * j}")
```

**Ausgabe (Ausschnitt):**

```
--- 1er Reihe ---
1 x 1 = 1
1 x 2 = 2
...
1 x 10 = 10

--- 2er Reihe ---
2 x 1 = 2
2 x 2 = 4
...
2 x 10 = 20

--- 3er Reihe ---
3 x 1 = 3
3 x 2 = 6
...
3 x 10 = 30
```
Die äußere Schleife mit `i` läuft 3-mal. Für jedes `i` läuft die innere Schleife mit `j` 10-mal.

Verschachtelte Schleifen sind nützlich für Dinge wie das Arbeiten mit Rastern (Tabellen, Schachbretter), das Erzeugen komplexer Muster oder wenn du Kombinationen von Elementen brauchst.

## 🤯 Häufige Fehler und deren Vermeidung

1.  **Vergessene Einrückung**:
    *   **Fehler**: Der Code, der zur Schleife gehört, ist nicht (korrekt) eingerückt.
    *   **Folge**: `IndentationError` oder die Schleife tut nicht, was sie soll.
    *   **Lösung**: Achte IMMER auf die korrekte, konsistente Einrückung (4 Leerzeichen sind Standard).

2.  **Vergessener Doppelpunkt `:`**:
    *   **Fehler**: Am Ende der `for`- oder `while`-Zeile fehlt der Doppelpunkt.
    *   **Folge**: `SyntaxError`.
    *   **Lösung**: Doppelpunkt nicht vergessen!

3.  **Endlosschleifen bei `while`**:
    *   **Fehler**: Die Bedingung der `while`-Schleife wird nie `False`.
    *   **Folge**: Das Programm hängt.
    *   **Lösung**: Stelle sicher, dass sich eine Variable in der Bedingung innerhalb der Schleife so ändert, dass die Bedingung irgendwann `False` wird.

4.  **`range()` falsch verstanden**:
    *   **Fehler**: `range(5)` geht bis 5 statt bis 4.
    *   **Folge**: Die Schleife läuft einmal zu oft oder zu selten.
    *   **Lösung**: Denke daran, dass `range(n)` Zahlen von `0` bis `n-1` erzeugt. Wenn du bis `n` gehen willst, brauchst du `range(n+1)`.

5.  **Off-by-One-Fehler**:
    *   **Fehler**: Die Schleife läuft einmal zu oft oder einmal zu wenig.
    *   **Folge**: Falsche Ergebnisse, besonders beim Zugriff auf Listenelemente.
    *   **Lösung**: Überprüfe deine Start-, Stopp- und Schrittwerte bei `range()` genau. Teste mit kleinen Beispielen.

## ✍️ Übungsaufgaben

1.  **Lieblingsessen-Countdown**:
    *   Schreibe eine `for`-Schleife, die von 5 rückwärts bis 1 zählt und bei jeder Zahl ausgibt: "Noch X Sekunden bis zum Essen!". Nach der Schleife soll "Mahlzeit! 🍕" ausgegeben werden.
2.  **Namenslängen**:
    *   Erstelle eine Liste mit 3-4 Namen deiner Freunde.
    *   Schreibe eine `for`-Schleife, die jeden Namen aus der Liste nimmt und ausgibt: "[Name] hat Y Buchstaben." (ersetze Y durch die tatsächliche Länge des Namens). Tipp: [`len()`](https://docs.python.org/3/library/functions.html#len) funktioniert auch bei Strings!
3.  **Summenspiel**:
    *   Schreibe eine `while`-Schleife, die den Benutzer immer wieder nach einer Zahl fragt.
    *   Addiere jede eingegebene Zahl zu einer Gesamtsumme.
    *   Wenn der Benutzer `0` eingibt, soll die Schleife enden und die Gesamtsumme ausgegeben werden.
4.  **Sternenmuster (mit verschachtelten Schleifen)**:
    *   Versuche, mit verschachtelten `for`-Schleifen folgendes Muster auszugeben:
        ```
        *
        **
        ***
        ****
        *****
        ```
    *   Tipp: Die äußere Schleife könnte die Anzahl der Zeilen steuern, die innere die Anzahl der Sterne pro Zeile.

## 🚀 Und was kommt als Nächstes?

Super gemacht! Du hast jetzt ein starkes Werkzeug – die Schleifen – in deinem Python-Koffer. Damit kannst du schon richtig coole und nützliche Programme schreiben.

Im nächsten Kapitel tauchen wir tiefer in ein Thema ein, das wir schon kurz bei den `for`-Schleifen kennengelernt haben: **Datenstrukturen**, beginnend mit [Listen](/python-docs/Kapitel_3/Listen.md). Du wirst lernen, wie du Daten noch besser organisieren und damit arbeiten kannst.

[⬅️ Bedingte Anweisungen](Bedingte_Anweisungen.md) | [Kapitelübersicht](/python-docs/Kapitel_2/index.md) | [Datenstrukturen (Listen) ➡️](/python-docs/Kapitel_3/Listen.md)
