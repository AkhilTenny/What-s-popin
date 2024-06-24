$(document).ready(function(){
  $("#profilePic").click(function(){
    console.log("haida")
    $("#myModal").modal("show");
  });
  
});

function handleClick(){
  let userInterests=[]
  function indClickSub(id){
    if($('#'+id).css('visibility')==="visible"){
      userInterests.pop(id)
      $('#'+id).css('visibility',"hidden");
    }else{
      userInterests.push(id)
      $('#'+id).css('visibility',"visible");
      }
      $('#indCount').html(userInterests.length)
    }
   
  
  this.indClickSub = indClickSub;
}

const indClick = new handleClick();

