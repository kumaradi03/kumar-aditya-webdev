/**
 * Created by aditya on 4/13/17.
 */
(function () {
    angular
        .module("Movies&More")
        .controller("ShowALlTransactionsController", ShowALlTransactionsController);

    function ShowALlTransactionsController($location, UserService, MovieService,TransactionService, loggedIn) {
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
                .findAllTransactions()
                .then(function (transaction) {
                    vm.transactions = transaction;
                    console.log(vm.transactions);
                    if(transaction.length === 0)
                        vm.message = "No Transaction";
                    else{
                        getMoviePosters(transaction);
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

        function getMoviePosters(transaction){
            var movies = [];
            for(var i=0;i<transaction.length;i++){
                MovieService
                    .getDetails(transaction[i]._movieId)
                    .then(function (movie) {
                        movie.data.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.data.poster_path;
                        movies.push(movie);
                    });
            }
            vm.movies = movies;
        }

        function getBuyerDetails(transaction){
            var buyers = [];
            for(var i=0;i<transaction.length;i++){
                console.log(transaction[i]._buyer);
                UserService
                    .findUserById(transaction[i]._buyer)
                    .then(function (user) {
                        buyers.push(user);
                    });
            }
            vm.buyer = buyers;
            console.log(buyers);
        }

        function getSellerDetails(transaction){
            var seller = [];
            for(var i=0;i<transaction.length;i++){
                UserService
                    .findUserById(transaction[i]._seller)
                    .then(function (user) {
                        seller.push(user);
                    });
            }
            vm.seller = seller;
            console.log(vm.seller);
        }

        function goToHome(){
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
