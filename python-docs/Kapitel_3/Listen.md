# 📝 Listen in Python: Deine flexiblen Datensammler

[⬅️ Zurück zu Kapitel 3](/python-docs/Kapitel_3/Kapitel_3.md) | [🐍 Startseite](/python-docs/Kapitel_0/Anfang_Lese_Mich.md) | [➡️ Weiter zu Tupel](/python-docs/Kapitel_3/Tupel.md)

Stell dir vor, du möchtest nicht nur einen Namen oder eine Zahl speichern, sondern eine ganze Sammlung von Dingen – zum Beispiel deine Lieblingssongs, die Namen deiner Freunde oder die Zutaten für einen Kuchen. Genau dafür gibt es in Python **Listen**! 🎉

Listen sind wie super flexible Einkaufszettel oder To-Do-Listen für deinen Code. Du kannst darin verschiedene Dinge speichern, sie später ändern, neue hinzufügen oder alte entfernen. Ziemlich praktisch, oder?

## 📜 Was sind Listen und warum sind sie cool?

Eine Liste in Python ist eine **geordnete Sammlung** von Elementen. Das bedeutet:
1.  **Sammlung**: Du kannst mehrere Werte in einer einzigen Variablen speichern.
2.  **Geordnet**: Die Reihenfolge, in der du die Elemente hinzufügst, bleibt erhalten. Jedes Element hat seinen festen Platz (seinen **Index**).
3.  **Veränderbar**: Du kannst Elemente hinzufügen, entfernen oder austauschen, nachdem die Liste erstellt wurde.

Listen sind superwichtig, weil sie dir helfen, Daten zu organisieren und viele coole Sachen damit zu machen, wie zum Beispiel:
*   Daten für Spiele speichern (z.B. Highscores, Inventar eines Spielers)
*   Informationen für Apps sammeln (z.B. eine Liste von Kontakten)
*   Aufgaben in Programmen verwalten

## 🎨 Listen erstellen: So geht's!

Eine Liste erstellst du, indem du Elemente in eckige Klammern `[]` einschließt und sie durch Kommas `,` trennst.

**Beispiele:**

```python
# Eine Liste mit Zahlen (z.B. Alter deiner Freunde)
alter_freunde = [12, 13, 12, 14, 13]
print(alter_freunde)

# Eine Liste mit Texten (Strings, z.B. deine Lieblingsfächer)
lieblingsfaecher = ["Mathe", "Sport", "Kunst", "Informatik"]
print(lieblingsfaecher)

# Eine Liste mit verschiedenen Datentypen (geht auch!)
gemischte_liste = ["Max", 13, True, 175.5] # Name, Alter, ist Schüler?, Größe in cm
print(gemischte_liste)

# Eine leere Liste (manchmal startet man damit und füllt sie später)
meine_aufgaben = []
print(meine_aufgaben)
```

## 🎯 Zugriff auf Listenelemente: Das richtige Element finden

Jedes Element in einer Liste hat eine feste Position, einen sogenannten **Index**. Stell dir vor, die Liste ist ein Regal und jedes Element hat ein nummeriertes Fach.
❗ **Wichtig:** Die Zählung beginnt in Python immer bei **Null (0)**!

*   Das erste Element hat den Index `0`.
*   Das zweite Element hat den Index `1`.
*   Und so weiter...

Um auf ein Element zuzugreifen, schreibst du den Namen der Liste gefolgt vom Index in eckigen Klammern.

**Beispiele:**

```python
# Unsere Lieblingsfächer-Liste
lieblingsfaecher = ["Mathe", "Sport", "Kunst", "Informatik"]

# Erstes Fach ausgeben (Index 0)
erstes_fach = lieblingsfaecher[0]
print(f"Mein allerliebstes Fach ist: {erstes_fach}") # Ausgabe: Mathe

# Drittes Fach ausgeben (Index 2)
drittes_fach = lieblingsfaecher[2]
print(f"An dritter Stelle kommt: {drittes_fach}") # Ausgabe: Kunst

# Du kannst auch von hinten zählen!
# -1 ist das letzte Element, -2 das vorletzte usw.
letztes_fach = lieblingsfaecher[-1]
print(f"Das letzte Fach auf der Liste ist: {letztes_fach}") # Ausgabe: Informatik
```

### 🔪 Slicing: Teile einer Liste ausschneiden

Manchmal brauchst du nicht nur ein einzelnes Element, sondern einen ganzen Abschnitt – ein "Stück" der Liste. Das nennt man **Slicing**.
Die Syntax ist `liste[start:ende]`.
*   `start`: Der Index, bei dem der Ausschnitt beginnt (dieses Element ist dabei).
*   `ende`: Der Index, bei dem der Ausschnitt aufhört (**dieses Element ist NICHT mehr dabei!**).

**Beispiele:**

```python
# Eine Liste mit Wochentagen
wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]

# Die ersten drei Tage (Index 0, 1, 2)
erste_drei_tage = wochentage[0:3] # Von Index 0 bis VOR Index 3
print(f"Die ersten drei Tage sind: {erste_drei_tage}") # Ausgabe: ['Montag', 'Dienstag', 'Mittwoch']

# Vom dritten bis zum fünften Tag (Index 2, 3, 4)
mittlere_tage = wochentage[2:5]
print(f"Die mittleren Tage sind: {mittlere_tage}") # Ausgabe: ['Mittwoch', 'Donnerstag', 'Freitag']

# Lässt du "start" weg, beginnt es am Anfang:
bis_mittwoch = wochentage[:3] # Gleich wie wochentage[0:3]
print(f"Bis Mittwoch: {bis_mittwoch}")

# Lässt du "ende" weg, geht es bis zum Schluss:
ab_donnerstag = wochentage[3:]
print(f"Ab Donnerstag: {ab_donnerstag}") # Ausgabe: ['Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
```

## ✏️ Elemente in Listen ändern

Da Listen veränderbar sind, kannst du den Wert eines Elements ganz einfach austauschen. Du greifst auf das Element über seinen Index zu und weist ihm einen neuen Wert zu.

**Beispiel:**

```python
# Deine Einkaufsliste
einkaufsliste = ["Äpfel", "Bananen", "Milch", "Brot"]
print(f"Originale Einkaufsliste: {einkaufsliste}")

# Du entscheidest dich um: Statt Bananen lieber Birnen
einkaufsliste[1] = "Birnen" # Das Element an Index 1 (Bananen) wird ersetzt
print(f"Geänderte Einkaufsliste: {einkaufsliste}") # Ausgabe: ['Äpfel', 'Birnen', 'Milch', 'Brot']
```

## 🛠️ Wichtige Listenmethoden: Deine Werkzeuge

Listen haben viele eingebaute Funktionen, sogenannte **Methoden**, die dir die Arbeit erleichtern. Du rufst eine Methode auf, indem du einen Punkt `.` nach dem Listennamen setzt, gefolgt vom Methodennamen und Klammern `()`. Manchmal kommen in die Klammern noch zusätzliche Infos (Argumente).

### Elemente hinzufügen

*   **`append(element)`**: Fügt ein Element **ans Ende** der Liste an.
    ```python
    haustiere = ["Hund", "Katze"]
    print(f"Meine Haustiere: {haustiere}")
    haustiere.append("Hamster") # Fügt "Hamster" am Ende hinzu
    print(f"Meine Haustiere jetzt: {haustiere}") # Ausgabe: ['Hund', 'Katze', 'Hamster']
    ```

*   **`insert(index, element)`**: Fügt ein Element an einer **bestimmten Position** (Index) ein. Alle folgenden Elemente rutschen eins weiter.
    ```python
    gaesteliste = ["Anna", "Paul", "Lisa"]
    print(f"Gästeliste: {gaesteliste}")
    gaesteliste.insert(1, "Tom") # Fügt "Tom" an Index 1 ein (zwischen Anna und Paul)
    print(f"Gästeliste jetzt: {gaesteliste}") # Ausgabe: ['Anna', 'Tom', 'Paul', 'Lisa']
    ```

*   **`extend(andere_liste)`**: Hängt **alle Elemente einer anderen Liste** (oder einer anderen Sammlung) an die aktuelle Liste an.
    ```python
    fruechte_europa = ["Apfel", "Birne"]
    fruechte_exotisch = ["Mango", "Ananas"]
    print(f"Europäische Früchte: {fruechte_europa}")
    fruechte_europa.extend(fruechte_exotisch) # Hängt Mango und Ananas an
    print(f"Alle Früchte: {fruechte_europa}") # Ausgabe: ['Apfel', 'Birne', 'Mango', 'Ananas']
    ```

### Elemente entfernen

*   **`remove(wert)`**: Entfernt das **erste Vorkommen** eines bestimmten Werts aus der Liste. Wenn der Wert nicht existiert, gibt es einen Fehler!
    ```python
    werkzeuge = ["Hammer", "Säge", "Zange", "Säge"]
    print(f"Werkzeugkiste: {werkzeuge}")
    werkzeuge.remove("Säge") # Entfernt die erste "Säge"
    print(f"Werkzeugkiste jetzt: {werkzeuge}") # Ausgabe: ['Hammer', 'Zange', 'Säge']
    ```

*   **`pop(index)`**: Entfernt das Element an einem **bestimmten Index** und gibt es zurück (du kannst es also in einer anderen Variablen speichern). Wenn du keinen Index angibst, wird das **letzte Element** entfernt und zurückgegeben.
    ```python
    spieler_punkte = [100, 85, 120, 95]
    print(f"Punkte: {spieler_punkte}")

    entfernter_punkt_mitte = spieler_punkte.pop(1) # Entfernt Element an Index 1 (85)
    print(f"Entfernter Punkt: {entfernter_punkt_mitte}") # Ausgabe: 85
    print(f"Punkte jetzt: {spieler_punkte}") # Ausgabe: [100, 120, 95]

    letzter_punkt = spieler_punkte.pop() # Entfernt letztes Element (95)
    print(f"Letzter Punkt: {letzter_punkt}") # Ausgabe: 95
    print(f"Punkte ganz am Ende: {spieler_punkte}") # Ausgabe: [100, 120]
    ```

*   **`clear()`**: Entfernt **alle Elemente** aus der Liste. Übrig bleibt eine leere Liste.
    ```python
    meine_notizen = ["Einkaufen gehen", "Hausaufgaben machen", "Zimmer aufräumen"]
    print(f"Notizen: {meine_notizen}")
    meine_notizen.clear()
    print(f"Notizen jetzt: {meine_notizen}") # Ausgabe: []
    ```

### Informationen über Listen finden

*   **`index(wert)`**: Gibt den **Index des ersten Vorkommens** eines bestimmten Werts zurück. Wenn der Wert nicht in der Liste ist, gibt es einen Fehler.
    ```python
    farben = ["rot", "grün", "blau", "gelb", "blau"]
    position_blau = farben.index("blau")
    print(f"Blau ist an Position (Index): {position_blau}") # Ausgabe: 2 (das erste "blau")
    ```

*   **`count(wert)`**: Zählt, **wie oft ein bestimmter Wert** in der Liste vorkommt.
    ```python
    zahlen = [1, 2, 3, 2, 4, 2, 5]
    anzahl_zweien = zahlen.count(2)
    print(f"Die Zahl 2 kommt {anzahl_zweien} Mal vor.") # Ausgabe: 3
    ```

### Listen organisieren

*   **`sort()`**: Sortiert die Elemente der Liste **aufsteigend** (Zahlen von klein nach groß, Buchstaben alphabetisch). Die Liste wird dabei direkt verändert!
    ```python
    punkte = [5, 2, 8, 1, 9]
    print(f"Unsortierte Punkte: {punkte}")
    punkte.sort()
    print(f"Sortierte Punkte: {punkte}") # Ausgabe: [1, 2, 5, 8, 9]

    namen = ["Lisa", "Anna", "Tom", "Ben"]
    namen.sort()
    print(f"Sortierte Namen: {namen}") # Ausgabe: ['Anna', 'Ben', 'Lisa', 'Tom']

    # Absteigend sortieren? Mit dem Argument reverse=True
    punkte.sort(reverse=True)
    print(f"Absteigend sortierte Punkte: {punkte}") # Ausgabe: [9, 8, 5, 2, 1]
    ```
    Achtung: `sort()` funktioniert nur, wenn die Elemente in der Liste vergleichbar sind (z.B. nur Zahlen oder nur Strings, nicht gemischt, es sei denn, man wird trickreich).

*   **`reverse()`**: Kehrt die **Reihenfolge der Elemente** in der Liste um. Das erste wird das letzte, das letzte das erste usw. Die Liste wird dabei direkt verändert.
    ```python
    meine_liste = [1, "zwei", 3.0, "vier"]
    print(f"Original: {meine_liste}")
    meine_liste.reverse()
    print(f"Umdreht: {meine_liste}") # Ausgabe: ['vier', 3.0, 'zwei', 1]
    ```

## 📦📦 Verschachtelte Listen: Listen in Listen

Du kannst auch Listen erstellen, die andere Listen als Elemente enthalten! Das nennt man **verschachtelte Listen**. Stell dir eine Kiste vor, in der weitere kleine Kisten liegen.

**Beispiel:** Ein einfaches Tic-Tac-Toe-Feld.

```python
spielfeld = [
    ["X", "O", "X"],  # Reihe 0
    [" ", "X", "O"],  # Reihe 1
    ["O", " ", "X"]   # Reihe 2
]

print(spielfeld)

# Wie greifst du auf ein Element zu? Mit zwei Indizes!
# Erst der Index der äußeren Liste (Reihe), dann der Index der inneren Liste (Spalte)
mitte_oben = spielfeld[0][1] # Reihe 0, Spalte 1
print(f"In der Mitte oben steht: {mitte_oben}") # Ausgabe: O

# Das leere Feld in der Mitte:
mitte_mitte = spielfeld[1][0] # Reihe 1, Spalte 0 ist das erste Element der zweiten inneren Liste.
# Korrigiert: Das leere Feld in der Mitte ist bei spielfeld[1][0] in diesem Beispiel nicht die Mitte.
# Nehmen wir das leere Feld rechts in der Mitte.
leer_mitte_rechts = spielfeld[1][0] # Reihe 1, Element an Index 0
print(f"Ein leeres Feld: {spielfeld[1][0]}") # Ausgabe: " " (Leerzeichen)

# Ändern wir ein Element:
spielfeld[1][0] = "X" # Setze in Reihe 1, Spalte 0 ein 'X'
print("Spielfeld nach Zug:")
print(spielfeld[0])
print(spielfeld[1])
print(spielfeld[2])
```

Verschachtelte Listen sind sehr mächtig, um komplexere Datenstrukturen darzustellen, wie Tabellen, Koordinatensysteme oder eben Spielfelder.

## 🚶‍♀️ Listen mit Schleifen durchlaufen

Oft möchtest du etwas mit jedem einzelnen Element in einer Liste machen – zum Beispiel jeden Namen auf einer Gästeliste ausgeben oder jede Zahl in einer Punkteliste verdoppeln. Dafür sind Schleifen perfekt!

### Die `for`-Schleife

Die `for`-Schleife ist die einfachste Art, um über jedes Element einer Liste zu "laufen".

```python
# Deine Hobbys
hobbys = ["Lesen", "Programmieren", "Fußball spielen", "Musik hören"]

print("Meine Hobbys sind:")
for hobby in hobbys:  # Die Variable "hobby" nimmt nacheinander jeden Wert aus "hobbys" an
    print(f"- {hobby}")

# Beispiel: Einkaufsliste mit Preisen
artikel = ["Apfel", "Banane", "Schokolade"]
preise = [0.50, 0.30, 1.20]
gesamtkosten = 0

for preis in preise:
    gesamtkosten = gesamtkosten + preis # oder kurz: gesamtkosten += preis

print(f"Die Gesamtkosten betragen: {gesamtkosten} Euro")
```

### `enumerate()`: Wenn du Index UND Wert brauchst

Manchmal brauchst du nicht nur das Element selbst, sondern auch seine Position (den Index) in der Liste. Dafür gibt es die `enumerate()`-Funktion.

```python
# Deine Top-3-Lieblingsfilme
filme = ["Der Herr der Ringe", "Star Wars", "Harry Potter"]

print("Meine Top-Filme:")
for index, film in enumerate(filme):
    # enumerate() gibt uns Paare aus (Index, Wert)
    # Wir starten die Zählung für die Ausgabe bei 1, obwohl der Index bei 0 beginnt
    print(f"Platz {index + 1}: {film}")
```

## ⚠️ Häufige Fehler und wie du sie vermeidest

*   **`IndexError: list index out of range`**
    Dieser Fehler passiert, wenn du versuchst, auf einen Index zuzugreifen, den es in der Liste gar nicht gibt.
    Zum Beispiel, wenn eine Liste 3 Elemente hat (Index 0, 1, 2) und du versuchst `meine_liste[3]` aufzurufen.
    **Vermeidung:**
    *   Prüfe immer, wie lang deine Liste ist, bevor du auf einen hohen Index zugreifst. Die Funktion `len(meine_liste)` gibt dir die Anzahl der Elemente. Der höchste erlaubte Index ist dann `len(meine_liste) - 1`.
    *   Sei vorsichtig bei Schleifen, die Indizes verwenden.

    ```python
    meine_zahlen = [10, 20, 30]
    # print(meine_zahlen[3]) # Das würde einen IndexError geben!

    # Sicherer Zugriff:
    if len(meine_zahlen) > 1: # Prüfen, ob es überhaupt einen Index 1 gibt
        print(meine_zahlen[1])
    else:
        print("Die Liste ist zu kurz für Index 1.")
    ```

*   **`ValueError` bei `remove()` oder `index()`**
    Wenn du `meine_liste.remove("wert")` aufrufst und `"wert"` nicht in der Liste ist, oder `meine_liste.index("wert")` und `"wert"` nicht existiert, bekommst du einen `ValueError`.
    **Vermeidung:**
    *   Prüfe, ob ein Element in der Liste ist, bevor du `remove()` oder `index()` benutzt. Das geht mit dem `in`-Operator.

    ```python
    meine_freunde = ["Max", "Erika", "Tim"]
    freund_suchen = "Anna"

    if freund_suchen in meine_freunde:
        meine_freunde.remove(freund_suchen)
        print(f"{freund_suchen} wurde entfernt.")
    else:
        print(f"{freund_suchen} war nicht auf der Freundesliste.")
    ```

## 🧠 Übungsaufgaben

Jetzt bist du dran! Versuche, diese Aufgaben zu lösen, um dein Wissen über Listen zu testen.

1.  **Meine Playlist 🎵**
    *   Erstelle eine leere Liste namens `meine_playlist`.
    *   Füge mit `append()` mindestens 5 deiner Lieblingssongs (als Strings) hinzu.
    *   Gib die gesamte Playlist aus.
    *   Entferne den zweiten Song aus der Liste mit `pop()`. Gib den entfernten Song aus.
    *   Gib die Playlist erneut aus.
    *   Überlege dir einen Song, den du am Anfang der Playlist haben möchtest, und füge ihn mit `insert()` an Index 0 ein.
    *   Gib die finale Playlist aus.

2.  **Notenliste 📊**
    *   Erstelle eine Liste `meine_noten` mit mindestens 5 fiktiven Schulnoten (als Zahlen, z.B. 1, 2, 3 ...).
    *   Lass dir die beste Note (kleinste Zahl) und die schlechteste Note (größte Zahl) ausgeben. Tipp: Sortiere die Liste zuerst!
    *   Berechne den Durchschnitt deiner Noten. (Tipp: `sum(listenname)` addiert alle Zahlen in einer Liste, `len(listenname)` gibt die Anzahl.)
    *   Gib aus, wie oft du die Note "1" bekommen hast (mit `count()`).

3.  **Einkaufszettel Deluxe 🛒**
    *   Erstelle eine verschachtelte Liste `einkaufszettel`. Jedes innere Listenelement soll den Namen eines Artikels und seinen Preis enthalten, z.B. `[["Apfel", 0.50], ["Milch", 1.20], ["Brot", 2.50]]`.
    *   Gib den Namen und Preis des zweiten Artikels auf deinem Zettel aus.
    *   Füge einen neuen Artikel mit Preis hinzu.
    *   Schreibe eine Schleife, die alle Artikel und ihre Preise schön formatiert ausgibt (z.B. "Apfel: 0.50 Euro").
    *   Berechne die Gesamtkosten aller Artikel auf dem Zettel.

Viel Spaß beim Ausprobieren! Listen sind ein mächtiges Werkzeug, und je mehr du damit übst, desto besser wirst du darin, sie für deine eigenen coolen Projekte einzusetzen!

---
[⬅️ Zurück zu Kapitel 3](/python-docs/Kapitel_3/Kapitel_3.md) | [🐍 Startseite](/python-docs/Kapitel_0/Anfang_Lese_Mich.md) | [➡️ Weiter zu Tupel](/python-docs/Kapitel_3/Tupel.md)
