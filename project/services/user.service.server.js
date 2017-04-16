/**
 * Created by aditya on 2/28/17.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function (app,model){
    app.get("/auth/facebook", passport.authenticate('facebook'),facebookLogin);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get("/api2/user/:uid", findUserById);
    app.get("/api2/user", findUser);
    app.get("/api2/users", findAllUsers);
    app.get("/api2/loggedIn", loggedIn);
    app.put("/api2/user/:uid", updateUser);
    app.put("/api2/follow/user/:uid/seller/:sid", followSeller);
    app.put("/api2/unFollow/user/:uid/seller/:sid",unFollowSeller);
    app.post("/api2/user", createUser);
    app.post("/api2/register", register);
    app.post("/api2/login", passport.authenticate('local'), login);
    app.post("/api2/logout", logout);
    app.delete("/api2/user/:uid", deleteUser);
    app.put("/api2/user/:uid/movie/:mid/like", incrementLike);
    app.delete("/api2/user/:uid/movie/:mid/dislike", removeLike);
    app.put("/api2/user/:uid/movie/:mid/wish", addToWishlist);
    app.delete("/api2/user/:uid/movie/:mid/unwish", removeFromWishList);


    var movieUserModel = model.movieUserModel;
    var movieModel = model.movieModel;

    var facebookConfig = {
        clientID     : "280520602398806",
        clientSecret : "245a429b9b31d3097936b1e954d82618",
        callbackURL  : "http://127.0.0.1:3000/auth/facebook/callback"
    };

    passport.use('local',new LocalStrategy(localStrategy));
    passport.use('facebook',new FacebookStrategy(facebookConfig, facebookLogin));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        movieUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function followSeller(req,res){
        var userId = req.params['uid'];
        var sellerId = req.params['sid'];
        movieUserModel
            .followSeller(userId,sellerId)
            .then(
                function(user){
                    res.send(user);
                },
                function(err){
                    res.sendStatus(500).send(err);
                }
            );
    }

    function unFollowSeller(req,res){
        var userId = req.params['uid'];
        var sellerId = req.params['sid'];
        movieUserModel
            .unFollowSeller(userId,sellerId)
            .then(
                function(user){
                    res.send(user);
                },
                function(err){
                    res.sendStatus(500).send(err);
                }
            );
    }



    function localStrategy(username, password, done) {
        movieUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req,res) {
        var user =req.user;
        res.json(user);
    }

    function facebookLogin(token, refreshToken, profile, done) {
        movieUserModel
            .findFacebookUser(profile.id)
            .then(function (facebookUser) {
                if(facebookUser){
                    return done(null,facebookUser);
                }else{
                    facebookUser = {
                        firstName:profile.displayName.split(' ')[0],
                        lastName:profile.displayName.split(' ')[1],
                        type:'Buyer',
                        facebook:{
                            token: token,
                            id: profile.id,
                            displayName: profile.displayName
                        }
                    };
                    movieUserModel
                        .createUser(facebookUser)
                        .then(function (user) {
                            done(null,user)
                        },function (err) {
                            done(err,null)
                        });
                }

            },function(err) {
                if (err) { return done(err); }
            });


    }

    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else{
            res.send('0');
        }
    }

    function logout(req,res) {
        req.logout();
        res.send(200);
    }

    function deleteUser(req,res) {
        var userId = req.params['uid'];
        movieUserModel
            .deleteUser(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req,res){
        var newUser = req.body;
        movieUserModel
            .createUser(newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        movieUserModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
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
        movieUserModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllUsers(req,res) {
        movieUserModel
            .findAllUsers()
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        movieUserModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req,res) {
        var userId = req.params['uid'];
        movieUserModel
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
        newUser.password = bcrypt.hashSync(newUser.password);
        movieUserModel
            .updateUser(userId,newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function incrementLike(req, res) {
        var userId = req.params.uid;
        var movieId = req.params.mid;
        movieUserModel
            .incrementLike(userId,movieId)
            .then(function (user) {
                movieModel
                    .incrementLike(userId,movieId)
                    .then(function (movie) {
                        res.send(movie);
                    },function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addToWishlist(req, res) {
        var userId = req.params.uid;
        var movieId = req.params.mid;
        movieUserModel
            .addToWishlist(userId,movieId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function removeLike(req, res) {
        var userId = req.params.uid;
        var movieId = req.params.mid;
        movieUserModel
            .removeLike(userId,movieId)
            .then(function (user) {
                movieModel
                    .removeLike(userId,movieId)
                    .then(function (movie) {
                        res.send(movie);
                    },function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function removeFromWishList(req, res) {
        var userId = req.params.uid;
        var movieId = req.params.mid;
        movieUserModel
            .removeFromWishList(userId,movieId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};
