import mongoose from 'mongoose';
import connectDB from '../../middleware/mongodb';
import Family from '../../models/family';
import Contact from '../../models/contact';

const handler = async (req, res) => {
    //CRUD
    if (req.method === 'POST') {
        // Check if name, address, contact is provided
        const { lavArea, lineNr, description, address, isGettingFood, contact } = req.body;
        if (address && isGettingFood) {
            console.log(req.body);
            try {
                const family = new Family({
                    lavArea,
                    lineNr,
                    description,
                    address,
                    isGettingFood,
                    contact
                });

                // Create new family
                const familyCreated = await family.save();
                console.log("test");
                return res.status(200).send(familyCreated);
                resolve();
            } catch (error) {
                return res.status(500).send(error.message);
                resolve();
            }
        } else {
            res.status(422).send('data_incomplete');
            resolve();
        }
    } else if (req.method === 'GET') {
        const { _id } = req.query;
        if (_id) {
            try {
                const family = await Family.findById(_id).populate('contact');
                res.send(family);
            } catch (e) {
                res.send("error", e);
            }

        } else {
            try {
                const family = await Family.find().populate('contact');
                res.send(family);
            } catch (e) {
                res.send("error", e)
            }
        }
    } else if (req.method === 'DELETE') {
        const { _id } = req.query;
        if (_id) {
            try {
                const family = await Family.findByIdAndDelete(_id);
                const contact = await Contact.findByIdAndDelete(family.contact._id)
                res.send(family)
                console.log('deleted', family, contact)
            } catch (e) {
                res.send("error", e)
            }
        }
    } else if (req.method === 'PATCH') {
        const { _id } = req.query;
        if (_id) {

            try {
                const newInfo = req.body;
                const family = await Family.findByIdAndUpdate(_id, newInfo).populate('contact')
                res.send(family)
            } catch (e) {
                res.send("error", e)
            }
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);