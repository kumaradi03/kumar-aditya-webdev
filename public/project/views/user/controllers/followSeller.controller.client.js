/**
 * Created by aditya on 4/12/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("FollowSellerController", FollowSellerController);

    function FollowSellerController ($location,loggedIn,MovieService,UserService) {
        var vm = this;
        var userId = loggedIn._id;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.logout = logout;
        vm.goToHome = goToHome;

        function init() {
            UserService
                .findUserById(userId)
                .then(function (user) {
                    vm.user = user;
                    if(user.follows.length === 0){
                        vm.message = "No sellers followed";
                        vm.error = null;
                    }
                    else{
                        getSellerInfo(user.follows);
                    }
                });

        }
        init();

        function getSellerInfo(sellers) {
            var sellerInfo = [];
            for(var i=0;i<sellers.length;i++){
                UserService
                    .findUserById(sellers[i])
                    .then(function (seller) {
                        sellerInfo.push(seller);
                    });
            }
            vm.sellerInfo = sellerInfo;

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
