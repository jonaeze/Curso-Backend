const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("ENTRE AL LOGING FETCH");
  const data = new FormData(form);
  const user = {};
  data.forEach((value, key) => (user[key] = value));

  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.status === 200) {
      window.location.replace("/realTimeProducts");
    }
  });
});
