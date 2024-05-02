const bcrypt = require('bcrypt');

function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
function comparePasswords(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    comparePasswords
};
