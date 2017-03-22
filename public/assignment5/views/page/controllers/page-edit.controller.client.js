/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function(pages){
                vm.pages = pages;
            });
            PageService
                .findPageById(vm.pageId)
                .then(function(page) {
                vm.page = page;
            });
        }
        init();

        function updatePage(newPage) {
            PageService
                .updatePage(vm.pageId,newPage)
                .then(function(page){
                    if(page == null) {
                    vm.error = "Unable to update page.";
                } else {
                    vm.message = "Page successfully updated."
                }
            });
        }

        function deletePage () {
            PageService
                .deletePage(vm.pageId)
                .then(function(){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            });
        }
    }
})();