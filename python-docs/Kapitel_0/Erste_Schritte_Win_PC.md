# 🐍 Erste Schritte mit Python auf deinem Windows-PC

Willkommen zu dieser Anleitung! Hier lernst du Schritt für Schritt, wie du Python auf deinem Windows-Computer installierst. Python ist eine tolle Programmiersprache, um Spiele zu entwickeln, Webseiten zu bauen oder Daten zu analysieren. Los geht's!

➡️ [Startseite](/Projekte/Kapitel_0/Anfang_Lese_Mich.md)
➡️ [Weiter zum ersten Programm: Textausgabe](/Projekte/Kapitel_1/Textausgabe_InDerKonsole.md)
🍏 [Anleitung für MacOS](../Kapitel_0/Erste_Schritte_Mac.md)

---

## 🎯 Was du brauchst und was wir machen

Um mit Python auf deinem Windows-PC richtig durchstarten zu können, benötigst du zwei wichtige Dinge:

1.  **Python selbst**: Das ist die Programmiersprache.
2.  **Visual Studio Code (VSCode)**: Das ist ein cooler Texteditor, der dir beim Schreiben von Python-Code hilft.

Wir werden uns in dieser Anleitung auf die Installation von Python konzentrieren. Für VSCode gibt es eine eigene Anleitung, die wir später verlinken.

Zusätzlich sind **Git** und **GitHub** super nützliche Werkzeuge, wenn du später größere Projekte machen oder mit anderen zusammenarbeiten möchtest. Aber keine Sorge, das brauchen wir jetzt am Anfang noch nicht.

---

## 🛠️ Schritt 1: Python herunterladen und installieren

Die Installation von Python ist wie das Aufbauen eines neuen LEGO-Sets – folge einfach den Schritten!

1.  **Besuche die offizielle Python-Website:**
    *   Öffne deinen Webbrowser (z.B. Chrome, Firefox oder Edge) und gehe zu [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/).
    *   Dort siehst du die neuesten stabilen Versionen für Windows. Klicke auf den Download-Link für die **neueste Python-Version** (meistens ganz oben als "Latest Python X.Y.Z Release"). Achte darauf, dass du den "Windows installer (64-bit)" herunterlädst, wenn du einen modernen PC hast (was sehr wahrscheinlich ist).

2.  **Starte das Installationsprogramm:**
    *   Sobald der Download abgeschlossen ist, öffne die heruntergeladene `.exe`-Datei (z.B. `python-3.12.3-amd64.exe`).
    *   Es öffnet sich das Python-Installationsfenster.

3.  **WICHTIG ❗ "Add Python to PATH" aktivieren:**
    *   Ganz unten im ersten Fenster des Installers siehst du zwei Kästchen. Setze unbedingt einen Haken bei **"Add python.exe to PATH"** (oder ähnlich lautend, z.B. "Add Python X.Y to PATH").
    *   **Warum ist das wichtig?** Wenn du diesen Haken setzt, kann dein Computer Python von überall aus finden und ausführen, zum Beispiel in der Kommandozeile. Das macht vieles einfacher! Stell dir vor, du gibst deinem Gehirn eine neue Adresse, damit es weiß, wo es Python finden kann.

    ![Python Installer PATH Option](https://docs.python.org/3/_images/win_installer.png)
    *(Beispielbild, deine Version könnte neuer aussehen)*

4.  **Wähle "Install Now":**
    *   Für den Anfang ist die Standardinstallation perfekt. Klicke auf **"Install Now"**. Python wird nun in einem Standardverzeichnis installiert (normalerweise unter deinem Benutzerprofil).
    *   *Optional für Fortgeschrittene: "Customize installation" erlaubt dir, den Installationsort und andere Komponenten anzupassen. Das brauchen wir aber jetzt nicht.*

5.  **Warte, bis die Installation abgeschlossen ist:**
    *   Das kann ein paar Minuten dauern. Hol dir vielleicht ein Glas Wasser, während dein PC arbeitet. ☕

6.  **Installation erfolgreich!**
    *   Wenn alles geklappt hat, siehst du eine Meldung "Setup was successful". Du kannst das Fenster jetzt schließen. Super gemacht! 🎉

---

## ✅ Schritt 2: Überprüfen, ob Python richtig installiert ist

Jetzt wollen wir testen, ob Python auch wirklich startklar ist.

1.  **Öffne die Kommandozeile (CMD):**
    *   Drücke die **Windows-Taste** auf deiner Tastatur.
    *   Tippe `cmd` ein.
    *   Klicke auf "Eingabeaufforderung" (oder "Command Prompt") in den Suchergebnissen. Es öffnet sich ein schwarzes Fenster – das ist die Kommandozeile! Keine Angst, sie beißt nicht. 😉

2.  **Überprüfe die Python-Version:**
    *   Tippe den folgenden Befehl in die Kommandozeile und drücke Enter:
        ```bash
        python --version
        ```
    *   Wenn alles richtig installiert ist, sollte dir die Version von Python angezeigt werden, die du gerade installiert hast (z.B. `Python 3.12.3`).

3.  **Überprüfe die Pip-Version (optional, aber gut zu wissen):**
    *   Pip ist der Paketmanager für Python, mit dem du später zusätzliche Bibliotheken installieren kannst. Tippe ein:
        ```bash
        pip --version
        ```
    *   Auch hier sollte eine Versionsnummer erscheinen.

4.  **Führe ein winziges Python-Programm aus:**
    *   Um ganz sicherzugehen, gib diesen Befehl ein und drücke Enter:
        ```bash
        python -c "print('Hallo von Python!')"
        ```
    *   Wenn du die Nachricht `Hallo von Python!` siehst, dann ist alles perfekt! Python läuft! 🥳

---

## ❓ Hilfe! Was tun, wenn etwas schiefgeht? (Fehlerbehebung)

Manchmal klappt nicht alles auf Anhieb. Hier ein paar Tipps:

*   **Fehler: `python` wird nicht erkannt (`'python' is not recognized as an internal or external command...`)**
    *   **Ursache:** Höchstwahrscheinlich hast du vergessen, beim Installieren den Haken bei **"Add Python to PATH"** zu setzen.
    *   **Lösung 1 (empfohlen):** Deinstalliere Python (Systemsteuerung > Programme > Programme und Features > Python deinstallieren) und installiere es erneut. Achte diesmal GANZ GENAU auf den Haken bei "Add Python to PATH"!
    *   **Lösung 2 (für Mutige):** Du kannst den PATH auch manuell hinzufügen. Das ist aber etwas komplizierter. Suche im Internet nach "Python PATH manuell hinzufügen Windows" für eine Anleitung.

*   **Mehrere Python-Versionen installiert?**
    *   Wenn du schon mal Python installiert hattest, kann es sein, dass du jetzt mehrere Versionen hast. Das ist meistens kein Problem, aber manchmal kann es zu Verwirrung führen. Mit `py -0p` in der Kommandozeile kannst du sehen, welche Versionen installiert sind und wo.

*   **Probleme beim Download?**
    *   Stelle sicher, dass deine Internetverbindung stabil ist.
    *   Versuche, den Download von der offiziellen Python-Website erneut zu starten.

---

## 💻 Schritt 3: VSCode (Visual Studio Code) installieren

Super! Python ist jetzt auf deinem PC. Als Nächstes brauchst du einen guten Texteditor, um deinen Python-Code zu schreiben. Wir empfehlen **Visual Studio Code (VSCode)**. Es ist kostenlos, sehr beliebt und hat tolle Funktionen, die dir das Programmieren erleichtern.

🔗 **Hier geht's zur Anleitung:** [**VSCode** installieren unter **Windows**](Installation_VSCode_Win.md)

---

## 🚀 Nächste Schritte

Herzlichen Glückwunsch! Du hast Python erfolgreich installiert und bist bereit für die Welt des Programmierens!

Was kommt als Nächstes?

1.  **Installiere VSCode:** Folge der Anleitung oben, um deinen Programmier-Editor einzurichten.
2.  **Dein erstes Python-Programm:** Sobald VSCode installiert ist, kannst du direkt mit deinen ersten Programmierübungen starten!
    ➡️ [Los geht's mit der Textausgabe in der Konsole!](/Projekte/Kapitel_1/Textausgabe_InDerKonsole.md)

Viel Spaß beim Entdecken von Python! 💡
