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
    technician_id:{
        type: Schema.Types.ObjectId,
        default: '5bc66b0a48fe552be46cc9a2'
    } ,
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