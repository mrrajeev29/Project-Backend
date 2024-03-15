const mongoose = require('mongoose');
const codeModel=require('../models/codeModel');
const userModel = require('../models/userModel');

exports.getAllCodesController=async(req,res)=>{
    try{
        const codes=await codeModel.find({}).populate('user');
        if(!codes){
            return res.status(200).send({
                success:false,
                message:'No Blogs Found'
            });
        }
        return res.status(200).send({
            success:true,
            BlogCount:codes.length,
            message:"All codes lists",
            codes
        });
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error while getting codes',
            error
        })
    }
};


exports.createCodeController=async(req,res)=>{
    try{
        const {question,language,answer,comment,user}=req.body;
        if(!question || !language || !answer || !user){
            return res.status(400).send({
                success:false,
                message:"provide all fields comment may not be required"
            })
        }
        const existingUser=await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                mess:"Unable to find user"
            })
        }

        const newCode= new codeModel({question,language, answer,comment,user});
        const session=await mongoose.startSession()
        session.startTransaction();
        await newCode.save({session});
        existingUser.codes.push(newCode);
        await existingUser.save({session});
        await session.commitTransaction();
        await newCode.save();
        return res.status(201).send({
            success: true,
            message:'Code Created',
            newCode
        });


    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error while creating code',
            error
        })
    }
};


exports.updateCodeController=async(req,res)=>{
    try{
        const {id}=req.params;
        const {question,language,answer,comment}=req.body;
        const code=await codeModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true}
        );
        return res.status(200).send({
            success:true,
            message:"Code Updated",
            code,
        });
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while updating Code",
            error,
        });
    }
};

exports.getCodeByIdController=async(req,res)=>{
    try{
        const {id}=req.params
        const code=await codeModel.findById(id)
        if(!code)
        {
            return res.status(404).send({
                success:false,
                message:'code not found with this id'
            })
        }
        return res.status(200).send({
            success:true,
            message:'fetch single code',
            code
        })
    }    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while getting single code",
            error
        })
    }
};

exports.deleteCodeController=async(req,res)=>{
    try{
        const code=await codeModel.findByIdAndDelete(req.params.id).populate("user");
        await code.user.codes.pull(code);
        await code.user.save();
        return res.status(200).send({
            success:true,
            message:"Code deleted",
        });
    }catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while deleting",
            error,
        })
    }
};


exports.userCodeController=async(req,res)=>{
    try{
        const userCode= await userModel.findById(req.params.id).populate("codes");
        if(!userCode){
            return res.status(404).send({
                success:false,
                message:"codes not found with this id",
            });
        }
        return res.status(200).send({
            success:true,
            message:"user codes",
            userCode,
        });
    }catch(error){
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error in user blog",
          error,
        });
    }
};