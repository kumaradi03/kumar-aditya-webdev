/**
 * Created by aditya on 4/1/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(function (loginUser) {
                    if(loginUser)
                        $location.url('/profile/');
                    else
                        vm.error = 'User not found.';
                },(function (err) {
                   vm.error = "Username and Password doesn't match."
                }));
        }
    }
})();