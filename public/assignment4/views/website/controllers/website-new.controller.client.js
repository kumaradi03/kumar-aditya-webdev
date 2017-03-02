/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function (websites) {
                vm.websites = websites;
                if (vm.websites.length == 0)
                    vm.error = "User has no websites."
            });
        }
        init();

        function createWebsite (website) {
            var promise = WebsiteService.createWebsite(vm.userId,website);
            promise.success(function (website) {
                $location.url("/user/"+vm.userId+"/website");
            });
        }
    }
})();
