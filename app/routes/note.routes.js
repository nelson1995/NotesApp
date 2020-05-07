module.exports = (app) => {
    const note = require('../controllers/note.controller.js');

    //create a note
    app.post('/notes', note.create);

    // retrieve all notes
    app.get('/notes', note.findAllNotes);

    //retrieve a single note
    app.get('/notes/:noteId', note.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', note.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', note.delete);
}