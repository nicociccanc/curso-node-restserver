const { response } = require ('express');

const estadoEliminado = (req, res = response, next) => {

    const {estado, nombre} = req.usuario;

    if(estado !== 'true'){
        return res.status(401).json({
           msg: `El usuario: ${nombre} ya ha sido eliminado- Estado: ${estado}`
        })
    }
    next();
}




module.exports= {
    estadoEliminado
}