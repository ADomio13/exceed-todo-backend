const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Todos', TodoSchema)