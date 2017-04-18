/**
 * Created by aditya on 4/9/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("BuyMovieController", BuyMovieController);

    function BuyMovieController(MovieService, $location,$routeParams,UserService,loggedIn) {
        var vm = this;
        vm.userId = loggedIn._id;
        vm.movieId = $routeParams['mid'];
        vm.buyMovie = buyMovie;
        vm.logout = logout;
        var quantity = [];
        vm.followSeller = followSeller;
        vm.unFollowSeller = unFollowSeller;

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
                    vm.seller2 = [];
                    vm.sellerDetails = [];
                    if(movie){
                        if(movie.seller.length == 0){
                            vm.error ="Movie is out of Stock";
                        }
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
                                                var found = false;
                                                for(var k=0;k<vm.user.follows.length;k++) {
                                                    if (seller1._id === vm.user.follows[k]) {
                                                        vm.seller2.push(true);
                                                        found = true;
                                                    }
                                                }
                                                if(!found){
                                                    vm.seller2.push(false);
                                                }
                                            }
                                        }
                                    }
                                });
                        }
                    }
                    else{
                        vm.error ="Movie is out of Stock";
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

        function followSeller(sellerId,index1){
            UserService
                .followSeller(vm.userId,sellerId)
                .then(function (response) {
                    if (response) {
                        vm.message = "Following Seller!";
                        vm.seller2[index1] = true;
                    } else {
                        vm.error = "Error";
                    }
                });
        }

        function unFollowSeller(sellerId,index1){
            UserService
                .unFollowSeller(vm.userId,sellerId)
                .then(function (response) {
                    if (response) {
                        vm.message = "Unfollowing Seller!";
                        vm.seller2[index1] = false;
                    } else {
                        vm.error = "Error";
                    }
                });
        }
    }
})();