const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/notes', (req,res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});
router.post('/notes', (req,res) => {
    const newNote = req.body;
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        newNote.id = generateId(notes);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), err => {
            if(err) throw err;
            res.json(newNote);
        });
    });
});

router.delete('/notes/:id', (req,res) => {
    const noteId = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), err => {
            if (err) throw err;
            res.json({ succes: true });
        });
    });
});

function generateId(notes) {
    const ids = notes.map(note => note.id);
    const maxId = Math.max(...ids);
    return maxId > 0 ? maxId + 1 : 1;
}

module.exports = router;