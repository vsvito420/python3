/**
 * Quiz-System für die Python-Lernplattform
 * Ermöglicht das Erstellen und Durchführen von Tests zu verschiedenen Kapiteln
 */

// Globale Variablen für das Quiz-System
window.quizzes = {};
window.currentQuiz = null;
window.quizResults = {};

/**
 * Quiz-Daten für verschiedene Kapitel
 * Jedes Quiz enthält Fragen mit verschiedenen Antwortmöglichkeiten
 */
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
                question: 'Welcher Datentyp ist 42?',
                options: [
                    'String',
                    'Float',
                    'Integer',
                    'Boolean'
                ],
                correctAnswer: 2,
                explanation: '42 ist eine ganze Zahl und damit vom Typ Integer.'
            },
            {
                question: 'Wie definiert man eine Variable x mit dem Wert 10?',
                options: [
                    'x := 10',
                    'var x = 10',
                    'x = 10',
                    'int x = 10'
                ],
                correctAnswer: 2,
                explanation: 'In Python werden Variablen ohne Typdeklaration mit dem = Operator zugewiesen.'
            }
        ]
    },
    'kapitel2': {
        title: 'Test: Kontrollstrukturen',
        description: 'Teste dein Wissen über Bedingungen und Schleifen',
        questions: [
            {
                question: 'Welche Schleife wird mindestens einmal ausgeführt?',
                options: [
                    'for-Schleife',
                    'while-Schleife',
                    'do-while-Schleife',
                    'Keine der genannten'
                ],
                correctAnswer: 3,
                explanation: 'Python hat keine do-while-Schleife. Sowohl for- als auch while-Schleifen können 0-mal ausgeführt werden.'
            },
            {
                question: 'Was ist die Ausgabe von: if True: print("A") else: print("B")',
                options: [
                    'A',
                    'B',
                    'A und B',
                    'Syntaxfehler'
                ],
                correctAnswer: 0,
                explanation: 'Da die Bedingung True ist, wird nur der if-Block ausgeführt.'
            },
            {
                question: 'Wie oft wird die Schleife ausgeführt: for i in range(5):',
                options: [
                    '4 mal',
                    '5 mal',
                    '6 mal',
                    'Unendlich oft'
                ],
                correctAnswer: 1,
                explanation: 'range(5) erzeugt die Sequenz 0, 1, 2, 3, 4, also 5 Werte.'
            }
        ]
    },
    'kapitel3': {
        title: 'Test: Datenstrukturen',
        description: 'Teste dein Wissen über Listen und andere Datenstrukturen',
        questions: [
            {
                question: 'Wie erstellt man eine leere Liste?',
                options: [
                    'list()',
                    '[]',
                    'new List()',
                    'Beide A und B sind korrekt'
                ],
                correctAnswer: 3,
                explanation: 'In Python kann eine leere Liste sowohl mit list() als auch mit [] erstellt werden.'
            },
            {
                question: 'Was ist der Wert von [1, 2, 3] + [4, 5]?',
                options: [
                    '[1, 2, 3, 4, 5]',
                    '[5, 7, 8]',
                    'Error',
                    '[1, 2, 3, [4, 5]]'
                ],
                correctAnswer: 0,
                explanation: 'Der + Operator verkettet Listen in Python.'
            },
            {
                question: 'Wie greift man auf das erste Element einer Liste zu?',
                options: [
                    'list[0]',
                    'list[1]',
                    'list.first()',
                    'list.get(0)'
                ],
                correctAnswer: 0,
                explanation: 'In Python beginnt die Indexierung bei 0, daher ist das erste Element an Index 0.'
            }
        ]
    }
};

/**
 * Initialisiere das Quiz-System
 */
function initializeQuizSystem() {
    // Speichere die Quiz-Daten
    window.quizzes = quizData;
    
    // Lade gespeicherte Quiz-Ergebnisse
    loadQuizResults();
    
    // Füge Quiz-Links zur Sidebar hinzu
    addQuizLinksToSidebar();
    
    console.log('Quiz-System initialisiert');
}

/**
 * Lade gespeicherte Quiz-Ergebnisse aus dem localStorage
 */
function loadQuizResults() {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
        window.quizResults = JSON.parse(savedResults);
    }
}

/**
 * Speichere Quiz-Ergebnisse im localStorage
 */
function saveQuizResults() {
    localStorage.setItem('quizResults', JSON.stringify(window.quizResults));
}

/**
 * Füge Quiz-Links zur Sidebar hinzu
 */
function addQuizLinksToSidebar() {
    // Finde die Sidebar-Menü-Liste
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (!sidebarMenu) {
        console.error('Sidebar-Menü nicht gefunden');
        return;
    }
    
    // Erstelle einen neuen Abschnitt für Tests
    const testSection = document.createElement('li');
    testSection.className = 'chapter-item test-section';
    testSection.innerHTML = `
        <span class="chapter-title">TEST</span>
        <ul class="quiz-menu">
            ${Object.keys(window.quizzes).map(quizId => {
                const quiz = window.quizzes[quizId];
                const completed = window.quizResults[quizId] && window.quizResults[quizId].completed;
                const score = completed ? `${window.quizResults[quizId].score}/${window.quizResults[quizId].total}` : '';
                return `
                    <li class="quiz-item ${completed ? 'completed' : ''}">
                        <a href="javascript:void(0)" onclick="loadQuiz('${quizId}')">
                            ${quiz.title} ${score ? `<span class="quiz-score">${score}</span>` : ''}
                        </a>
                    </li>
                `;
            }).join('')}
        </ul>
    `;
    
    // Füge den Test-Abschnitt zur Sidebar hinzu
    sidebarMenu.appendChild(testSection);
    
    // Füge CSS für die Quiz-Menü-Elemente hinzu
    addQuizStyles();
}

/**
 * Füge CSS-Stile für das Quiz-System hinzu
 */
function addQuizStyles() {
    // Erstelle ein neues Style-Element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .test-section {
            margin-top: 20px;
            border-top: 1px solid var(--border-color);
            padding-top: 10px;
        }
        
        .chapter-title {
            font-weight: bold;
            color: var(--secondary-color);
            display: block;
            padding: 5px 15px;
            font-size: 1.1em;
        }
        
        .quiz-menu {
            list-style: none;
            padding-left: 15px;
        }
        
        .quiz-item {
            margin: 5px 0;
        }
        
        .quiz-item a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            border-radius: var(--border-radius-sm);
            transition: background-color 0.2s ease;
        }
        
        .quiz-item a:hover {
            background-color: rgba(44, 62, 80, 0.1);
        }
        
        .quiz-item.completed a {
            color: var(--success-color);
        }
        
        .quiz-score {
            font-size: 0.9em;
            background-color: var(--success-color);
            color: white;
            padding: 2px 6px;
            border-radius: 10px;
        }
        
        .quiz-container {
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: var(--border-radius-lg);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            padding: var(--spacing-xl);
            margin-bottom: var(--spacing-xl);
            border: 1px solid var(--macos-glass-border);
        }
        
        .quiz-header {
            margin-bottom: var(--spacing-lg);
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: var(--spacing-md);
        }
        
        .quiz-description {
            margin-bottom: var(--spacing-lg);
            font-style: italic;
            color: var(--secondary-color);
        }
        
        .quiz-question {
            margin-bottom: var(--spacing-xl);
            padding: var(--spacing-lg);
            background-color: rgba(44, 62, 80, 0.05);
            border-radius: var(--border-radius-md);
            border-left: 4px solid var(--primary-color);
        }
        
        .quiz-question-text {
            font-weight: bold;
            margin-bottom: var(--spacing-md);
            color: var(--secondary-color);
        }
        
        .quiz-options {
            list-style: none;
            padding: 0;
        }
        
        .quiz-option {
            margin-bottom: var(--spacing-sm);
        }
        
        .quiz-option label {
            display: flex;
            align-items: center;
            padding: var(--spacing-sm);
            border-radius: var(--border-radius-sm);
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .quiz-option label:hover {
            background-color: rgba(44, 62, 80, 0.1);
        }
        
        .quiz-option input[type="radio"] {
            margin-right: var(--spacing-sm);
        }
        
        .quiz-submit {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--border-radius-md);
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s ease;
        }
        
        .quiz-submit:hover {
            background-color: var(--primary-dark);
        }
        
        .quiz-result {
            margin-top: var(--spacing-xl);
            padding: var(--spacing-lg);
            background-color: rgba(44, 62, 80, 0.05);
            border-radius: var(--border-radius-md);
            border-left: 4px solid var(--success-color);
        }
        
        .quiz-score-display {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: var(--spacing-md);
        }
        
        .quiz-feedback {
            margin-top: var(--spacing-lg);
        }
        
        .quiz-feedback-item {
            margin-bottom: var(--spacing-md);
            padding: var(--spacing-md);
            border-radius: var(--border-radius-sm);
        }
        
        .quiz-feedback-item.correct {
            background-color: rgba(46, 204, 113, 0.1);
            border-left: 3px solid var(--success-color);
        }
        
        .quiz-feedback-item.incorrect {
            background-color: rgba(231, 76, 60, 0.1);
            border-left: 3px solid var(--error-color);
        }
        
        .quiz-explanation {
            font-style: italic;
            margin-top: var(--spacing-sm);
            color: var(--secondary-color);
        }
    `;
    
    // Füge das Style-Element zum Dokument hinzu
    document.head.appendChild(styleElement);
}

/**
 * Lade ein Quiz und zeige es im Inhaltsbereich an
 * @param {string} quizId - Die ID des zu ladenden Quiz
 */
function loadQuiz(quizId) {
    // Setze das aktuelle Quiz
    window.currentQuiz = quizId;
    
    // Hole das Quiz-Objekt
    const quiz = window.quizzes[quizId];
    if (!quiz) {
        console.error(`Quiz mit ID ${quizId} nicht gefunden`);
        return;
    }
    
    // Erstelle das Quiz-HTML
    const quizHtml = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h2>${quiz.title}</h2>
                <div class="quiz-description">${quiz.description}</div>
            </div>
            
            <form id="quiz-form">
                ${quiz.questions.map((question, questionIndex) => `
                    <div class="quiz-question" id="question-${questionIndex}">
                        <div class="quiz-question-text">${questionIndex + 1}. ${question.question}</div>
                        <ul class="quiz-options">
                            ${question.options.map((option, optionIndex) => `
                                <li class="quiz-option">
                                    <label>
                                        <input type="radio" name="question-${questionIndex}" value="${optionIndex}">
                                        ${option}
                                    </label>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
                
                <button type="submit" class="quiz-submit">Test abschließen</button>
            </form>
            
            <div id="quiz-result" class="quiz-result" style="display: none;"></div>
        </div>
    `;
    
    // Zeige das Quiz im Inhaltsbereich an
    document.getElementById('content').innerHTML = quizHtml;
    
    // Füge Event-Listener für das Formular hinzu
    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();
        submitQuiz(quizId);
    });
    
    // Aktualisiere die aktive Menüposition
    updateActiveMenuItem(quizId);
}

/**
 * Reiche ein Quiz ein und zeige die Ergebnisse an
 * @param {string} quizId - Die ID des eingereichten Quiz
 */
function submitQuiz(quizId) {
    // Hole das Quiz-Objekt
    const quiz = window.quizzes[quizId];
    if (!quiz) {
        console.error(`Quiz mit ID ${quizId} nicht gefunden`);
        return;
    }
    
    // Sammle die Antworten
    const answers = [];
    for (let i = 0; i < quiz.questions.length; i++) {
        const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
        answers.push(selectedOption ? parseInt(selectedOption.value) : -1);
    }
    
    // Berechne das Ergebnis
    let score = 0;
    const feedback = [];
    
    for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];
        const userAnswer = answers[i];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
            score++;
        }
        
        feedback.push({
            question: question.question,
            userAnswer: userAnswer >= 0 ? question.options[userAnswer] : 'Keine Antwort',
            correctAnswer: question.options[question.correctAnswer],
            isCorrect: isCorrect,
            explanation: question.explanation
        });
    }
    
    // Speichere das Ergebnis
    window.quizResults[quizId] = {
        completed: true,
        score: score,
        total: quiz.questions.length,
        answers: answers,
        timestamp: new Date().toISOString()
    };
    
    // Speichere die Ergebnisse im localStorage
    saveQuizResults();
    
    // Zeige das Ergebnis an
    const resultHtml = `
        <div class="quiz-score-display">
            Dein Ergebnis: ${score} von ${quiz.questions.length} Punkten (${Math.round(score / quiz.questions.length * 100)}%)
        </div>
        
        <div class="quiz-feedback">
            ${feedback.map((item, index) => `
                <div class="quiz-feedback-item ${item.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="quiz-question-text">${index + 1}. ${item.question}</div>
                    <div>Deine Antwort: ${item.userAnswer}</div>
                    ${!item.isCorrect ? `<div>Richtige Antwort: ${item.correctAnswer}</div>` : ''}
                    <div class="quiz-explanation">${item.explanation}</div>
                </div>
            `).join('')}
        </div>
        
        <button onclick="window.location.reload()" class="quiz-submit">Zurück zur Übersicht</button>
    `;
    
    // Verstecke das Formular und zeige das Ergebnis an
    document.getElementById('quiz-form').style.display = 'none';
    const resultElement = document.getElementById('quiz-result');
    resultElement.innerHTML = resultHtml;
    resultElement.style.display = 'block';
    
    // Aktualisiere die Quiz-Links in der Sidebar
    addQuizLinksToSidebar();
}

// Exportiere Funktionen für globalen Zugriff
window.initializeQuizSystem = initializeQuizSystem;
window.loadQuiz = loadQuiz;
window.submitQuiz = submitQuiz;

// Initialisiere das Quiz-System, wenn das DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuizSystem);
} else {
    initializeQuizSystem();
}