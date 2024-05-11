const router = require('express').Router();
const { json } = require('express');
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

function generateId(notes) {
    const ids = notes.map(note => note.id);
    const maxId = Math.max(...ids);
    return maxId > 0 ? maxId + 1 : 1;
}

module.exports = router;