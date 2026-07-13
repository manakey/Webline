const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const guestBtn = document.getElementById("guestBtn");
const scratchBtn = document.getElementById("scratchBtn");

loginBtn.addEventListener("click", async () => {

    const res = await fetch("/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            email: email.value,
            password: password.value

        })

    });

    const data = await res.json();

    if (data.success) {

        alert(`ようこそ ${data.username} さん！`);

        // 次のステップでチャット画面へ移動
        // location.href = "/chat.html";

    } else {

        alert(data.message);

    }

});

guestBtn.addEventListener("click", () => {

    alert("ゲストログインは次のステップで実装します。");

});

scratchBtn.addEventListener("click", () => {

    alert("Scratchログインは開発中です。");

});