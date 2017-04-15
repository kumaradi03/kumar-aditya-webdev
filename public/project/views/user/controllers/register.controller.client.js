/**
 * Created by aditya on 4/2/17.
 */
/**
 * Created by aditya on 4/1/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
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
                .register(user)
                .then(function (usr) {
                    if(usr)
                        $location.url("/profile");
                    else
                        vm.error = "Sorry Could not register";
                });
        }

    }
})();
