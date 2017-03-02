/**
 * Created by aditya on 2/28/17.
 */
module.exports = function (app){
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.post("/api/user/:uid/website",createWebsite);
    app.put("/api/website/:websiteId",updateWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.delete("/api/website/:websiteId",deleteWebsite)

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook (FB) is an American for-profit corporation and online social media and social networking service based in Menlo Park, California. The Facebook website was launched on February 4, 2004, by Mark Zuckerberg, along with fellow Harvard College students and roommates, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes."},
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "A tweeter or treble speaker is a special type of loudspeaker (usually dome or horn-type) that is designed to produce high audio frequencies, typically from around 2,000 Hz to 20,000 Hz (generally considered to be the upper limit of human hearing)."},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo is a design, technology, science and science fiction website that writes articles on politics. It was originally launched as part of the Gawker Media network run by Nick Denton, and runs on the Kinja platform. Gizmodo also includes the subsite io9, which focuses on science fiction and futurism as they relate to politics."},
        { "_id": "567", "name": "Tic-Tac-Toe", "developerId": "123", "description": "Tic-Tac-Toe is a  paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game."},
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers is a group of strategy board games for two players which involve diagonal moves of uniform game pieces and mandatory captures by jumping over opponent pieces."},
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess is a two-player strategy board game played on a chessboard, a checkered gameboard with 64 squares arranged in an eight-by-eight grid.Chess is played by millions of people worldwide, both amateurs and professionals."}
    ];

    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findWebsiteById(req,res) {
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                res.send(websites[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.send(website);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req,res) {
        var website = req.body;
        var userId = req.params.uid;
        website.developerId = userId;
        var num = (new Date()).getTime();
        website._id = num.toString();
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.uid;
        var sites = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.send(sites);
    }
}