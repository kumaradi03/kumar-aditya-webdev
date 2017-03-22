/**
 * Created by aditya on 3/21/17.
 */
module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server')();

    var websiteModel = mongoose.model('websiteModel', websiteSchema);

    var api = {
        createWebsite: createWebsite,
        deleteWebsite: deleteWebsite,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        addPage: addPage
    };
    return api;

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel
            .remove({_id: websiteId})
            .then(function (status, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId)
            .then(function (website, err) {
                if (err)
                    deferred.abort(err);
                else {
                    // console.log(user);
                    deferred.resolve(website);
                }

            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .find({_user: userId})
            .then(function (website, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function createWebsite(user, newWebsite) {
        var deferred = q.defer();
        newWebsite._user = user;
        websiteModel
            .create(newWebsite, function (err, website) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(website);
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, newWebsite) {
        var deferred = q.defer();
        websiteModel
            .update({_id: websiteId}, {$set: newWebsite})
            .then(function (website, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function addPage(websiteId, pageId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId)
            .then(function (website, err) {
                if (err)
                    deferred.abort(err);
                else {
                    website.pages.push(pageId);
                    website.save();
                    deferred.resolve(website);

                }
            });
        return deferred.promise;
    }
}