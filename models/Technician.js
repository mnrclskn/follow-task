const mongoose = required('mongoose');
const Schema = mongoose.Schema;

const TechnicianSchema = new Schema({
    name: String,
    mail: String,
    tel: String,
    password: String
});

module.exports('technician', TechnicianSchema);