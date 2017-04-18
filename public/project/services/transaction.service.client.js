/**
 * Created by aditya on 4/12/17.
 */
(function () {
    angular
        .module("Movies&More")
        .factory("TransactionService", TransactionService);

    function TransactionService($http){
        var api = {
            "getBuyerTransaction": getBuyerTransaction,
            "getSellerTransaction": getSellerTransaction,
            "findAllTransactions": findAllTransactions,
            "addTransactions": addTransactions,
            "updateTransactions": updateTransactions
        };
        return api;

        function getBuyerTransaction(buyerId) {
            return $http.get("/api2/buyer/transaction/"+buyerId)
                .then(function (res) {
                    return res.data;
                });
        }

        function findAllTransactions() {
            return $http.get("/api2/transactions/")
                .then(function (res) {
                    return res.data;
                });
        }

        function addTransactions(transaction) {
            return $http.post("/api2/transaction/",transaction)
                .then(function(res){
                    return res;
                });
        }

        function updateTransactions(transactionId, newTransaction) {
            return $http.put("/api2/transaction/update"+transactionId, newTransaction)
                .then(function(res){
                    return res.data;
                });
        }

        function getSellerTransaction(sellerId) {
            return $http.get("/api2/seller/transaction/"+sellerId)
                .then(function (res) {
                    return res.data;
                });
        }
    }
})();