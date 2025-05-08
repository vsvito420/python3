# 🐍 Erste Schritte mit Python auf deinem Mac

Hallo angehender Programmier-Profi! 👋

Diese Anleitung zeigt dir Schritt für Schritt, wie du Python auf deinem Mac installierst. Python ist eine super coole Programmiersprache, mit der du Spiele, Webseiten und vieles mehr entwickeln kannst. Los geht's!

[⬅️ Zurück zur Startseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md) | [Weiter zur Windows Anleitung ➡️](../Kapitel_0/Erste_Schritte_Win_PC.md)

---

## 🤔 Hat mein Mac schon Python?

Viele neuere Macs haben bereits eine Version von Python vorinstalliert. Das ist praktisch, aber oft ist es nicht die allerneueste Version. Für unsere Programmier-Abenteuer ist es am besten, wenn wir uns die aktuellste Version von Python holen. So haben wir Zugriff auf die neuesten Funktionen und Verbesserungen.

---

## 🛠️ Python auf deinem Mac installieren: Schritt-für-Schritt

Die Installation von Python ist kinderleicht. Folge einfach diesen Schritten:

### 1. Lade Python herunter 📥

*   Öffne deinen Webbrowser (z.B. Safari oder Chrome) und gehe zur offiziellen Python-Webseite: [https://www.python.org](https://www.python.org)
*   Klicke dort auf den "Downloads"-Bereich. Die Webseite erkennt normalerweise automatisch, dass du einen Mac benutzt und schlägt dir die richtige Version vor.
*   Lade die neueste stabile Version von Python für macOS herunter. Das wird eine Datei sein, die meistens mit `.pkg` endet.

    ✨ **Tipp für Profis:** Es gibt unterschiedliche Installationspakete für Macs mit Intel-Prozessoren und neuere Macs mit Apple Silicon (M1, M2, M3 Chips). Die Python-Webseite sollte dir automatisch das richtige Paket anbieten. Falls du dir unsicher bist, welches du brauchst, keine Sorge – der Standard-Installer ist meistens universell und funktioniert auf beiden!

### 2. Installiere Python 🚀

*   Finde die heruntergeladene `.pkg`-Datei (meistens im "Downloads"-Ordner) und öffne sie mit einem Doppelklick.
*   Ein Installationsfenster wird sich öffnen. Klicke dich einfach durch die Schritte ("Fortfahren", "Installieren" usw.). Du musst eventuell dein Mac-Benutzerpasswort eingeben, um die Installation zu erlauben. Das ist ganz normal!
*   Folge den Anweisungen, bis die Installation abgeschlossen ist.

### 3. Überprüfe die Installation ✅

Super, Python sollte jetzt auf deinem Mac installiert sein! Lass uns das kurz überprüfen:

*   **Öffne das Terminal:**
    *   Klicke auf die Lupe 🔍 oben rechts in deiner Menüleiste (Spotlight-Suche).
    *   Tippe `Terminal` ein und drücke die Enter-Taste.
    *   Ein neues Fenster öffnet sich – das ist das Terminal! Es sieht vielleicht erstmal ein bisschen technisch aus, aber keine Angst, wir brauchen es nur kurz.

*   **Python-Version prüfen:**
    *   Tippe folgenden Befehl ins Terminal und drücke Enter:
        ```bash
        python3 --version
        ```
    *   Wenn alles geklappt hat, sollte dir das Terminal jetzt die installierte Python-Version anzeigen (z.B. `Python 3.12.3`).

*   **Kleiner Test (optional):**
    *   Du kannst auch direkt einen winzigen Python-Befehl im Terminal ausführen. Tippe das hier ein und drücke Enter:
        ```bash
        python3 -c "print('🎉 Hurra, Python funktioniert!')"
        ```
    *   Wenn als Antwort `🎉 Hurra, Python funktioniert!` erscheint, ist alles bestens!

---

## 💻 Nächster Schritt: VSCode installieren (Sehr empfohlen!)

Um richtig cool mit Python programmieren zu können, brauchst du einen guten Code-Editor. Wir empfehlen **Visual Studio Code (VSCode)**. Das ist ein kostenloses Programm, das dir beim Schreiben von Code hilft und viele nützliche Funktionen hat.

➡️ Hier geht's zur Anleitung: [**VSCode** installieren unter **MacOS**](Installation_VSCode_Mac.md)

---

## 🤯 Was tun, wenn etwas nicht klappt? (Fehlerbehebung)

Manchmal läuft bei der Installation nicht alles glatt. Hier sind ein paar Tipps, falls du auf Probleme stößt:

*   **"command not found: python3"**:
    *   Diese Meldung im Terminal bedeutet, dass dein Mac den `python3`-Befehl nicht findet.
    *   **Mögliche Lösung:** Starte das Terminal neu. Manchmal müssen die Änderungen erst erkannt werden.
    *   **Mögliche Lösung 2:** Überprüfe, ob die Installation wirklich erfolgreich war. Führe den Installer ggf. noch einmal aus. Bei neueren Python-Installern für macOS wird der sogenannte "PATH" (der Pfad, wo dein Mac nach Programmen sucht) normalerweise automatisch richtig eingestellt.

*   **Falsche Python-Version wird angezeigt:**
    *   Wenn `python3 --version` eine sehr alte Version anzeigt (z.B. Python 2.x), dann wird vielleicht noch die vorinstallierte Version deines Macs verwendet.
    *   **Mögliche Lösung:** Stelle sicher, dass du den Installer von [python.org](https://www.python.org) vollständig ausgeführt hast. Nach der Installation einer neuen Version sollte `python3` immer auf die neuere Version zeigen.
    *   **Hinweis:** Ältere Macs oder Anleitungen verwenden manchmal den Befehl `python` statt `python3`. Für die aktuellen Python-Versionen ist `python3` der richtige Befehl.

*   **Probleme mit dem Installer:**
    *   Wenn der `.pkg`-Installer sich nicht öffnen lässt oder Fehler anzeigt, versuche, ihn erneut von [python.org](https://www.python.org) herunterzuladen. Manchmal kann beim Download etwas schiefgehen.

Wenn du immer noch Probleme hast, frage einen Erwachsenen oder suche online nach der Fehlermeldung. Es gibt viele hilfsbereite Menschen in der Python-Community! 🧑‍🤝‍🧑

---

## 🚀 Deine nächsten Schritte

Herzlichen Glückwunsch! Python ist startklar auf deinem Mac. Was nun?

1.  **Installiere VSCode:** Wie oben erwähnt, ist ein guter Code-Editor Gold wert. [Folge dieser Anleitung](Installation_VSCode_Mac.md).
2.  **Starte mit den ersten Programmierübungen:**
    *   Sobald Python und VSCode eingerichtet sind, kannst du mit den ersten richtigen Programmieraufgaben loslegen!
    *   Ein guter Startpunkt ist es, Text auf dem Bildschirm auszugeben: [Textausgabe in der Konsole](/Projekte/Kapitel_1/Textausgabe_InDerKonsole.md)

Viel Spaß beim Entdecken der Python-Welt! 🎈
