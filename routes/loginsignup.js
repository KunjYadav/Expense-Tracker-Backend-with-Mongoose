const express = require('express');
const usercontrollers = require('../controllers/userlogin');
const expenseController = require('../controllers/expense');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/register', usercontrollers.userregister);

router.post('/login', usercontrollers.postlogin);

router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addexpense);

router.get('/download', authenticatemiddleware.authenticate, expenseController.downloadExpenses);

router.get('/getexpenses', authenticatemiddleware.authenticate, expenseController.getexpenses);

router.delete('/deleteexpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteexpense);


module.exports = router;