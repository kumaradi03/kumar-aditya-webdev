/**
 * Created by aditya on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($location,$routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                    .then(function(widget){
                        vm.widget = widget;
            });
        }
        init();
    }
})();
