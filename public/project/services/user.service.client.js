/**
 * Created by aditya on 4/1/17.
 */
(function(){
    angular
        .module("Movies&More")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "createAdminUser":createAdminUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "deleteUser": deleteUser,
            "login": login,
            "logout": logout,
            "loggedIn": loggedIn,
            "register": register,
            "findAllUsers": findAllUsers,
            "followSeller": followSeller,
            "unFollowSeller":unFollowSeller
        };
        return api;


        function loggedIn() {
            return $http.get("/api2/loggedIn")
                .then(function(res){
                    return res.data;
                });
        }

        function followSeller(userId,sellerId){
            return $http.put("/api2/follow/user/"+userId+"/seller/"+sellerId)
                .then(function(res){
                    return res.data;
                });

        }

        function unFollowSeller(userId,sellerId){
            return $http.put("/api2/unFollow/user/"+userId+"/seller/"+sellerId)
                .then(function(res){
                    return res.data;
                });

        }

        function createUser(user) {
            return $http.post("/api2/user",user)
                .then(function(res){
                    return res.data;
                });
        }

        function createAdminUser(user) {
            return $http.post("/api2/admin/user",user)
                .then(function(res){
                    return res;
                });
        }

        function register(user) {
            return $http.post("/api2/register",user)
                .then(function(res){
                    return res.data;
                });
        }

        function login(user) {
            return $http.post("/api2/login",user)
                .then(function(res){
                    return res.data;
                });
        }

        function logout() {
            return $http.post("/api2/logout")
                .then(function(res){
                    return res.data;
                });
        }

        function updateUser(userId, newUser) {
            return $http.put("/api2/user/"+userId, newUser)
                .then(function(res){
                    return res.data;
                });
        }

        function findUserById(uid) {
            return $http.get("/api2/user/"+uid)
                .then(function(res){
                    return res.data;
                });
        }

        function findAllUsers() {
            return $http.get("/api2/users/")
                .then(function(res){
                    return res.data;
                });
        }

        function findUserByUsername(username) {
            return $http.get("/api2/user?username="+username)
                .then(function(res){
                    return res.data;
                });
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api2/user?username="+username+"&password="+password)
                .then(function(res){
                    return res.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api2/user/"+userId);
        }
    }
})();