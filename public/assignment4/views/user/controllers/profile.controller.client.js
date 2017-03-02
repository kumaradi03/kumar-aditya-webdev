/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;

        var promise = UserService.findUserById(userId);
        promise.success(function (user) {
            //var user = UserService.findUserById(userId);
            vm.user = user;
        });

        function update(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user != null) {
                        vm.message = "User Successfully Updated!";
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function deleteUser() {
            var promise = UserService.deleteUser(userId);
        }
    }
})();