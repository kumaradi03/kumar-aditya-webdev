/**
 * Created by aditya on 2/28/17.
 */
module.exports = function (app){
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.get("/api/page/:pageId",findPageById);
    app.delete("/api/page/:pageId",deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];


    function findAllPagesForWebsite(req,res) {
        var websiteid = req.params.wid;
        var pages1 = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteid) {
                pages1.push(pages[p]);
            }
        }
        res.send(pages1);
    }

    function deletePage(req,res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.send(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findPageById(req,res) {
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                res.send(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.send(page);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req,res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        page.websiteId = websiteId;
        var num = (new Date()).getTime();
        page._id = num.toString();
        pages.push(page);
        res.send(page);
    }
}

