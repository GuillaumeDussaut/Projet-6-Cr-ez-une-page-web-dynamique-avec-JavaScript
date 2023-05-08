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
        .then((data) => console.log(data))
        .catch((err) => {
            console.log(err);
        });
});
