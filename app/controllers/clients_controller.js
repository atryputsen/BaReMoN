/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
var ClientsController
    , log = console.log
    , _ = require('underscore');

ClientsController = function(app, mongoose) {

    var Client = mongoose.model('Client');
    app.get('/clients', function index(req, res) {

        Client.find(function(err, clients){
            res.json(clients)
        })
    });

    app.get('/clients/:id', function show(req, res) {
        Client.findById(req.params.id, function(err, client) {
            res.json(client);
        });
    });

    app.post('/clients', function create(req, res) {
        var newClient;
        newClient = new Client(_.pick(req.body, 'name', 'email', 'phone', 'company', 'notes'));
        newClient.save(function(err) {
            var code = 200, loc;
            if (!err) {
                loc = '/clients/' + newClient._id;
                res.setHeader('Location', loc);
                res.json(newClient, 201);
            } else {
                log(err);
                res.json(err, 500);
            }
        });
    });

    app.put('/clients/:id', function update(req, res) {
        Client.findById(req.params.id, function(err, client) {
            var newAttributes;

            // modify resource with allowed attributes
            newAttributes = _.pick(req.body, 'name', 'email', 'phone', 'company');
            client = _.extend(client, newAttributes);

            client.save(function(err) {
                var code = 200;

                if (!err) {
                    // send 204 No Content
                    res.send();
                } else {
                    log(err);
                    res.json(err, 500);
                }
            });
        });
    });

    app.del('/clients/:id', function destroy(req, res) {
        Client.findById(req.params.id, function(err, client) {
            client.remove();
            res.json({});
        });
    });
}
module.exports = ClientsController;