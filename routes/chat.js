const
express = require('express'),
router = express.Router(),
app = express(),
chatHelpers = require('../helpers/chathealpers')
userHealpers = require('../helpers/userHelper');
app.use(express.json());


const io = require( "socket.io" )();
const socketapi = {
    io: io
};
let socketUsers = {}

function getUserFromId(socketId){
  console.log(socketId)
  for (const [username,id] of Object.entries(socketUsers)){
    if(id == socketId){
      
      return username

    }}
    return null
  
}

// Add your socket.io logic here!
io.on( "connection", function( socket ) {

    socket.on('online',(username)=>{
      socketUsers[username] = socket.id

      
    })
    
    socket.on('privet-message',({to,message,username})=>{
      
      recipientSocketId = socketUsers[to];
      //this condition works only if the user is online
      if(recipientSocketId){
        io.to(recipientSocketId).emit("privet-message",{
          message:message,
          from:username,
          to:to
        })

       
    }      //this condition works only if the user is online
    //if the user is online the message will first show to the recivers chat area and then will get saved to the db
    ///if the user in offline the meessage will be saved in the db and then later when the user is online the new unreaded messages will be shown
     else{
      const messageInfo = {
        to:to,
        from:username,
        message:message,
        readStatus:"unread",
        type:"text"
      }
      chatHelpers.saveMessageToDb(messageInfo)
      
    }
    })
    socket.on("disconnect",()=>{ 
      const username = getUserFromId(socket.id)
      delete socketUsers[username]
    })
     
    
});


router.get("/",async(req,res)=>{
  const userInfo = await userHealpers.getUserInfo(req.session.passport.user.cryptoId)
  const followingPromises = userInfo.following.map(async(user)=>{
    const foundUser = await userHealpers.findUser(user);
    console.log(user)
     return{
       username:foundUser.username,
       cryptoId:foundUser.cryptoId,
       email:foundUser.email
     }
  })
  const following = await Promise.all(followingPromises);
  await userHealpers.findUser(userInfo.following)
 res.render('users/chat',{userInfo:userInfo ,following:following})
})
router.post("/changeChatUser",async(req,res)=>{
  const userInfo = await userHealpers.getUserInfo(req.body.newUserCryptoId)
  const messages = await chatHelpers.getMessages(req.session.passport.user.username,userInfo.username)
  const response = {
    userInfo: userInfo,
    messages: messages
  };
    res.json(response)
})

router.post("/save-message-db",(req,res)=>{
  const savedMessage = chatHelpers.saveMessageToDb(req.body)
  console.log(savedMessage)
})

 
module.exports = {router,socketapi};


