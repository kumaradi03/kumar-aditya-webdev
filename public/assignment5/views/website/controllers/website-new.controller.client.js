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
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                    if (vm.websites.length == 0)
                    vm.error = "User has no websites."
            });
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId,website)
                .then(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
            });
        }
    }
})();
