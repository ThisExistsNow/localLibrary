var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        userName: {type: String, required: true, max: 15}, 
        userID: {type: String, required: true, max: 20},
        //userInit: {type: Date, required: true, max: 10}, //date user was created
        userDate: {type: Date, required: true, default: Date.now}, //current date for user
    }
);

userSchema
.virtual('url')
.get(function () {
    return '/catalog/user/' + this._id;
});

userSchema
.virtual('last_login')
.get(function () {
    return moment(this.userDate).format('MMMM Do, YYYY');
});

//export model
module.exports = mongoose.model('user', userSchema);