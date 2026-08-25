const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8000;

// Middleware para procesar form-data y JSON desde Postman
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new sqlite3.Database('courses.sqlite');

// 1. GET: Leer todos los cursos
app.get('/courses', (req, res) => {
    db.all("SELECT * FROM courses", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// 2. GET: Leer un curso por ID
app.get('/course/:id', (req, res) => {
    db.get("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        res.json(row);
    });
});

// 3. POST: Crear un nuevo curso
app.post('/courses', (req, res) => {
    const { code, name, credits, professor } = req.body;
    db.run("INSERT INTO courses (code, name, credits, professor) VALUES (?, ?, ?, ?)",
        [code, name, credits, professor], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(`1 Course with id: ${this.lastID} created successfully`);
    });
});

// 4. PUT: Modificar un curso existente
app.put('/course/:id', (req, res) => {
    const { code, name, credits, professor } = req.body;
    db.run("UPDATE courses SET code=?, name=?, credits=?, professor=? WHERE id=?",
        [code, name, credits, professor, req.params.id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json({ id: req.params.id, code, name, credits, professor });
    });
});

// 5. DELETE: Eliminar un curso por ID
app.delete('/course/:id', (req, res) => {
    db.run("DELETE FROM courses WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(`The Course with id: ${req.params.id} has been deleted.`);
    });
});

// Iniciar servidor escuchando en todas las interfaces de red
app.listen(port, '0.0.0.0', () => {
    console.log(`API de Cursos (Node.js) escuchando en el puerto ${port}`);
});
