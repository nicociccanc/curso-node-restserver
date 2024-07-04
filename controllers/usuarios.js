const { response } = require ('express');
const bcryptjs = require ('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    
    // const {q, nombre='Sin nombre', apikey, page=1, limit=1} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    //Creo esta promesa para que no acumule el tiempo que tarda cada una
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number ( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async (req, res = response) => {

    // 1. Obtención del cuerpo de la solicitud
    const { nombre, correo, password, rol} = req.body;

    // 2. Creación de una nueva instancia de Usuario con los datos del cuerpo de la solicitud
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    // 3. Guardado del nuevo usuario en la base de datos (espera a que la operación termine)
    await usuario.save();

    // 4. Envío de la respuesta al cliente con un mensaje y el usuario recién creado
    res.json({ 
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    
    const {id} = req.params;
    const { _id, password, google, correo, ... resto} = req.body;

    //TODO validar contra base de datos

    if ( password ){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}


const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'patch API - controlador'
    });

}

const usuariosDelete = async(req, res = response) => {
    
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    res.json(usuario);

    

}






module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}