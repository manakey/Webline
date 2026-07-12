const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const registerBtn = document.getElementById("registerBtn");
const message = document.getElementById("message");

registerBtn.addEventListener("click", async () => {

    message.textContent = "";

    const res = await fetch("/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username: username.value,
            email: email.value,
            password: password.value

        })

    });

    const data = await res.json();

    if (data.success) {

        alert("登録が完了しました！");

        location.href = "/";

    } else {

        message.textContent = data.message;

    }

});