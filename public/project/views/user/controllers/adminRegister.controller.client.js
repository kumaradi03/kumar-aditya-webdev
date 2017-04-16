/**
 * Created by aditya on 4/14/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("AdminRegisterController", adminRegisterController);

    function adminRegisterController($location, UserService,loggedIn) {
        var vm = this;
        var userId = loggedIn._id;
        vm.createUser = createUser;
        vm.goToProfile = goToProfile;
        vm.logout = logout;

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

        function logout() {
            UserService
                .logout()
                .then(function (res) {
                    $location.url("/login");
                },function (err) {
                    $location.url("/login");
                });
        }


    }
})();