import express from 'express'
import users from '../controller/users.js'

const router = express.Router()

//Rahul's Code
router.post('/addUser',users.createUser)
router.post('/loginUser',users.loginUser)
router.post('/deleteUser',users.deleteUser)

//Mahima's code
router.post('/login',users.userLogin)
router.get('/forgotpass',users.forgotpassword)
router.get('/resetpass',users.resetpass)

export default {
    router
}