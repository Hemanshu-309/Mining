import express from 'express'
import pg from '../suppX/purchase_group.js'

const router = express.Router()

router.post('/create',pg.createPurchaseGroup)
router.post('/update',pg.updatePurchaseGroup)
router.post('/delete/:id',pg.deletePurchaseGroup)
router.post('/view/:id',pg.viewPurchaseGroup)
router.post('/paginate',pg.paginatePurchaseGroup)

export default {
    router
}