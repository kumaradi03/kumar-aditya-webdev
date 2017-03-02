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
            "createUser": createUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user",user);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }
    }
})();