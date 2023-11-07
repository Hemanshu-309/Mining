import express from 'express'
import users from '../controller/users.js'
import middleware from '../middleware/jwt.js'

const router = express.Router()


router.post('/addUser',users.createUser)
router.post('/getAllUsers',users.getAllUsers)
router.post('/loginUser',users.loginUser)
router.post('/deleteUser',middleware.checkJwt,users.deleteUser)
router.post('/updatePassword',middleware.checkJwt,users.changePassword)
router.post('/paginateUser',users.paginateUser)
router.post('/resetPasswordEmail',users.resetPasswordEmail)
router.post('/resetPassword',users.resetPassword)



export default {
    router
}

