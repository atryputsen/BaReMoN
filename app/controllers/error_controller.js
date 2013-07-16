/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
var ErrorsController, log = console.log;

ErrorsController = function(app, mongoose) {
    app.error(function(err, req, res, next) {
        if (err) {
            if (err.msg && err.msg === 'json') {
                res.json(null, 404);
            } else {
                res.send('404 - Page Not Found', 404);
            }
        } else {
            log.err(err);
            res.send('500 - Internal Server Error', 500);
        }
    });
};
module.exports = ErrorsController;