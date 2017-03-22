/**
 * Created by aditya on 2/11/17.
 */
(function(){
        angular
            .module("WebAppMaker")
            .factory('UserService', userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "users": users,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api1/user",user)
                .then(function(res){
                    return res.data;
                });
        }

        function updateUser(userId, newUser) {
            return $http.put("/api1/user/"+userId, newUser)
                .then(function(res){
                    return res.data;
                });
        }

        function findUserById(uid) {
            return $http.get("/api1/user/"+uid)
                .then(function(res){
                    return res.data;
                });
        }

        function findUserByUsername(username) {
            return $http.get("/api1/user?username="+username)
                .then(function(res){
                    return res.data;
                });
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api1/user?username="+username+"&password="+password)
                .then(function(res){
                    return res.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api1/user/"+userId);
        }
    }
})();