/**
 * Created by aditya on 4/8/17.
 */

module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var movieSchema = require('./movie.schema.server')();

    var movieModel = mongoose.model('MovieModel', movieSchema);

    var api = {
        findMovieById: findMovieById,
        sellMovie:sellMovie,
        buyMovie:buyMovie,
        incrementLike:incrementLike,
        removeLike:removeLike,
        deleteMovie:deleteMovie
    };
    return api;


    function deleteMovie(movieId) {
        var deferred = q.defer();
        movieModel
            .remove({_id:movieId})
            .then(function (movieId,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(movieId);
                }
            });
        return deferred.promise;
    }


    function findMovieById(movieId) {
        var deferred = q.defer();
        movieModel
            .findOne({_movieId:movieId})
            .then(function (movie,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(movie);
                }
            });
        return deferred.promise;
    }

    function incrementLike(userId,movieId) {
        var deferred = q.defer();
        movieModel
            .findOne({_movieId:movieId})
            .then(function (movie,err) {
                if(movie){
                    movie.likes.push(userId);
                    deferred.resolve(movie);
                    movie.save();
                }
                else{
                    var newMovie = {
                        _movieId:movieId,
                        likes:[userId]
                    };
                    movieModel
                        .create(newMovie,function (err, movie){
                            if(err)
                                deferred.abort(err);
                            else
                                deferred.resolve(movie);
                        });
                }
            });
        return deferred.promise;
    }

    function removeLike(userId,movieId) {
        var deferred = q.defer();
        movieModel
            .findOne({_movieId:movieId})
            .then(function (movie,err) {
                if(err)
                    deferred.abort(err);
                else{
                    var index = movie.likes.indexOf(userId);
                    if(index > -1){
                        movie.likes.splice(index,1);
                        movie.save();
                        deferred.resolve(movie);
                    }
                }
            });
        return deferred.promise;
    }

    function buyMovie(buyerId,sellerId,movieId,transaction) {
        var deferred = q.defer();
        movieModel
            .findOne({_movieId:movieId})
            .then(function (movie,err) {
                if(movie){
                    var found = false;
                    movie.transactions.push(transaction._id);
                    for(var i=0;i<movie.seller.length;i++){
                        if(movie.seller[i]._sellerId === sellerId){
                            movie.seller[i].quantity -= 1;
                            if(movie.seller[i].quantity === 0){
                                movie.seller.splice(i,1);
                            }
                        }
                    }
                    for(var j=0;j<movie.buyer.length;j++){
                        if(movie.buyer[j]._buyerId === buyerId){
                            movie.buyer[j].quantity += 1;
                            found = true;
                            movie.save();
                            deferred.resolve(movie);
                        }
                    }
                    if(!found){
                        var buyer = {
                            _buyerId:buyerId,
                            quantity:1
                        };
                        movie.buyer.push(buyer);
                        movie.save();
                        deferred.resolve(movie);
                    }
                }
                else{
                    deferred.abort(err);
                }
            });
        return deferred.promise;
    }

    function sellMovie(newMovie) {
        var deferred = q.defer();
        movieModel
            .findOne({_movieId:newMovie._movieId})
            .then(function (movie,err) {
                var found = false;
                if(movie){
                    for(var i=0;i<movie.seller.length;i++){
                        if(movie.seller[i]._sellerId === newMovie.seller._sellerId){
                            movie.seller[i].quantity += newMovie.seller.quantity;
                            found = true;
                            movie.save();
                            deferred.resolve(movie);
                        }
                    }
                    if(!found){
                        var seller = {
                            _sellerId:newMovie.seller._sellerId,
                            quantity:newMovie.seller.quantity
                        };
                        movie.seller.push(seller);
                        movie.save();
                        deferred.resolve(movie);
                    }
                }
                else{
                    movieModel
                        .create(newMovie,function (err, user){
                            if(err)
                                deferred.abort(err);
                            else
                                deferred.resolve(user);
                        });
                }
            });
        return deferred.promise;
    }
};