/**
 * Created by aditya on 2/11/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "findAllPagesForWebsite":findAllPagesForWebsite,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
        }

        function findAllPagesForWebsite(websiteid) {
            return $http.get("/api/website/"+websiteid+"/page");
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }

        function updatePage(pageId, newPage) {
            return $http.put("/api/page/"+pageId, newPage);
        }

        function createPage(websiteid, page) {
            return $http.post("/api/website/"+websiteid+"/page",page);
        }

    }
})();