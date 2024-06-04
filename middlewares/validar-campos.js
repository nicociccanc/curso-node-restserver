const { validationResult } = require('express-validator');

//NEXT es lo que tengo que llamar si este middleware PASA
const validarCampos = ( req, res, next ) => {

    
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }


    next();
}



module.exports = {
    validarCampos
}