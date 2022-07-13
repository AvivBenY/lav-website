import connectDB from '../../middleware/mongodb';
import Contact from '../../models/contact';

const handler = async (req, res) => {

    if (req.method === 'POST') {
        // Check if name, phone is provided
        const { name, phone } = req.body;
        if (name && phone) {
            try {
                const contact = new Contact({
                    name,
                    phone,
                });

                // Create new contact
                const contactCreated = await contact.save();
                return res.status(200).send(contactCreated);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else if (req.method === 'GET') {
        const { id } = req.query;
        if (id) {
            Contact.findById(id).then((data) => res.send(data)).catch((e) => res.send("error", e));
        } else {
            Contact.find().then((data) => res.send(data)).catch((e) => res.send("error", e))
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (id) {
            Contact.findByIdAndRemove(id).then((data) => res.send(data)).catch((e) => res.send("error", e))
        }
    } else if (req.method === 'PATCH') {
        const { id } = req.query;
        if (id) {
            const newInfo = req.body;
            Contact.findByIdAndUpdate(id, newInfo)
                .then((data) => res.send(data)
                ).catch((e) => res.send("error", e))
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);