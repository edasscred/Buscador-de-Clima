interface StudyItem {
    id: number;
    subject: string;
    duration: number;
}

interface ProgressItem {
    id: number;
    subject: string;
    completed: number;
    total: number;
}

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

class ConcursoPrep {
    private studyPlan: StudyItem[] = [];
    private progress: ProgressItem[] = [];
    private quizQuestions: QuizQuestion[] = [];
    private mainContent: HTMLElement;

    constructor() {
        this.mainContent = document.getElementById('mainContent')!;
        this.setupEventListeners();
        this.loadSampleData();
        this.showStudyPlan(); // Mostrar o plano de estudos inicialmente
    }

    private setupEventListeners(): void {
        document.getElementById('planBtn')!.addEventListener('click', () => this.showStudyPlan());
        document.getElementById('progressBtn')!.addEventListener('click', () => this.showProgress());
        document.getElementById('quizBtn')!.addEventListener('click', () => this.showQuiz());
    }

    private loadSampleData(): void {
        // ... (mesmo código de antes)
    }

    private showStudyPlan(): void {
        let html = '<h2>Plano de Estudos</h2>';
        html += '<div id="studyItems">';
        this.studyPlan.forEach(item => {
            html += `
                <div class="study-item">
                    <p>${item.subject} - ${item.duration} minutos</p>
                    <button class="remove-btn" data-id="${item.id}">Remover</button>
                </div>
            `;
        });
        html += '</div>';
        html += `
            <input type="text" id="newSubject" placeholder="Nova matéria">
            <input type="number" id="newDuration" placeholder="Duração (minutos)">
            <button id="addStudyItemBtn">Adicionar</button>
        `;
        this.mainContent.innerHTML = html;

        // Adicionar event listeners após inserir o HTML
        document.getElementById('addStudyItemBtn')!.addEventListener('click', () => this.addStudyItem());
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt((e.target as HTMLElement).getAttribute('data-id')!);
                this.removeStudyItem(id);
            });
        });
    }

    private showProgress(): void {
        // ... (mesmo código de antes)
    }

    private showQuiz(): void {
        let html = '<h2>Questões</h2>';
        this.quizQuestions.forEach(question => {
            html += `
                <div class="quiz-question">
                    <p>${question.question}</p>
                    ${question.options.map((option, index) => `
                        <button class="answer-btn" data-question="${question.id}" data-answer="${index}">${option}</button>
                    `).join('')}
                </div>
            `;
        });
        this.mainContent.innerHTML = html;

        // Adicionar event listeners após inserir o HTML
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const questionId = parseInt(target.getAttribute('data-question')!);
                const selectedAnswer = parseInt(target.getAttribute('data-answer')!);
                this.checkAnswer(questionId, selectedAnswer);
            });
        });
    }

    public addStudyItem(): void {
        const subjectInput = document.getElementById('newSubject') as HTMLInputElement;
        const durationInput = document.getElementById('newDuration') as HTMLInputElement;
        const subject = subjectInput.value;
        const duration = parseInt(durationInput.value);
        if (subject && duration) {
            const newItem: StudyItem = {
                id: this.studyPlan.length + 1,
                subject,
                duration
            };
            this.studyPlan.push(newItem);
            this.showStudyPlan();
        }
    }

    public removeStudyItem(id: number): void {
        this.studyPlan = this.studyPlan.filter(item => item.id !== id);
        this.showStudyPlan();
    }

    public checkAnswer(questionId: number, selectedAnswer: number): void {
        const question = this.quizQuestions.find(q => q.id === questionId);
        if (question) {
            if (selectedAnswer === question.correctAnswer) {
                alert('Correto!');
            } else {
                alert('Incorreto. Tente novamente.');
            }
        }
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ConcursoPrep();
});