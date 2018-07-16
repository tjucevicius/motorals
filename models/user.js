
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    fullname: {type: String, unique: true, default:''},
    email: {type: String, unique: true},
    password : {type: String, default: ''},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbTokens: Array,
    google: {type: String, default:''},
    googleTokens: Array,
    referedBy: {type: String, default: ''},
    referedDate: {type: Date, default: Date.now},
    referingId: {type: Number, default: function() {
        return Math.round(Math.random()*100000000000) 
    }}
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);