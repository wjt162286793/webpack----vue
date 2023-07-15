const { personRoutes } = require('./person')
const { userRoutes } = require('./user')
const { businessRoutes } = require('./business')
const {publicListRoutes} = require('./publicList')
const {publicFormRoutes} = require('./publicForm')
const {riskRoutes} = require('./risk')
const routes = [].concat(personRoutes).concat(userRoutes).concat(businessRoutes).concat(publicListRoutes).concat(publicFormRoutes).concat(riskRoutes)
module.exports = routes