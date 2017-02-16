/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser (user) {
            if(user.password === user.verifypassword)
            {
                var user1 = UserService.createUser(user);
                $location.url("/profile/"+user1._id);
                var users = UserService.findUserById(user1._id);
                console.log(users);
            }
            else
                vm.error = "Passwords mismatch."

        }
    }
})();
