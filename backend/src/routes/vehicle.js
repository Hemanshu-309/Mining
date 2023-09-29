import express from 'express'
import vehicle from '../controller/vehicle.js'

const router = express.Router()

router.post('/addVehicle',vehicle.addVehicle)
router.post('/getVehicles',vehicle.getVehicle)
router.post('/deleteVehicle',vehicle.deleteVehicle)
router.post('/updateVehicle',vehicle.updateVehicle)

export default {
    router
}