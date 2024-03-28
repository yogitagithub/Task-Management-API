const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    },
    Priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    Status: {
        type: String,
        enum: ['Pending', 'In progress', 'Completed'],
        default: 'Pending'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;