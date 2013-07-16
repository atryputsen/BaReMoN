/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express')
    , http = require('http')
    , path = require('path')
    , index = require('./routes/index')
    , colors = require('colors')
    , mongoose = require('mongoose')
    , gzippo = require('gzippo')
    , EventEmitter = require('events').EventEmitter
    , AppEmitter = new EventEmitter()
    , log = console.log
    , MemoryStore = require('connect').session.MemoryStore
    , app = express.createServer()
    , PORT = process.env.PORT || 8888
    , mongooseConnect = mongoose.connect('mongodb://localhost:27017/clients');

app.configure(function () {
    app.set('port', process.env.PORT || PORT);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    //app.use(gzippo.compress());
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'qwerty'}))
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
});
var clientsModel = require('./app/models/client')(mongooseConnect)
    , profileModel = require('./app/models/profile')(mongooseConnect)
    , projectModel = require('./app/models/project')(mongooseConnect)
    , profileController = require('./app/controllers/profile_controller')(app, mongooseConnect)
    , projectController = require('./app/controllers/project_controller')(app, mongooseConnect)
    , clientsController = require('./app/controllers/clients_controller')(app, mongooseConnect)
    , errorController = require('./app/controllers/error_controller')(app, mongooseConnect);


app.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        log('Address in use, retrying...');
        setTimeout(function () {
            app.close();
            app.listen(PORT, function () {
                app.serverUp = true;
            });
        }, 1000);
    }
});

app.listen(PORT, function () {
    log(("Express server listening on port " + PORT).green);
    app.serverUp = true;
});
//Route
app.get('/', index.index);