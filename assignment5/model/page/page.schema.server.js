/**
 * Created by aditya on 3/19/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:'websiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'pageModel'}],
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: 'assignment5.page'});

    return pageSchema;
};