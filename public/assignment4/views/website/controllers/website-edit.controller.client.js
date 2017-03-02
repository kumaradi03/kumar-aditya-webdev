/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function(websites){
                vm.websites = websites;
            });
            var promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise.success(function(website){
                vm.website = website;
            });
        }
        init();

        function updateWebsite(newWebsite) {
            var promise = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
            promise.success(function(website){
                if(website == null) {
                    vm.error = "Unable to update website.";
                } else {
                    vm.message = "Website successfully updated."
                }
            });
        }

        function deleteWebsite () {
            var promise = WebsiteService.deleteWebsite(vm.websiteId);
            promise.success(function(){
                $location.url("/user/"+vm.userId+"/website");
            });

        }
    }
})();