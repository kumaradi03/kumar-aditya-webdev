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
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (loginUser) {
                    $location.url('/profile/' + loginUser._id);
            })
                .error(function(){
                    vm.error = 'User not found.';
            });
        }
    }
})();