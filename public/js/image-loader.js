	
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
					//creating JSON Data
					var pname=$("#name").val();
					var pemail=$("#email").val();
					var pmobile=$("#mobile").val();
					var pgender=$("#gender").val();
					var pphoto=$("#bphoto").val();
					//above we have to represent as JSON data
					var profile={};
					profile.name=pname;
					profile.email=pemail;
					profile.mobile=pmobile;
					profile.gender=pgender;
					profile.photo=pphoto;
					
					var jsonText=JSON.stringify(profile);
					
					$.ajax({url:"add-profile",contentType: "application/json; charset=utf-8", dataType: "json", type: 'POST',data:jsonText,success:function(response) {  
							if(response.status=="success"){
								$("#appmessage").html(response.message);
								$("#addStudentModal").modal("hide");
							}
					}});					

					 
				});
				
				
				
				
	     });
	