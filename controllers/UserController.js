let { User } = require('../models')
let {Op} = require('sequelize')
const bcrypt = require('bcryptjs');

class UserController {
    static registerForm(req, res) {
        res.render('auth-pages/signup')
    }
    static postRegister(req,res) {
        const {username, password} = req.body
        User.create({username, password})
        .then(newUser =>
            {res.redirect('/login')
        })
        .catch(err => res.send(err))
    }
    static loginForm(req, res) {
        const errors = req.query.errors
        res.render('auth-pages/login' , {errors})
    }
    static postLogin(req, res) {
        const {username, password} = req.body
        User.findOne( {where:{username} })
        .then(user =>{
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)

                if(isValidPassword) {
                    req.session.userId = user.id // set session di controller
                   return res.redirect('/')
                } else{
                    const error = `invalid username or password`
                    return res.redirect(`/login?errors=${error}`)
                }
            } else{
                const error = `invalid username or password`
                return res.redirect(`/login?errors=${error}`)
            }
        })
        .catch(err =>{
            res.send(err)
        })
    }
    
}

module.exports = UserController