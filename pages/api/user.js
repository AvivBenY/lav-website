import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // Check if name, email or password is provided
        const { name, email, password } = req.body;
        if (name && email && password) {
            try {
                // Hash password to store it in DB
                const passwordhash = await bcrypt.hash(password, 10);
                const user = new User({
                    name,
                    email,
                    password: passwordhash,
                });

                // Create new user
                const userCreated = await user.save();
                return res.status(200).send(userCreated);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else if (req.method === 'GET') {
        const { id } = req.query;
        if (id !== undefined) {
            try {
                const user = await User.findById(id)
                res.send(user)
            } catch (e) {
                res.send("error", e)
            }
        } else {
            try {
                const user = await User.find();
                res.send(user);
            } catch (e) {
                res.send("error", e);
            }
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (id) {
            try {
                const user = await User.findByIdAndRemove(id);
                res.send(user)
            } catch (error) {
                res.send("error", e)
            }
        }
    } else if (req.method === 'PATCH') {
        const { id } = req.query;
        if (id) {
            try {
                const newInfo = req.body;
                const user = await User.findByIdAndUpdate(id, newInfo);
                res.send(user);

            } catch (e) {
                res.send("error", e)
            }
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);