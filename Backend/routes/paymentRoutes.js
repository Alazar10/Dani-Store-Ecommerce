import express from 'express'
import { payWithChapa, verifyChapaPayment } from '../controllers/paymentController.js'


const chapaRouter = express.Router()

chapaRouter.post('/chapa', payWithChapa)
chapaRouter.post('/verify', verifyChapaPayment)

export default chapaRouter
