const express = require('express')
const controller = require('../controllers/position')
const router = express.Router()

router.get('/:productId', controller.getProducById)

module.exports = router