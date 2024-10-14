const express = require('express');
const { createEmployee, fetchAll, detailsById, updateById, deleteById } = require('../controllers/employeeController');
const router = express.Router();


router.post('/employees', createEmployee);

router.get('/employees', fetchAll)

router.get('/employees/:eid', detailsById)

router.put('/employees/:eid', updateById)

router.delete('/employees', deleteById)


module.exports = router; 
