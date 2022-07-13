import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const photo = new Schema({
    src: {
        type: String,
        required: true
    }
});

mongoose.models = {};

const Photo = mongoose.model('Photo', photo);

export default Photo;