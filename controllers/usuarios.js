const { response } = require ('express');


const usuariosGet = (req = request, res = response) => {
    
    const {q, nombre='Sin nombre', apikey, page=1, limit=1} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });

}

const usuariosPost= (req, res = response) => {
    
    //Como extraigo el body?
    //Aca viene la informacion que estoy mandando en el POST
    const { nombre, edad } = req.body;
    //Desestructurando solo agarro el dato que yo quiero
    //Si recibo mas datos, solo tomo los que indico aca
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
 
}

const usuariosPut= (req, res = response) => {
    
    //desestructuro el REQ
    const {id} = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

// const usuariosPut = (req, res = response) => {
//     const { id } = req.params;

//     if (!id) {
//         return res.status(400).json({
//             msg: 'Error: Debes proporcionar un ID en la URL.'
//         });
//     }

//     res.json({
//         msg: 'put API - controlador',
//         id
//     });
// }

const usuariosPatch= (req, res = response) => {
    
    res.json({
        msg: 'patch API - controlador'
    });

}

const usuariosDelete= (req, res = response) => {
    
    res.json({
        msg: 'delete API - controlador'
    });

}






module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}