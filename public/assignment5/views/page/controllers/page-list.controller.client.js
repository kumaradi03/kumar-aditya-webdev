/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        PageService
            .findAllPagesForWebsite(vm.websiteId)
            .then(function(pages) {
                vm.pages = pages;
                if (vm.pages.length == 0)
                    vm.error = "Website has no pages.";

        });
    }
})();