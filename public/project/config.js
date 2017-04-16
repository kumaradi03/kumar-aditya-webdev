(function () {
    angular
        .module("Movies&More")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .when("/home",{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .when("/admin/register",{
                templateUrl: 'views/user/templates/adminRegister.client.html',
                controller: 'AdminRegisterController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .when("/profile",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/home/movie/:mid/buy",{
                templateUrl: 'views/movie/templates/buyMovie.client.html',
                controller: 'BuyMovieController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/movie/:mid",{
                templateUrl: 'views/movie/templates/movies.view.client.html',
                controller: 'MovieController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .when("/profile/inventory",{
                templateUrl: 'views/user/templates/movie.inventory.client.html',
                controller: 'InventoryController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/movieSold",{
                templateUrl: 'views/user/templates/movie.sold.client.html',
                controller: 'MoviesSoldController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/movieLike",{
                templateUrl: 'views/user/templates/movie.like.client.html',
                controller: 'MovieLikeController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/movieWishlist",{
                templateUrl: 'views/user/templates/movie.wishlist.client.html',
                controller: 'MovieWishListController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/movieBought",{
                templateUrl: 'views/user/templates/movie.bought.client.html',
                controller: 'MoviesBoughtController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/showUsers",{
                templateUrl: 'views/user/templates/showalluser.client.html',
                controller: 'ShowALlUsersController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/showTransactions",{
                templateUrl: 'views/user/templates/showAllTransaction.client.html',
                controller: 'ShowALlTransactionsController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/update/:uid",{
                templateUrl: 'views/user/templates/updateUser.client.html',
                controller: 'UpdateUserController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/search/:query",{
                templateUrl: 'views/home/templates/search.view.client.html',
                controller: 'SearchController',
                controllerAs: 'model',
                resolve:{
                    loggedIn: checkUser
                }
            })
            .otherwise({redirectTo: "/home"});

        function checkLoggedIn(UserService,$location,$q,$rootScope ) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (res) {
                    var user = res;
                    if(user == '0'){
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        deferred.resolve(user);
                    }
                },function (err) {
                    deferred.reject();
                    $location.url("/login");
                });
            return deferred.promise;
        }

        function checkUser(UserService,$location,$q,$rootScope){
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (res) {
                    var user = res;
                    if(user == '0'){
                        deferred.resolve(undefined);
                    }else{
                        deferred.resolve(user);
                    }
                },function (err) {
                    deferred.reject();
                    $location.url("/home");
                });
            return deferred.promise;
        }
    }
})();