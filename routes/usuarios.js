
const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators')

//el index no es necesario
const { 
    validarCampos,
    validarJWT,
    tieneRole,
    esAdminRole
} = require ('../middlewares/index');




const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut );


router.post('/', [
    //CHECK es un middleware ejecuta todo este codigo y hace el next
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({min: 6}),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost );



router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );









module.exports = router;