// Verificar se os termos foram aceitos
if (!localStorage.getItem('termsAccepted')) {
    window.location.href = 'termos.html'; // Redireciona para a página de termos
}

// Configuração de partículas
const particlesConfig = {
    particles: {
        number: { value: 80 },
        color: { value: "#00c6ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#0072ff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    }
};

// Inicializar partículas
const particlesScript = document.createElement("script");
particlesScript.src = "https://cdn.jsdelivr.net/npm/particles.js";
particlesScript.onload = () => {
    particlesJS("particles", particlesConfig);
};
document.body.appendChild(particlesScript);

// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    const dateElement = document.getElementById('date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('pt-BR', options);
    }
}

// Função para gerar calendário
function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    if (!calendarElement) return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    let calendarHTML = `
        <div class="calendar-header">
            <h4>${monthNames[currentMonth]} ${currentYear}</h4>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day-name">Dom</div>
            <div class="calendar-day-name">Seg</div>
            <div class="calendar-day-name">Ter</div>
            <div class="calendar-day-name">Qua</div>
            <div class="calendar-day-name">Qui</div>
            <div class="calendar-day-name">Sex</div>
            <div class="calendar-day-name">Sáb</div>
    `;
    
    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === now.getDate();
        const isStartDate = day === 15; // Data de início do desafio
        const isEndDate = day === 22; // Data de término do desafio
        
        let className = 'calendar-day';
        if (isToday) className += ' today';
        if (isStartDate) className += ' start-date';
        if (isEndDate) className += ' end-date';
        
        calendarHTML += `<div class="${className}">${day}</div>`;
    }
    
    calendarHTML += '</div>';
    calendarElement.innerHTML = calendarHTML;
    
    // Adicionar estilos do calendário
    const style = document.createElement('style');
    style.textContent = `
        .calendar-header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 198, 255, 0.3);
        }
        
        .calendar-header h4 {
            color: #00c6ff;
            font-size: 1.2rem;
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
        }
        
        .calendar-day-name {
            text-align: center;
            font-size: 0.8rem;
            font-weight: 600;
            color: #00c6ff;
            padding: 5px;
        }
        
        .calendar-day {
            text-align: center;
            padding: 8px;
            font-size: 0.9rem;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .calendar-day:not(.empty):hover {
            background: rgba(0, 198, 255, 0.2);
            cursor: pointer;
        }
        
        .calendar-day.empty {
            visibility: hidden;
        }
        
        .calendar-day.today {
            background: rgba(0, 198, 255, 0.3);
            font-weight: 700;
            border: 2px solid #00c6ff;
        }
        
        .calendar-day.start-date {
            background: rgba(0, 255, 100, 0.3);
            border: 2px solid #00ff64;
        }
        
        .calendar-day.end-date {
            background: rgba(255, 100, 0, 0.3);
            border: 2px solid #ff6400;
        }
    `;
    document.head.appendChild(style);
}

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const endDate = new Date('2025-12-22T23:59:59');
    const now = new Date();
    const timeLeft = endDate - now;
    
    if (timeLeft <= 0) {
        document.getElementById('countdown').textContent = 'Prazo encerrado!';
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #00c6ff;">${days}</div>
                    <div style="font-size: 0.8rem; color: #a0a0a0;">Dias</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #00c6ff;">${hours}</div>
                    <div style="font-size: 0.8rem; color: #a0a0a0;">Horas</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #00c6ff;">${minutes}</div>
                    <div style="font-size: 0.8rem; color: #a0a0a0;">Minutos</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700, color: #00c6ff;">${seconds}</div>
                    <div style="font-size: 0.8rem; color: #a0a0a0;">Segundos</div>
                </div>
            </div>
        `;
    }
}

// Função para atualizar o placar de pontuação
function updateScoreboard() {
    // Carregar dados do localStorage
    const totalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || {
        websites: 0,
        desktop: 0,
        backend: 0
    };

    // Calcular total de desafios completos
    const totalCompleted = completedChallenges.websites + completedChallenges.desktop + completedChallenges.backend;

    // Atualizar pontuação total
    const totalScoreElement = document.getElementById('totalScore');
    if (totalScoreElement) {
        const finalScore = totalCompleted >= 4 ? 1000 : totalScore;
        totalScoreElement.textContent = finalScore;

        // Atualizar barra de progresso
        const totalProgressElement = document.getElementById('totalProgress');
        if (totalProgressElement) {
            const percentage = (finalScore / 1000) * 100;
            totalProgressElement.style.width = `${percentage}%`;

            const progressText = totalProgressElement.parentElement.nextElementSibling;
            if (progressText) {
                progressText.textContent = `${finalScore} / 1000 pontos`;
            }
        }
    }

    // Atualizar desafios completos
    const completedChallengesElement = document.getElementById('completedChallenges');
    if (completedChallengesElement) {
        completedChallengesElement.textContent = totalCompleted;
    }

    // Atualizar detalhes dos desafios
    document.getElementById('websitesCompleted').textContent = `${completedChallenges.websites}/1`;
    document.getElementById('desktopCompleted').textContent = `${completedChallenges.desktop}/1`;
    document.getElementById('backendCompleted').textContent = `${completedChallenges.backend}/2`;

    // Atualizar nível e estrelas
    const currentLevelElement = document.getElementById('currentLevel');
    const badgeItems = document.querySelectorAll('.badge-item');
    if (currentLevelElement) {
        if (totalCompleted >= 4) {
            currentLevelElement.textContent = 'Avançado';
            badgeItems.forEach(badge => badge.classList.add('active'));
        } else if (totalScore < 300) {
            currentLevelElement.textContent = 'Iniciante';
            badgeItems.forEach((badge, index) => {
                badge.classList.toggle('active', index === 0);
            });
        } else if (totalScore < 600) {
            currentLevelElement.textContent = 'Intermediário';
            badgeItems.forEach((badge, index) => {
                badge.classList.toggle('active', index <= 1);
            });
        }
    }

    // Atualizar tempo decorrido
    const startDate = new Date('2025-12-15T00:00:00');
    const endDate = new Date('2025-12-21T23:59:59');
    const now = new Date();

    if (now >= startDate && now <= endDate) {
        const diffMs = now - startDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        const timeElapsedElement = document.getElementById('timeElapsed');
        if (timeElapsedElement) {
            timeElapsedElement.textContent = `${diffHours}h ${diffMinutes}m`;
        }
    } else {
        const timeElapsedElement = document.getElementById('timeElapsed');
        if (timeElapsedElement) {
            timeElapsedElement.textContent = 'Fora do intervalo';
        }
    }

    // Atualizar última atividade
    const lastActivityElement = document.getElementById('lastActivity');
    if (lastActivityElement) {
        const lastActivityTime = new Date();
        lastActivityElement.textContent = lastActivityTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Função para salvar progresso no localStorage
function saveProgress(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Função para carregar progresso do localStorage
function loadProgress(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Atualizar progresso ao marcar desafios como concluídos
document.addEventListener('DOMContentLoaded', () => {
    const challenges = {
        websitesCompleted: 0,
        desktopCompleted: 0,
        backendCompleted: 0,
        totalScore: 0,
    };

    // Carregar progresso salvo
    const savedProgress = loadProgress('userProgress');
    if (savedProgress) {
        Object.assign(challenges, savedProgress);
    }

    // Atualizar UI com progresso salvo
    document.getElementById('websitesCompleted').textContent = `${challenges.websitesCompleted}/3`;
    document.getElementById('desktopCompleted').textContent = `${challenges.desktopCompleted}/2`;
    document.getElementById('backendCompleted').textContent = `${challenges.backendCompleted}/2`;
    document.getElementById('totalScore').textContent = challenges.totalScore;

    // Exemplo: Atualizar progresso ao clicar em um botão (simulação)
    document.querySelector('.desafios').addEventListener('click', () => {
        challenges.websitesCompleted += 1;
        challenges.totalScore += 100;

        // Salvar progresso
        saveProgress('userProgress', challenges);

        // Atualizar UI
        document.getElementById('websitesCompleted').textContent = `${challenges.websitesCompleted}/3`;
        document.getElementById('totalScore').textContent = challenges.totalScore;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar dados do localStorage
    function loadUserData() {
        const totalScore = localStorage.getItem('totalScore') || 0;
        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || {
            websites: 0,
            desktop: 0,
            backend: 0
        };
        const currentLevel = localStorage.getItem('currentLevel') || 'Iniciante';
        const timeElapsed = localStorage.getItem('timeElapsed') || '0h 0m';
        const lastActivity = localStorage.getItem('lastActivity') || '--';

        // Atualizar elementos na página
        document.getElementById('totalScore').textContent = totalScore;
        document.getElementById('totalProgress').style.width = `${(totalScore / 1000) * 100}%`;
        document.querySelector('.progress-text').textContent = `${totalScore} / 1000 pontos`;

        document.getElementById('completedChallenges').textContent = Object.values(completedChallenges).reduce((a, b) => a + b, 0);
        document.getElementById('websitesCompleted').textContent = `${completedChallenges.websites}/3`;
        document.getElementById('desktopCompleted').textContent = `${completedChallenges.desktop}/2`;
        document.getElementById('backendCompleted').textContent = `${completedChallenges.backend}/2`;

        document.getElementById('currentLevel').textContent = currentLevel;
        document.getElementById('timeElapsed').textContent = timeElapsed;
        document.getElementById('lastActivity').textContent = lastActivity;
    }

    // Chamar a função ao carregar a página
    loadUserData();
});

// Inicializar componentes
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    generateCalendar();
    updateCountdown();
    updateScoreboard();
    
    // Atualizar relógio a cada segundo
    setInterval(updateClock, 1000);
    
    // Atualizar contagem regressiva a cada segundo
    setInterval(updateCountdown, 1000);
    
    // Atualizar placar a cada 5 segundos
    setInterval(updateScoreboard, 5000);
});
