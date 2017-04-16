/**
 * Created by aditya on 4/11/17.
 */
(function () {
    angular
        .module("Movies&More")
        .controller("MovieLikeController", movieLikeController);

    function movieLikeController($location, UserService, MovieService,loggedIn) {
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
                    if(user.likes.length === 0){
                        vm.message = "No movies liked";
                        vm.error = null;
                    }
                    else{
                        getMoviePosters(user.likes);
                    }
                });
        }
        init();

        function getMoviePosters(likedMovie){
            var likedMovies = [];
            for(var i=0;i<likedMovie.length;i++){
                MovieService
                    .getDetails(likedMovie[i])
                    .then(function (movie) {
                        movie.data.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.data.poster_path;
                        likedMovies.push(movie);
                    });
            }
            vm.likedMovies = likedMovies;
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
