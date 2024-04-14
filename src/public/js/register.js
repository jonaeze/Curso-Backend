const form = document.getElementById('registerForm');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const newUser = {};
    data.forEach((value, key) => newUser[key] = value);
    
    fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json", }
    }).then((response) => {
        if (response.status === 201) {
            window.location.replace("/login");
        };
    });
});