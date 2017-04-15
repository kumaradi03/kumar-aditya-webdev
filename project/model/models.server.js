/**
 * Created by aditya on 4/2/17.
 */
module.exports = function () {
    var movieUserModel = require('./user/user.model.server.js')();
    var movieModel = require('./movie/movie.model.server')();
    var transactionModel = require('./transaction/transaction.model.server')();

    var model = {
        movieUserModel: movieUserModel,
        movieModel: movieModel,
        transactionModel: transactionModel
    };
    return model;
};