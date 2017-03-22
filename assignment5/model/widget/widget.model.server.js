/**
 * Created by aditya on 3/21/17.
 */
module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server')();

    var widgetModel = mongoose.model('widgetModel', widgetSchema);

    var api = {
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget
    };
    return api;

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel
            .remove({_id: widgetId})
            .then(function (status, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel
            .findById(widgetId)
            .then(function (widget, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel
            .find({_page: pageId})
            .then(function (widget, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function createWidget(pageId, newWidget) {
        var deferred = q.defer();
        newWidget._page = pageId;
        widgetModel
            .create(newWidget, function (err, widget) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(widget);
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, newWidget) {
        var deferred = q.defer();
        widgetModel
            .update({_id: widgetId}, {$set: newWidget})
            .then(function (widget, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

}