const Note = require('../models/note.model');

// create a note
exports.create = (req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "Note cannot be empty"
        });
    }

    const note = new Note({
        title: req.body.title || "untitled note",
        content: req.body.content
    });

    note.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occured while creating note"
            });
        });
};

//find all notes
exports.findAllNotes = (req, res) => {
    Note.find()
        .then(note => {
            res.send(note);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occured while retrieving notes"
            });
        });
};

// find one note
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note of id " + req.params.noteId + " not found"
                });
            }
            res.send(note);
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note of id " + req.params.noteId + " not found"
                });
            }
            return res.status(500).send({
                message: "An error occured while retrieving note of id " + req.params.noteId
            });
        });
};

// update note
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(404).send({
            message: "Note cannot be empty"
        })
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "untitled Note",
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note of id " + req.params.noteId + " not found"
                });
            }
            res.send(note);
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note of id " + req.params.noteId + " not found"
                });
            }
            return res.status(500).send({
                message: "An error occured while retrieving note of id " + req.params.noteId
            });
        });
};

// delete note
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};
