import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const volunteer = new Schema({

    lavArea: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
});

mongoose.models = {};

const Volunteer = mongoose.model('Volunteer', volunteer);

export default Volunteer;