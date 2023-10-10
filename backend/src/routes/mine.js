import express from 'express'
import mine from '../controller/mine.js'
const router = express.Router()

router.post('/addMine',mine.addMine)
router.post('/getAllMines',mine.getAllMine)
router.post('/deleteMine',mine.deleteMine)
router.post('/deleteAllMines',mine.deletedMultipleMines)
router.post('/paginateMines',mine.paginateMine)

export default {
    router
}