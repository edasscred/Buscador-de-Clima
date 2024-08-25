"use strict";
class ConcursoPrep {
    constructor() {
        this.studyPlan = [];
        this.progress = [];
        this.quizQuestions = [];
        this.mainContent = document.getElementById('mainContent');
        this.setupEventListeners();
        this.loadSampleData();
    }
    setupEventListeners() {
        document.getElementById('planBtn').addEventListener('click', () => this.showStudyPlan());
        document.getElementById('progressBtn').addEventListener('click', () => this.showProgress());
        document.getElementById('quizBtn').addEventListener('click', () => this.showQuiz());
    }
    loadSampleData() {
        this.studyPlan = [
            { id: 1, subject: "Redes de Computadores", duration: 60 },
            { id: 2, subject: "Banco de Dados", duration: 45 },
            { id: 3, subject: "Algoritmos e Estrutura de Dados", duration: 30 }
        ];
        this.progress = [
            { id: 1, subject: "Redes de Computadores", completed: 3, total: 10 },
            { id: 2, subject: "Banco de Dados", completed: 5, total: 8 },
            { id: 3, subject: "Algoritmos e Estrutura de Dados", completed: 2, total: 6 }
        ];
        this.quizQuestions = [
            {
                id: 1,
                question: "O Modelo de referência OSI (Open Systems Interconnection) possui sete camadas. Marque a opção que NÃO corresponda a nenhuma dessas camadas:",
                options: ["Camada de rede", "Camada de Sessão", "Camada de lógica", "Camada de enalace de dados"],
                correctAnswer: 2
            },
            {
                id: 2,
                question: "Em linguagem de programação existem vários tipos de dados. Os que são tipicamente usados como resultados de expressões condicionais, ou como variáveis identificadoras de estado, possuindo apenas dois valores, um correspondente a verdadeiro e outro a falso, é do tipo:?",
                options: ["Booleano", "Inteiro", "Decimal", "Character"],
                correctAnswer: 0
            }

            
        ];
    }
    showStudyPlan() {
        let html = '<h2>Plano de Estudos</h2>';
        html += '<div id="studyItems">';
        this.studyPlan.forEach(item => {
            html += `
                <div class="study-item">
                    <p>${item.subject} - ${item.duration} minutos</p>
                    <button onclick="app.removeStudyItem(${item.id})">Remover</button>
                </div>
            `;
        });
        html += '</div>';
        html += `
            <input type="text" id="newSubject" placeholder="Nova matéria">
            <input type="number" id="newDuration" placeholder="Duração (minutos)">
            <button onclick="app.addStudyItem()">Adicionar</button>
        `;
        this.mainContent.innerHTML = html;
    }
    showProgress() {
        let html = '<h2>Progresso</h2>';
        this.progress.forEach(item => {
            const percentage = (item.completed / item.total) * 100;
            html += `
                <div class="progress-item">
                    <p>${item.subject}: ${item.completed}/${item.total}</p>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        });
        this.mainContent.innerHTML = html;
    }
    showQuiz() {
        let html = '<h2>Questões</h2>';
        this.quizQuestions.forEach(question => {
            html += `
                <div class="quiz-question">
                    <p>${question.question}</p>
                    ${question.options.map((option, index) => `
                        <button onclick="app.checkAnswer(${question.id}, ${index})">${option}</button>
                    `).join('')}
                </div>
            `;
        });
        this.mainContent.innerHTML = html;
    }
    addStudyItem() {
        const subject = document.getElementById('newSubject').value;
        const duration = parseInt(document.getElementById('newDuration').value);
        if (subject && duration) {
            const newItem = {
                id: this.studyPlan.length + 1,
                subject,
                duration
            };
            this.studyPlan.push(newItem);
            this.showStudyPlan();
        }
    }
    removeStudyItem(id) {
        this.studyPlan = this.studyPlan.filter(item => item.id !== id);
        this.showStudyPlan();
    }
    checkAnswer(questionId, selectedAnswer) {
        const question = this.quizQuestions.find(q => q.id === questionId);
        if (question) {
            if (selectedAnswer === question.correctAnswer) {
                alert('Correto!');
            }
            else {
                alert('Incorreto. Tente novamente.');
            }
        }
    }
}
const app = new ConcursoPrep();
//# sourceMappingURL=script.js.map