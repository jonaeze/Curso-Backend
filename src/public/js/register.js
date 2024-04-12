const form = document.getElementById('registerForm');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const objet = {};
    data.forEach((value, key) => objet[key] = value);
    
    fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(objet),
        headers: { "Content-Type": "application/json", }
    }).then((response) => {
        if (response.status === 201) {
            window.location.replace("/login");
        };
    });
});