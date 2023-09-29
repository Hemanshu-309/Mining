import express from 'express'
import role from '../controller/role.js'

const router = express.Router()

router.post('/createRole',role.createRole)
router.post('/getRole',role.getRole)
router.post('/deleteRole',role.deleteRole)
router.post('/updateRole',role.updateRole)


export default {
    router
}