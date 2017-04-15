/**
 * Created by aditya on 4/2/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var movieUserSchema = mongoose.Schema({
        username: String,
        facebook:{
            token: String,
            id: String,
            displayName: String
        },
        type: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        bought_movies:[{_movieId:String,quantity:Number}],
        likes:[String],
        wishlist:[String],
        sold_movies:[{_movieId:String,quantity:Number}],
        comments:[{_movieId: String, comments: String}],
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: 'project.user'});

    return movieUserSchema;
};