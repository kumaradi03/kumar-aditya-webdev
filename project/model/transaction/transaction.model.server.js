/**
 * Created by aditya on 4/12/17.
 */
/**
 * Created by aditya on 4/8/17.
 */

module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var transactionSchema = require('./transaction.schema.server')();

    var transactionModel = mongoose.model('TransactionModel', transactionSchema);

    var api = {
        addTransaction: addTransaction,
        getSellerTransaction:getSellerTransaction,
        getBuyerTransaction:getBuyerTransaction,
        findAllTransactions:findAllTransactions,
        deleteTransactions:deleteTransactions,
        updateTransaction:updateTransaction
    };
    return api;

    function addTransaction(buyerId,sellerId,movieId) {
        var deferred = q.defer();
        var transaction ={
            _movieId: movieId,
            _buyer: buyerId,
            _seller: sellerId
        };
        transactionModel
            .create(transaction, function (err, transaction1){
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(transaction1);
            });
        return deferred.promise;
    }

    function deleteTransactions(transaction){
        var deferred = q.defer();
        transactionModel
            .remove({_id:transaction_id})
            .then(function (transaction,err) {
                if(transaction)
                    deferred.abort(err);
                else{
                    deferred.resolve(transaction);
                }
            });
        return deferred.promise;

    }

    function updateTransaction(transaction,newTransaction){
        var deferred = q.defer();
        transactionModel
            .update({_id: transaction}, {$set: newTransaction})
            .then(function (transaction,err) {
                if(transaction)
                    deferred.abort(err);
                else{
                    deferred.resolve(transaction);
                }
            });
        return deferred.promise;

    }

    function findAllTransactions() {
        var deferred = q.defer();
        transactionModel
            .find()
            .populate('_buyer')
            .populate('_seller')
            .exec(function (err,transaction) {
                if(err)
                    deferred.abort(err);
                else{
                    deferred.resolve(transaction);
                    console.log(transaction);
                }
            });
        return deferred.promise;
    }

    function getSellerTransaction(sellerId) {
        var deferred = q.defer();
        transactionModel
            .find({_seller: sellerId})
            .then(function (transaction,err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(transaction);
            });
        return deferred.promise;
    }

    function getBuyerTransaction(buyerId){
        var deferred = q.defer();
        transactionModel
            .find({_buyer: buyerId})
            .then(function (transaction,err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(transaction);
            });
        return deferred.promise;

    }
};