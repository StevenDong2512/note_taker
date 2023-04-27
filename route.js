const router = require("express").Router();
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

//HTML GET HOMEPAGE
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

//HTML GET LANDINGPAGE
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// API GET
router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJson);
});

//API POST
router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});

// API DELETE
router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json("Your note now is deleted.");
});

module.exports = router;