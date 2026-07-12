const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const { getDatabase } = require("../database");

// ユーザー登録
router.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({
            success: false,
            message: "すべて入力してください"
        });
    }

    try {

        const db = getDatabase();

        const hash = await bcrypt.hash(password, 10);

        await db.run(
            `
            INSERT INTO users
            (username,email,password)
            VALUES (?,?,?)
            `,
            [username, email, hash]
        );

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.json({
            success: false,
            message: "このメールアドレスは既に登録されています。"
        });

    }

});

module.exports = router;