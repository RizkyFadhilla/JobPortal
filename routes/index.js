const express = require('express')
const UserController = require('../controllers/UserController')
const Controller = require('../controllers/controller')

const router = express.Router()

//router get /register
router.get('/register', UserController.registerForm)

//router post /register
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)

router.use((req, res, next) => {
    // console.log(req.session)
    if(!req.session.userId) {
        const errors = "Please Login First"
        res.redirect(`/login?errors=${errors}`)
    } else {
        next()
    }
    // console.log('Time:', Date.now())
  })

router.get('/', Controller.home)


module.exports = router