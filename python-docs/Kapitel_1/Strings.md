# 🧵 Strings in Python: Deine Text-Zauberkiste! 🧵

[Zurück zum Inhaltsverzeichnis von Kapitel 1](index.md) | [Nächstes Thema: Operatoren](Operatoren.md)

Hallo junge Programmier-Genies! 👋 Stellt euch vor, ihr wolltet eurem Computer sagen, wie ihr heißt, was euer Lieblingsspiel ist oder eine geheime Nachricht an eure Freunde schicken. Genau dafür brauchen wir **Strings**!

---

## 🎯 Was sind Strings eigentlich? Und warum sind sie so wichtig?

Stell dir Strings wie eine Kette aus Perlen vor, bei der jede Perle ein Zeichen ist. Ein Zeichen kann ein Buchstabe (wie A, b, C), eine Zahl (wie 1, 2, 3) oder ein Sonderzeichen (wie !, ?, &) sein. Aneinandergereiht ergeben diese Zeichen einen **Text**.

In Python sind Strings super wichtig, weil Computer ständig mit Text arbeiten:
*   Benutzernamen und Passwörter
*   Nachrichten in Chats oder Spielen
*   Texte auf Webseiten
*   Anweisungen, die dein Programm ausgibt

Kurz gesagt: Ohne Strings könnten wir uns kaum mit Computern verständigen!

Ein ganz wichtiger Punkt bei Strings in Python ist: Sie sind **unveränderlich** (das englische Wort dafür ist "immutable"). Das klingt erstmal komisch, bedeutet aber nur: Wenn du einen String einmal erstellt hast, kannst du einzelne Buchstaben darin nicht direkt austauschen, so wie du vielleicht einen Legostein in einem fertigen Bauwerk austauschen würdest. Aber keine Sorge! Du kannst immer einen *neuen* String erstellen, der deine Änderungen enthält. Das ist so, als würdest du dein Legomodell einfach neu bauen, aber mit dem geänderten Stein. Wir schauen uns das später genauer an!

---

## 🛠️ Wie erstelle ich einen String? Die drei magischen Wege!

In Python gibt es verschiedene Möglichkeiten, einen String zu "zaubern":

### 1. Einfache Anführungszeichen (`'`)
Perfekt für kurze Texte oder einzelne Wörter.
```python
mein_name = 'Alex'
lieblingsfarbe = 'Blau'
print(mein_name)
print(lieblingsfarbe)
```

### 2. Doppelte Anführungszeichen (`"`)
Funktionieren genauso wie einfache Anführungszeichen. Du kannst die nehmen, die dir besser gefallen!
```python
haustier_name = "Bello"
lieblingsessen = "Pizza"
print(haustier_name)
print(lieblingsessen)
```
💡 **Profi-Tipp:** Manchmal möchtest du vielleicht ein Anführungszeichen *innerhalb* deines Strings verwenden. Wenn dein String in doppelten Anführungszeichen steht, kannst du problemlos einfache Anführungszeichen innen verwenden und umgekehrt:
```python
satz1 = "Er sagte: 'Hallo!'"
satz2 = 'Sie antwortete: "Wie geht es dir?"'
print(satz1)
print(satz2)
```

### 3. Dreifache Anführungszeichen (`"""` oder `'''`)
Diese sind super für längere Texte, die über mehrere Zeilen gehen – wie ein Gedicht oder eine längere Erklärung.
```python
geschichte = """Es war einmal ein kleiner Roboter.
Er liebte es, neue Planeten zu entdecken
und Code-Rätsel zu lösen."""

anleitung = '''Schritt 1: Öffne das Spiel.
Schritt 2: Wähle deinen Charakter.
Schritt 3: Beginne das Abenteuer!'''

print(geschichte)
print(anleitung)
```

---

## 🔍 Zugriff auf Teile eines Strings: Die Lupe für deinen Text!

Stell dir vor, dein String ist eine Reihe von nummerierten Boxen, und in jeder Box ist ein Zeichen. Python fängt beim Zählen dieser Boxen immer bei **Null** an! Das ist superwichtig und nennt sich **0-basierte Indizierung**.

`H a l l o`
`0 1 2 3 4` ← Das sind die **Indizes** (Einzahl: Index)

### Einzelne Zeichen herausholen (Indexing)
Du kannst mit eckigen Klammern `[]` und dem Index auf einzelne Zeichen zugreifen:
```python
wort = "Python"
#       P y t h o n
# Index 0 1 2 3 4 5

erster_buchstabe = wort[0]  # Gibt 'P'
dritter_buchstabe = wort[2] # Gibt 't'

print(f"Der erste Buchstabe von '{wort}' ist: {erster_buchstabe}")
print(f"Der dritte Buchstabe von '{wort}' ist: {dritter_buchstabe}")
```

🤯 **Cooler Trick: Zählen von hinten!**
Du kannst auch negative Indizes verwenden, um vom Ende des Strings zu zählen:
*   `-1` ist das letzte Zeichen
*   `-2` ist das vorletzte Zeichen, und so weiter.

```python
wort = "Python"
#       P  y  t  h  o  n
# Index-6 -5 -4 -3 -2 -1 (von hinten gezählt)

letzter_buchstabe = wort[-1]  # Gibt 'n'
vorletzter_buchstabe = wort[-2] # Gibt 'o'

print(f"Der letzte Buchstabe von '{wort}' ist: {letzter_buchstabe}")
print(f"Der vorletzte Buchstabe von '{wort}' ist: {vorletzter_buchstabe}")
```

### Text-Abschnitte ausschneiden (Slicing) ✂️
Mit Slicing kannst du dir ganze Teile eines Strings herausschneiden. Die Syntax ist `string[start:ende]`.
Wichtig: Der `start`-Index ist dabei, der `ende`-Index ist *nicht* mehr dabei!

```python
superheld = "Batman"
#            B a t m a n
# Index      0 1 2 3 4 5

# Die ersten drei Buchstaben (Index 0, 1, 2)
anfang = superheld[0:3] # Gibt "Bat"
print(f"Anfang: {anfang}")

# Von Index 1 bis vor Index 4 (also Index 1, 2, 3)
mitte = superheld[1:4] # Gibt "atm"
print(f"Mitte: {mitte}")

# Kurzschreibweisen:
ersten_zwei = superheld[:2] # Von Anfang bis Index 1 (ergibt "Ba")
print(f"Ersten zwei: {ersten_zwei}")

letzten_drei = superheld[3:] # Von Index 3 bis zum Ende (ergibt "man")
print(f"Letzten drei: {letzten_drei}")

ganzer_string = superheld[:] # Eine Kopie des ganzen Strings
print(f"Ganze Kopie: {ganzer_string}")
```

Du kannst sogar eine **Schrittweite** angeben: `string[start:ende:schritt]`
```python
text = "Abenteuer"
#       A b e n t e u e r
# Index 0 1 2 3 4 5 6 7 8

jeder_zweite = text[0:9:2] # Gibt "Aenter" (A, e, n, t, e, r)
print(f"Jeder zweite Buchstabe: {jeder_zweite}")

# Super-Trick: String umdrehen!
umgedreht = text[::-1] # Gibt "reutnebA"
print(f"'{text}' umgedreht ist: {umgedreht}")
```

---

## ✨ String-Methoden: Deine Werkzeugkiste für Text!

Python hat viele eingebaute "Werkzeuge" (genannt **Methoden**), um Strings zu bearbeiten. Eine Methode rufst du auf, indem du hinter deinen String-Variablennamen einen Punkt `.` und dann den Methodennamen mit Klammern `()` schreibst. Manchmal kommen in die Klammern noch zusätzliche Infos (Argumente).

### Groß- und Kleinschreibung ändern 🅰️toLowerCase()🅰️
*   `string.upper()`: Macht ALLE Buchstaben GROSS.
    ```python
    fluesterpost = "psst, geheim!"
    gerufen = fluesterpost.upper() # Ergibt "PSST, GEHEIM!"
    print(gerufen)
    ```
*   `string.lower()`: Macht alle Buchstaben klein.
    ```python
    SCHREIHALS = "ACHTUNG! LAUT!"
    leise = SCHREIHALS.lower() # Ergibt "achtung! laut!"
    print(leise)
    ```
*   `string.capitalize()`: Macht nur den allerersten Buchstaben des Strings groß, den Rest klein.
    ```python
    satz = "hallo, wie geht es dir?"
    korrigiert = satz.capitalize() # Ergibt "Hallo, wie geht es dir?"
    print(korrigiert)
    ```
*   `string.title()`: Macht den ersten Buchstaben jedes Wortes groß (wie in einem Titel).
    ```python
    buch_titel = "die abenteuer des kleinen roboters"
    offiziell = buch_titel.title() # Ergibt "Die Abenteuer Des Kleinen Roboters"
    print(offiziell)
    ```

### Leerzeichen entfernen (Whitespace Stripping) 🧹
Manchmal haben Strings unsichtbare Leerzeichen am Anfang oder Ende, die stören können.
*   `string.strip()`: Entfernt Leerzeichen (und ähnliche Zeichen wie Tabs oder Zeilenumbrüche) am Anfang UND Ende.
    ```python
    benutzer_eingabe = "   Hallo Welt   "
    sauber = benutzer_eingabe.strip() # Ergibt "Hallo Welt"
    print(f"'{benutzer_eingabe}' wird zu '{sauber}'")
    ```
*   `string.lstrip()`: Entfernt Leerzeichen nur links (am Anfang). "l" steht für "left".
    ```python
    text_links = "   Ich bin linksbündig."
    sauber_links = text_links.lstrip() # Ergibt "Ich bin linksbündig."
    print(f"'{text_links}' wird zu '{sauber_links}'")
    ```
*   `string.rstrip()`: Entfernt Leerzeichen nur rechts (am Ende). "r" steht für "right".
    ```python
    text_rechts = "Ich bin rechtsbündig.   "
    sauber_rechts = text_rechts.rstrip() # Ergibt "Ich bin rechtsbündig."
    print(f"'{text_rechts}' wird zu '{sauber_rechts}'")
    ```

### Suchen und Ersetzen im Text 🕵️‍♀️
*   `string.find(suchtext)`: Sucht `suchtext` im String. Gibt den Index zurück, an dem `suchtext` *zum ersten Mal* anfängt. Wenn nichts gefunden wird, gibt es `-1` zurück.
    ```python
    geschichte = "Ein Drache bewachte einen Schatz in einer Höhle. Der Drache war mächtig."
    position_drache = geschichte.find("Drache") # Ergibt 4
    position_prinzessin = geschichte.find("Prinzessin") # Ergibt -1
    print(f"Das Wort 'Drache' beginnt an Position: {position_drache}")
    print(f"Das Wort 'Prinzessin' beginnt an Position: {position_prinzessin}")
    ```
*   `string.count(suchtext)`: Zählt, wie oft `suchtext` im String vorkommt.
    ```python
    lachen = "hahahaha"
    anzahl_ha = lachen.count("ha") # Ergibt 4
    print(f"In '{lachen}' kommt 'ha' {anzahl_ha} Mal vor.")
    ```
*   `string.replace(alt, neu)`: Ersetzt *alle* Vorkommen von `alt` durch `neu`. Erzeugt einen *neuen* String!
    ```python
    meldung = "Achtung: Fehler! Fehler! System instabil."
    korrigierte_meldung = meldung.replace("Fehler", "Problem")
    # Ergibt "Achtung: Problem! Problem! System instabil."
    print(f"Original: {meldung}")
    print(f"Korrigiert: {korrigierte_meldung}")
    ```

### Anfang und Ende überprüfen ✅
*   `string.startswith(textteil)`: Gibt `True` zurück, wenn der String mit `textteil` beginnt, sonst `False`.
    ```python
    dateiname = "Rechnung_Januar.pdf"
    ist_rechnung = dateiname.startswith("Rechnung") # True
    ist_bild = dateiname.startswith("Bild")       # False
    print(f"'{dateiname}' startet mit 'Rechnung': {ist_rechnung}")
    ```
*   `string.endswith(textteil)`: Gibt `True` zurück, wenn der String mit `textteil` endet, sonst `False`.
    ```python
    webseite = "www.beispiel.de"
    ist_de_domain = webseite.endswith(".de") # True
    ist_com_domain = webseite.endswith(".com") # False
    print(f"'{webseite}' endet mit '.de': {ist_de_domain}")
    ```

### Strings aufteilen und zusammenfügen 🧩
*   `string.split(trennzeichen)`: Teilt den String am `trennzeichen` auf und gibt eine Liste von Teil-Strings zurück. Wenn kein `trennzeichen` angegeben wird, teilt es bei Leerzeichen.
    ```python
    einkaufsliste_str = "Äpfel,Bananen,Milch,Brot"
    einkaufsliste_teile = einkaufsliste_str.split(",")
    # Ergibt ['Äpfel', 'Bananen', 'Milch', 'Brot']
    print(f"Einkaufsliste als Text: {einkaufsliste_str}")
    print(f"Einkaufsliste als Teile: {einkaufsliste_teile}")

    satz_fuer_split = "Ich lerne gerne Python"
    woerter = satz_fuer_split.split()
    # Ergibt ['Ich', 'lerne', 'gerne', 'Python']
    print(f"Wörter im Satz: {woerter}")
    ```
*   `verbindungsstring.join(liste_von_strings)`: Fügt die Strings aus `liste_von_strings` zusammen. Der `verbindungsstring` wird *zwischen* die einzelnen Teile gesetzt.
    ```python
    teile = ["Hallo", "liebe", "Welt"]
    ganzer_satz = " ".join(teile) # Ergibt "Hallo liebe Welt" (mit Leerzeichen verbunden)
    print(f"Teile: {teile}")
    print(f"Zusammengefügt mit Leerzeichen: '{ganzer_satz}'")

    hashtag_teile = ["cool", "python", "coding"]
    hashtag = "#".join(hashtag_teile) # Ergibt "cool#python#coding"
    print(f"Zusammengefügt mit #: '{hashtag}'")
    ```

---

## 📜 Escape-Sequenzen: Die Geheimsprache im String

Manchmal willst du Zeichen in deinem String haben, die eine spezielle Bedeutung haben (wie Anführungszeichen in einem String, der selbst in Anführungszeichen steht) oder die man nicht einfach tippen kann (wie einen Zeilenumbruch). Hier kommen **Escape-Sequenzen** ins Spiel! Sie fangen immer mit einem Backslash `\` an.

| Escape-Sequenz | Was es tut                                      | Beispiel                               | Ergebnis am Bildschirm |
| :------------- | :---------------------------------------------- | :------------------------------------- | :--------------------- |
| `\n`           | 🆕 **N**eue Zeile (Zeilenumbruch)                 | `print("Zeile 1\nZeile 2")`            | Zeile 1<br>Zeile 2     |
| `\t`           | ➡️ Fügt einen **T**abulator ein (mehr Abstand) | `print("Name:\tMax")`                  | Name:    Max           |
| `\\`           |  "\" Zeigt einen einzelnen Backslash             | `print("C:\\Programme\\Python")`       | C:\Programme\Python  |
| `\'`           | "'" Zeigt ein einfaches Anführungszeichen       | `print('Das ist Tom\'s Buch.')`        | Das ist Tom's Buch.  |
| `\"`           | '"' Zeigt ein doppeltes Anführungszeichen     | `print("Sie sagte: \"Cool!\"")`        | Sie sagte: "Cool!"   |

```python
# Ausprobieren!
print("Guten Morgen!\nWie geht es dir heute?")
print("Einkaufsliste:\n\t- Äpfel\n\t- Bananen")
print('Der Ordner heißt \'Meine Bilder\' und ist auf C:\\.')
```

---

## 🔀 Strings und Variablen schick ausgeben: Formatierung!

Oft möchtest du Text mit den Werten von Variablen mischen. Stell dir vor, du möchtest schreiben: "Hallo [Name], du bist [Alter] Jahre alt."

### Der moderne Weg: f-Strings (formattierte String-Literale) 🌟
Das ist die einfachste und meistens beste Methode (seit Python 3.6). Schreibe ein `f` direkt vor die Anführungszeichen deines Strings. Dann kannst du Variablen oder sogar kleine Rechnungen direkt in geschweifte Klammern `{}` schreiben.

```python
spieler_name = "SuperCoder"
punkte = 1500
level = 10

# Variablen direkt einfügen
begruessung = f"Willkommen zurück, {spieler_name}!"
status = f"Du bist in Level {level} und hast {punkte} Punkte."
print(begruessung)
print(status)

# Sogar Rechnungen sind möglich!
punkte_fuer_naechstes_level = 2000
benoetigt = punkte_fuer_naechstes_level - punkte
print(f"Dir fehlen noch {benoetigt} Punkte für das nächste Level!")
print(f"Wenn du 500 Punkte dazu bekommst, hast du {punkte + 500} Punkte.")
```
f-Strings sind super lesbar und sehr praktisch!

### Ältere Methoden (gut zu wissen, aber f-Strings sind meist besser):

#### 1. Die `format()`-Methode
Hier setzt du leere geschweifte Klammern `{}` als Platzhalter in den String und rufst dann `.format()` dahinter auf, um die Werte einzufügen.
```python
tier = "Katze"
name_des_tiers = "Minka"
satz = "Meine {} heißt {}.".format(tier, name_des_tiers) # Ergibt "Meine Katze heißt Minka."
print(satz)

# Man kann den Platzhaltern auch Nummern oder Namen geben:
satz_nummeriert = "Das {0} ist {1} und das {1} ist {0}.".format("Wetter", "schön")
print(satz_nummeriert) # Ergibt "Das Wetter ist schön und das schön ist Wetter."

satz_benannt = "Lieblingsessen: {essen}, Lieblingsgetränk: {getraenk}.".format(essen="Lasagne", getraenk="Apfelschorle")
print(satz_benannt)
```

#### 2. Der alte Weg mit `%` ( Prozent-Formatierung)
Dies ist eine noch ältere Methode. Man benutzt Platzhalter wie `%s` für Strings und `%d` für ganze Zahlen.
```python
held = "Spider-Man"
anzahl_gegner = 3
info = "Der Held %s kämpft gegen %d Gegner." % (held, anzahl_gegner)
# Ergibt "Der Held Spider-Man kämpft gegen 3 Gegner."
print(info)
```
Du wirst diesen Weg vielleicht in älterem Code sehen, aber für neue Projekte sind f-Strings meist die bessere Wahl.

---

## 🧱 Unveränderlichkeit (Immutability) von Strings: Einmal gebaut, bleibt's so!

Wir haben es am Anfang schon kurz erwähnt: Strings sind in Python **unveränderlich**. Das bedeutet, nachdem du einen String erstellt hast, kannst du einzelne Zeichen darin nicht mehr direkt ändern.

Versuchst du es doch, gibt es einen Fehler:
```python
# Dieser Code erzeugt einen Fehler!
mein_wort = "Haus"
# mein_wort[0] = "M" # Das geht nicht! TypeError!
# print(mein_wort)
```
Python sagt dir dann so etwas wie: `TypeError: 'str' object does not support item assignment`. Das heißt: "Hey, du kannst einem String-Objekt keine neuen Zeichen an einer bestimmten Stelle zuweisen!"

**Was macht man stattdessen?** Man erstellt einen *neuen* String!
```python
mein_wort = "Haus"
neues_wort = "M" + mein_wort[1:] # Wir nehmen "M" und hängen "aus" (ab Index 1) dran
print(f"Das alte Wort war: {mein_wort}")
print(f"Das neue Wort ist: {neues_wort}") # Ergibt "Maus"

# Oder mit replace():
anderes_wort = mein_wort.replace("H", "L")
print(f"Noch ein neues Wort: {anderes_wort}") # Ergibt "Laus"
```
Das ist wie beim Legomodell: Du nimmst nicht einen Stein raus und drückst einen anderen rein, sondern du baust das Modell mit dem neuen Stein einfach nochmal neu auf.

---

## 🚧 Häufige Fehler mit Strings und wie du sie vermeidest

Beim Programmieren mit Strings können leicht kleine Fehler passieren. Hier sind ein paar typische Stolpersteine:

1.  **`TypeError: can only concatenate str (not "int") to str`**
    *   **Was bedeutet das?** Du versuchst, einen String direkt mit einer Zahl (oder einem anderen Typ, der kein String ist) mit `+` zu verbinden.
    *   **Beispiel:** `print("Ich bin " + 10 + " Jahre alt.")` ⬅️ FEHLER!
    *   **Lösung:** Wandle die Zahl (oder den anderen Typ) zuerst in einen String um mit `str()`, oder benutze f-Strings (die machen das automatisch für dich!).
        ```python
        alter = 10
        # Lösung 1: str()
        print("Ich bin " + str(alter) + " Jahre alt.")
        # Lösung 2 (besser): f-Strings
        print(f"Ich bin {alter} Jahre alt.")
        ```

2.  **`IndexError: string index out of range`**
    *   **Was bedeutet das?** Du versuchst, auf einen Index im String zuzugreifen, den es gar nicht gibt (z.B. versuchst du, das 10. Zeichen eines Strings zu bekommen, der nur 5 Zeichen lang ist).
    *   **Beispiel:**
        ```python
        wort = "Hallo" # Länge 5, gültige Indizes: 0, 1, 2, 3, 4 (oder -1 bis -5)
        # print(wort[5]) # ⬅️ FEHLER! Index 5 gibt es nicht.
        ```
    *   **Lösung:** Überprüfe die Länge des Strings mit `len()` bevor du auf Indizes zugreifst, besonders wenn der Index von einer Berechnung oder Benutzereingabe abhängt. Stelle sicher, dass dein Index im erlaubten Bereich liegt (von `0` bis `len(string) - 1`).

3.  **Anführungszeichen vergessen oder vermischt**
    *   **Was bedeutet das?** Du fängst einen String mit einem einfachen Anführungszeichen an und versuchst ihn mit einem doppelten zu beenden (oder umgekehrt), oder du vergisst das schließende Anführungszeichen ganz.
    *   **Beispiel:** `nachricht = "Hallo Welt'` ⬅️ FEHLER!
    *   **Lösung:** Achte genau darauf, dass du für jeden String das gleiche öffnende und schließende Anführungszeichen verwendest. Code-Editoren helfen oft dabei, indem sie zusammengehörige Klammern und Anführungszeichen hervorheben.

4.  **Unterschied zwischen `=` (Zuweisung) und `==` (Vergleich) verwechseln**
    *   **Was bedeutet das?** Beim Vergleichen von Strings (ob sie gleich sind) musst du `==` benutzen. Ein einzelnes `=` ist für die Zuweisung eines Wertes zu einer Variablen.
    *   **Beispiel:**
        ```python
        name1 = "Max"
        name2 = "Moritz"
        # if name1 = name2: # ⬅️ FEHLER! SyntaxError
        #    print("Die Namen sind gleich.")

        # Richtig:
        if name1 == "Max":
            print("Hallo Max!")
        if name1 == name2:
            print("Die Namen sind gleich.")
        else:
            print("Die Namen sind unterschiedlich.")
        ```

5.  **Groß-/Kleinschreibung nicht beachtet beim Vergleichen**
    *   **Was bedeutet das?** Python unterscheidet streng zwischen Groß- und Kleinbuchstaben. `"Hallo"` ist nicht dasselbe wie `"hallo"`.
    *   **Beispiel:**
        ```python
        geheimes_passwort = "Pizza123"
        eingabe = "pizza123"
        if eingabe == geheimes_passwort:
            print("Zugriff gewährt!") # Wird hier nicht passieren
        else:
            print("Falsches Passwort!")
        ```
    *   **Lösung:** Wenn die Groß-/Kleinschreibung egal sein soll, wandle beide Strings vor dem Vergleich in dieselbe Form um, z.B. alles in Kleinbuchstaben mit `.lower()`.
        ```python
        geheimes_passwort = "Pizza123"
        eingabe = "pizza123"
        if eingabe.lower() == geheimes_passwort.lower():
            print("Zugriff gewährt! (Groß/Klein ignoriert)")
        else:
            print("Falsches Passwort!")
        ```

---

## 🏋️‍♀️ Übungsaufgaben: Werde zum String-Meister!

Jetzt bist du dran! Probier diese Aufgaben aus, um dein Wissen zu testen:

1.  **Dein Superhelden-Name:**
    *   Frage den Benutzer nach seinem Vornamen.
    *   Frage den Benutzer nach seiner Lieblingsfarbe.
    *   Bilde einen Superhelden-Namen, indem du die ersten drei Buchstaben des Vornamens (groß geschrieben) und die Lieblingsfarbe (mit großem Anfangsbuchstaben) kombinierst. Beispiel: Vorname "Max", Farbe "rot" → Superhelden-Name "MAXRot".
    *   Gib den Superhelden-Namen aus.

2.  **Geheimsprache "Rückwärts":**
    *   Lass den Benutzer ein Wort eingeben.
    *   Gib das Wort rückwärts aus. (Tipp: Slicing mit negativem Schritt!)

3.  **Emoji-Zähler:**
    *   Erstelle einen String mit verschiedenen Emojis, z.B.: `text = "Ich liebe Pizza 🍕 und Burger 🍔! Mein Lieblingstier ist der Hund 🐶. 🍕🍕"`
    *   Zähle, wie oft das Pizza-Emoji 🍕 im Text vorkommt und gib das Ergebnis aus.

4.  **Begrüßung gestalten:**
    *   Erstelle Variablen für `name` und `stadt`.
    *   Benutze einen f-String, um eine Begrüßung auszugeben wie: "Hallo [Name] aus [Stadt]! Willkommen zum Programmierkurs!"

5.  **Hashtag-Generator:**
    *   Nimm den folgenden String: `"Python ist super cool"`
    *   Verwandle ihn in einen Hashtag-String, bei dem alle Wörter klein geschrieben sind und mit `#` verbunden sind, also: `#python#ist#super#cool`. (Tipps: `lower()`, `split()`, `join()`)

---

## 🚀 Beispiel-Miniprojekt: Der Story-Mixer

Dieses kleine Programm nimmt Teile von Sätzen und mischt sie zu einer lustigen neuen Geschichte!

```python
# Der Story-Mixer

# Teile für unsere Geschichte
wer = ["Ein frecher Affe", "Ein mutiger Ritter", "Ein schläfriger Zauberer", "Eine tanzende Prinzessin"]
tat_was = ["sprang über einen Fluss", "kämpfte gegen einen Drachen", "suchte einen verlorenen Schatz", "backte einen riesigen Kuchen"]
wo = ["im tiefen Wald", "auf einem hohen Berg", "in einer alten Burg", "unter dem Meer"]
wann = ["gestern Nacht", "vor langer, langer Zeit", "an einem sonnigen Morgen", "als die Sterne funkelten"]

# Wir brauchen das 'random' Modul, um zufällige Teile auszuwählen
import random

# Zufällige Teile auswählen
zufaelliger_wer = random.choice(wer)
zufaelliges_tat_was = random.choice(tat_was)
zufaelliges_wo = random.choice(wo)
zufaelliges_wann = random.choice(wann)

# Die Geschichte mit f-Strings zusammenbauen
geschichte = f"{zufaelliger_wer} {zufaelliges_tat_was} {zufaelliges_wo}, {zufaelliges_wann}."

# Die Geschichte ausgeben
print("Deine verrückte Geschichte des Tages:")
print(geschichte)

# Bonus: Die Geschichte in Großbuchstaben
print("\nIn GROSSBUCHSTABEN:")
print(geschichte.upper())

# Bonus: Wie viele Zeichen hat die Geschichte?
print(f"\nDie Geschichte hat {len(geschichte)} Zeichen (inkl. Leerzeichen und Punkt).")
```

---

## 🧠 Zusammenfassung: Strings auf einen Blick

Puh, das war eine Menge über Strings! Hier nochmal das Wichtigste:

*   Strings sind **Text**, bestehend aus Zeichen, eingeschlossen in `' '`, `" "` oder `""" """`.
*   Sie sind **unveränderlich** (immutable) – einmal erstellt, nicht direkt änderbar, nur neue Strings können erzeugt werden.
*   Mit **Indizes** (beginnend bei `0`) greifst du auf einzelne Zeichen zu: `mein_string[0]`.
*   Mit **Slicing** schneidest du Teile aus: `mein_string[1:5]`.
*   **Methoden** sind eingebaute Werkzeuge (`.upper()`, `.find()`, `.split()` etc.), um Strings zu bearbeiten.
*   **f-Strings** (z.B. `f"Hallo {name}"`) sind der moderne Weg, um Variablen und Text zu mischen.
*   **Escape-Sequenzen** (`\n`, `\t`) lassen dich spezielle Zeichen darstellen.

Strings sind ein mächtiges Werkzeug in Python. Je mehr du mit ihnen übst, desto besser wirst du darin, Texte in deinen Programmen zu zaubern! Viel Spaß beim Experimentieren! 🎉

[Zurück zum Inhaltsverzeichnis von Kapitel 1](index.md) | [Nächstes Thema: Operatoren](Operatoren.md)