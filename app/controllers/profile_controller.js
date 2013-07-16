/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
var ProfileController
    , log = console.log
    , _ = require('underscore');

ProfileController = function(app, mongoose) {

    var Profile = mongoose.model('Profile');
    app.post('/login', function index(req, res) {
        console.log('login request');
        var email = req.param('email', null);
        var password = req.param('password', null);
        console.log('login request 2');
        if ( null == email || email.length < 1
            || null == password || password.length < 1 ) {
            res.send(400);
            return;
        }
        console.log(email);
        console.log(password);
        console.log('login request 3');
        Profile.findOne({email:email,password:password},function(err,profile){
            console.log(profile);
            console.log('login was successful');
            if (profile) {
                req.session.loggedIn = true;
                res.json(profile);
            } else {
                res.send(400);
                return;
            }
        });
    });
    app.get('/logout', function index(req, res) {
        console.log('logout request');
        req.session.loggedIn = false;
        res.send(200);
    });
    app.post('/register', function(req, res) {
        var name = req.param('name', '');
        var email = req.param('email', null);
        var password = req.param('password', null);
        if ( null == email || email.length < 1
            || null == password || password.length < 1 ) {
            res.send(400);
            return;
        }
        console.log('Registering ' + email);
        var user = new Profile({
            email: email,
            name: name,
            password: password
        });
        user.save();
        console.log('Save command was sent');
        res.send(200);
    });
    app.get('/account/authenticated', function(req, res) {

        if (req.session.loggedIn) {
            res.send(200);
        } else {
            res.send(401);
        }
    });
}
module.exports = ProfileController;