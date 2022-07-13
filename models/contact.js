import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contact = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

mongoose.models = {};

const Contact = mongoose.model('Contact', contact);

export default Contact;