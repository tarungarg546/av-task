"use strict";
const express=require("express");
const log=console.log.bind();
const app=express();
const keys=require("./creden");
require("./config/express").initExpress(app);
const users=require("./db/userTable");
const rules=require("./db/rulesTable");
const port=process.env.PORT || 8080;
app.get("/",(req,res)=>{	
	res.render('index.ejs');
});
app.get("/recruiter/:name",(req,res)=>{
	res.render("recruiter.ejs");
});
app.get("/admin",(req,res)=>{
	users.exist().then((response)=>{
		if(response==true)
			return true;
		return users.create(keys.create_user_table);	
	}).then((response)=>{
		return rules.exist();
	})
	.then((response)=>{
		if(response==true)
			return true;
		return rules.create(keys.create_rules_table);
	})
	.then((response)=>{
		log("Database with table fully setup now.");
		res.render("admin.ejs");
	})
	.catch((err)=>log(err));
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
