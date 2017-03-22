/**
 * Created by aditya on 2/28/17.
 */
module.exports = function (app,model) {
    app.get("/api1/website/:wid/page", findAllPagesForWebsite);
    app.post("/api1/website/:websiteId/page", createPage);
    app.put("/api1/page/:pageId", updatePage);
    app.get("/api1/page/:pageId", findPageById);
    app.delete("/api1/page/:pageId", deletePage);

    var pageModel = model.pageModel;
    var websiteModel = model.websiteModel;

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                //console.log(user);
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                //console.log(user);
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newpage = req.body;
        pageModel
            .updatePage(pageId, newpage)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createPage(req, res) {
        var website = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(website, page)
            .then(function (page) {
                websiteModel.addPage(website, page._id)
                    .then(function (status) {
                        res.send(page);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}

