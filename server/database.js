const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

let db;

async function initDatabase() {

    db = await open({
        filename: path.join(__dirname, "../database/webline.db"),
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

    console.log("✅ SQLite Ready");
}

function getDatabase() {
    return db;
}

module.exports = {
    initDatabase,
    getDatabase
};