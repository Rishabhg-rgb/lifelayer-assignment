const mongoose = require("mongoose")
const schema = mongoose.Schema

const userDetailsSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:"users",
        required:true

    },
    name: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: false
    },
    education: [{
        degree: String,
        institution: String,
        year: String
    }],
    experience: [{
        jobTitle: String,
        company: String,
        years: String
    }],
    profilePhoto: {
        type: String,
        required: false
    }
})

const userDetails = mongoose.model("userDetails",userDetailsSchema)
module.exports = userDetails