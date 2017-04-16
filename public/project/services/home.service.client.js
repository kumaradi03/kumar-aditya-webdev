/**
 * Created by aditya on 3/31/17.
 */
(function () {
    angular
        .module("Movies&More")
        .factory("HomeService", HomeService);

    function HomeService($http){
        var api = {
            "getNowPlaying": getNowPlaying,
            "getPopular":getPopular,
            "searchMovie": searchMovie,
            "getUpcoming": getUpcoming
        };
        return api;

        function getNowPlaying() {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/movie/now_playing?api_key=API_KEY&language=en-US&page=1";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url);
        }

        function getPopular() {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&language=en-US&page=1";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url);
        }

        function searchMovie(query) {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/search/movie?api_key=API_KEY&language=en-US&query=QUERY&page=1&include_adult=false";
            var url = urlBase.replace("API_KEY", key);
            var url = urlBase.replace("QUERY", query);
            return $http.get(url);
        }

        function getUpcoming(query) {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/movie/upcoming?api_key=API_KEY&language=en-US&page=1";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url);
        }


    }
})();