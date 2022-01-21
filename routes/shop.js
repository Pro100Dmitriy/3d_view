const express = require('express')
const router = express.Router()

router.get('/:productId', (req, res) => {
    res.status(200).json({
        message: 'productId'
    })
})

module.exports = router