
const userValidator =async (req,res,next)=>{
    try{
        if(req.method==="POST"){
            if(req.body){
                let body = req.body
                const userArray = [ "Name","Weight","Height","Gender","Age"]
                if(Object.keys(body).toString()===userArray.toString()){
                    next()
                }else{
                    res.json({
                        error:"body is not proper :ERROR"
                    }) 
                }
            }else{
                res.json({
                    error:"body is not define :ERROR"
                }) 
            }
        }else{
            res.json({
                error:"METHOD not allowed :ERROR"
            }) 
        }    
    }catch(err){
        console.log(err)
    }
   


}
module.exports={
userValidator
}