$(document).ready(function(){
	$("#search").keyup(function(){
		$("#appmessage").html("");
	});
	$("#gogo").click(function(){
		var searchtext=$("#search").val();
		if(searchtext.trim().length==0){
			$("#appmessage").html("Hey! search input cannot be empty!");
			$("#search").focus();
			return;
		}
		//MAKE AJAX CALL AND SEND DATA IN JSON FORMAT AND RECEIVE THE DATA FROM THE SERVER IN JSON 
		//FORMAT
		var stext=new SearchInput(searchtext); //Here we are creating an instance of SearchInput
		//convert JavaScript object into JSON string format
		var jsonText=JSON.stringify(stext); //{"searchText":"nagendra"}
		//using function constructor
		$.ajax({url:"seach-profile",contentType: "application/json; charset=utf-8", dataType: "json", type: 'POST',data:jsonText,success:function(data) {  
				showData(data);
		}});
		
	});
});