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

        UserService
            .findUserById(userId)
            .then(function (user) {
                vm.user = user;
            });

        function update(newUser) {
            UserService
                .updateUser(userId, newUser)
                .then(function (user) {
                    if(user) {
                        vm.message = "User Successfully Updated!";
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(userId);
        }
    }
})();