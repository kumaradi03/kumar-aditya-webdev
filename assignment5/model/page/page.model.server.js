/**
 * Created by aditya on 3/19/17.
 */
module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server')();

    var pageModel = mongoose.model('pageModel', pageSchema );

    var api = {
        createPage: createPage,
        deletePage: deletePage,
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        addPage: addPage
        //reorderWidget:reorderWidget
    };
    return api;

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel
            .remove({_id:pageId})
            .then(function (status,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId)
            .then(function (page,err) {
                if(err)
                    deferred.abort(err);
                else{
                    // console.log(user);
                    deferred.resolve(page);
                }

            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(pageId) {
        var deferred = q.defer();
        pageModel
            .find({_website:pageId})
            .then(function (page,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function createPage(website,newpage) {
        var deferred = q.defer();
        newpage._website = website;
        pageModel
            .create(newpage, function (err, page){
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(page);
            });
        return deferred.promise;
    }

    function updatePage(pageId,newpage) {
        var deferred = q.defer();
        pageModel
            .update({_id: pageId}, {$set: newpage})
            .then(function (page,err) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function addPage(pageId,widgetId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId)
            .then(function (page,err) {
                if(err)
                    deferred.abort(err);
                else{
                    page.widgets.push(widgetId);
                    page.save();
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    // function reorderWidget(start,end,PageId)
    // {
    //     var deferred = q.defer();
    //     pageModel
    //         .
    // }
};