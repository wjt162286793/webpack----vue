const { personRoutes } = require('./person')
const { userRoutes } = require('./user')
const routes = [].concat(personRoutes).concat(userRoutes)
module.exports = routes