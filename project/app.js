/**
 * Created by aditya on 4/2/17.
 */
module.exports = function (app) {
    var model = require('./model/models.server.js')(app);

    require('./services/user.service.server.js')(app,model);
    require('./services/movie.service.server.js')(app,model);
    require('./services/transaction.service.server')(app,model);
};