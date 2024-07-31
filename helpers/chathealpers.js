const 
mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  from:String,
  to:String,
  message:String,
  type:String,
  readStatus:String,
  time : { type: Number, default: (new Date()).getTime() }

})
const messages = mongoose.model("message",messageSchema)


function saveMessageToDb(messageInfo){
  return new Promise((resolve,reject)=>{
    const newMessage = new messages(({
      from:messageInfo.from,
      to:messageInfo.to,
      message:messageInfo.message,
      type:"text",
      readStatus:messageInfo.readStatus
    }))
    newMessage.save();
    resolve(newMessage)
  })
}

function getMessages(loggedUser,ChatUser){
  return new Promise(async(resolve,reject)=>{
    const chatMessages = await messages.aggregate(
      [
        {
          $match: {
            $or:[
              {to:ChatUser},
              {from:ChatUser}
            ]
          }
        },{
          $match: {
            $or:[
              {to:loggedUser},
              {from:loggedUser}
            ]
          }
        }
      ]
    )
    resolve(chatMessages)
  })
}

module.exports={
  saveMessageToDb,
  getMessages
}