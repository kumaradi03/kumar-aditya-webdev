/**
 * Created by aditya on 2/11/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "findPageByWebsiteId":findPageByWebsiteId,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findPageById(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteid) {
            var pages1 = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteid) {
                    pages1.push(pages[p]);
                }
            }
            return pages1;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pageId, newPage) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId ) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;
                    return page;
                }
            }
            return null;
        }

        function createPage(websiteid, page) {
            page.websiteId = websiteid;
            var num = (new Date()).getTime();
            page._id = num.toString();
            pages.push(page);
        }

        function findAllWebsitesForUser(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }
    }
})();