// routes/students.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
	port: 3306,
    user: 'root',
    password: '102112',
    database: 'student_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Lấy danh sách sinh viên
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Thêm sinh viên mới
router.post('/', (req, res) => {
    const newStudent = req.body;
    const sql = 'INSERT INTO students SET ?';
    db.query(sql, newStudent, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newStudent });
    });
});

// Xóa sinh viên
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM students WHERE id = ${db.escape(id)}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student deleted', id });
    });
});

// Cập nhật thông tin sinh viên
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const sql = `UPDATE students SET ? WHERE id = ${db.escape(id)}`;
    db.query(sql, updatedData, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student updated', id });
    });
});

module.exports = router;
