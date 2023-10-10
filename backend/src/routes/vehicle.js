import express from 'express'
import vehicle from '../controller/vehicle.js'

const router = express.Router()

router.post('/addVehicle',vehicle.addVehicle)
router.post('/getVehicles',vehicle.getVehicle)
router.post('/deleteVehicle',vehicle.deleteVehicle)
router.post('/deleteMultipleVehicle',vehicle.deleteMultipleVehicles)
router.post('/updateVehicle',vehicle.updateVehicle)
router.post('/paginateVehicle',vehicle.paginateVehicle)

export default {
    router
}