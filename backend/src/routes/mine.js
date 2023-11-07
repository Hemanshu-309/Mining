import express from 'express'
import mine from '../controller/mine.js'
import middleware from '../middleware/jwt.js'

const router = express.Router()

router.post('/addMine',middleware.checkJwt,mine.addMine)
router.post('/getAllMines',middleware.checkJwt,mine.getAllMine)
router.post('/deleteMine',middleware.checkJwt,mine.deleteMine)
router.post('/deleteAllMines',middleware.checkJwt,mine.deletedMultipleMines)
router.post('/paginateMines',middleware.checkJwt,mine.paginateMine)
router.post('/updateMine',middleware.checkJwt,mine.updateMine)

export default {
    router
}