/**
 * Created by aditya on 2/11/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (loginUser) {
                    if(loginUser)
                        $location.url('/profile/' + loginUser._id);
                    else
                        vm.error = 'User not found.';
                });
        }
    }
})();