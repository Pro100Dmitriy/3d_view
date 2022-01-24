const express = require('express')
const controller = require('../controllers/scene')
const router = express.Router()

router.post( '/', controller.save )
router.get( '/:name', controller.load )

module.exports = router