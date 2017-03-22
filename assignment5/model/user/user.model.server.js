/**
 * Created by aditya on 3/19/17.
 */
module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();

    var userModel = mongoose.model('userModel', userSchema );

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsite: addWebsite
    };
    return api;

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel
            .remove({_id:userId})
            .then(function (status,err) {
                if(err)
                    deferred.abort(err);
                else{
                        deferred.resolve(status);
                    }
                });
                return deferred.promise;
            }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel
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

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel
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
        userModel
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
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
        userModel
            .create(user, function (err, user){
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function updateUser(userId,newUser) {
        var deferred = q.defer();
        userModel
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

    function addWebsite(userId,websiteId) {
        var deferred = q.defer();
        userModel
            .findById(userId)
            .then(function (user,err) {
                if(err)
                    deferred.abort(err);
                else{
                    user.websites.push(websiteId);
                    user.save();
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
};