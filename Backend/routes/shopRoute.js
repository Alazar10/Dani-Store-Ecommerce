// routes/shopRoute.js
import express from 'express'
import { getPublicProducts } from '../controllers/shopController.js'

const router = express.Router()

router.get('/products', getPublicProducts)

export default router
