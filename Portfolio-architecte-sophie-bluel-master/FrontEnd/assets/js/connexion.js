const form = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#btnConnexion"),
  };

  const button = form.submit.addEventListener("click", (connexion) => {
    connexion.preventDefault();
    const login = "http://localhost:5678/api/users/login";

    fetch(login, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // vérification si infos correctes, enregistrement du token + redirection
        if (data.token) {
          localStorage.setItem("token", data.token);
        // Redirige vers la page d'accueil
          document.location.href = 'index.html'; // Redirige vers la page d'accueil
        } else {
        // Gérer l'affichage d'un message d'erreur à l'utilisateur
          const messageErreur = document.getElementById('msgError');
          messageErreur.innerHTML = "Identifiant ou mot de passe incorrect";
          messageErreur.style.color="red";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
