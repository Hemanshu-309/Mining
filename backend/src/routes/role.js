import express from 'express'
import role from '../controller/role.js'

const router = express.Router()

router.post('/createRole',role.createRole)
router.post('/getRole',role.getRole)
router.post('/deleteRole',role.deleteRole)
router.post('/deleteMultipleRoles',role.deleteMultipleRoles)
router.post('/updateRole',role.updateRole)
router.post('/paginateRole',role.paginateRole)


export default {
    router
}