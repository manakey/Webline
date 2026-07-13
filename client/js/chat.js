const socket = io();

const username = sessionStorage.getItem("username");

if (!username) {
    location.href = "/";
}

// ユーザー名表示
document.getElementById("username").textContent = username;

// 要素取得
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const logoutBtn = document.getElementById("logoutBtn");

// メッセージ表示
function addMessage(user, text, me = false, time = "") {

    const div = document.createElement("div");

    div.className = me ? "message me" : "message";

    div.innerHTML = `
        <b>${user}</b><br>
        ${text}
        <div style="font-size:12px;color:#666;margin-top:5px;">
            ${time}
        </div>
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

// 履歴読み込み
async function loadHistory() {

    try {

        const res = await fetch("/api/messages");
        const history = await res.json();

        history.forEach(msg => {

            addMessage(
                msg.username,
                msg.message,
                msg.username === username,
                msg.created_at || ""
            );

        });

    } catch (err) {

        console.error("履歴取得失敗", err);

    }

}

// 初期化
async function init() {

    await loadHistory();

    socket.emit("join", username);

}

init();

// 送信
sendBtn.onclick = async () => {

    const text = input.value.trim();

    if (text === "") return;

    try {

        // SQLiteへ保存
        await fetch("/api/messages", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                message: text
            })

        });

        // 全員へ送信
        socket.emit("chat message", {
            user: username,
            text: text
        });

        input.value = "";
        input.focus();

    } catch (err) {

        console.error(err);

        alert("送信に失敗しました");

    }

};

// Enterキー送信
input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendBtn.click();

    }

});

// メッセージ受信
socket.on("chat message", (msg) => {

    addMessage(
        msg.user,
        msg.text,
        msg.user === username,
        msg.time
    );

});

// システムメッセージ
socket.on("system", (msg) => {

    const div = document.createElement("div");

    div.className = "system";

    div.textContent = msg.text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

});

// ログアウト
logoutBtn.onclick = () => {

    sessionStorage.removeItem("username");

    location.href = "/";

};