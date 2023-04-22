const { personRoutes } = require('./person')
const { userRoutes } = require('./user')
const { businessRoutes } = require('./business')
const routes = [].concat(personRoutes).concat(userRoutes).concat(businessRoutes)
module.exports = routes