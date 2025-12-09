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
        const isStartDate = day === 8; // Data de início do desafio
        const isEndDate = day === 15; // Data de término do desafio
        
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
    const endDate = new Date('2025-12-15T23:59:59');
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
                    <div style="font-size: 2rem; font-weight: 700; color: #00c6ff;">${seconds}</div>
                    <div style="font-size: 0.8rem; color: #a0a0a0;">Segundos</div>
                </div>
            </div>
        `;
    }
}

// Inicializar componentes
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    generateCalendar();
    updateCountdown();
    
    // Atualizar relógio a cada segundo
    setInterval(updateClock, 1000);
    
    // Atualizar contagem regressiva a cada segundo
    setInterval(updateCountdown, 1000);
});
