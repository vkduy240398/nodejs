const HomeRouter = require('./home');
function route(app){
    app.use('/home',HomeRouter);
   
}
module.exports = route;