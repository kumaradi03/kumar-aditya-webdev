/**
 * Created by aditya on 2/11/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api1/website/"+wid)
                .then(function(res){
                    return res.data;
                });
        }
        function deleteWebsite(websiteId) {
            return $http.delete("/api1/website/"+websiteId)
                .then(function(res){
                    return res.data;
                });
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api1/website/"+websiteId,newWebsite)
                .then(function(res){
                    return res.data;
                });
        }

        function createWebsite(userId, website) {
            return $http.post("/api1/user/"+userId+"/website",website)
                .then(function(res){
                    return res.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api1/user/"+userId+"/website")
                .then(function(res){
                    return res.data;
                });
        }
    }
})();