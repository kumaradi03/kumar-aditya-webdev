/**
 * Created by aditya on 3/1/17.
 */
module.exports = function (app) {
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.delete("/api/widget/:widgetId",deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

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

    function uploadImage(req, res) {
        var widget      = req.body;
        var width       = req.body.width;
        var widgetId    = req.body.widgetId;
        var myFile      = req.file;
        var pageId      = req.body.pageId;
        var userId      = req.body.userId;
        var websiteId   = req.body.websiteId;
        if(widgetId == "-2")
        {
            var num = (new Date()).getTime();
            widget._id = num.toString();
            widget.widgetType = "IMAGE";
            widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widgets.push(widget);
        }
        else {
            widget._id = widget.widgetId;
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            for (var w in widgets) {
                var widget1 = widgets[w];
                if (widget1._id == widgetId) {
                    widgets[w].url = url;
                    widgets[w].width = width;
                    break;
                }
            }
        }

        res.redirect("/assignment4/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget._id);
    }


    function findAllWidgetsForPage(req,res) {
        var pageID = req.params.pageId;
        var widgets1 = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageID) {
                widgets1.push(widgets[w]);
            }
        }
        res.send(widgets1);
    }

    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWidget(req,res) {
        var Widget = req.body;
        var pageID = req.params.pageId;
        var num = (new Date()).getTime();
        Widget._id = num.toString();
        Widget.pageId = pageID;
        widgets.push(Widget);
        res.send(Widget);
    }

    function updateWidget(req,res) {
        var widget1 = req.body;
        var widgetId = req.params.widgetId;
        var widgetType = widget1.widgetType;
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id == widgetId ) {
                switch (widgetType){
                    case "HEADING":
                    {
                        widgets[w].text = widget1.text;
                        widgets[w].size = widget1.size;
                        break;
                    }
                    case "IMAGE":
                    {
                        widgets[w].url = widget1.url;
                        widgets[w].width = widget1.width;
                        break;
                    }
                    case "HTML":
                    {
                        widgets[w].text = widget1.text;
                        widgets[w].size = widget1.size;
                        break;
                    }
                    case "YOUTUBE":
                    {
                        widgets[w].url = widget1.url;
                        widgets[w].width = widget1.width;
                        break;
                    }
                }
                res.send(widget);
                return;
            }
        }
        return null;
    }
}
