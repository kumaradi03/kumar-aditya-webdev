/**
 * Created by aditya on 4/12/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("MoviesSoldController", MoviesSoldController);

    function MoviesSoldController ($location,TransactionService,loggedIn,MovieService,UserService) {
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
                .getSellerTransaction(userId)
                .then(function (transaction) {
                    vm.transaction = transaction;
                    vm.transaction.dateCreated;
                    if(transaction.length == 0){
                        vm.error = "No movies sold."
                    }
                    else{
                        getMoviePosters(transaction);
                        getBuyerDetails(transaction);
                    }
                });
        }
        init();

        function getMoviePosters(transaction){
            var sellerMovies = [];
            for(var i=0;i<transaction.length;i++){
                MovieService
                    .getDetails(transaction[i]._movieId)
                    .then(function (movie) {
                        movie.data.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.data.poster_path;
                        sellerMovies.push(movie);
                    });
            }
            vm.soldMovies = sellerMovies;
            console.log(vm.soldMovies);
        }

        function getBuyerDetails(transaction){
            var buyerDetails = [];
            for(var i=0;i<transaction.length;i++){
                UserService
                    .findUserById(transaction[i]._buyer)
                    .then(function (user) {
                        var user ={
                            name:user.firstName,
                            email:user.email,
                            // date:user.dateCreated.substring(0,10)
                        };
                        buyerDetails.push(user);
                    });
            }
            vm.buyerDetails = buyerDetails;
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