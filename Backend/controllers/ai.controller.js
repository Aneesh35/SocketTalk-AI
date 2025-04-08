import { generateResult } from "../services/ai.service.js";
export const getResultController=async(req,res)=>{
    try{
        const prompt=req.body.prompt;
        const result=await generateResult(prompt);
        return res.json(result);
    }catch(err){
        res.status(400).send(err.message);
    }
}