const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const { initDatabase } = require("./database");
const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// JSONを受け取れるようにする
app.use(express.json());

// 静的ファイル
app.use(express.static(path.join(__dirname, "../client")));

// 認証API
app.use("/api/auth", authRoutes);

// トップページ
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// ==============================
// Socket.IO
// ==============================

let onlineUsers = 0;

io.on("connection", (socket) => {

    onlineUsers++;

    io.emit("online count", onlineUsers);

    socket.on("join", (name) => {

        socket.username = name;

        io.emit("system", {
            text: `${name}さんが参加しました`
        });

    });

    socket.on("chat message", (msg) => {

        msg.time = new Date().toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit"
        });

        io.emit("chat message", msg);

    });

    socket.on("disconnect", () => {

        onlineUsers--;

        io.emit("online count", onlineUsers);

        if (socket.username) {

            io.emit("system", {
                text: `${socket.username}さんが退出しました`
            });

        }

    });

});

// ==============================
// サーバー起動
// ==============================

async function start() {

    try {

        await initDatabase();

        server.listen(PORT, () => {

            console.log("=================================");
            console.log("🚀 WebLine Server Started");
            console.log(`🌐 http://localhost:${PORT}`);
            console.log("=================================");

        });

    } catch (err) {

        console.error("サーバー起動失敗");
        console.error(err);

    }

}

start();