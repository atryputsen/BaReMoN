/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 4/2/13
 * Time: 3:29 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(mongoose) {
    var crypto = require('crypto');
    var Schema = mongoose.Schema,
        AccountSchema;
    AccountSchema = new Schema(
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                unique   : true,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        }
    );
    return mongoose.model('Profile', AccountSchema);
}