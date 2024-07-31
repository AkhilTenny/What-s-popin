
 
$(document).ready(function(){
  $("#profilePic").click(function(){
    $("#myModal").modal("show");
  });
  $("#searchBtn").click(function(){
    console.log("hai")
    $("#searchModel").modal("show")
  })
  
});

class handleClick{
  constructor(){
    this.userInterests = [];
  }
   indClickSub(id){
    if($('#'+id).css('visibility')==="visible"){
      this.userInterests.pop(id)
      $('#'+id).css('visibility',"hidden");
    }else{
      this.userInterests.push(id)
      $('#'+id).css('visibility',"visible");
      }
      $('#indCount').html(this.userInterests.length)
    }
     intSubmit(){
      $.ajax({
        type:"POST",
        url:"/save-user",
        data: {interests:JSON.stringify(this.userInterests)},
        success:function(value){
          
        }
        

      })
    }
  
}class find{ 
  findUsersAjax(searchTerm){
  $.ajax({
    url:"/find-users",
    method:"post",
    data:{searchTerm:searchTerm},
    success:function(users){
      if(users != "error"){
      displaySearchResults(users)
      }else{
      displayNoResults()
      }
    }
  })

}}

function displaySearchResults(users){
  const container = document.getElementById("foundUsersDiv");
  container.innerHTML=""
  users.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("found-user-div")

    const userLink = document.createElement("a")
    userLink.href = "/p/"+user._doc.username
    userLink.classList.add("no-decoration")

    const userDp = document.createElement("img");
    userDp.src = "/images/users/profilePictures/"+user._doc.cryptoId+".jpg"
    userDp.classList.add("found-user-dp")


    const username = document.createElement("h4");
    username.textContent = user._doc.username
    username.classList.add("found-user-username")

    //appends
    container.appendChild(userLink);
    userLink.appendChild(userDiv)
    userDiv.appendChild(userDp)
    userDiv.appendChild(username)

  
  });
 

}function displayNoResults(){
   const container = document.getElementById("foundUsersDiv");
  container.innerHTML=""
  const noResultsDiv  = document.createElement("div")
  noResultsDiv.innerHTML = "<h4>no results found</h4>"
  document.getElementById("foundUsersDiv").appendChild(noResultsDiv)
}
function openPost(postCryptoId){
  window.location.href = '/u/'+postCryptoId;
}
function followUser(userCryptoId){
  $.ajax({
    url:'/follow-user',
    method:"post",
    data:{userCryptoId:userCryptoId},
    success:function(result){
      if(result){
        $("#followBtn").text("following")
        $("#followBtn").attr("class","btn-secondary btn follow-btn")
 }

    }
  })
}function unfollowUser(userCryptoId){
  $.ajax({
    url:'/unfollow-user',
    method:"post",
    data:{userCryptoId:userCryptoId},
    success:function(result){
      if(result){
        $("#followBtn").text("follow")
        $("#followBtn").attr("class","btn-primary btn follow-btn")
      }
    }
  })
}
async function changeChatUser(cryptoId){
  $.ajax({
    url:'chat/changeChatUser',
    method:"post",
    data:{newUserCryptoId:cryptoId},
    success: function(result){
     ;//change the userInfo 
      $('#chatUserDp').attr("src",'images/users/profilePictures/'+result.userInfo.cryptoId+'.jpg')
      $('#chatUsername').text(result.userInfo.username)
      $('#chatArea').html('');
      $('#chatArea').attr("data-value",result.userInfo.username)
      //change the chats
      const messageContainer = document.getElementById("chatArea")
      result.messages.forEach(message =>{
        if(result.userInfo.username === message.to){
          const messageDiv =  document.createElement('div')
          messageDiv.classList.add("chat-to-div")

          
          const messageBubble =  document.createElement('div')
          messageBubble.innerHTML = `<h4>${message.message}</h4>` 
          messageBubble.classList.add("chat-to-bubble")

          messageContainer.appendChild(messageDiv);
          messageDiv.appendChild(messageBubble)

        }else{
          const messageDiv =  document.createElement('div')
          messageDiv.classList.add("chat-to-div")


          const messageBubble =  document.createElement('div')
          messageBubble.innerHTML = `<h4>${message.message}</h4>` 
          messageBubble.classList.add("chat-from-bubble")

      messageContainer.appendChild(messageDiv);
      messageDiv.appendChild(messageBubble)

       
        }

      })    
          messageContainer.scrollTop = messageContainer.scrollHeight;

    }

  })

}

function displayNewMessage(message,direction){
  const messageContainer = document.getElementById("chatArea")

  const messageDiv =  document.createElement('div')
  messageDiv.classList.add("chat-to-div")

  
  const messageBubble =  document.createElement('div')
  messageBubble.innerHTML = `<h4>${message}</h4>` 
  messageBubble.classList.add(`chat-${direction}-bubble`)

messageContainer.appendChild(messageDiv);
messageDiv.appendChild(messageBubble)

//scroll
messageContainer.scrollTop = messageContainer.scrollHeight;


}

const indClick = new handleClick();
const findfun = new find();

 