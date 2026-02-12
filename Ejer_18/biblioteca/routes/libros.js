const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');
console.log('Controlador importado:', libroController);
router.get('/', libroController.catalogo);
router.get('/libro/:id', libroController.detalleLibro);


module.exports = router;
