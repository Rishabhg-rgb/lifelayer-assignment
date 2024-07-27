const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate")
// Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
});

UserSchema.plugin(mongoosePaginate)

module.exports = User = mongoose.model('users', UserSchema);
