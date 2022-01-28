const Position = require('../models/Position')

module.exports.getProducById = async function( req, res ){
    try{
        const position = await Position.find({
            productId: req.params.productId
        })
        res.status(200).json(position)
    }catch( error ){
        res.status( 500 ).json({
            success: false,
            message: `Обект не найден ${error.message ?? error}`
        })
    }
}

module.exports.create = async function( req, res ){
    const imageSrc = req.files.map( file => { if( file.path ) return file.path } )
    const position = new Position({
        productId: req.body.productId,
        name: req.body.name,
        cost: req.body.cost,
        sizes: req.body.sizes,
        description: req.body.description,
        imageSrc
    })
    try{
        await position.save()
        res.status(201).json({
            message: 'All right'
        })
    }catch( error ){
        res.status(500).json({
            success: false,
            message: `Обект не загружен ${error.message ?? error}`
        })
    }
}