/**
 * Created by aditya on 4/14/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("AdminRegisterController", adminRegisterController);

    function adminRegisterController($location, UserService,$rootScope) {
        var vm = this;
        var userId = $rootScope.currentUser._id;
        vm.createUser = createUser;
        vm.goToProfile = goToProfile;

        UserService
            .findUserById(userId)
            .then(function (user) {
                vm.user1 = user;
            });

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
                .register(user)
                .then(function (usr) {
                    if(usr){
                        vm.message = "User Created";
                        $location.url("/login")
                    }

                    else
                        vm.error = "Sorry Could not register";
                });
        }

    }
})();