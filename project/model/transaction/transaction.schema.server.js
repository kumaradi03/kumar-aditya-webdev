/**
 * Created by aditya on 4/12/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var transactionSchema = mongoose.Schema({
        _movieId: String,
        _buyer:{type: mongoose.Schema.Types.ObjectId, ref: 'movieUserModel'},
        _seller:{type: mongoose.Schema.Types.ObjectId, ref: 'movieUserModel'},
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: 'project.transaction'});

    return transactionSchema;
};