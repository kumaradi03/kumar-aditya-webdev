/**
 * Created by aditya on 3/30/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("HomeController", HomeController);

    function HomeController($location,HomeService,UserService,loggedIn) {
        var vm = this;
        vm.searchMovie =searchMovie;
        vm.logout = logout;

        if(loggedIn == undefined)
            vm.userId = undefined;
        else
            vm.userId = loggedIn._id;

        function init() {

            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user;
                });

            HomeService
                .getNowPlaying()
                .then(function (response) {
                    var data=[];
                    for(var i=0;i<15;i++)
                    {
                        var movies = response.data.results[i];
                        movies.backdrop_path = "http://image.tmdb.org/t/p/original/"+movies.backdrop_path;
                        data.push(movies);
                    }
                    vm.images = data;
                    console.log(vm.images = data);
                });

            HomeService
                .getPopular()
                .then(function (response) {
                    var populardata=[];
                    for(var i=0;i<16;i++)
                    {
                        var popularMovies = response.data.results[i];
                        popularMovies.backdrop_path = "http://image.tmdb.org/t/p/original"+popularMovies.backdrop_path;
                        populardata.push(popularMovies);
                    }
                    vm.popularImages = populardata;
                });

            HomeService
                .getUpcoming()
                .then(function (response) {
                    var upcomingdata=[];
                    for(var i=0;i<16;i++)
                    {
                        var upcomingMovies = response.data.results[i];
                        upcomingMovies.backdrop_path = "http://image.tmdb.org/t/p/original"+upcomingMovies.backdrop_path;
                        upcomingdata.push(upcomingMovies);
                    }
                    vm.upcomingImages = upcomingdata;
                    console.log(vm.upcomingImages);
                });
        }
        init();

        $('.carousel').carousel({
            interval:2000
        })

        function logout() {
            UserService
                .logout()
                .then(function (res) {
                    $location.url("/login");
                },function (err) {
                    $location.url("/login");
                });
        }

        function searchMovie(query){
            $location.url("/search/"+query);
        }
    }
})();