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
        buyMovie:buyMovie
        // deleteFromMovie:deleteFromMovie
    };
    return api;


    // function deleteFromMovie(user,userId){
    //     var deferred = q.defer();
    //     if(user.type === "Buyer"){
    //         movieModel
    //             .find()
    //             .then(function (movies,err) {
    //                 if(movies){
    //                     for(var i=0;i<movies.length;i++){
    //                             for(var j=0;j<movies[i].buyer.length;j++){
    //                             if(movies[i].buyer[j]._buyerId === userId){
    //                                 movies[i].buyer.splice(j,1);
    //                             }
    //                         }
    //                     }
    //                     console.log("Hi",movies);
    //                     movieModel
    //
    //                     deferred.resolve(movies);
    //                 }
    //                 else{
    //                     deferred.abort(err);
    //                 }
    //             });
    //     }
    //     return deferred.promise;
    // }

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

    function buyMovie(buyerId,sellerId,movieId) {
        var deferred = q.defer();
        movieModel
            .findOne({_movieId:movieId})
            .then(function (movie,err) {
                if(movie){
                    var found = false;
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