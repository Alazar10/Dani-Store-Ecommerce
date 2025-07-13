import axios from 'axios'

const payWithChapa = async (req, res) => {
    try {
        const { amount, email, first_name, last_name, tx_ref } = req.body

        const response = await axios.post(
            'https://api.chapa.co/v1/transaction/initialize',
            {
                amount,
                currency: 'ETB',
                email,
                first_name,
                last_name,
                tx_ref,
                return_url: process.env.CHAPA_CALLBACK_URL



            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
                }
            }
        )

        res.json({
            success: true,
            checkout_url: response.data.data.checkout_url
        })
    } catch (error) {
        console.error('❌ Chapa Payment Init Error:', error.response?.data || error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to initialize Chapa payment'
        })
    }
}


const verifyChapaPayment = async (req, res) => {
    const { tx_ref } = req.query

    try {
        const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
        })

        const data = response.data.data

        if (data.status === 'success') {
            return res.json({
                success: true,
                amount: data.amount,
                currency: data.currency,
                charged: data.charged_amount,
                email: data.email,
                status: data.status
            })
        } else {
            return res.json({ success: false, message: 'Payment not verified' })
        }
    } catch (err) {
        console.error('❌ Chapa Verify Error:', err.message)
        res.status(500).json({ success: false, message: 'Verification failed' })
    }
}


export { verifyChapaPayment, payWithChapa } 