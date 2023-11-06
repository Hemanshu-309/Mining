import express from 'express'
import daily_report from '../controller/daily_report.js'
import middleware from '../middleware/jwt.js'

const router = express.Router()

router.post('/addDailyReport',middleware.checkJwt,daily_report.insertDailyReport)
router.post('/getDailyReport',middleware.checkJwt,daily_report.getAllDailyReport)
router.post('/getDailyReportWhere',middleware.checkJwt,daily_report.getDailyReport)
router.post('/deleteReport',middleware.checkJwt,daily_report.deleteReport)
router.post('/paginateDailyReport',middleware.checkJwt,daily_report.paginateDailyReport)
router.post('/updateDailyReport',middleware.checkJwt,daily_report.updateReport)

export default {
    router
}