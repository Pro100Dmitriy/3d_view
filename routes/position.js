const express = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/position')
const router = express.Router()

router.get('/:productId', controller.getProducById)
router.post('/', upload.array('imageSrc'), controller.create)

module.exports = router