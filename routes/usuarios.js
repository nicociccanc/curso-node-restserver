
const { Router } = require('express');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.post('/', usuariosPost );

router.put('/:id', usuariosPut );

router.put('/', (req, res) => {
    res.status(400).json({
        msg: 'Error: NOT FOUND.'
    });
});

router.patch('/', usuariosPatch );

router.delete('/', usuariosDelete );










module.exports = router;