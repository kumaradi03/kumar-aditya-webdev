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
        vm.goToProfile = goToProfile;

        function createUser (user) {
            if(user.password === user.verifypassword)
            {
                UserService
                    .findUserByUsername(user.username)
                    .then(function (usr) {
                        if(!usr)
                            goToProfile(user);
                        else
                            vm.error = "Sorry Could not register";
                    });
            }
            else
                vm.error = "Passwords mismatch.";
        }

        function goToProfile(user){
            UserService
                .createUser(user)
                .then(function (usr) {
                    if(usr)
                        $location.url("/profile/"+usr._id);
                    else
                        vm.error = "Sorry Could not register";
                });
        }
    }
})();
