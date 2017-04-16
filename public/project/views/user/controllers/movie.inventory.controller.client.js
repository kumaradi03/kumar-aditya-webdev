/**
 * Created by aditya on 4/2/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("InventoryController", InventoryController);

    function InventoryController ($location,MovieService,loggedIn,UserService) {
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
                    if(user.sold_movies.length === 0)
                        vm.error = "No movies in the inventory";
                    else{
                        vm.sold_movies = user.sold_movies;
                        getMoviePosters();
                    }
                });
        }
        init();

        function getMoviePosters(){
            var sellerMovies = [];
            for(var i=0;i<vm.sold_movies.length;i++){
                MovieService
                    .getDetails(vm.sold_movies[i]._movieId)
                    .then(function (movie) {
                        movie.data.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.data.poster_path;
                        sellerMovies.push(movie.data.poster_path);
                    });
            }
            vm.sellerMovies = sellerMovies;
            console.log(vm.sellerMovies);
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