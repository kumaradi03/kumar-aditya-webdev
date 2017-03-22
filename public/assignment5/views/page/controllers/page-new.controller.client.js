/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages;
                    if(vm.pages.length == 0)
                        vm.error = "Website has no pages."
            });
        }
        init();

        function createPage (page) {
            PageService
                .createPage(vm.websiteId, page)
                .then(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            });
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
    }
})();
