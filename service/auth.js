const Map = require("../models/map");

async function mapUser(id, user) {
    const object = await Map.create({
        sessionId: id,
        email: user.email
    })
    return object;
}
async function getUser(id) {
    const object = await Map.findOne({ sessionId: id });
    return object;
}
module.exports = {
    mapUser,
    getUser
}