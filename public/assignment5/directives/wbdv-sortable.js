/**
 * Created by aditya on 3/1/17.
 */
(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', sortableDir);

    function sortableDir($routeParams) {
        function linkFunc(scope, element, attributes) {
            var pageId = $routeParams.pid;
            var start = -1;
            var end = -1;
            element.sortable(
                {axis: 'y'},
                {start: function (event, ui) {
                    start = (ui.item).index();
                }, stop: function(event, ui){
                    end = (ui.item).index();
                    scope.sortableController.sort(start, end, pageId);
                }});
        }
        return {
            scope:{},
            link: linkFunc,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(WidgetService,$routeParams) {
        var vm = this;
        vm.sort = sort;
        function sort(start, end, pageId) {
            WidgetService
                .sortWidget(start, end, pageId);
        }
    }

})();