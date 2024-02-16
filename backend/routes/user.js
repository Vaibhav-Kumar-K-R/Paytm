const express=require("express")
const router=express.Router();
const zod=require("zod")
const {User,Account,Transactions}=require("../db")
const jwt=require("jsonwebtoken")
const secret=require("../config");
const { authMiddleware } = require( "../middleware" );

const signupSchema=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    username:zod.string().email(),
    password:zod.string().min(6)


})
const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})
const updateSchema=zod.object({
     firstName:zod.string(),
     lastName:zod.string(),
    password:zod.string()
})
router.post('/signup',async(req,res)=>{
    const body=req.body;
   
    const parse=signupSchema.safeParse(body);
    if(!parse.success){
        if(parse.error.errors[0].message=='String must contain at least 6 character(s)'){
             res.status(411).json({
            msg:"Password must contain at least 6 character(s)"
        })    
        return ;
        }
        
        res.status(411).json({
            msg:"Invalid email"
        })
        return ;
      
    }
   const exists=await User.findOne({
    username:body.username
   })
   if(exists){
    res.status(411).json({
            msg:"Email already taken"
        })
        return ;
   }
   const user=await User.create({
   username: body.username,
   password:body.password,
   firstName:body.firstName,
   lastName:body.lastName


   })
   const userId=user._id;
   const account=await Account.create({
        userId:user._id,
        balance:(Math.random()*100000)+1
   })
   const token=jwt.sign({userId},secret.JWT_SECRET)
   return res.status(200).json({
    msg:"Success",
    token:token

   })

})
router.post('/signin',async(req,res)=>{
    const expiresIn=60
    const body=req.body;
    const parse=signinSchema.safeParse(body);
    if(!parse.success){
   if(parse.error.errors[0].message=='String must contain at least 6 character(s)'){
             res.status(411).json({
            msg:"Password must contain at least 6 character(s)"
        })    
        return ;
        }
        res.status(411).json({
            msg:"Invalid email"
        })
        return ; 
    }
     const user=await User.findOne({
    username:body.username,
    password:body.password
   })
   if(user==null){
    res.status(411).json({
            msg:"Some error ocurred"
        })
        return ;
   }
   const userId=user._id;
   if(user){
   const token=jwt.sign({userId},secret.JWT_SECRET,{expiresIn})
    res.json({
            token: token
        })
        return;
   }
   res.status(411).json({
        message: "Error while logging in"
    })

})
router.put('/user',authMiddleware,async(req,res)=>{
    const body=req.body;
    const parse=updateSchema.safeParse(body)
    if(!parse.success){
        res.status(411).json({
            msg:"Error while updating information"
        })
        return ;
    }   
    await User.findOne(body,{
        _id:req.userid
    })
    res.status(200).json({
        message: "Updated successfully"
    })



})

router.get("/bulk",async(req,res)=>{
  
    const filters=req.query.filters||"";
    const users=await User.find({
        "$or":[{
            firstName:{
                  "$regex":filters
            }
        },{
            lastName:{
                "$regex":filters
            }
        }]
        
    })
    let userArr=users.map(user=>({
        username:user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
    res.json({
        users:userArr
    })
})
router.get('/all',async(req,res)=>{
    
    const users=await User.find().select('-password')
    let userArr=users.map(user=>({
        username:user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
   
    res.json({
        users:userArr
    })
})
router.get('/alltransactions',authMiddleware,async(req,res)=>{
     const userss=await Transactions.findOne(
        {userId:req.userId}
    ).catch((e)=>{
        console.log(e);
    })
    if(userss==null){
        let alltransactions=[]
        res.json({
           msg:alltransactions
        })
        return ;
    }
   
       res.json({
       msg:userss.alltransactions
       })
})
router.get('/usermy',authMiddleware,async(req,res)=>{
    const userss=await User.findById(
        req.userId
    ).catch((e)=>{
        console.log(e);
    })
   
       res.json({
       msg:userss
       })
})
module.exports=
    router
