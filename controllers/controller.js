let { User } = require('../models')
let {Op} = require('sequelize')

class Controller {
    static home (req, res) {
        console.log(req.session.userId, "==== from controller")
        res.render('Home')
    }
}

module.exports = Controller