/**
 * Created by aditya on 2/14/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        // vm.updateWidget = updateWidget;
        // vm.createWidget = createWidget;
        vm.deleteWidget = deleteWidget;
        vm.chooseUpdateDelete = chooseUpdateDelete;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.success(function (widget) {
                vm.widget = widget;
            });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-' + type + '.view.client.html';
        }

        function chooseUpdateDelete(widget) {
            if (vm.widgetId == -1 || vm.widgetId == -2 || vm.widgetId == -3 || vm.widgetId == -4) {
                var promise = WidgetService.createWidget(vm.pageId, widget);
                promise.success(function (widget) {
                    var widget = widget;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
            }
            else {
                var promise = WidgetService.updateWidget(vm.widgetId, vm.widget.widgetType, widget);
                promise.success(function (widget) {
                    var widget = widget;
                    if (widget == null) {
                        vm.error = "Unable to update widget.";
                    } else {
                        vm.message = "Widget successfully updated."
                    }
                });
            }
        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.widgetId);
            promise.success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            });
        }
    }
})();
