const { personRoutes } = require('./person')
const { userRoutes } = require('./user')
const { businessRoutes } = require('./business')
const {publicListRoutes} = require('./publicList')
const {publicFormRoutes} = require('./publicForm')
const routes = [].concat(personRoutes).concat(userRoutes).concat(businessRoutes).concat(publicListRoutes).concat(publicFormRoutes)
module.exports = routes