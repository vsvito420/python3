# Strings in Python

[Startseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md)

[Operatoren](Operatoren.md)

[Bedingte Anweisungen](/Projekte/Kapitel_2/Bedingte_Anweisungen.md)

In diesem Kapitel entdecken wir die Welt der Strings in Python! Stell dir Strings wie Textbausteine vor, mit denen du Wörter, Sätze oder sogar ganze Geschichten in deinem Programm speichern und bearbeiten kannst.

---

## Was sind Strings?

- **Strings sind einfach gesagt Text**. 

    Sie bestehen aus einer Reihenfolge von Buchstaben, Zahlen oder Symbolen. In Python schreibst du Strings, indem du den Text in einfache Anführungszeichen (`'`) oder doppelte Anführungszeichen (`"`) setzt.

- Ein wichtiger Punkt ist, dass Strings in Python "**unveränderlich**" sind. 

    Das bedeutet, wenn du einen String einmal erstellt hast, kannst du einzelne Buchstaben darin nicht einfach ändern. Du kannst aber neue Strings erstellen, die auf dem alten basieren.

```python
# Strings erstellen
name = "Max Mustermann"
adresse = 'Musterstraße 123'
```

---

## String-Erstellung

- Du kannst Strings auf verschiedene Arten erstellen:

*   **Mit einfachen oder doppelten Anführungszeichen:** Das ist die häufigste Methode. Es spielt keine Rolle, ob du einfache (`'`) oder doppelte (`"`) Anführungszeichen verwendest, solange du am Anfang und Ende dieselbe Art benutzt.

    ```python
    gruss = "Hallo"
    name = 'Welt'
    ```

*   **Für längeren Text über mehrere Zeilen:** Wenn dein Text sehr lang ist und über mehrere Zeilen gehen soll, kannst du dreifache Anführungszeichen (`"""` oder `'''`) verwenden.

    ```python
    gedicht = """Dies ist ein kleines Gedicht.
    Es hat mehrere Zeilen.
    Ist das nicht nett?"""
    ```

*   **Wenn du spezielle Zeichen brauchst:** Manchmal möchtest du Anführungszeichen oder andere besondere Zeichen direkt im Text haben. Dafür gibt es "Escape-Sequenzen", die mit einem Backslash (`\`) beginnen.

    ```python
    satz = "Er sagte: \"Das ist toll!\"" # So fügst du Anführungszeichen ein
    pfad = "C:\\Ordner\\Datei.txt" # So fügst du einen Backslash ein
    ```

---

## Was kann man mit Strings machen?

Strings sind nicht nur zum Speichern von Text da, du kannst auch verschiedene Dinge mit ihnen anstellen!

---

### Strings zusammenfügen (Verketten)

Stell dir vor, du hast zwei Textbausteine und möchtest sie zu einem längeren Text verbinden. Das nennt man Verketten oder Konkatenation. In Python benutzt du dafür das Pluszeichen (`+`).

```python
wort1 = "Apfel"
wort2 = "Kuchen"
ganzes_wort = wort1 + wort2  # Ergibt "ApfelKuchen"

gruss = "Hallo"
name = "Python"
begruessung = gruss + " " + name + "!" # Ergibt "Hallo Python!"
```

---

### Strings wiederholen

Manchmal möchtest du denselben Text mehrmals hintereinander schreiben. Dafür gibt es den Stern-Operator (`*`). Du schreibst den String, dann den Stern und dann die Zahl, wie oft der String wiederholt werden soll.

```python
lachen = "Ha" * 4  # Ergibt "HaHaHaHa"
linie = "=" * 15 # Ergibt "==============="
```

---

### Wie lang ist ein String?

Um herauszufinden, wie viele Zeichen (Buchstaben, Zahlen, Leerzeichen usw.) in einem String sind, benutzt du die Funktion `len()`. `len` steht für "length", also Länge.

```python
satz = "Das ist ein Satz."
anzahl_zeichen = len(satz)  # Ergibt 17 (Leerzeichen und Punkt zählen mit!)
```

---

## Einzelne Buchstaben finden

Jeder Buchstabe in einem String hat eine Nummer, die Position oder Index genannt wird. Stell dir vor, die Buchstaben sind in einer Reihe aufgestellt und wir zählen sie von links nach rechts, beginnend bei 0.

Um auf einen bestimmten Buchstaben zuzugreifen, schreibst du den Namen des Strings und dann in eckigen Klammern `[]` die Nummer des Buchstabens, den du haben möchtest.

```python
wort = "Zauberhut"
erster = wort[0] # Das ist der Buchstabe an Position 0, also "Z"
dritter = wort[2] # Das ist der Buchstabe an Position 2, also "u"
```

Du kannst auch von hinten zählen! Dafür benutzt du negative Zahlen. `-1` ist der letzte Buchstabe, `-2` der vorletzte und so weiter.

```python
wort = "Zauberhut"
letzter = wort[-1] # Das ist der letzte Buchstabe, also "t"
vorletzter = wort[-2] # Das ist der vorletzte Buchstabe, also "u"
```

---

## Teile von Strings ausschneiden (Slicing)

Mit Slicing kannst du Teilstrings extrahieren:

```python
satz = "Das ist ein Testsatz."

# Die ersten 3 Buchstaben (von Position 0 bis kurz vor 3)
anfang = satz[0:3] # Ergibt "Das"

# Ab Position 4 bis kurz vor Position 7
mitte = satz[4:7] # Ergibt "ist"

# Wenn du vom Anfang starten möchtest, kannst du die erste Zahl weglassen:
anfang_kurz = satz[:3] # Ergibt auch "Das"

# Wenn du bis zum Ende gehen möchtest, kannst du die zweite Zahl weglassen:
ende = satz[12:] # Ergibt "Testsatz."

# Du kannst sogar einen "Schritt" angeben, um nicht jeden Buchstaben mitzunehmen:
# Syntax: string[start:ende:schritt]
jeder_zweite = satz[0:10:2] # Ergibt "Dsi i" (jeder zweite Buchstabe von 0 bis 9)

# Ein cleverer Trick: Mit einem Schritt von -1 drehst du den String einfach um!
umgedreht = satz[::-1] # Ergibt ".ztastseT nie tsi saD"
```

---

## Tricks und Helfer für Strings (String-Methoden)

Python bietet viele nützliche Methoden für die Arbeit mit Strings:

### Buchstaben groß oder klein machen

Manchmal möchtest du alle Buchstaben in einem String groß oder klein schreiben. Dafür gibt es spezielle Helferlein, die man "Methoden" nennt. Du schreibst den Namen des Strings, einen Punkt `.` und dann den Namen der Methode mit runden Klammern `()`.

*   `upper()`: Macht alle Buchstaben groß.
*   `lower()`: Macht alle Buchstaben klein.
*   `title()`: Macht den ersten Buchstaben von jedem Wort groß.
*   `capitalize()`: Macht nur den allerersten Buchstaben des ganzen Strings groß.

```python
gruss = "hallo welt"

alles_gross = gruss.upper() # Ergibt "HALLO WELT"
alles_klein = alles_gross.lower() # Ergibt "hallo welt"
als_titel = gruss.title() # Ergibt "Hallo Welt"
erster_gross = gruss.capitalize() # Ergibt "Hallo welt"
```

---

### Wörter finden und ersetzen

Stell dir vor, du hast einen langen Text und möchtest wissen, ob ein bestimmtes Wort darin vorkommt oder wie oft es da ist. Oder du möchtest ein Wort durch ein anderes ersetzen. Auch dafür gibt es Methoden!

*   `find()`: Sucht nach einem bestimmten Text und sagt dir, an welcher Position er zum ersten Mal gefunden wurde. Wenn der Text nicht da ist, gibt es `-1` zurück.
*   `count()`: Zählt, wie oft ein bestimmter Text im String vorkommt.
*   `replace(alt, neu)`: Sucht nach dem `alt`-Text und tauscht ihn gegen den `neu`-Text aus. Das Ergebnis ist ein *neuer* String, der ursprüngliche String ändert sich nicht (weil Strings unveränderlich sind!).

```python
satz = "Der schnelle Fuchs springt über den faulen Hund. Der Fuchs ist wirklich schnell."

# Finden
wo_ist_fuchs = satz.find("Fuchs") # Ergibt 16 (die Position, wo "Fuchs" anfängt)
wo_ist_katze = satz.find("Katze") # Ergibt -1 (weil "Katze" nicht im Satz ist)

# Zählen
wie_oft_fuchs = satz.count("Fuchs") # Ergibt 2

# Ersetzen
neuer_satz = satz.replace("Fuchs", "Hase") # Ergibt "Der schnelle Hase springt über den faulen Hund. Der Hase ist wirklich schnell."
```

---

### Nachschauen, was im String steckt

Manchmal möchtest du überprüfen, ob ein String mit etwas Bestimmtem anfängt oder aufhört, oder ob er nur aus Buchstaben oder Zahlen besteht. Auch dafür gibt es Methoden, die dir mit `True` (Ja, das stimmt!) oder `False` (Nein, das stimmt nicht!) antworten.

*   `startswith(text)`: Prüft, ob der String mit dem angegebenen `text` beginnt.
*   `endswith(text)`: Prüft, ob der String mit dem angegebenen `text` endet.
*   `isalpha()`: Prüft, ob der String nur aus Buchstaben besteht.
*   `isdigit()`: Prüft, ob der String nur aus Zahlen besteht.
*   `isalnum()`: Prüft, ob der String nur aus Buchstaben und Zahlen besteht.
*   `isupper()`: Prüft, ob alle Buchstaben im String groß sind.
*   `islower()`: Prüft, ob alle Buchstaben im String klein sind.

```python
wort = "Apfel123"
satz = "Guten Morgen!"

# Anfang und Ende prüfen
startet_mit_Guten = satz.startswith("Guten") # Ergibt True
endet_mit_Punkt = satz.endswith(".") # Ergibt False

# Inhalt prüfen
ist_nur_text = wort.isalpha() # Ergibt False (wegen der Zahlen)
ist_nur_zahl = "42".isdigit() # Ergibt True
ist_text_und_zahl = wort.isalnum() # Ergibt True

# Groß-/Kleinschreibung prüfen
alles_gross = "HALLO".isupper() # Ergibt True
alles_klein = "welt".islower() # Ergibt True
```

---

### Leerzeichen am Rand entfernen

Manchmal hat ein String unnötige Leerzeichen am Anfang oder Ende. Das kann passieren, wenn jemand versehentlich die Leertaste drückt. Mit diesen Methoden kannst du sie ganz einfach entfernen:

*   `lstrip()`: Entfernt Leerzeichen (und andere Leerzeichen-ähnliche Zeichen wie Tabs) am **Anfang** des Strings ("l" steht für "left", also links).
*   `rstrip()`: Entfernt Leerzeichen am **Ende** des Strings ("r" steht für "right", also rechts).
*   `strip()`: Entfernt Leerzeichen am **Anfang und Ende** des Strings.

```python
text_mit_leerzeichen = "   Viel Platz drumherum   "

links_weg = text_mit_leerzeichen.lstrip() # Ergibt "Viel Platz drumherum   "
rechts_weg = text_mit_leerzeichen.rstrip() # Ergibt "   Viel Platz drumherum"
alles_weg = text_mit_leerzeichen.strip() # Ergibt "Viel Platz drumherum"
```

---

### Strings auseinandernehmen und wieder zusammenkleben

Manchmal hast du einen String, der aus mehreren Teilen besteht, die durch ein bestimmtes Zeichen getrennt sind (wie Wörter in einem Satz, getrennt durch Leerzeichen, oder eine Liste von Dingen, getrennt durch Kommas). Du kannst diesen String in eine Liste von kleineren Strings aufteilen. Und umgekehrt kannst du eine Liste von Strings wieder zu einem einzigen String zusammenfügen.

*   `split(trennzeichen)`: Nimmt den String auseinander, wo immer das `trennzeichen` vorkommt. Das Ergebnis ist eine Liste von Strings. Wenn du kein Trennzeichen angibst, teilt es den String bei Leerzeichen auf.
*   `join(liste_von_strings)`: Nimmt alle Strings in der `liste_von_strings` und fügt sie mit dem String, auf den du `.join()` anwendest, dazwischen zusammen.

```python
farben_string = "rot,grün,blau"

# String aufteilen
farben_liste = farben_string.split(",") # Ergibt ['rot', 'grün', 'blau']

worte_string = "Das ist ein Satz"
worte_liste = worte_string.split() # Ergibt ['Das', 'ist', 'ein', 'Satz'] (teilt bei Leerzeichen)

# Liste zusammenfügen
neuer_farben_string = "-".join(farben_liste) # Ergibt "rot-grün-blau"

satz_wieder_zusammen = " ".join(worte_liste) # Ergibt "Das ist ein Satz" (fügt mit Leerzeichen zusammen)
```

---

## Strings schick machen (Formatierung)

Manchmal möchtest du Text und Zahlen oder den Inhalt von Variablen in einem String mischen. Das nennt man String-Formatierung. Es gibt verschiedene Wege, das zu tun.

---

### 1. Der alte Weg mit %

Das ist eine ältere Methode, um Werte in einen String einzufügen. Du benutzt Platzhalter wie `%s` für Text (Strings) und `%d` für ganze Zahlen (Dezimalzahlen). Nach dem String schreibst du ein `%` und dann in Klammern die Werte, die eingesetzt werden sollen, in der richtigen Reihenfolge.

```python
tier = "Hund"
anzahl = 2
satz = "Ich habe %d %s." % (anzahl, tier) # Ergibt "Ich habe 2 Hund."
```

---

### 2. Die format()-Methode

Eine modernere Art, Strings zu formatieren, ist die `format()`-Methode. Du schreibst geschweifte Klammern `{}` in den String, wo die Werte eingefügt werden sollen. Dann rufst du `.format()` nach dem String auf und gibst die Werte in den Klammern an.

```python
tier = "Katze"
name = "Minka"
satz = "Meine {} heißt {}.".format(tier, name) # Ergibt "Meine Katze heißt Minka."
```

Du kannst den geschweiften Klammern auch Namen geben und diese Namen dann in `.format()` verwenden. Das macht es einfacher, wenn du viele Werte hast.

```python
essen = "Pizza"
getraenk = "Saft"
bestellung = "Ich möchte {food} und {drink}.".format(food=essen, drink=getraenk) # Ergibt "Ich möchte Pizza und Saft."
```

---

### 3. f-Strings (ab Python 3.6) - Der moderne Weg!

Das ist die neueste und oft einfachste Methode, um Strings zu formatieren. Du schreibst einfach ein `f` vor die Anführungszeichen des Strings. Dann kannst du Variablen oder sogar kleine Rechnungen direkt in geschweifte Klammern `{}` innerhalb des Strings schreiben. Python ersetzt sie automatisch durch ihre Werte.

```python
name = "Lisa"
alter = 8
haustier = "Hamster"

# Variablen direkt einfügen
satz = f"{name} ist {alter} Jahre alt und hat einen {haustier}."
# Ergibt "Lisa ist 8 Jahre alt und hat einen Hamster."

# Sogar Rechnungen sind möglich!
naechstes_jahr = f"Nächstes Jahr wird {name} {alter + 1} Jahre alt."
# Ergibt "Nächstes Jahr wird Lisa 9 Jahre alt."
```

---

## Was sind Escape-Sequenzen? (Die kleinen Helferlein mit dem Backslash)

Manchmal möchtest du Zeichen in einem String verwenden, die normalerweise eine besondere Bedeutung haben (wie Anführungszeichen innerhalb eines Strings, der selbst in Anführungszeichen steht) oder die man nicht direkt tippen kann (wie einen Zeilenumbruch). Hier kommen Escape-Sequenzen ins Spiel!

Sie beginnen immer mit einem Backslash (`\`) gefolgt von einem anderen Zeichen. Python weiß dann: "Aha, das ist kein normaler Buchstabe, sondern etwas Besonderes!"

Hier sind die wichtigsten:

| Escape-Sequenz | Was es tut | Beispiel | Ergebnis |
|---|---|---|---|
| `\n` | Macht einen **N**euen Zeilenumbruch | `print("Hallo\nWelt")` | Hallo<br>Welt |
| `\t` | Fügt einen **T**abulator ein (ein größerer Abstand) | `print("Vorher\tNachher")` | Vorher    Nachher |
| `\\` | Fügt einen einzelnen Backslash ein | `print("Der Pfad ist C:\\Ordner")` | Der Pfad ist C:\Ordner |
| `\'` | Fügt ein einfaches Anführungszeichen ein (nützlich in Strings mit einfachen Anführungszeichen) | `print('Das ist ein \'Zitat\'')` | Das ist ein 'Zitat' |
| `\"` | Fügt ein doppeltes Anführungszeichen ein (nützlich in Strings mit doppelten Anführungszeichen) | `print("Er sagte: \"Hallo!\"")` | Er sagte: "Hallo!" |

```python
# Lass uns ein paar Beispiele ausprobieren:
print("Zeile 1\nZeile 2")
print("Spalte1\tSpalte2")
print('Hier ist ein Backslash: \\')
print("Sie sagte: \"Super!\"")
```

---

## Rohe Strings (Raw Strings) - Wenn Backslashes normal sein sollen

Manchmal, besonders bei Dateipfaden unter Windows oder bei bestimmten Mustern (regulären Ausdrücken), möchtest du, dass Backslashes `\` einfach nur Backslashes sind und nicht der Anfang einer Escape-Sequenz.

Dafür gibt es "Raw Strings". Du erstellst sie, indem du ein `r` direkt vor das erste Anführungszeichen des Strings setzt.

```python
# Normaler String: Backslashes müssen escaped werden
windows_pfad_normal = "C:\\Benutzer\\Dokumente\\Datei.txt"

# Raw String: Backslashes werden so genommen, wie sie sind
windows_pfad_raw = r"C:\Benutzer\Dokumente\Datei.txt"

print(windows_pfad_normal) # Gibt C:\Benutzer\Dokumente\Datei.txt aus
print(windows_pfad_raw)    # Gibt auch C:\Benutzer\Dokumente\Datei.txt aus

# Aber im Code ist der Raw String oft einfacher zu lesen!
```

---

## Übungen

1. Erstelle einen String mit deinem Namen und gib ihn in Großbuchstaben aus.
2. Extrahiere den Nachnamen aus dem String "Max Mustermann" mit Slicing.
3. Zähle, wie oft der Buchstabe "e" im Satz "Entwickeln mit Python macht Spaß" vorkommt.
4. Erstelle einen formatierten String mit f-Strings, der deinen Namen, dein Alter und deine Lieblingssprache enthält.
5. Teile den String "Python,Java,C++,JavaScript" an den Kommas und gib die einzelnen Elemente aus.

---

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

---

## Zusammenfassung

- Strings sind Sequenzen von Zeichen, die in Anführungszeichen eingeschlossen sind
- Strings in Python sind unveränderlich (immutable)
- Du kannst auf einzelne Zeichen mit Indizes zugreifen und Teilstrings mit Slicing extrahieren
- Python bietet viele nützliche Methoden für die Arbeit mit Strings
- Es gibt verschiedene Möglichkeiten, Strings zu formatieren: %-Operator, format()-Methode und f-Strings
- Escape-Sequenzen erlauben die Darstellung spezieller Zeichen in Strings