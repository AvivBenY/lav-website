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
            const fileStr = req.body.data;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'lav-website-upload'
            })
            const src = uploadResponse.secure_url;
            if (src) {
                console.log("SRC", src);
                try {
                    const photo = new Photo({
                        src,
                    });
    
                    // Create new photo
                    const photoCreated = await photo.save();
                    return res.status(200).send(photoCreated);
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
                Photo.findById(_id).then((data) => res.send(data)).catch((e) => res.send("error", e));
            } else {
                Photo.find().then((data) => res.send(data)).catch((e) => res.send("error", e))
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
                    Photo.findByIdAndRemove(_id).then((data) => res.send(data)).catch((e) => res.send("error", e))
                }}
}
    export default connectDB(handler);

//     if (req.method === 'POST') {
//         // Check if src is provided
//         const { src } = req.body;
        // if (src) {
        //     try {
        //         const photo = new Photo({
        //             src,
        //         });

        //         // Create new photo
        //         const photoCreated = await photo.save();
        //         return res.status(200).send(photoCreated);
        //     } catch (error) {
        //         return res.status(500).send(error.message);
        //     }
        // } else {
        //     res.status(422).send('data_incomplete');
        // }
//     } else if (req.method === 'GET') {
//         const { _id } = req.query;
//         if (_id) {
//             Photo.findById(_id).then((data) => res.send(data)).catch((e) => res.send("error", e));
//         } else {
//             Photo.find().then((data) => res.send(data)).catch((e) => res.send("error", e))
//         }
//     } else if (req.method === 'DELETE') {
//         const { _id } = req.query;
//         if (_id) {
//             Photo.findByIdAndRemove(_id).then((data) => res.send(data)).catch((e) => res.send("error", e))
//         }
//     } else if (req.method === 'PATCH') {
//         const { _id } = req.query;
//         if (_id) {
//             const newInfo = req.body;
//             Photo.findByIdAndUpdate(_id, newInfo)
//                 .then((data) => res.send(data)
//                 ).catch((e) => res.send("error", e))
//         }
//     } else {
//         res.status(422).send('req_method_not_supported');
//     }
// };

// cloudinary.uploader.upload("/", function (error, result) { console.log(result, error) });

