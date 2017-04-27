/**
 * Created by aditya on 4/1/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location,$scope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if($scope.loginNew.$valid){
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
            else{
                $scope.loginNew.submitted = true;
                vm.error ="Form Incomplete";
            }
        }
    }
})();