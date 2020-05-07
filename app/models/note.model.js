const mongoose = require('mongoose');

const NotesAppSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NotesAppSchema);