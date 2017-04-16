/**
 * Created by aditya on 4/2/17.
 */
/**
 * Created by aditya on 3/19/17.
 */
module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();

    var movieUserModel = mongoose.model('movieUserModel', userSchema );

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers:findAllUsers,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        incrementLike: incrementLike,
        removeLike: removeLike,
        followSeller:followSeller,
        addToWishlist:addToWishlist,
        removeFromWishList:removeFromWishList,
        sellMovie: sellMovie,
        buyerUpdate:buyerUpdate,
        sellerUpdate:sellerUpdate,
        unFollowSeller:unFollowSeller,
        findFacebookUser:findFacebookUser
    };
    return api;

    function deleteUser(userId) {
        var deferred = q.defer();
        movieUserModel
            .remove({_id:userId})
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findFacebookUser(id) {
        return movieUserModel.findOne({"facebook.id": id});
    }

    function findUserById(userId) {
        var deferred = q.defer();
        movieUserModel
            .findById(userId)
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    // console.log(user);
                    deferred.resolve(user);
                }

            });
        return deferred.promise;
    }

    function followSeller(userId,sellerId){
        var deferred = q.defer();
        movieUserModel
            .findById(userId)
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    var found = false;
                    for(var i=0;i<user.follows.length;i++){
                        if(user.follows[i] === userId)
                            found = true;
                    }
                    if(!found){
                        user.follows.push(sellerId);
                        user.save();
                        deferred.resolve(user);
                    }
                }
            });
        return deferred.promise;
    }

    function unFollowSeller(userId,sellerId){
        var deferred = q.defer();
        movieUserModel
            .findById(userId)
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else {
                    console.log(user);
                    for (var i = 0; i < user.follows.length; i++) {
                        if(user.follows[i] == sellerId){
                            console.log(user.follows[i]);
                            user.follows.splice(i,1);
                            user.save();
                            deferred.resolve(user);
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        movieUserModel
            .find()
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        movieUserModel
            .findOne({username: username})
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        movieUserModel
            .findOne({username: username,password:password})
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function createUser(newUser) {
        var deferred = q.defer();
        var user = {
            username: newUser.username,
            facebook:newUser.facebook,
            type: newUser.type,
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        };
        movieUserModel
            .create(user, function (err, user){
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function buyerUpdate(buyerId,movieId) {
        var deferred = q.defer();
        movieUserModel
            .findOne({_id:buyerId})
            .then(function (buyer,err) {
                var found = false;
                for(var i=0;i<buyer.bought_movies.length;i++){
                    if(buyer.bought_movies[i]._movieId === movieId){
                        buyer.bought_movies[i].quantity += 1;
                        buyer.save();
                        found = true;
                        deferred.resolve(buyer);
                    }
                }
                if(!found){
                    var buyerMovie = {
                        _movieId:movieId,
                        quantity:1
                    };
                    buyer.bought_movies.push(buyerMovie);
                    buyer.save();
                    deferred.resolve(buyer);
                }
            });
        return deferred.promise;
    }

    function sellerUpdate(sellerId,movieId) {
        var deferred = q.defer();
        movieUserModel
            .findOne({_id:sellerId})
            .then(function (seller,err) {
                for(var i=0;i<seller.sold_movies.length;i++){
                    if(seller.sold_movies[i]._movieId === movieId){
                        seller.sold_movies[i].quantity -= 1;
                        if(seller.sold_movies[i].quantity === 0){
                            seller.sold_movies.splice(i,1);
                        }
                        seller.save();
                        deferred.resolve(seller);
                    }
                }
            });
        return deferred.promise;
    }

    function sellMovie(newMovie) {
        var deferred = q.defer();
        movieUserModel
            .findOne({_id:newMovie.seller._sellerId})
            .then(function (user,err) {
                var found = false;
                if(user){
                    for(var i=0;i<user.sold_movies.length;i++){
                        if(user.sold_movies[i]._movieId === newMovie._movieId){
                            user.sold_movies[i].quantity += newMovie.seller.quantity;
                            found = true;
                            user.save();
                            deferred.resolve(user);
                        }
                    }
                    if(!found){
                        var sellerMovie = {
                            _movieId:newMovie._movieId,
                            quantity:newMovie.seller.quantity
                        };
                        user.sold_movies.push(sellerMovie);
                        user.save();
                        deferred.resolve(user);
                    }
                }
                else{
                    deferred.abort(err);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,newUser) {
        var deferred = q.defer();
        movieUserModel
            .update({_id: userId}, {$set: newUser})
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function incrementLike(userId,movieId) {
        var deferred = q.defer();
        movieUserModel
            .update({_id: userId}, {$push:{"likes":movieId}})
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function addToWishlist(userId,movieId) {
        var deferred = q.defer();
        movieUserModel
            .update({_id: userId}, {$push:{"wishlist":movieId}})
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function removeLike(userId,movieId) {
        var deferred = q.defer();
        movieUserModel
            .findById(userId)
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    var index = user.likes.indexOf(movieId);
                    if(index > -1){
                        user.likes.splice(index,1);
                    }
                    movieUserModel
                        .update({_id: userId}, {$set:user})
                        .then(function (user,err) {
                            if(err)
                                deferred.abort(err);
                            else{
                                deferred.resolve(user);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function removeFromWishList(userId,movieId) {
        var deferred = q.defer();
        movieUserModel
            .findById(userId)
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    var index = user.wishlist.indexOf(movieId);
                    if(index > -1){
                        user.wishlist.splice(index,1);
                    }
                    movieUserModel
                        .update({_id: userId}, {$set:user})
                        .then(function (user,err) {
                            if(err)
                                deferred.abort(err);
                            else{
                                deferred.resolve(user);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};