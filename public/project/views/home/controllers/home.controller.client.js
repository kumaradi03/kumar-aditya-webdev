/**
 * Created by aditya on 3/30/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("HomeController", HomeController);

    function HomeController($location,HomeService,UserService,$rootScope) {
        var vm = this;
        vm.searchMovie =searchMovie;
        vm.logout = logout;

        if($rootScope.currentUser == undefined)
            vm.userId = undefined;
        else
            vm.userId = $rootScope.currentUser._id;

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
                        var movies = "http://image.tmdb.org/t/p/original/"+response.data.results[i].backdrop_path;
                        data.push(movies);
                    }
                    vm.images = data;
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

        function searchMovie(query){
            $location.url("/search/"+query);
        }
    }
})();