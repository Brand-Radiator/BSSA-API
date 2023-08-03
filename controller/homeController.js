const homeModel = require("../model/homeModel");


const createHome = async (req, res) => {

    try {
        const slogan = req.body.slogan;
        const state = req.body.state;
        const designation = req.body.designation;
        const profileName = req.body.profileName;

        // const imageUrl = req.file.path;

        console.log("1")

        if(!slogan)     return res.send({code:400 , message:"slogan required"})
        if(!state)     return res.send({code:400 , message:"state required"})
        console.log("2", slogan)

        // if(!bg_img)     return res.send({code:400 , message:"bg_img required"})
        if(!designation)     return res.send({code:400 , message:"designation required"})
        console.log("3")

        if(!profileName)     return res.send({code:400 , message:"profileName required"})
        console.log("4")

        const createUser = await homeModel.create({slogan:slogan, state:state, designation:designation, profileName:profileName})
        console.log("5")

        return res.send({code:200 , message:createUser})
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};


const fetchHome = async (req, res) => {
    try {
        const newData = await homeModel.find();
        res.status(200).send(newData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const updateHome = async (req, res) => {
    // const objectId = new mongoose.Types.ObjectId(req.params.id);  // Get the id from request parameters
    const objectId = req.params.id;

    const { slogan,state,bg_img, designation,profileName } = req.body;


    const profilePhoto = req.file ? req.file.path : undefined; // Check if req.file exists before using it

    try {

        // Find the existing resource in the database
        const existingData = await homeModel.findById(objectId);

        if (!existingData) {
            return res.status(404).json({ status: false, message: "Resource not found" });
        }

        // Apply updates based on the fields present in req.body
        // if (logo) {
        //     existingData.logo = logo;
        // }

        if (slogan) {
            existingData.slogan = slogan;
        }
        if (state) {
            existingData.state = state;
        }


        // if (bg_img) {
        //     existingData.bg_img = bg_img;
        // }


        // if (otherLogo) {
        //     existingData.otherLogo = otherLogo;
        // }


        if (designation) {
            existingData.designation = designation;
        }


        // if (profilePhoto) {
        //     existingData.profilePhoto = profilePhoto;
        // }



        await existingData.save();

        res.status(200).json({
            status: true,
            data: existingData,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};


module.exports = { updateHome,createHome,fetchHome };