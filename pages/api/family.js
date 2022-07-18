import mongoose from 'mongoose';
import connectDB from '../../middleware/mongodb';
import Family from '../../models/family';

const handler = async (req, res) => {
    //CRUD
    if (req.method === 'POST') {
        // Check if name, adress, contact is provided
        const { lavArea, lineNr, description, adress, isGettingFood, contact } = req.body;
        if (adress && isGettingFood) {
            console.log(req.body);
            try {
                const family = new Family({
                    lavArea,
                    lineNr,
                    description,
                    adress,
                    isGettingFood,
                    contact
                });

                // Create new family
                const familyCreated = await family.save();
                return res.status(200).send(familyCreated);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else if (req.method === 'GET') {
        const { id } = req.query;
        if (id) {
            Family.findById(id).populate('contact').then((data) => { res.send(data) }).catch((e) => ("error", e))
        } else {
            Family.find().populate('contact').then((data) => { res.send(data) }).catch((e) => ("error", e))
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (id) {
            Family.findByIdAndDelete(id).then((data) => res.send(data)).catch((e) => ("error", e))
        }
    } else if (req.method === 'PATCH') {
        const { id } = req.query;
        if (id) {
            const newInfo = req.body;
            Family.findByIdAndUpdate(id, newInfo).populate('contact')
                .then((data) => res.send(data)
                ).catch((e) => res.send("error", e))
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);