const configureIndex = require('./routes/index');
const configureDivisionApi = require('./routes/webapi/division');
const division = require('./routes/webapi/division');


const configureRoutes = (app, appConfig) => {
    //set routes
    configureIndex(app, appConfig);
    configureDivisionApi(app);
};

module.exports = configureRoutes;