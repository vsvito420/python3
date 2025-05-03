# Installation von Visual Studio Code auf Windows

## Methode 1: Klassische Installation
1. Besuche die offizielle [Visual Studio Code Website](https://code.visualstudio.com/)
2. Klicke auf den Download-Button für Windows
3. Führe die heruntergeladene `.exe` Datei aus
4. Folge den Installationsanweisungen
    - Aktiviere die Option "Add to PATH"
    - Aktiviere "Create a desktop icon" wenn gewünscht

## Methode 2: Installation via Winget (Windows 11)
1. Öffne PowerShell oder die Eingabeaufforderung
2. Führe folgenden Befehl aus:
```powershell
winget install Microsoft.VisualStudioCode
```
Bestätige abfragen mit **y** (yes) oder **j** (Ja) falls du gefragt wirst
## Nach der Installation
1. Starte VS Code
2. Installiere die **Python Erweiterung**:
    - Klicke auf das Extensions-Symbol (**STRG**+**Shift**+**X**)
    - Suche nach "**Python**"
    - Installiere die offizielle **Python-Erweiterung von Microsoft**


# gehe nun zu [**Kapitel 1**](../Kapitel_1/Kapitel_1.md)

## Überprüfung der Installation
1. Öffne cmd oder powershell in vscode
2. Gib `code --version` ein
3. Bei erfolgreicher Installation wird die VS Code Version angezeigt

