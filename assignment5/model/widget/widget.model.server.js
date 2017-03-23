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
        updateWidget: updateWidget,
        reorderWidget: reorderWidget
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
            .find({_page:pageId})
            .then(function (Widget,err) {
                if(err)
                    deferred.abort(err);
                else{
                    var index = Widget.length;
                    newWidget.index = index;
                    widgetModel.create(newWidget, function (err, docs) {
                        if (err){
                            deferred.abort(err);
                        }
                        else{
                            deferred.resolve(docs);
                        }

                    });
                }
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

    function reorderWidget(start, end, pageId){
        var deferred = q.defer();
        widgetModel
            .find({_page: pageId})
            .then(function (widgets, err) {
                if(err)
                    deferred.abort(err);
                else{
                    widgets.forEach(function (widget) {
                        start = parseInt(start);
                        end = parseInt(end);
                        if(start < end){
                            if(widget.index === start)
                                widget.index = end;
                            else if(widget.index > start && widget.index <= end)
                                widget.index--;
                        } else{
                            if(widget.index === start)
                                widget.index = end;
                            else if(widget.index < start && widget.index >= end)
                                widget.index++;
                        }
                        widget.save();
                    });
                    deferred.resolve(widgets);
                }
            });
        return deferred.promise;
    }
}