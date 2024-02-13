const jwt=require("jsonwebtoken")
const JWT_SECRET=require("./config");
const authMiddleware=(req,res,next)=>{
 
    const headers=req.headers.authorization;
   
    if(!headers){
     
        res.status(403).json({})
    }
    if(headers.includes('Bearer ')){
     
        try {
            
            const key=headers.split(" ")[1];
            const result=jwt.decode(key,JWT_SECRET.JWT_SECRET)
       
            req.userId=result.userId
            next()
        } catch (e) {
            console.log(e+"\n")
            res.status(403).json({})
        }
    }else{
      
         res.status(403).json({})
    }

}
module.exports={
    authMiddleware
}