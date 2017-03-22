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
        vm.routeFlickr = routeFlickr;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    vm.widget = widget;
            });
        }
        init();

        function getEditorTemplateUrl() {
            switch(vm.widgetId){
                case "-1":
                {
                    return 'views/widget/templates/editors/widget-HEADING.view.client.html';
                }
                case "-2":
                {
                    return 'views/widget/templates/editors/widget-IMAGE.view.client.html';
                }
                case "-3":
                {
                    return 'views/widget/templates/editors/widget-HTML.view.client.html';
                }
                case "-4":
                {
                    return 'views/widget/templates/editors/widget-YOUTUBE.view.client.html';
                }
                case "-5":
                {
                    return 'views/widget/templates/editors/widget-TEXT.view.client.html';
                }
                default:
                {
                    return 'views/widget/templates/editors/widget-' + vm.widget.type + '.view.client.html';
                }
            }

        }

        function chooseUpdateDelete(widget) {
            switch(vm.widgetId){
                case "-1":
                {
                    widget.type = "HEADING";
                    break;
                }
                case "-2":
                {
                    widget.type = "IMAGE";
                    break;
                }
                case "-3":
                {
                    widget.type = "HTML";
                    break;
                }
                case "-4":
                {
                    widget.type = "YOUTUBE";
                    break;
                }
                case "-5":
                {
                    widget.type = "TEXT";
                    break;
                }
                default:{}
            }
            if (vm.widgetId == -1 || vm.widgetId == -2 || vm.widgetId == -3 || vm.widgetId == -4 || vm.widgetId == -5) {
                WidgetService
                    .createWidget(vm.pageId,widget)
                    .then(function (widget) {
                        var widget = widget;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
            }
            else {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget.widgetType, widget)
                    .then(function (widget) {
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
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            });
        }

        function routeFlickr() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId + "/flickr");
        }
    }
})();
