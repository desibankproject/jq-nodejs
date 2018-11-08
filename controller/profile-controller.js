
//AppResponse = {Rahul : function(status,message){}}
var AppResponse=require('../model/app-response');
var  ProfileEntity=require('../dao/profile-entity');
var randomstring = require("randomstring");
const ObjectId = require('mongodb'); 

 
module.exports=function(app) {


     // res.status(500).json({status:"fail",message:"Sorry!! your profile is not created"}); 
     app.get('/delete-profile', function (req, res, next) {
       // var _id=req.query.sno;
       //req.params.noteId
       console.log("_@)@)@)@)@)DELETING THE PROFILE WITH PROFILE ID  ="+req.query.sno+" @)@)@)@)@)@)@)@)");
       ProfileEntity.findByIdAndRemove(req.query.sno)
                    .then(profile => {
                        if(!profile) {
                            return res.status(404).send({
                                status:"fail",
                                message: "Profile not found with id " + req.query.sno
                            });
                        }
                        res.status(200).send({ status:"success",message: "Profile deleted successfully!"});
                    }).catch(err => {
                        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                            return res.status(404).send({
                                status:"fail",
                                message: "Profile not found with id " + req.query.sno
                            });                
                        }
                        return res.status(500).send({
                            status:"fail",
                            message: "Could not delete profile with id " + req.query.sno
                        });
                     });
       
     });   //end of the mapping

      app.get('/image-loader', function (req, res, next) {
                   var _id=req.query.sno;
                    console.log("nagendra = "+_id);
                    if(_id==undefined){
                        return;
                    }
                     console.log("____Accessing the rowdi  _id = "+_id);
    
                    ProfileEntity.findById(_id)
                        .then(profile => {
                            if(profile) {
                                console.log("+_+__data is coming from the database!!!!!!!!!!!!!");
                                console.log(profile);
                                res.contentType(profile.img.contentType);
                                res.send(profile.img.data);          
                            }
                        }).catch(err => {
                            if(err.kind === 'ObjectId') {
                                return res.status(404).send({});                
                            }
                            return res.status(500).send({ });
                        });
       

      });

    app.post('/profileUpload', function(req, res) {
        if (Object.keys(req.files).length == 0) {
          return res.status(400).send('No files were uploaded.');
        }
      
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let photo = req.files.photo;
        console.log("Printing the image!!!!!!!!!!!!!");
        console.log(photo.data);
        var fileName=photo.name;
        
        console.log("__)@)@(@(@(@*(@*@*@*@*  = "+req.body.name);
        console.log("__)@)@(@(@(@*(@*@*@*@*  fileName = "+fileName);
      
        // Use the mv() method to place the file somewhere on your server
        photo.mv(__dirname+"/images/"+fileName, function(err) {
          if (err){
            console.log(err);  
            res.status(500).json({status:"fail",message:"Sorry!! your profile is not created"}); 
          }else{   
        
            var profile=req.body;
        console.log("mobile - "+profile.mobile);
         console.log(profile);  
         //This is instance mongoose schema
         var pentity =new ProfileEntity();
         pentity.name=profile.name;
         pentity.username=profile.name;
         pentity.password="test@123";
         pentity.email=profile.email;
         pentity.gender=profile.gender;
         pentity.mobile=profile.mobile;
         pentity.photo=profile.photo;
         var  pid=randomstring.generate(7);
         pentity.pid=pid;
         pentity.img.data = photo.data;
         pentity.img.contentType = 'image/png';
                pentity.save(function(err){
                    console.log("Saving data into database .....");
                    console.log(pentity);
                    if(err){
                        console.log("CAUSE OF THE PROBLEM!");
                        console.log(err);
                        res.status(200).json({status:"fail",message:"Sorry!! your profile is not created"}); 
                    }else{
                        
                        res.status(200).json({status:"success",message:"Hey! your profile is uploaded successfully!"}); 
                        }
                });   
              }
        });
      });
    app.get("/hello",(req,res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write('<html><body><h1>This is Hello World Page!!!!!.</h1></body></html>');
        res.end(); 
   });
   
   app.get("/login",function(req,res) {
        //Forwarding request from node to html page
        res.sendFile(__dirname +"/public/login.htm");     
   });

   app.post("/add-profile",function(req,res) {
        //reading whole incoming json data from body into JavaScript object!
        var profile=req.body;
        console.log("mobile - "+profile.mobile);
         console.log(profile);  
         //This is instance mongoose schema
         var pentity =new ProfileEntity();
         pentity.name=profile.name;
         pentity.username=profile.name;
         pentity.password="test@123";
         pentity.email=profile.email;
         pentity.gender=profile.gender;
         pentity.mobile=profile.mobile;
         pentity.photo=profile.photo;
         var  pid=randomstring.generate(7);
         pentity.pid=pid;
         pentity.save(function(err){
            console.log("Saving data into database .....");
            console.log(pentity);
            if(err){
                console.log("CAUSE OF THE PROBLEM!");
                console.log(err);
                res.status(200).json({status:"fail",message:"Sorry!! your profile is not created"}); 
              }else{
                   
                  res.status(200).json({status:"success",message:"Hey! your profile is uploaded successfully!"}); 
                }
        });   
    

       
   });
      
   //fetching student data
   //"sno":1,"name":"RAHUL","email":"mohit@synergisticit.com","mobile":"9838383737","gender":"Female","photo":[],"doe":"Oct 24, 2018 2:49:32 PM"},{"sno":2,"name":"Jasmin","email":"mahant@synergisticit.com","mobile":"23424234","gender":"Male","photo":[],"doe":"Oct 24, 2018 3:13:53 PM"},{"sno":3,"name":"Nagendra","email":"nagen@synergisticit.com","mobile":"029292929","gender":"MALE","photo":[],"doe":"Oct 29, 2018 4:05:48 PM"},{"sno":5,"name":"NONO","email":"nonon@gmail.com","mobile":"9393939","gender":"MALE","photo":[],"doe":"Oct 30, 2018 3:18:34 PM"}]
   app.get("/students",(req,res)=>{
          console.log(")@@@@@@@@@students@@@@@@@@@@@@@@@"); 
         //var student1={sno:1,name:"Rahul",email:"mohit@synergisticit.com",mobile:"2342424",gender:"Male"}; 
         //var student2={sno:2,name:"Mahim",email:"mahit@synergisticit.com",mobile:"35435354",gender:"Male"}; 
        // var student3={sno:3,name:"Robert",email:"robert@synergisticit.com",mobile:"87686868",gender:"Male"}; 
         //var student4={sno:4,name:"Juli",email:"juli@synergisticit.com",mobile:"131312332",gender:"Female"}; 
         //var student5={sno:5,name:"Michal",email:"michal@synergisticit.com",mobile:"6456464564",gender:"Female"}; 
        // var student6={sno:6,name:"Lubo",email:"lubo@synergisticit.com",mobile:"65756757",gender:"Male"}; 
         var students = [];    
        // students[0]=student1;
        // students[1]=student2;
        // students[2]=student3;
        // students[3]=student4;
       //  students[4]=student5;
       //  students[5]=student6;
         var count=0;
         ProfileEntity.find({},function(err,data){
                console.log(data);
                for(var x=0;x<data.length;x++){
                    students[count]=data[x];
                    count++;
                }
                res.status(200).json(students);
         });   
    
       
   
   
   
   });
   
   app.post("/login",function(req,res) {
       var username=req.body.username;
       var password=req.body.password;
       console.log("username = "+username);
       console.log("password = "+password);
       
       var status="";
       var message="";
       if("jack"==username && "jill"==password) {
           status="success";
           message="Username and password are correct!";
       }else{
           status="fail";
           message="Sorry !, Username and password are not correct!";
       }
       //similar 
       var appResponse=new AppResponse(status,message);
   
       //below json method is converting appResponse into json and writting into 
       //reponse body
       res.status(200).json(appResponse);
   
        //Forwarding request from node to html page
    });
   


}; //end of the anonymous function