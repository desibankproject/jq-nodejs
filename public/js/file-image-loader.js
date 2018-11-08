	
function editRow(sno){
	//access the row object to be edited
	var rowObj=$("#rowdata"+sno);
	$("#spsno").val(sno);
    var name = rowObj.find("td:nth-child(2)").text();
    var email = rowObj.find("td:nth-child(3)").text();
    var mobile = rowObj.find("td:nth-child(4)").text();
    var gender = rowObj.find("td:nth-child(5)").text();
    $("#addStudentModal").modal("show");
    $("#name").val(name);
    $("#email").val(email);
    $("#mobile").val(mobile);
    $("#gender").val(gender);
    $("#ephoto").attr("src","image-loader?sno="+sno);
	alert("Editing the row!!!!!!!!!!");
}

function deleteRow(sno) {
		//$.ajax , ACCEPT= JSON,METHOD=GET
		/*$.getJSON("delete-profile?sno="+sno,function(data){
			if(data.status=="success"){
				$("#rowdata"+sno).hide();
			}
			$("#appmessage").html(data.message);
		});*/
			$.ajax({url:"delete-profile?sno="+sno, type: 'GET',success:function(data) {
				if(data.status=="success"){
					$("#rowdata"+sno).hide();
				}
				$("#appmessage").html(data.message);
			}});
	}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#csphoto').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//Ready Handler is function which will be  called when dom is loaded into the memory!
		 $(document).ready(function(){
			 
			 	$("#bphoto").change(function(){
			 		 readURL(this);
				    
				});
				//All the jQuery code we will write here
				//document.elementById("load");
				$("#load").click(function(){
					//fetching JSON data from txt file
					var  url="students"
					$.getJSON("students",function(data){ //data will hold json data as a JavaScript object
						showData(data);
					});

				});
				
				$("#addStudent").click(function(){
					$("#addStudentModal").modal("show");
				});
				
				
				$("#upload").click(function(){
					//here we can write code for validation!
						alert(")@#)RAHUL#)#)#");
						//SPECIAL CODE TO SUBMITTING FORM DATA WITH IMAGE ATTACHMENT USING AJAX AND
						//THEN GETTING JSON RESPONSE!
						//FormData is predefine Function constructor inside JavaScript
						   //imageUploadAjaxForm is my form id and using it we are creating form data
							//which we will send through ajax
							//processData: false,
                        	//contentType: false, ->> to send image as attachment in AJAX
		                   var myForm = new FormData(document.getElementById('imageUploadAjaxForm'));
		                   //var myForm = $("#imagePopupFormId").serialize();
		                   $.ajax({url : "profileUpload",
		                             dataType: 'json',
		                             data : myForm,
		                             processData: false,
		                             contentType: false,
		                             type : 'POST',
		                             success : function(cdata) {
		                            	     // String json = gson.toJson(applicationMessage);
		                                 		//response.getWriter().println(json); 
		                            	 	  //cdate=json	
		                                     $("#appmessage").html(cdata.message);
		                                      //close the modal using jQuery
		                                     $("#addStudentModal").modal("hide");
		                                     var psno=$("#spsno").val();
		                                     if(psno!=0){
		                                    	 $("#pimage"+psno).attr("src","image-loader?sno="+psno+"& _=" + new Date().getTime());
		                                     }
		                             }
		                   });

					 
				});
				
				
				
				
	     });
	