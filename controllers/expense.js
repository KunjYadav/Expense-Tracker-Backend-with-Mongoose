const Expense = require('../models/expenses');

const UserServices = require('../services/userservices');
const S3Service = require('../services/s3Services');

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;
    req.user.createExpense({ expenseamount, description, category }).then(expense => {
        return res.status(201).json({ expense, success: true });
    }).catch(err => {
        return res.status(403).json({ success: false, error: err })
    })
}

const getexpenses = (req, res) => {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({ expenses, success: true })
    })
        .catch(err => {
            return res.status(402).json({ error: err, success: false })
        })
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({ where: { id: expenseid } }).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly" })
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed" })
    })
}

const downloadExpenses = async (req, res, next) => {
    try {
        if (!req.user.ispremiumuser) {
            return res.status(401).json({ success: false, message: 'User is not a premium User' })
        }

        const expenses = await UserServices.getExpenses(req);
        console.log(expenses);
        const stringifiedExpenses = JSON.stringify(expenses);

        // It should depends upon the userId
        const userId = req.user.id;

        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await S3Service.uploadToS3(stringifiedExpenses, filename);
        console.log(fileURL);
        res.status(200).json({ fileURL, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ fileURL: '', success: false, err: err })
    }
}


module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    downloadExpenses
}