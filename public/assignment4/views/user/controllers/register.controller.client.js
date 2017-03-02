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
                UserService
                    .createUser(user)
                    .success(function(user){
                        $location.url("/profile/"+user._id);
                        // var users = UserService.findUserById(user._id);
                    })
                    .error(function () {
                        vm.error = "Sorry Could not register";
                        
                    });
            }
            else
                vm.error = "Passwords mismatch."
        }
    }
})();
