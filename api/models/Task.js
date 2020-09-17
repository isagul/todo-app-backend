const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const taskSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {type: String, required: false},
    content: {type: String, required: true},
    date: {type: String, required: true},
    targetTime: {type: Number, required: false},
});

module.exports = model('Task', taskSchema);