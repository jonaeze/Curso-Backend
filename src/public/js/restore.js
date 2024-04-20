const formNewPassword = document.getElementById("restoreForm");

formNewPassword.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(formNewPassword);
    const newPassword = {};
    console.log(newPassword);
    data.forEach((value, key) => (newPassword[key] = value));

    fetch("/api/sessions/restore", {
        method: "POST",
        body: JSON.stringify(newPassword),
        headers: {
        "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status === 200) {
            console.log('Se restablecio la contraseña correctamente');
            window.location.replace("/login");
        }
    });
});