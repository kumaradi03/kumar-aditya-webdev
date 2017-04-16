/**
 * Created by aditya on 4/13/17.
 */
(function () {
    angular
        .module("Movies&More")
        .controller("MovieWishListController", movieWishListController);

    function movieWishListController(UserService, MovieService, $location, loggedIn) {
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
                    if(user.wishlist.length === 0)
                        vm.error = "No movies in the wishList";
                    else{
                        getMoviePosters(user.wishlist);
                    }
                });
        }
        init();

        function getMoviePosters(wishListMovie){
            var wishListMovies = [];
            for(var i=0;i<wishListMovie.length;i++){
                MovieService
                    .getDetails(wishListMovie[i])
                    .then(function (movie) {
                        movie.data.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.data.poster_path;
                        wishListMovies.push(movie);
                    });
            }
            vm.wishListMovies = wishListMovies;
            console.log(vm.wishListMovies);
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
