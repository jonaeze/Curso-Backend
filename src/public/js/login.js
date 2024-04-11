const form = document.getElementById('loginForm');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const objet = {};
    data.forEach((value, key) => objet[key] = value);
    
    fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify(objet),
        headers: { "Content-Type": "application/json", }
    }).then((response) => {
        if (response.status === 200) {
            window.location.replace("/")
        };
    });
});