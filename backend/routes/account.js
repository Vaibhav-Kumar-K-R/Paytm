const express=require("express")
const mongoose=require("mongoose")
const { authMiddleware } = require( "../middleware" )
const {User,Account}=require("../db")
const router=express.Router()

router.get('/balance',authMiddleware,async(req,res)=>{
    const acc=req.userId;
    const isAccount=await Account.findOne({
        userId:acc
    })
    res.json({
        balance:isAccount.balance
    })
})
router.post('/transfer',authMiddleware,async(req,res)=>{
    const to=req.body.to;
    const amount=req.body.amount;
    const from=req.userId;

    const fromuser=await Account.findOne({
        userId:from
    }) 
    if(fromuser.balance<amount){
        res.status(400).json({
            msg:"Insufficient balance"
        })
        return ;
    }
    const toUser=await Account.findOne({
        userId:to
    })
    if(!toUser){
         res.status(400).json({
            msg:"Account does not exist"
        })
        return ;
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    })
    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    })
       res.status(200).json({
        message: "Transfer successful"
    })
})
module.exports=router