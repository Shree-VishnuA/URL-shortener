const sessionIdToUserMap = new Map();

function mapUser(id,user){
    sessionIdToUserMap.set(id,user);
}
function getUser(id){
    return sessionIdToUserMap.get(id);
}
module.exports = {
    mapUser,
    getUser
}