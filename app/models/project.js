/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:20 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(mongoose) {
    var Schema = mongoose.Schema,
        Project;
    Project = new Schema(
        {
            name: {
                type: String,
                required: true
            },
            client_id: {
                type: String,
                required: true
            },
            technology: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    );
    return mongoose.model('Project', Project);
}