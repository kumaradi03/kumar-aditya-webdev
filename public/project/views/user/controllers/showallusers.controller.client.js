/**
 * Created by aditya on 4/13/17.
 */
(function () {
    angular
        .module("Movies&More")
        .controller("ShowALlUsersController", showALlUsersController);

    function showALlUsersController($location, UserService, MovieService, $rootScope) {
        var vm = this;
        var userId = $rootScope.currentUser._id;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.logout = logout;
        vm.goToHome = goToHome;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        function init() {

            UserService
                .findUserById(userId)
                .then(function (user) {
                    vm.user = user;
                });

            UserService
                .findAllUsers()
                .then(function (user) {
                    if(user.length === 0)
                        vm.message = "No Users";
                    else{
                        for(var i=0;i<user.length;i++){
                            if(user[i].type === "Admin"){
                                user.splice(i,1);
                            }
                        }
                        vm.users= user;
                    }
                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function (res) {
                    $location.url("/login");
                },function (err) {
                    $location.url("/login");
                });
        }

        function deleteUser(userId){
            vm.id = userId;
            UserService
                .deleteUser(userId)
                .then(function (res) {
                    for(var i=0;i<vm.users.length;i++){
                        if(vm.users[i]._id === vm.id)
                            vm.users.splice(i,1);
                    }
                });
        }

        function updateUser(userId){
            $location.url("/update/"+userId);
        }

        function goToHome(){
            console.log(vm.userId);
            $location.url("/home")
        }

        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";

        }
        /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    }
})();
