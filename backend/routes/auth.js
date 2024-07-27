const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const verifyJWT = require("../middleware/auth");
const userDetails = require('../models/userDetails');

// Register
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log("heheheh", req.body)
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }



        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const userResponse = await User.create({
            email,
            password: passwordHash
        });
        console.log(userResponse._id)
        const userDetailsResponse = await userDetails.create({
            userId: userResponse._id,

        })
        const payload = {
            user: {
                id: userResponse._id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ status: 201, data: token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ status: 200, data: token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// get UserDEtails
router.get('/get/:page', verifyJWT, async (req, res) => {
    try {
        const resp = await userDetails.findOne({ userId: req.user.id });
        if (!resp) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const page = parseInt(req.params.page, 10);
        const fields = Object.keys(resp._doc); // Access the document's keys

        // Filter out any internal Mongoose properties
        const filteredFields = fields.filter(field => !field.startsWith('_'));

        if (page > 0 && page <= filteredFields.length) {
            const field = filteredFields[page - 1];
            return res.json({ data: { [field]: resp[field] }, totalPage: filteredFields.length, fulldetail: resp });
        } else {
            return res.status(400).json({ msg: 'Invalid page number' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.patch('/update', verifyJWT, async (req, res) => {
    const { mobileNumber, education, experience, profilePhoto } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.education = education || user.education;
        user.experience = experience || user.experience;
        user.profilePhoto = profilePhoto || user.profilePhoto;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// .UserDetails controller
router.patch('/update/userdetails', verifyJWT, async (req, res) => {
    const { name, mobileNumber, email, education, experience, profilePhoto } = req.body;

    try {
        let user = await userDetails.findOneAndUpdate({ userId: req.user.id }, { name: name, mobileNumber: mobileNumber, email: email, education: education, experience: experience, profilePhoto: profilePhoto });

        if (user) {
            return res.status(200).json({ status: 200, message: "successfully update" });
        }
        else {
            return res.status(402).json({ status: 402, message: "unable to update" });

        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




// Upload Image func
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/uploadimages", async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Process all files
        const uploadPromises = req.files.map(file => 
            cloudinary.uploader.upload(file.path, {
                transformation: [
                    { width: 600, crop: "scale" },
                    { quality: 80, fetch_format: "auto" }
                ]
            }).then(result => {
                // Remove the temporary file
                fs.unlinkSync(file.path);
                return result;
            })
        );

        // Wait for all uploads to complete
        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map(result => result.secure_url);

        return res.json({ data: results, urls: imageUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server error",
        });
    }
});

module.exports = router;
