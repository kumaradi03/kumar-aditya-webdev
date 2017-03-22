/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        WebsiteService
            .findAllWebsitesForUser(vm.userId)
            .then(function (websites) {
                if(websites.length == 0)
                    vm.error = "User has no websites.";
                else
                    vm.websites = websites;
            });
    }
})();