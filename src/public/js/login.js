const form = document.getElementById('loginForm');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const userData = {};
    data.forEach((value, key) => userData[key] = value);
    //hacer un fetch

    
});