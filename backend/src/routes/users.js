import express from 'express'
import users from '../controller/users.js'

const router = express.Router()


router.post('/addUser',users.createUser)
router.post('/loginUser',users.loginUser)
router.post('/deleteUser',users.deleteUser)
router.post('/updatePassword',users.changePassword)
router.post('/paginateUser',users.paginateUser)
router.post('/resetPasswordEmail',users.resetPasswordEmail)
router.post('/resetPassword',users.resetPassword)



export default {
    router
}

