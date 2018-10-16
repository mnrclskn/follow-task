const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
/*
    status 0: Opened
           1: Completed
           2: Canceled
           3: Wait
 */

const TaskSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    technician_id: Schema.Types.ObjectId,
    description: String,
    status: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    modified_date: Date,
    completed_date: Date
});

module.exports = mongoose.model('task', TaskSchema);