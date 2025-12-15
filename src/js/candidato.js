async function logout() {
    const response = await fetch("http://72.60.61.93:8080/api/logout", {
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
