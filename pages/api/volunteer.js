import connectDB from '../../middleware/mongodb';
import Volunteer from '../../models/volunteer';

const handler = async (req, res) => {

    if (req.method === 'POST') {
        // Check if name, phone is provided
        const { name, phone, description } = req.body;
        console.log('test', name, phone);
        if (name && phone) {
            try {
                const volunteer = new Volunteer({
                    name,
                    phone,
                    description
                });

                // Create new volunteer
                const volunteerCreated = await volunteer.save();
                return res.status(200).send(volunteerCreated);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else if (req.method === 'GET') {
        const { _id } = req.query;
        if (_id) {
            try {
                const volunteer = await Volunteer.findById(_id)
                res.send(volunteer);
            } catch (e) {
                res.send("error", e);
            }
        } else {
            try {
                const volunteer = await Volunteer.find()
                res.send(volunteer)
            } catch (e) {
                res.send("error", e)
            }
        }
    } else if (req.method === 'DELETE') {
        const { _id } = req.query;
        if (_id) {
            try {
                const volunteer = await Volunteer.findByIdAndRemove(_id);
                res.send(volunteer);
            } catch (e) {
                res.send("error", e);
            }
        }
    } else if (req.method === 'PATCH') {
        try {
            const { _id } = req.query;
            const newInfo = req.body;
            if (_id) {
                const volunteer = await Volunteer.findByIdAndUpdate(family.volunteer._id, newInfo)
                console.log(volunteer);
                res.send(volunteer)
            }
        } catch (e) {
            res.send("error", e)
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);