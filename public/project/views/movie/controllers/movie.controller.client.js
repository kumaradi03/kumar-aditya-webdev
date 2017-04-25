/**
 * Created by aditya on 4/1/17.
 */
(function() {
    angular
        .module("Movies&More")
        .controller("MovieController", MovieController);

    function MovieController($location, MovieService, loggedIn, $routeParams, $sce, UserService) {
        var vm = this;
        var movieId = $routeParams['mid'];
        vm.incrementLike = incrementLike;
        vm.removeLike = removeLike;
        vm.addToWishlist = addToWishlist;
        vm.removeFromWishList = removeFromWishList;
        vm.sellMovie = sellMovie;
        vm.goToBuyMoviePage = goToBuyMoviePage;
        vm.logout = logout;

        if(loggedIn == undefined)
            vm.userId = undefined;
        else
            vm.userId = loggedIn._id;

        function init() {

            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user1 = user;
                });

            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user;
                    if(user.likes.length === 0)
                        vm.like = false;
                    else{
                        vm.like = false;
                        for(var i=0;i< user.likes.length;i++)
                        {
                            if(user.likes[i]=== movieId)
                                vm.like = true;
                        }
                    }
                });

            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user;
                    if(user.wishlist.length === 0)
                        vm.wishlist = false;
                    else{
                        vm.wishlist = false;
                        for(var j=0;j< user.wishlist.length;j++)
                        {
                            if(user.wishlist[j]=== movieId)
                                vm.wishlist = true;
                        }
                    }
                });

            MovieService
                .getDetails(movieId)
                .then(function (response) {
                    response.data.poster_path = "http://image.tmdb.org/t/p/w185/" + response.data.poster_path;
                    vm.movie = response.data;
                })
            MovieService
                .getTrailer(movieId)
                .then(function (response) {
                    var videos = response.data.results;
                    for (var i = 0; i < videos.length; i++) {
                        videos[i].url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + videos[i].key)
                    }
                    vm.videos = videos;
                })

            MovieService
                .getDetails(movieId)
                .then(function (response) {
                    response.data.poster_path = "http://image.tmdb.org/t/p/w185/" + response.data.poster_path;
                    vm.movie = response.data;
                })

            MovieService
                .getCast(movieId)
                .then(function (response) {
                    var casts = [];
                    for (var i = 0; i < response.data.cast.length; i++) {
                        if (response.data.cast[i].profile_path) {
                            response.data.cast[i].profile_path = "http://image.tmdb.org/t/p/original/" + response.data.cast[i].profile_path;
                            casts.push(response.data.cast[i]);
                        }
                    }
                    vm.casts = casts;
                })
        }
        init();

        function incrementLike() {
            MovieService
                .incrementLike(vm.userId, movieId)
                .then(function (response) {
                    if (response) {
                        vm.message = "Like Successfully Updated!";
                        vm.like = true;
                    } else {
                        vm.error = "Unable to update like";
                    }
                });
        }

        function addToWishlist(){
            MovieService
                .addToWishlist(vm.userId, movieId)
                .then(function (response) {
                    if (response) {
                        vm.message = "Successfully added to WishList!";
                        vm.wishlist = true;
                    } else {
                        vm.error = "Unable to add to WishList";
                    }
                });
        }

        function removeLike() {
            MovieService
                .removeLike(vm.userId,movieId)
                .then(function (response) {
                    if (response.status === 200) {
                        vm.message = "Like Successfully Updated!";
                        vm.like = false;
                    } else {
                        vm.error = "Unable to update like";
                    }
                });
        }

        function removeFromWishList(){
            MovieService
                .removeFromWishList(vm.userId,movieId)
                .then(function (response) {
                    if (response.status === 200) {
                        vm.message = "Removed from wishlist!";
                        vm.wishlist = false;
                    } else {
                        vm.error = "Unable to remove from wishlist";
                    }
                });

        }

        function sellMovie(quantity){
            if( quantity <= 0 )
            {
                vm.error ="Quantity should be more than zero" ;
            }
            else{
                var movie = {
                    _movieId:movieId,
                    seller:{_sellerId:vm.userId,quantity:quantity}
                };
                MovieService
                    .sellMovie(movie)
                    .then(function (response) {
                        if (response) {
                            vm.message = "Like Succsessfully Updated!";
                            $location.url("/profile/inventory");
                        } else {
                            vm.error = "Unable to update like";
                        }
                    });
            }
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

        function goToBuyMoviePage(){
            $location.url("/home/movie/"+movieId+"/buy");
        }
    }
})();
