/**
 * Created by aditya on 4/8/17.
 */
module.exports = function (app,model){
    app.get("/api2/movie/:mid", findMovieById);
    app.put("/api2/user/:uid/movie/:mid/seller/:sid/buy", buyMovie);
    app.post("/api2/movie", sellMovie);
    app.delete("/api2/movie/delete/:mid", deleteMovie);

    var movieModel = model.movieModel;
    var movieUserModel = model.movieUserModel;
    var transactionModel = model.transactionModel;

    function findMovieById(req,res) {
        var movieId = req.params['mid'];
        movieModel
            .findMovieById(movieId)
            .then(function (movie) {
                res.send(movie);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function deleteMovie(req,res) {
        var movieId = req.params['mid'];
        movieModel
            .deleteMovie(movieId)
            .then(function (movie) {
                res.send(movie);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function sellMovie(req,res){
        var newMovie = req.body;
        movieModel
            .sellMovie(newMovie)
            .then(function (movie) {
                movieUserModel
                    .sellMovie(newMovie)
                    .then(function (user) {
                        res.send(user);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function buyMovie(req,res){
        var buyerId = req.params['uid'];
        var movieId = req.params['mid'];
        var sellerId = req.params['sid'];
        transactionModel
            .addTransaction(buyerId,sellerId,movieId)
            .then(function (transaction) {
                movieModel
                    .buyMovie(buyerId,sellerId,movieId,transaction)
                    .then(function (movie) {
                        movieUserModel
                            .buyerUpdate(buyerId,movieId)
                            .then(function (user) {
                                movieUserModel
                                    .sellerUpdate(sellerId,movieId)
                                    .then(function (user) {
                                        res.send(user);
                                    },function (err) {
                                        res.sendStatus(500).send(err);
                                    });
                            }, function (err) {
                                res.sendStatus(500).send(err);
                            });
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};