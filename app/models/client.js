/**
 * Created with JetBrains WebStorm.
 * User: Aliaksei_Tryputsen
 * Date: 3/29/13
 * Time: 5:20 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(mongoose) {
    var Schema = mongoose.Schema,
        Client;
    Client = new Schema(
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
            phone: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            notes: {
                type: String
            }
        }
    );
    return mongoose.model('Client', Client);
}