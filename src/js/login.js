// Adicionando animação de partículas no fundo
const particlesConfig = {
    particles: {
        number: { value: 50 },
        color: { value: "#00c6ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, color: "#0072ff" },
        move: { enable: true, speed: 2 }
    }
};

// Inicializar partículas
const particlesScript = document.createElement("script");
particlesScript.src = "https://cdn.jsdelivr.net/npm/particles.js";
particlesScript.onload = () => {
    particlesJS("particles", particlesConfig);
};
document.body.appendChild(particlesScript);

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    const errorMsg = document.getElementById('loginErrorMsg');
    try {
        const response = await fetch("https://api.scripthadder.com.br:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            errorDiv.style.display = "none";
            // Redirecionar com base no tipo de usuário
            if (data.tipo === "ADMIN") globalThis.location.href = "admin.html";
            else if (data.tipo === "CANDIDATO") globalThis.location.href = "menu.html";
            else globalThis.location.href = "index.html";
        } else {
            errorMsg.textContent = data.message || "Usuário ou senha incorretos.";
            errorDiv.style.display = "flex";
        }
    } catch (error) {
        console.error("Erro ao conectar à API:", error);
        errorMsg.textContent = "Erro ao conectar ao servidor. Tente novamente mais tarde.";
        errorDiv.style.display = "flex";
    }
});

// Função para exibir mensagens de feedback
function showMessage(message, type) {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}
