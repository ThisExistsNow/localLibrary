var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var instanceSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', require: true}, //ref to associated user 
        status: {type: String, required: true, enum: ['Online', 'Offline', 'Unavailable'], default: 'New User'},
        //lastLogin: {type: Date, default: Date}, //last available date for user
    }
);

instanceSchema
.virtual('url')
.get(function () {
    return '/catalog/profile/' + this._id;
});

//export model
module.exports = mongoose.model('userInstance', instanceSchema);