/**
 * Created by aditya on 4/12/17.
 */
(function(){
    angular
        .module("Movies&More")
        .controller("SearchController", SearchController);

    function SearchController($routeParams,$location,HomeService,UserService,$rootScope) {
        var vm = this;
        vm.query = $routeParams['query'];
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
                .searchMovie(vm.query)
                .then(function (movie) {
                    var searchMovie=[];
                    for(var i=0;i<movie.data.results.length;i++)
                    {
                        if(movie.data.results[i].backdrop_path === null){
                            movie.data.results.splice(i--,1)
                        }
                        else{
                            var searchMovie1 = movie.data.results[i];
                            searchMovie1.backdrop_path = "http://image.tmdb.org/t/p/original"+searchMovie1.backdrop_path;
                            searchMovie.push(searchMovie1);
                        }
                    }
                    vm.searchMovie = searchMovie;
                    console.log(searchMovie);
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

    }
})();