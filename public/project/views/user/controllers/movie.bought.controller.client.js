/**
 * Created by aditya on 4/12/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("MoviesBoughtController", MoviesBoughtController);

    function MoviesBoughtController ($location,TransactionService,loggedIn,MovieService,UserService) {
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
                });

            TransactionService
                .getBuyerTransaction(userId)
                .then(function (transaction) {
                    vm.transaction = transaction;
                    console.log(transaction);
                    if(transaction.length == 0){
                        vm.error = "No movies bought till now!!!."
                    }
                    else{
                        getMoviePosters(transaction);
                        getSellerDetails(transaction);
                    }
                });
        }
        init();

        function getMoviePosters(transaction){
            var buyerMovies = [];
            for(var i=0;i<transaction.length;i++){
                MovieService
                    .getDetails(transaction[i]._movieId)
                    .then(function (movie) {
                        movie.data.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.data.poster_path;
                        buyerMovies.push(movie);
                    });
            }
            vm.boughtMovies = buyerMovies;
            console.log(vm.boughtMovies);
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

        function getSellerDetails(transaction){
            var sellerDetails = [];
            for(var i=0;i<transaction.length;i++){
                UserService
                    .findUserById(transaction[i]._seller)
                    .then(function (user) {
                        var user ={
                            name:user.firstName,
                            email:user.email
                        };
                        sellerDetails.push(user);
                    });
            }
            vm.sellerDetails = sellerDetails;
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