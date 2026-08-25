const sqlite3 = require('sqlite3').verbose();

// Crear conexión a la base de datos de cursos
const db = new sqlite3.Database('courses.sqlite');

// Crear la tabla "courses"
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        name TEXT NOT NULL,
        credits TEXT NOT NULL,
        professor TEXT NOT NULL
    )`);
    console.log("Base de datos y tabla 'courses' creadas con éxito.");
});

db.close();
