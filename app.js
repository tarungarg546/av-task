"use strict";
const express=require("express");
const log=console.log.bind();
const app=express();
const keys=require("./creden");
require("./config/express").initExpress(app);
const mysql=require("mysql");
const connection=require("./db/connector").connect(mysql,keys);
const port=process.env.PORT || 8080;
app.get("/",(req,res)=>{	
	res.render('index.ejs');
});
app.get("/recruiter/:name",(req,res)=>{
	res.render("recruiter.ejs");
});
app.get("/admin",(req,res)=>{
	connection.query(keys.create_user_table,(err,response)=>{
		if(err)
			log(err);
		else {
			log(`User Table created : ${response}`);
			res.render("admin.ejs");
		}
	});
});
app.post("/signIn",(req,res)=>{
	log(`Checking .....`);
	const req_data=req.body;
	log(req.body);
	if(req.body.user===req.body.password) {
		res.send({redirect:true,redirect_url:"\\recruiter\\"+req.body.user})
	} else {
		log(`Fishy..!`);
		res.send({"authenticated":false});
	}
});
app.listen(port,()=>log(`Server listening at ${port}`));
