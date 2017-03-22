/**
 * Created by aditya on 3/1/17.
 */
(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();