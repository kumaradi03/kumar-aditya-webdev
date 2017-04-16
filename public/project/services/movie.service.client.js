/**
 * Created by aditya on 4/1/17.
 */
(function () {
    angular
        .module("Movies&More")
        .factory("MovieService", MovieService);

    function MovieService($http){
        var api = {
            "getDetails": getDetails,
            "getTrailer": getTrailer,
            "getCast": getCast,
            "incrementLike": incrementLike,
            "removeLike": removeLike,
            "sellMovie": sellMovie,
            "findMovieById": findMovieById,
            "buyMovie":buyMovie,
            "addToWishlist":addToWishlist,
            "removeFromWishList":removeFromWishList
        };
        return api;

        function getDetails(movieId) {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=API_KEY&language=en-US";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url);
        }

        function getTrailer(movieId) {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=API_KEY&language=en-US";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url);
        }

        function getCast(movieId) {
            var key = "dd12d53a70b90255c949291e8499533b";
            var urlBase = "https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key=API_KEY&language=en-US";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url);
        }

        function incrementLike(userId, movieId) {
            return $http.put("/api2/user/"+userId+"/movie/"+movieId+'/like')
                .then(function (res) {
                    return res.data;
                });
        }

        function addToWishlist(userId, movieId) {
            return $http.put("/api2/user/"+userId+"/movie/"+movieId+'/wish');
        }

        function removeLike(userId, movieId) {
            return $http.delete("/api2/user/"+userId+"/movie/"+movieId+'/dislike');
        }

        function removeFromWishList(userId, movieId) {
            return $http.delete("/api2/user/"+userId+"/movie/"+movieId+'/unwish');
        }

        function findMovieById(movieId) {
            return $http.get("/api2/movie/"+movieId)
                .then(function (res) {
                    return res.data;
                });
        }

        function sellMovie(movie){
            return $http.post("/api2/movie",movie)
                .then(function(res){
                    return res.data;
                });
        }

        function buyMovie(userId,sellerId,movieId){
            return $http.put("/api2/user/"+userId+"/movie/"+movieId+"/seller/"+sellerId+"/buy")
                .then(function(res){
                    return res.data;
                });
        }


    }
})();