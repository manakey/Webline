const express = require("express");
const router = express.Router();

const { getDatabase } = require("../database");

// 最新100件取得
router.get("/", async (req, res) => {

    const db = getDatabase();

    const rows = await db.all(
        `
        SELECT *
        FROM messages
        ORDER BY id ASC
        LIMIT 100
        `
    );

    res.json(rows);

});

// メッセージ保存
router.post("/", async (req, res) => {

    const db = getDatabase();

    const { username, message } = req.body;

    await db.run(
        `
        INSERT INTO messages
        (username,message)
        VALUES (?,?)
        `,
        [username, message]
    );

    res.json({
        success:true
    });

});

module.exports = router;