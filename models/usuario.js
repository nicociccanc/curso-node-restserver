//Schema se utiliza para definir la estructura de los documentos
// en una coleccion de MongoDB
// model se utiliza para crear un modelo basado en el esquema
const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema ({


    estado:{
        type: Boolean,
        default: true
    },
    
    google:{
        type: Boolean,
        default: false
    },

    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },

    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true,'la contraseña es obligatoria']
    },

    img:{
        type: String,
    },

    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

});

//Aca puedo crearme metodos personalizados para sobre escribir

UsuarioSchema.methods.toJSON = function () {

    //Desestructuro y saco VERSION Y PASSWORD
    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

module.exports = model( 'Usuarios', UsuarioSchema );