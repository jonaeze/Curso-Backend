import express from "express"

const chatRouter = express.Router();

chatRouter.get('/chat',(request,response)=>{
    response.render('chat');
})

export default chatRouter;