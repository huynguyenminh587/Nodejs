
// class RouterIndex {
//     constructor(app) {
//         this.app = app;
//     }

//     registerRoutes() {
//         // this.app.use('/login', loginUser);
//     }
// }

// module.exports = (app) => { return new RouterIndex(app) };

const express = require('express')
const registerApi = require('../register')
const loginApi = require('../login')
const authlogin = require('../middlewares/auth.login')
const router = express.Router();

router.use(registerApi)
router.use(loginApi)
router.use(authlogin)

module.exports = router