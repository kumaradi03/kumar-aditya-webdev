/**
 * Created by aditya on 4/9/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("BuyMovieController", BuyMovieController);

    function BuyMovieController(MovieService, $location,$routeParams,UserService,$rootScope) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.movieId = $routeParams['mid'];
        vm.buyMovie = buyMovie;
        vm.logout = logout;
        var quantity = [];

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user;
                });

            MovieService
                .findMovieById(vm.movieId)
                .then(function (movie) {
                    console.log(vm.movieId);
                    vm.seller = [];
                    vm.sellerDetails = [];
                    if(movie){
                        console.log(movie.seller);
                        for(var j=0;j<movie.seller.length;j++){
                            UserService
                                .findUserById(movie.seller[j]._sellerId)
                                .then(function (seller1) {
                                    console.log(seller1);
                                    if(seller1){
                                        vm.sellerDetails.push(seller1);
                                        for(var i=0;i<seller1.sold_movies.length;i++){
                                            if(seller1.sold_movies[i]._movieId === vm.movieId){
                                                vm.seller.push(seller1.sold_movies[i].quantity);
                                            }
                                        }
                                    }
                                });
                        }
                        console.log(vm.seller);
                    }
                    else{
                        vm.message ="Movie is out of Stock";
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

        function buyMovie(sellerId){
            MovieService
                .buyMovie(vm.userId,sellerId,vm.movieId)
                .then(function (response) {
                    if (response) {
                        vm.message = "Seller has been notified and will contact for further details!";
                        $location.url("/profile/movieBought");
                    } else {
                        vm.error = "Error";
                    }
                });
        }
    }
})();