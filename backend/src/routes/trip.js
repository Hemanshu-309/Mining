import express from 'express'
import trip from '../controller/trip.js'

const router = express.Router()

router.post('/addTripType',trip.createTrip)
router.post('/getTripType',trip.getTrip)

export default {
    router
}