

const AboutusModel = require("../model/aboutUsModel");
const mongoose = require('mongoose');

const addAboutUs = async (req, res) => {


    const heading = req.body.heading;
    const paragraph = req.body.paragraph;
    // console.log(req.file, "hhdshdshhsd")
    const bannerUrl = req.file.path;

    // console.log(bannerUrl, "dsdsw");


    try {


        if (!heading) return res.send({ code: 400, message: "Heading required" })
        if (!paragraph) return res.send({ code: 400, message: "Paragraph required" })
        if (!bannerUrl) return res.send({ code: 400, message: "Banner url required" })

        const newData = new AboutusModel({ heading, paragraph, bannerUrl });
        if (newData) {
            await newData.save();
            res.status(201).json({
                status: true,
                data: newData,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};





const fetchAboutUs = async (req, res) => {
    try {
        const newData = await AboutusModel.find();
        res.status(200).send(newData);
    } catch (error) {
        res.status(400).send(error);
    }
};











const updateAboutUs = async (req, res) => {

    // const objectId = new mongoose.Types.ObjectId(req.params.id);  // Get the id from request parameters
    const objectId = req.params.id;

    const { heading, paragraph } = req.body;



    const bannerUrl = req.file ? req.file.path : undefined; // Check if req.file exists before using it

    try {
        if (!heading) return res.send({ code: 400, message: "Heading required" });
        if (!paragraph) return res.send({ code: 400, message: "Paragraph required" });

        // Find the existing resource in the database
        const existingData = await AboutusModel.findById(objectId);

        if (!existingData) {
            return res.status(404).json({ status: false, message: "Resource not found" });
        }

        // Apply updates based on the fields present in req.body
        if (heading) {
            existingData.heading = heading;
        }
        if (paragraph) {
            existingData.paragraph = paragraph;
        }
        if (bannerUrl) {
            existingData.bannerUrl = bannerUrl;
        }

        await existingData.save();

        res.status(200).json({
            status: true,
            data: existingData,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};











module.exports = {
    addAboutUs,
    fetchAboutUs,
    updateAboutUs
};