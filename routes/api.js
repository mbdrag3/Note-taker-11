const express = require("express");
const app = express.Router();

const fs = require("fs");
const {readFile,writeFile} = require("fs").promises //followed by a .then which is the resolution of the promise

app.get("/api/notes", (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        const parsedFile = JSON.parse(file);
        return res.send(parsedFile);
    });
});

app.post("/api/notes", (req, res) => {
    const dataTitle = req.body.title;
    const dataText = req.body.text;
    console.log(dataTitle);
    console.log(dataText);

    const tempObject = {
        title: dataTitle,
        text: dataText,
        id: crypto.randomUUID()
    }

    readFile('./db/db.json', 'utf-8')
    .then(data=> {
        const db = JSON.parse(data);
        db.push(tempObject)

        return writeFile('./db/db.json', JSON.stringify(db))
    })
    .then(data=>{
        res.json("job done") 
    })
});

app.delete("/api/notes/:id", (req,res)=> {
    readFile('./db/db.json', 'utf-8')
    .then(data=> {
        const id = req.params.id;
        const db = JSON.parse(data);
        const filteredDb = db.filter(note => note.id !== id)

        return writeFile('./db/db.json', JSON.stringify(filteredDb))
    })
    .then(data=>{
        res.json("job done") 
    })
})




module.exports = app;