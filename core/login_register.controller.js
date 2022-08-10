const User = require('../shared/models/dtb_user/dtb_user.class_methods')

exports.register = async (req, res) => {
    const { first_name, last_name, username, email, address, birth, phone_number, password, sex, del_flg, image, status, role, is_block } = req.body;

    const alreadyExistUser = await User.getUserByEmail1(email).catch((err) => {
        console.log('Err: ', err)
    })

    // const alreadyExistUser = await User.findOne({ where: { email } }).catch((err) => {
    //     console.log('Err :', err)
    // })

    console.log(alreadyExistUser)

    if (alreadyExistUser) {
        return res.json({ message: "User with email already exists" })
    }

    const newUser = new User({
        first_name, last_name, username, email, address, birth, phone_number, password,
        sex, del_flg, image, status, role, is_block
    })

    const savedUser = await newUser.save().catch((err) => {

        console.log('Error : ', err)
        res.json({ error: 'Cannot register user at the moment' })

    });

    if (savedUser)
        res.json({ message: 'Thank for registering' })
    else
        res.json({
            message: 'Cannot register user at the moment'
        })
}



exports.login = async (req, res) => {
    const jwt = require('jsonwebtoken')

    const { email, password } = req.body
    const userWithEmail = await User.getUserByEmail1(email).catch((err) => {
        console.log('Error: ', err)
    })

    if (!userWithEmail)
        return res.json({ message: 'Email or Password does not match' })

    if (userWithEmail.password !== password)
        return res.json({ message: 'Password is incorrect' })

    // const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET)
    jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    })
}