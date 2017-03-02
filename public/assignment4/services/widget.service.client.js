/**
 * Created by aditya on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

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
        var api = {
            "findAllWidgets": findAllWidgets,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "createWidget": createWidget

        };
        return api;

        function findAllWidgets(pageID) {
            return $http.get("/api/page/"+pageID+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId,WidgetType,Widget) {
            return $http.put("/api/widget/"+widgetId, Widget, WidgetType);
        }

        function deleteWidget(widgetId)
        {
            return $http.delete("/api/widget/"+widgetId);
        }

        function createWidget(pageID,Widget) {
            return $http.post("/api/page/"+pageID+"/widget", Widget);
        }
    }
})();