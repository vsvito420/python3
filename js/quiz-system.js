/**
 * Quiz-System
 * 
 * Dieses Modul implementiert ein interaktives Quiz-System zur Überprüfung des Lernfortschritts.
 * Es bietet kapitelspezifische Tests mit Multiple-Choice-Fragen, automatische Bewertung
 * und detaillierte Erklärungen.
 */

// Konfiguration
const QUIZ_CONFIG = {
    storageKey: 'python_quiz_results',
    quizContainerId: 'quiz-container',
    sidebarTestId: 'sidebar-tests',
    activeClass: 'active',
    completedClass: 'completed',
    correctClass: 'correct',
    incorrectClass: 'incorrect',
    resultThresholdPercent: 70 // Prozentsatz für bestandenen Test
};

// Quiz-Daten für verschiedene Kapitel
const quizData = {
    'kapitel1': {
        title: 'Test: Grundlagen',
        description: 'Teste dein Wissen über Python-Grundlagen',
        questions: [
            {
                question: 'Was ist der Ausgabewert von print("Hello" + " " + "World")?',
                options: [
                    'Hello World',
                    '"Hello World"',
                    'Hello + World',
                    'Error'
                ],
                correctAnswer: 0,
                explanation: 'In Python können Strings mit dem + Operator verkettet werden.'
            },
            {
                question: 'Welche der folgenden Variablendeklarationen ist in Python korrekt?',
                options: [
                    'var x = 5;',
                    'int x = 5;',
                    'x = 5',
                    'let x = 5;'
                ],
                correctAnswer: 2,
                explanation: 'In Python werden Variablen ohne Typdeklaration zugewiesen.'
            },
            {
                question: 'Was ist der Wert von 7 // 2 in Python?',
                options: [
                    '3.5',
                    '3',
                    '3.0',
                    'Error'
                ],
                correctAnswer: 1,
                explanation: 'Der // Operator führt eine Ganzzahldivision durch und gibt das Ergebnis ohne Nachkommastellen zurück.'
            },
            {
                question: 'Welche Funktion wird verwendet, um den Typ einer Variable zu ermitteln?',
                options: [
                    'typeof()',
                    'type()',
                    'getType()',
                    'vartype()'
                ],
                correctAnswer: 1,
                explanation: 'Die Funktion type() gibt den Typ eines Objekts zurück.'
            },
            {
                question: 'Wie kommentiert man eine Zeile in Python?',
                options: [
                    '// Kommentar',
                    '/* Kommentar */',
                    '# Kommentar',
                    '-- Kommentar'
                ],
                correctAnswer: 2,
                explanation: 'In Python werden Kommentare mit dem # Zeichen eingeleitet.'
            }
        ]
    },
    'kapitel2': {
        title: 'Test: Kontrollstrukturen',
        description: 'Teste dein Wissen über bedingte Anweisungen und Schleifen',
        questions: [
            {
                question: 'Welches Schlüsselwort wird in Python für bedingte Anweisungen verwendet?',
                options: [
                    'switch',
                    'if',
                    'when',
                    'case'
                ],
                correctAnswer: 1,
                explanation: 'In Python werden bedingte Anweisungen mit dem Schlüsselwort "if" eingeleitet.'
            },
            {
                question: 'Wie wird eine for-Schleife in Python korrekt geschrieben?',
                options: [
                    'for (i = 0; i < 10; i++) { ... }',
                    'for i in range(10): ...',
                    'for (i in range(10)) { ... }',
                    'foreach (i in range(10)) { ... }'
                ],
                correctAnswer: 1,
                explanation: 'In Python wird eine for-Schleife mit "for i in range(10):" geschrieben, gefolgt von einem eingerückten Codeblock.'
            },
            {
                question: 'Was ist die Ausgabe von: for i in range(5): print(i)',
                options: [
                    '1 2 3 4 5',
                    '0 1 2 3 4',
                    '0 1 2 3 4 5',
                    '1 2 3 4'
                ],
                correctAnswer: 1,
                explanation: 'Die Funktion range(5) erzeugt eine Sequenz von 0 bis 4.'
            },
            {
                question: 'Welches Schlüsselwort wird verwendet, um eine Schleife vorzeitig zu beenden?',
                options: [
                    'exit',
                    'stop',
                    'break',
                    'end'
                ],
                correctAnswer: 2,
                explanation: 'Das Schlüsselwort "break" beendet eine Schleife vorzeitig.'
            },
            {
                question: 'Was bewirkt das Schlüsselwort "continue" in einer Schleife?',
                options: [
                    'Es beendet die Schleife',
                    'Es springt zur nächsten Iteration',
                    'Es pausiert die Schleife',
                    'Es startet die Schleife neu'
                ],
                correctAnswer: 1,
                explanation: 'Das Schlüsselwort "continue" überspringt den Rest des aktuellen Schleifendurchlaufs und springt zur nächsten Iteration.'
            }
        ]
    },
    'kapitel3': {
        title: 'Test: Datenstrukturen',
        description: 'Teste dein Wissen über Listen und andere Datenstrukturen',
        questions: [
            {
                question: 'Wie erstellt man eine leere Liste in Python?',
                options: [
                    'list()',
                    '[]',
                    'new List()',
                    '{}'
                ],
                correctAnswer: 1,
                explanation: 'Eine leere Liste wird mit [] erstellt.'
            },
            {
                question: 'Wie greift man auf das erste Element einer Liste zu?',
                options: [
                    'list.first()',
                    'list[0]',
                    'list[1]',
                    'list.get(0)'
                ],
                correctAnswer: 1,
                explanation: 'In Python beginnt die Indizierung bei 0, daher ist list[0] das erste Element.'
            },
            {
                question: 'Welche Methode fügt ein Element am Ende einer Liste hinzu?',
                options: [
                    'list.add(item)',
                    'list.append(item)',
                    'list.insert(item)',
                    'list.push(item)'
                ],
                correctAnswer: 1,
                explanation: 'Die Methode append() fügt ein Element am Ende einer Liste hinzu.'
            },
            {
                question: 'Was ist der Unterschied zwischen einer Liste und einem Tupel in Python?',
                options: [
                    'Listen können mehr Elemente enthalten als Tupel',
                    'Listen sind schneller als Tupel',
                    'Listen sind veränderbar, Tupel sind unveränderbar',
                    'Es gibt keinen Unterschied'
                ],
                correctAnswer: 2,
                explanation: 'Listen sind veränderbar (mutable), während Tupel unveränderbar (immutable) sind.'
            },
            {
                question: 'Wie erstellt man ein Dictionary in Python?',
                options: [
                    'dict(key=value)',
                    '{key: value}',
                    'new Dict(key, value)',
                    'Dictionary(key, value)'
                ],
                correctAnswer: 1,
                explanation: 'Ein Dictionary wird mit geschweiften Klammern und Schlüssel-Wert-Paaren erstellt: {key: value}'
            }
        ]
    }
};

// Speichert die Quiz-Ergebnisse
let quizResults = {};

/**
 * Initialisiert das Quiz-System
 */
function initQuizSystem() {
    // Lade gespeicherte Ergebnisse
    loadQuizResults();
    
    // Erstelle den Test-Bereich in der Seitenleiste
    createSidebarTestSection();
    
    // Füge Event-Listener für Quiz-Links hinzu
    addQuizLinkListeners();
    
    // Zeige das Quiz an, wenn ein Test-Parameter in der URL vorhanden ist
    const urlParams = new URLSearchParams(window.location.search);
    const testParam = urlParams.get('test');
    
    if (testParam && quizData[testParam]) {
        showQuiz(testParam);
    }
}

/**
 * Lädt die gespeicherten Quiz-Ergebnisse aus dem localStorage
 */
function loadQuizResults() {
    const savedResults = localStorage.getItem(QUIZ_CONFIG.storageKey);
    
    if (savedResults) {
        try {
            quizResults = JSON.parse(savedResults);
        } catch (e) {
            console.error('Fehler beim Laden der Quiz-Ergebnisse:', e);
            quizResults = {};
        }
    }
}

/**
 * Speichert die Quiz-Ergebnisse im localStorage
 */
function saveQuizResults() {
    try {
        localStorage.setItem(QUIZ_CONFIG.storageKey, JSON.stringify(quizResults));
    } catch (e) {
        console.error('Fehler beim Speichern der Quiz-Ergebnisse:', e);
    }
}

/**
 * Erstellt den Test-Bereich in der Seitenleiste
 */
function createSidebarTestSection() {
    // Finde die Sidebar
    const sidebar = document.querySelector('.sidebar-nav');
    
    if (!sidebar) return;
    
    // Erstelle den Test-Bereich
    const testSection = document.createElement('div');
    testSection.id = QUIZ_CONFIG.sidebarTestId;
    testSection.className = 'sidebar-section';
    
    // Erstelle den Titel
    const title = document.createElement('h3');
    title.textContent = 'TESTS';
    testSection.appendChild(title);
    
    // Erstelle die Liste der Tests
    const testList = document.createElement('ul');
    testList.className = 'test-list';
    
    // Füge Tests für jedes Kapitel hinzu
    for (const quizId in quizData) {
        const quiz = quizData[quizId];
        const listItem = document.createElement('li');
        
        const link = document.createElement('a');
        link.href = `?test=${quizId}`;
        link.textContent = quiz.title;
        link.dataset.quizId = quizId;
        
        // Füge Fortschrittsanzeige hinzu
        const progress = document.createElement('span');
        progress.className = 'test-progress';
        
        // Aktualisiere die Fortschrittsanzeige basierend auf den gespeicherten Ergebnissen
        updateTestProgress(quizId, progress);
        
        listItem.appendChild(link);
        listItem.appendChild(progress);
        testList.appendChild(listItem);
    }
    
    testSection.appendChild(testList);
    
    // Füge den Test-Bereich zur Sidebar hinzu
    sidebar.appendChild(testSection);
}

/**
 * Aktualisiert die Fortschrittsanzeige für einen Test
 */
function updateTestProgress(quizId, progressElement) {
    if (quizResults[quizId]) {
        const result = quizResults[quizId];
        const percentage = Math.round((result.score / result.total) * 100);
        
        progressElement.textContent = `${result.score}/${result.total}`;
        
        // Markiere bestandene Tests
        if (percentage >= QUIZ_CONFIG.resultThresholdPercent) {
            progressElement.classList.add(QUIZ_CONFIG.completedClass);
        } else {
            progressElement.classList.remove(QUIZ_CONFIG.completedClass);
        }
    } else {
        progressElement.textContent = '';
    }
}

/**
 * Fügt Event-Listener für Quiz-Links hinzu
 */
function addQuizLinkListeners() {
    document.addEventListener('click', function(event) {
        // Prüfe, ob ein Quiz-Link geklickt wurde
        if (event.target.tagName === 'A' && event.target.dataset.quizId) {
            event.preventDefault();
            
            const quizId = event.target.dataset.quizId;
            showQuiz(quizId);
            
            // Aktualisiere die URL
            const url = new URL(window.location);
            url.searchParams.set('test', quizId);
            window.history.pushState({}, '', url);
        }
    });
}

/**
 * Zeigt ein Quiz an
 */
function showQuiz(quizId) {
    const quiz = quizData[quizId];
    
    if (!quiz) return;
    
    // Erstelle oder finde den Quiz-Container
    let quizContainer = document.getElementById(QUIZ_CONFIG.quizContainerId);
    
    if (!quizContainer) {
        quizContainer = document.createElement('div');
        quizContainer.id = QUIZ_CONFIG.quizContainerId;
        
        // Füge den Quiz-Container zum Inhaltsbereich hinzu
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.appendChild(quizContainer);
        } else {
            document.body.appendChild(quizContainer);
        }
    }
    
    // Leere den Container
    quizContainer.innerHTML = '';
    
    // Erstelle den Quiz-Header
    const header = document.createElement('div');
    header.className = 'quiz-header';
    
    const title = document.createElement('h2');
    title.textContent = quiz.title;
    header.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = quiz.description;
    header.appendChild(description);
    
    quizContainer.appendChild(header);
    
    // Erstelle das Quiz-Formular
    const form = document.createElement('form');
    form.className = 'quiz-form';
    form.dataset.quizId = quizId;
    
    // Füge Fragen hinzu
    quiz.questions.forEach((question, questionIndex) => {
        const questionElement = createQuestionElement(question, questionIndex);
        form.appendChild(questionElement);
    });
    
    // Füge Submit-Button hinzu
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Test auswerten';
    submitButton.className = 'quiz-submit-button';
    form.appendChild(submitButton);
    
    // Füge Event-Listener für das Formular hinzu
    form.addEventListener('submit', handleQuizSubmit);
    
    quizContainer.appendChild(form);
    
    // Scrolle zum Quiz
    quizContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Markiere den aktiven Test in der Seitenleiste
    updateActiveSidebarTest(quizId);
}

/**
 * Erstellt ein Element für eine Frage
 */
function createQuestionElement(question, questionIndex) {
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-question';
    questionElement.dataset.questionIndex = questionIndex;
    
    const questionText = document.createElement('h3');
    questionText.textContent = `${questionIndex + 1}. ${question.question}`;
    questionElement.appendChild(questionText);
    
    // Erstelle die Optionen
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'quiz-options';
    
    question.options.forEach((option, optionIndex) => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'quiz-option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question-${questionIndex}`;
        radio.id = `question-${questionIndex}-option-${optionIndex}`;
        radio.value = optionIndex;
        
        const label = document.createElement('label');
        label.htmlFor = `question-${questionIndex}-option-${optionIndex}`;
        label.textContent = option;
        
        optionContainer.appendChild(radio);
        optionContainer.appendChild(label);
        optionsContainer.appendChild(optionContainer);
    });
    
    questionElement.appendChild(optionsContainer);
    
    // Erstelle den Bereich für die Erklärung (wird nach der Auswertung angezeigt)
    const explanation = document.createElement('div');
    explanation.className = 'quiz-explanation';
    explanation.style.display = 'none';
    questionElement.appendChild(explanation);
    
    return questionElement;
}

/**
 * Behandelt das Absenden eines Quiz-Formulars
 */
function handleQuizSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const quizId = form.dataset.quizId;
    const quiz = quizData[quizId];
    
    if (!quiz) return;
    
    let score = 0;
    const total = quiz.questions.length;
    
    // Werte jede Frage aus
    quiz.questions.forEach((question, questionIndex) => {
        const questionElement = form.querySelector(`.quiz-question[data-question-index="${questionIndex}"]`);
        const selectedOption = form.querySelector(`input[name="question-${questionIndex}"]:checked`);
        const explanationElement = questionElement.querySelector('.quiz-explanation');
        
        // Zeige die Erklärung an
        explanationElement.textContent = question.explanation;
        explanationElement.style.display = 'block';
        
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            
            // Prüfe, ob die Antwort korrekt ist
            if (selectedValue === question.correctAnswer) {
                score++;
                questionElement.classList.add(QUIZ_CONFIG.correctClass);
            } else {
                questionElement.classList.add(QUIZ_CONFIG.incorrectClass);
                
                // Markiere die richtige Antwort
                const correctOptionElement = form.querySelector(`#question-${questionIndex}-option-${question.correctAnswer}`).parentNode;
                correctOptionElement.classList.add('correct-option');
            }
        } else {
            // Keine Antwort ausgewählt
            questionElement.classList.add(QUIZ_CONFIG.incorrectClass);
            
            // Markiere die richtige Antwort
            const correctOptionElement = form.querySelector(`#question-${questionIndex}-option-${question.correctAnswer}`).parentNode;
            correctOptionElement.classList.add('correct-option');
        }
        
        // Deaktiviere die Optionen
        const options = questionElement.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            option.disabled = true;
        });
    });
    
    // Speichere das Ergebnis
    quizResults[quizId] = {
        score: score,
        total: total,
        date: new Date().toISOString()
    };
    
    saveQuizResults();
    
    // Zeige das Ergebnis an
    showQuizResult(form, score, total);
    
    // Aktualisiere die Fortschrittsanzeige in der Seitenleiste
    const progressElement = document.querySelector(`.test-list a[data-quiz-id="${quizId}"]`).nextElementSibling;
    updateTestProgress(quizId, progressElement);
}

/**
 * Zeigt das Ergebnis eines Quiz an
 */
function showQuizResult(form, score, total) {
    // Erstelle das Ergebnis-Element
    const resultElement = document.createElement('div');
    resultElement.className = 'quiz-result';
    
    const percentage = Math.round((score / total) * 100);
    
    // Bestimme, ob der Test bestanden wurde
    const passed = percentage >= QUIZ_CONFIG.resultThresholdPercent;
    
    resultElement.classList.add(passed ? QUIZ_CONFIG.correctClass : QUIZ_CONFIG.incorrectClass);
    
    const resultText = document.createElement('h3');
    resultText.textContent = passed ? 'Test bestanden!' : 'Test nicht bestanden';
    resultElement.appendChild(resultText);
    
    const scoreText = document.createElement('p');
    scoreText.textContent = `Du hast ${score} von ${total} Fragen richtig beantwortet (${percentage}%).`;
    resultElement.appendChild(scoreText);
    
    // Füge einen Button zum Wiederholen des Tests hinzu
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Test wiederholen';
    retryButton.className = 'quiz-retry-button';
    retryButton.addEventListener('click', function() {
        // Hole die Quiz-ID aus dem Formular
        const quizId = form.dataset.quizId;
        showQuiz(quizId);
    });
    
    resultElement.appendChild(retryButton);
    
    // Füge das Ergebnis-Element vor dem Submit-Button ein
    const submitButton = form.querySelector('.quiz-submit-button');
    submitButton.style.display = 'none';
    form.insertBefore(resultElement, submitButton);
    
    // Scrolle zum Ergebnis
    resultElement.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Aktualisiert den aktiven Test in der Seitenleiste
 */
function updateActiveSidebarTest(quizId) {
    // Entferne die aktive Klasse von allen Test-Links
    const testLinks = document.querySelectorAll(`.test-list a`);
    testLinks.forEach(link => {
        link.classList.remove(QUIZ_CONFIG.activeClass);
    });
    
    // Füge die aktive Klasse zum ausgewählten Test-Link hinzu
    const activeLink = document.querySelector(`.test-list a[data-quiz-id="${quizId}"]`);
    if (activeLink) {
        activeLink.classList.add(QUIZ_CONFIG.activeClass);
    }
}

// Exportiere die Funktionen
window.quizSystem = {
    init: initQuizSystem,
    showQuiz: showQuiz
};

// Initialisiere das Quiz-System, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initQuizSystem);