/**
 * Created by aditya on 3/21/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'userModel'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'websiteModel'}],
        dateCreated: {type: Date, default:Date.now()}

    }, {collection: 'assignment5.website'});

    return websiteSchema;
};