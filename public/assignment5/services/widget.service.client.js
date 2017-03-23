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
            "createWidget": createWidget,
            "sortWidget": sortWidget

        };
        return api;

        function findAllWidgets(pageID) {
            return $http.get("/api1/page/"+pageID+"/widget")
                .then(function(res){
                    return res.data;
                });
        }

        function findWidgetById(widgetId) {
            return $http.get("/api1/widget/"+widgetId)
                .then(function(res){
                    return res.data;
                });
        }

        function updateWidget(widgetId,WidgetType,Widget) {
            return $http.put("/api1/widget/"+widgetId, Widget, WidgetType)
                .then(function(res){
                    return res.data;
                });
        }

        function deleteWidget(widgetId)
        {
            return $http.delete("/api1/widget/"+widgetId)
                .then(function(res){
                    return res.data;
                });
        }

        function createWidget(pageID,Widget) {
            return $http.post("/api1/page/"+pageID+"/widget", Widget)
                .then(function(res){
                    return res.data;
                });
        }

        function sortWidget(start,end,pageId){
            return $http.put("/page/"+pageId+"/widget?start="+start+"&end="+end);
        }
    }
})();