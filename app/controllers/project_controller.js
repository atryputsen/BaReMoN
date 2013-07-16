/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
var ProjectController
    , log = console.log
    , _ = require('underscore');

ProjectController = function(app, mongoose) {

    var Project = mongoose.model('Project');
    app.get('/projects', function index(req, res) {

        Project.find(function(err, clients){
            res.json(clients)
        })
    });

    app.get('/projects/:id', function show(req, res) {
        Project.findById(req.params.id, function(err, project) {
            res.json(project);
        });
    });

    app.post('/projects', function create(req, res) {
        var newProject;
        newProject = new Project(_.pick(req.body, 'name', 'technology', 'description'));
        newProject.save(function(err) {
            var code = 200, loc;
            if (!err) {
                loc = '/clients/' + Project._id;
                res.setHeader('Location', loc);
                res.json(newProject, 201);
            } else {
                log(err);
                res.json(err, 500);
            }
        });
    });

    app.put('/projects/:id', function update(req, res) {
        Project.findById(req.params.id, function(err, project) {
            var newAttributes;

            // modify resource with allowed attributes
            newAttributes = _.pick(req.body, 'name', 'technology', 'description');
            project = _.extend(project, newAttributes);

            project.save(function(err) {
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

    app.del('/projects/:id', function destroy(req, res) {
        Project.findById(req.params.id, function(err, project) {
            project.remove();
            res.json({});
        });
    });
}
module.exports = ProjectController;