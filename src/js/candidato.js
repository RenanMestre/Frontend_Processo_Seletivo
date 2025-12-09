async function logout() {
    const response = await fetch(process.env.API_LOGOUT, {
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

// chamar a função
loadUsernames();
