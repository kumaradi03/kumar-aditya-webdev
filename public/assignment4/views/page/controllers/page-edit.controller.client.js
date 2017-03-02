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
            var promise = PageService.findAllPagesForWebsite(vm.websiteId);
            promise.success(function(pages){
                vm.pages = pages;
            });
            var promise = PageService.findPageById(vm.pageId);
            promise.success(function(page) {
                vm.page = page;
            });
        }
        init();

        function updatePage(newPage) {
            var promise = PageService.updatePage(vm.pageId,newPage);
            promise.success(function(page){
                if(page == null) {
                    vm.error = "Unable to update page.";
                } else {
                    vm.message = "Page successfully updated."
                }
            });
        }

        function deletePage () {
            var promise = PageService.deletePage(vm.pageId);
            promise.success(function(){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            });
        }
    }
})();