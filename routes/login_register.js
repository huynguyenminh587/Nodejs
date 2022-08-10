
// class RouterIndex {
//     constructor(app) {
//         this.app = app;
//     }

//     registerRoutes() {
//         // this.app.use('/login', loginUser);
//     }
// }

// module.exports = (app) => { return new RouterIndex(app) };

// const express = require('express')
// const registerApi = require('../register')
// const loginApi = require('../login')
// const authlogin = require('../middlewares/auth.login')
// const router = express.Router();

// router.use(registerApi)
// router.use(loginApi)
// router.use(authlogin)

// module.exports = router


module.exports = (router) => {
    const jwt = require('jsonwebtoken')
    var verifyToken = require('../middlewares/auth.login')
    var login_registerController = require('../core/login_register.controller')
    router.post('/register', login_registerController.register)
    router.post('/login', login_registerController.login)

    router.post('/verify', verifyToken.verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                res.json({
                    message: 'Login success',
                    authData
                })
            }
        })
    })
}