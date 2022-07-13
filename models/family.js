import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const family = new Schema({
    lavArea: {
        type: String,
        required: true
    },  
    lineNr: {
        type: Number,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    isGettingFood: {
        type: Boolean,
        required: true
    },
    contact: {
        type: Schema.Types.ObjectId, ref: "Contact",
        required: false
    }
});

mongoose.models = {};

const Family = mongoose.model('Family', family);

export default Family;