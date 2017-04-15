/**
 * Created by aditya on 4/12/17.
 */
module.exports = function (app,model){
    app.get("/api2/buyer/transaction/:bid", getBuyerTransaction);
    app.get("/api2/seller/transaction/:sid", getSellerTransaction);
    app.get("/api2/transactions",findAllTransactions);

    var transactionModel = model.transactionModel;

    function getBuyerTransaction(req,res) {
        var buyerId = req.params['bid'];
        transactionModel
            .getBuyerTransaction(buyerId)
            .then(function (transction) {
                res.send(transction);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function getSellerTransaction(req,res) {
        var sellerId = req.params['sid'];
        transactionModel
            .getSellerTransaction(sellerId)
            .then(function (transction) {
                res.send(transction);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllTransactions(req,res){
        transactionModel
            .findAllTransactions()
            .then(function (transaction) {
                res.send(transaction);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};