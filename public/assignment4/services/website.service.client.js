/**
 * Created by aditya on 2/11/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook (FB) is an American for-profit corporation and online social media and social networking service based in Menlo Park, California. The Facebook website was launched on February 4, 2004, by Mark Zuckerberg, along with fellow Harvard College students and roommates, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes."},
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "A tweeter or treble speaker is a special type of loudspeaker (usually dome or horn-type) that is designed to produce high audio frequencies, typically from around 2,000 Hz to 20,000 Hz (generally considered to be the upper limit of human hearing)."},
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo is a design, technology, science and science fiction website that writes articles on politics. It was originally launched as part of the Gawker Media network run by Nick Denton, and runs on the Kinja platform. Gizmodo also includes the subsite io9, which focuses on science fiction and futurism as they relate to politics."},
            { "_id": "567", "name": "Tic-Tac-Toe", "developerId": "123", "description": "Tic-Tac-Toe is a  paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game."},
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers is a group of strategy board games for two players which involve diagonal moves of uniform game pieces and mandatory captures by jumping over opponent pieces."},
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess is a two-player strategy board game played on a chessboard, a checkered gameboard with 64 squares arranged in an eight-by-eight grid.Chess is played by millions of people worldwide, both amateurs and professionals."}
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/"+websiteId,newWebsite);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }
    }
})();