# Kapitel 1 - Textausgabe in der Konsole

# Navigation:
# Zurück zur Hauptseite: /Projekte/Kapitel_0/Anfang_Lese_Mich.md
# Nächstes Kapitel: /Projekte/Kapitel_1/Variablen_und_Datentypen.md

# In Python können wir Text in der Konsole ausgeben, indem wir die print()-Funktion verwenden.
# Die print()-Funktion ist eine der grundlegendsten Funktionen in Python.

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

# Übung: Experimentiere mit verschiedenen print()-Anweisungen!
# Versuche, deinen Namen und dein Alter auszugeben.
# Versuche, eine kleine Geschichte mit mehreren Zeilen zu erstellen.
