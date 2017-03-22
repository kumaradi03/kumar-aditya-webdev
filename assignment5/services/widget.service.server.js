/**
 * Created by aditya on 3/1/17.
 */
module.exports = function (app,model) {
    app.get("/api1/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api1/page/:pageId/widget",createWidget);
    app.put("/api1/widget/:widgetId",updateWidget);
    app.get("/api1/widget/:widgetId",findWidgetById);
    app.delete("/api1/widget/:widgetId",deleteWidget);

    var widgetModel = model.widgetModel;
    var pageModel = model.pageModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api1/upload", upload.single('myFile'), uploadImage);

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
            widget.type = "IMAGE";
            widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            //widgets.push(widget);
            widgetModel
                .createWidget(pageId,widget)
                .then(function (widget) {
                    res.redirect("/assignment5/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget._id);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
        else {
            widget._id = widget.widgetId;
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widget.url = url;
            widgetModel
                .updateWidget(widgetId,widget)
                .then(function (widget1) {
                    res.redirect("/assignment5/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }


    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var Widget = req.body;
        widgetModel
            .createWidget(pageId, Widget)
            .then(function (widget) {
                pageModel.addPage(pageId, widget._id)
                    .then(function (widget) {
                        res.send(widget);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req,res) {
        var widget1 = req.body;
        var widgetId = req.params.widgetId;
        var widgetType = widget1.widgetType;
        widgetModel
            .updateWidget(widgetId,widget1)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}
