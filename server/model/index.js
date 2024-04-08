const moongose = require('mongoose')
moongose.Promise = global.Promise;

const db = {
    user: require('./user.model'),
    role: require('./role.model'),
    ROLES: ['user', 'admin']
}

module.exports = db

