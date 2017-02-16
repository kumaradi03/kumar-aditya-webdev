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

        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "Unable to update user.";
            } else {
                vm.message = "User successfully updated."
            }
        }

        var user = UserService.findUserById(userId);
        vm.user = user;

        function deleteUser() {
            UserService.deleteUser(userId);
        }
    }
})();