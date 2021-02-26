const mongo = require ('mongoose');

const guildSchema = new mongo.Schema({
    guildID: {
        type: String,
        unique: true
    },

    blacklisted: {
        type: Boolean,
        default: false
    },
    
     prefix: {
        type : String,
        default: 'cad.',
    },
});

module.exports = mongo.model("Guilds", guildSchema);
