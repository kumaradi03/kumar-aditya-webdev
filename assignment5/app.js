/**
 * Created by aditya on 2/27/17.
 */
module.exports = function (app) {
    var model = require('./model/models.server')(app);

    require('./services/user.service.server.js')(app,model);
    require('./services/website.service.server.js')(app,model);
    require('./services/page.service.server.js')(app,model);
    require('./services/widget.service.server.js')(app,model);
 };
