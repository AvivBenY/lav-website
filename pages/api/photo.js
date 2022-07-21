import connectDB from '../../middleware/mongodb';
import Photo from '../../models/photo';
import { cloudinary } from './utils'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

const handler = async (req, res) => {

    if (req.method === 'POST') {
        //CLOUDINARY
        try {
            const images = req.body.data; // array of images
            let srcs = []
            for (const fileStr of images) {
                const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                    upload_preset: 'lav-website-upload'
                })

                srcs.push(uploadResponse.secure_url)
            }
            if (srcs.length > 0) {
                console.log("SRC", srcs);
                try {
                    let dbImages = []
                    for (const src of srcs) {

                        const photo = new Photo({
                            src,
                        });
                        dbImages.push(await photo.save())
                    }

                    // Create new photo
                    return res.status(200).send(dbImages);
                } catch (error) {
                    return res.status(500).send(error.message);
                }
            } else {
                res.status(422).send('data_incomplete');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'somthing went wrong' });
        }


    } else if (req.method === 'GET') {
        const { _id } = req.query;
        if (_id) {
            try {
                const photo = await Photo.findById(_id);
                res.send(photo);
            } catch (e) {
                res.send("error", e)
            }
        } else {
            try {
                const photo = await Photo.find();
                res.send(photo);
            } catch (e) {
                res.send("error", e);
            }
        }
        // else if (req.method === 'GET') {
        //     const { resources } = await cloudinary.search
        //         .expression('folder:lav')
        //         .sort_by('public_id', 'desc')
        //         // .max_results(30)
        //         .execute();
        //     const publicIds = resources.map((file) => file.secure_url);
        //     res.send(publicIds);
        // }
    }
    else if (req.method === 'DELETE') {
        const { _id } = req.query;
        if (_id) {
            try {
                const photo = await Photo.findByIdAndRemove(_id);
                res.send(photo);
            } catch (e) {
                res.send("error", e);
            }
        }
    }
}
export default connectDB(handler);