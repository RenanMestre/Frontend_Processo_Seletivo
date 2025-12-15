async function logout() {
    const response = await fetch("https://api.scripthadder.com.br/api/logout", {
        method: "POST",
        credentials: "include"
    });

    if (response.ok) {
        alert("Logout realizado!");
        window.location.href = "login.html";
    } else {
        alert("Erro ao realizar logout");
    }
}

async function loadUsers() {
    try {
        const response = await fetch("https://api.scripthadder.com.br/api/users");
        const users = await response.json();

        const tbody = document.querySelector("#userTable tbody");
        tbody.innerHTML = ""; 

        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.tipo}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Erro ao carregar usuários:", err);
    }
}

// Adicionar usuário
async function addUser() {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();
    const tipo = document.getElementById("newTipo").value;

    if (!username || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("https://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, tipo })
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            closeModal();
            loadUsers();
        } else {
            const data = await response.json();
            alert(data?.message || "Erro ao cadastrar usuário");
        }
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
    }
}

function openModal() {
    document.getElementById("userModal").style.display = "block";
}

function closeModal() {
    document.getElementById("userModal").style.display = "none";
}

// Carrega ao abrir a página
loadUsers();

document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar dados reais
    function loadAdminData() {
        const totalScore = localStorage.getItem('totalScore') || 0;
        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || {
            websites: 0,
            desktop: 0,
            backend: 0
        };

        console.log('Pontuação Total:', totalScore);
        console.log('Desafios Completos:', completedChallenges);

        // Exemplo: Atualizar tabela ou exibir dados na página
        // document.getElementById('someElement').textContent = totalScore;
    }

    // Chamar a função ao carregar a página
    loadAdminData();
});

async function loadLoginAttempts() {
    try {
        const response = await fetch("https://localhost:8080/api/admin/logs");
        const logs = await response.json();

        const tbody = document.querySelector("#loginAttemptsTable tbody");
        tbody.innerHTML = "";

        logs.forEach(log => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${log.id}</td>
                <td>${log.username}</td>
                <td>${log.ip}</td>
                <td>${log.success ? "Sucesso" : "Falha"}</td>
                <td>${new Date(log.timestamp).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Erro ao carregar logs de tentativas de login:", err);
    }
}

// Carregar logs ao abrir a página
document.addEventListener('DOMContentLoaded', function() {
    loadLoginAttempts();
});