/**
 * Created by aditya on 2/28/17.
 */
module.exports = function (app, model){
    app.get("/api1/user/:uid/website", findAllWebsitesForUser);
    app.post("/api1/user/:uid/website",createWebsite);
    app.put("/api1/website/:websiteId",updateWebsite);
    app.get("/api1/website/:websiteId",findWebsiteById);
    app.delete("/api1/website/:websiteId",deleteWebsite);

    var websiteModel = model.websiteModel;
    var userModel = model.userModel;

    function deleteWebsite(req,res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId,newWebsite)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWebsite(req, res) {
        var user = req.params.uid;
        var website = req.body;
        websiteModel
            .createWebsite(user, website)
            .then(function (website) {
                userModel.addWebsite(user, website._id)
                    .then(function (status) {
                        res.send(website);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.uid;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}