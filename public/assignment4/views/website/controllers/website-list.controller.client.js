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
        var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
        promise.success(function (websites) {
            vm.websites = websites;
            if(vm.websites.length == 0)
                vm.error = "User has no websites."
        });
    }
})();