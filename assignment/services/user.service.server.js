/**
 * Created by aditya on 2/28/17.
 */
module.exports = function (app){
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:uid", deleteUser);
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function deleteUser(req,res){
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req,res){
        var newUser = req.body;
        var num = (new Date()).getTime();
        newUser._id = num.toString();
        users.push(newUser);
        res.send(newUser);
    }

    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req,res) {
        var userId = req.params['uid'];
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                user1 = user;
                res.send(user);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params.uid;
        var newUser = req.body;
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }
};
