/**
 * Created by aditya on 2/28/17.
 */
module.exports = function (app,model){
    app.get("/api1/user/:uid", findUserById);
    app.get("/api1/user", findUser);
    app.put("/api1/user/:uid", updateUser);
    app.post("/api1/user", createUser);
    app.delete("/api1/user/:uid", deleteUser);

    var userModel = model.userModel;

    function deleteUser(req,res) {
        var userId = req.params['uid'];
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req,res){
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password)
            findUserByCredentials(req, res);
        else if(username)
            findUserByUsername(req, res);
    }

    function findUserByUsername(req,res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req,res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.uid;
        var newUser = req.body;
        userModel
            .updateUser(userId,newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};
