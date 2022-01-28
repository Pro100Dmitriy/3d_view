const Scene = require('../models/Scene')

module.exports.save = async function( req, res ){
    const variant = await Scene.findOne({ name: req.body.name })
    if( variant ){
        try{
            const scene = await Scene.findOneAndUpdate(
                {name: req.body.name},
                {$set: req.body}
            )
            res.status(200).json(scene)
        }catch( error ){
            res.status(500).json({
                success: false,
                message: `Обект не обновлён ${error.message ?? error}`
            })
        }
    }else{
        try{
            const scene = await new Scene({
                name: req.body.name,
                data: req.body.data
            }).save()
            res.status(200).json(scene)
        }catch( error ){
            res.status(500).json({
                success: false,
                message: `Обект не сохранен ${error.message ?? error}`
            })
        }
    }
}

module.exports.load = async function( req, res ){
    try{
        const scene = await Scene.find({
            name: req.params.name
        })
        res.status(200).json(scene)
    }catch( error ){
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}