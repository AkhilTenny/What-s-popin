
  // If using Node.js

$(document).ready(function(){
  $("#profilePic").click(function(){
    console.log("haida")
    $("#myModal").modal("show");
  });
  
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
          console.log("success")
        }
        

      })
    }
   
  
}

window.indClick = new handleClick();

