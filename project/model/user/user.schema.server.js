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
        follows:[{type: mongoose.Schema.Types.ObjectId, ref:'movieUserModel'}],
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        bought_movies:[{_movieId:String,quantity:Number}],
        likes:[String],
        wishlist:[String],
        sold_movies:[{_movieId:String,quantity:Number}],
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: 'project.user'});

    return movieUserSchema;
};