/**
 * Created by aditya on 4/8/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var movieSchema = mongoose.Schema({
        _movieId: String,
        seller:[{_sellerId:String, quantity:Number}],
        buyer:[{_buyerId:String, quantity:Number}],
        likes:[String],
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: 'project.movie'});

    return movieSchema;
};