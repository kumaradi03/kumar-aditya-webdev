/**
 * Created by aditya on 4/14/17.
 */
/**
 * Created by aditya on 4/2/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("UpdateUserController", UpdateUserController);

    function UpdateUserController($routeParams, UserService,$location,loggedIn) {
        var vm = this;
        vm.userId = loggedIn._id;
        var id = $routeParams['uid'];
        vm.update = update;
        vm.goToHome = goToHome;
        vm.logout = logout;

        UserService
            .findUserById(id)
            .then(function (user) {
                vm.user = user;
            });

        UserService
            .findUserById(vm.userId)
            .then(function (user1) {
                vm.user1 = user1;
            });

        function logout() {
            UserService
                .logout()
                .then(function (res) {
                    $location.url("/login");
                },function (err) {
                    $location.url("/login");
                });
        }

        function update(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(function (user) {
                    if(user) {
                        vm.message = "User Successfully Updated!";
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function goToHome(){
            $location.url("/home")
        }
    }
})();