/**
 * Created by aditya on 4/2/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$location,loggedIn) {
        var vm = this;
        vm.userId =loggedIn._id;
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.goToHome = goToHome;
        vm.logout = logout;

        function openNav(type) {
            if(type === "Buyer"){
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
            }
            else if(type ==="Seller")
            {
                document.getElementById("mySidenav1").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
            }
            else
            {
                document.getElementById("mySidenav2").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
            }

        }

        /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
         function closeNav(type) {
             if(type === "Buyer"){
                 document.getElementById("mySidenav").style.width = "0";
                 document.getElementById("main").style.marginLeft = "0";
             }
             else if(type === "Seller"){
                 document.getElementById("mySidenav1").style.width = "0";
                 document.getElementById("main").style.marginLeft = "0";
             }
            else
             {
                 document.getElementById("mySidenav2").style.width = "0";
                 document.getElementById("main").style.marginLeft = "0";
             }
         }

        UserService
            .findUserById(vm.userId)
            .then(function (user) {
                vm.user = user;
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
             if(newUser.password === newUser.verifypassword) {
                 UserService
                     .updateUser(vm.userId, newUser)
                     .then(function (user) {
                         if (user) {
                             vm.message = "User Successfully Updated!";
                             vm.error= null;
                         } else {
                             vm.error = "Unable to update user";
                             vm.message= null;
                         }
                     })
             }
             else{
                 vm.error = "Password doesnt match.";
                 vm.message= null;
             }

        }

        function deleteUser() {
            UserService
                .deleteUser(vm.userId);
        }

        function goToHome(){
            console.log(vm.userId);
            $location.url("/home")
        }
    }
})();