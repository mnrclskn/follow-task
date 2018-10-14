const mongoose  = required('mongoose');
const Schema = mongoose.Schema;

const DemandSchema = new Schema({
    customer_id: Schema.Types.ObjectId,
    technician_id: Schema.Types.ObjectId,
    sub_technician_id: Schema.Types.ObjectId,
    description: String,
    status: String,
    create_date: {
        type: Date,
        default: Date.now()
    },
    modified_date: Date,
    completed_date: Date
});

module.exports = mongoose.model('demand', DemandSchema);