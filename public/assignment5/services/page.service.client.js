/**
 * Created by aditya on 2/11/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "findAllPagesForWebsite":findAllPagesForWebsite,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findPageById(pid) {
            return $http.get("/api1/page/"+pid)
                .then(function(res){
                    return res.data;
                });
        }

        function findAllPagesForWebsite(websiteid) {
            return $http.get("/api1/website/"+websiteid+"/page")
                .then(function(res){
                    return res.data;
                });
        }

        function deletePage(pageId) {
            return $http.delete("/api1/page/"+pageId)
                .then(function(res){
                    return res.data;
                });
        }

        function updatePage(pageId, newPage) {
            return $http.put("/api1/page/"+pageId, newPage)
                .then(function(res){
                    return res.data;
                });
        }

        function createPage(websiteid, page) {
            return $http.post("/api1/website/"+websiteid+"/page",page)
                .then(function(res){
                    return res.data;
                });
        }

    }
})();