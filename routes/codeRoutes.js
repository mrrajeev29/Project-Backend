const express=require('express')
const { getAllCodesController, createCodeController, updateCodeController, getCodeByIdController, deleteCodeController, userCodeController } = require('../controllers/codeController')

const router= express.Router()

router.get('/all-code',getAllCodesController)

router.post('/create-code',createCodeController)

router.put('/update-code/:id',updateCodeController)

router.get('/get-code/:id',getCodeByIdController)

router.delete('/delete-code/:id',deleteCodeController)

router.get('/user-code/:id',userCodeController);

module.exports=router