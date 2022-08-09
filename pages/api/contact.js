import connectDB from "../../middleware/mongodb";
import Contact from "../../models/contact";
import Family from "../../models/family";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, phone is provided
    const { name, phone } = req.body;
    console.log("test", name, phone);
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
      res.status(422).send("data_incomplete");
    }
  } else if (req.method === "GET") {
    const { _id } = req.query;
    if (_id) {
      try {
        const contact = await Contact.findById(_id);
        res.send(contact);
      } catch (e) {
        res.send("error", e);
      }
    } else {
      try {
        const contact = await Contact.find();
        res.send(contact);
      } catch (e) {
        res.send("error", e);
      }
    }
  } else if (req.method === "DELETE") {
    const { _id } = req.query;
    if (_id) {
      try {
        const contact = await Contact.findByIdAndRemove(_id);
        res.send(contact);
      } catch (e) {
        res.send("error", e);
      }
    }
  } else if (req.method === "PATCH") {
    try {
      const { _id } = req.query;
      const newInfo = req.body;
      if (_id) {
        const family = await Family.findById(_id).populate("contact");
        const contact = await Contact.findByIdAndUpdate(
          family.contact._id,
          newInfo
        );
        console.log(contact);
        res.send(contact);
      }
    } catch (e) {
      res.send("error", e);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
