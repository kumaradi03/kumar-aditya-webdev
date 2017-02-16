/**
 * Created by aditya on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "-1", "widgetType": "HEADING"},
            {"_id": "-2", "widgetType": "IMAGE"},
            {"_id": "-3", "widgetType": "HTML"},
            {"_id": "-4", "widgetType": "YOUTUBE"}

        ];

        this.findAllWidgets = findAllWidgets;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;


        function findAllWidgets(pageID) {
            var widgets1 = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageID) {
                    widgets1.push(widgets[w]);
                }
            }
            return widgets1;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId,WidgetType,Widget) {
            for(var w in widgets) {
                var widget = widgets[w];
                if( widget._id == widgetId ) {
                    switch (WidgetType){
                        case "HEADING":
                        {
                            widgets[w].text = Widget.text;
                            widgets[w].size = Widget.size;
                            break;
                        }
                        case "IMAGE":
                        {
                            widgets[w].url = Widget.url;
                            widgets[w].width = Widget.width;
                            break;
                        }
                        case "HTML":
                        {
                            widgets[w].text = Widget.text;
                            widgets[w].size = Widget.size;
                            break;
                        }
                        case "YOUTUBE":
                        {
                            widgets[w].url = Widget.url;
                            widgets[w].width = Widget.width;
                            break;
                        }
                    }
                    return widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId)
        {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function createWidget(pageID,Widget) {
            var num = (new Date()).getTime();
            Widget._id = num.toString();
            Widget.pageId = pageID;
            widgets.push(Widget);
            return Widget;
        }
    }
})();