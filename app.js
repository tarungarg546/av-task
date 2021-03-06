"use strict";
const express=require("express");
const log=console.log.bind();
const app=express();
const keys=require("./creden");
require("./config/express").initExpress(app);
const users=require("./db/userTable");
const rules=require("./db/rulesTable");
const port=process.env.PORT || 8080;
let constructSQL=(json)=>{
	let sql="Select * from users where ";
	if(json.resume) {
		sql+="`Resume (Yes/No)`=\"Yes\"";
	} else {
		sql+="`Resume (Yes/No)`=\"No\"";
	}
	if(json.analyticsExperience) {
		sql+=" AND "+"`Analytics in Exp.`!=''";
	}
	if(json.workExperience[0]) {
		sql+=" AND "+"`Work Experience`>="+json.workExperience[0];
	}
	if(json.workExperience[1]) {
		sql+=" AND "+"`Work Experience`<="+json.workExperience[1];
	}
	if(json.ctc[0]) {
		sql+=" AND "+"`CTC`>="+json.ctc[0];
	}
	if(json.ctc[1]) {
		sql+=" AND "+"`CTC`<="+json.ctc[1];
	}
	if(json.ugTier) {
		sql+=" AND "+"`UG_Tier1`='Y'";
	}
	if(json.pgTier) {
		sql+=" AND "+"`PG_Tier1`='Y'";
	}
	if(json["ugCourse"].length) {
		let str=" AND ";
		json["ugCourse"].forEach((val,index)=>{
			if(index==0)
				str+="`U.G_Course` LIKE \'%"+val+"%\'";
			else
				str+=" OR `U.G_Course` LIKE \'%"+val+"%\'";

		});
		sql+=str;
	}
	if(json["pgCourse"].length) {
		let str=" AND ";
		json["ugCourse"].forEach((val,index)=>{
			if(index==0)
				str+="`PG Course`  LIKE \'%"+val+"%\'";
			else
				str+=" OR `PG Course` LIKE \'%"+val+"%\'";

		});
		sql+=str;
	}
	if(json["skillSet"][0]) {
		let str=" AND ";
		json["skillSet"].forEach((val,index)=>{
			if(index==0)
				str+="`Skills` LIKE \'%"+val+"%\'";
			else
				str+=" OR `Skills` LIKE \'%"+val+"%\'";

		});
		sql+=str;
	}
	if(json["location"][0]) {
		let str=" AND ";
		json["location"].forEach((val,index)=>{
			if(index==0)
				str+="`Preferred Location`  LIKE \'%"+val+"%\'";
			else
				str+=" OR `Preferred Location` LIKE \'%"+val+"%\'";

		});
		sql+=str;
	}
	log(sql);
	return sql;
}
app.get("/",(req,res)=>{	
	res.render('index');
});
app.get("/recruiter/:name",(req,res)=>{
	log(`recruiter called with ${req.params.name}`);
	let level;
	const name=decodeURIComponent(req.params.name);
	users.getLevel(name)
		.then((result)=>{
			level=result[0]["access_level"];
			return rules.getRules(level);
		})
		.then((result)=>{
			const ctc_view=result.some((val)=>{
				return val.can_view=="CTC";
			});
			res.render("recruiter",{ctc:ctc_view,user:name,level:level});
		})
		.catch((err)=>{
			log(err);
			res.render("error");
		})
});
app.delete("/user",(req,res)=>{
	const body=req.body;
	users.delete(body.id).then((response)=>{
		res.send({deleted:true});
	}).catch((err)=>{
		log(err);
		res.send({deleted:false});
	})
})
app.put("/user",(req,res)=>{
	const body=req.body;
	users.modify(body.id,body.newVal).then((response)=>{
		res.send({modified:true});
	}).catch((err)=>{
		log(err);
		res.send({modified:false});
	})
});
app.post("/user",(req,res)=>{
	const body=req.body;
	users.add(body["Name of the Candidate"],body["access_level"]).then((result)=>{
		res.send({added:true});
	}).catch((err)=>{
		log(err);
		res.send({added:false});
	})
})
app.get("/admin",(req,res)=>{
	let json={};
	users.exist().then((response)=>{
		if(response==true)
			return true;
		return new Error("Table does not exist");	
	}).then((response)=>{
		return rules.exist();
	})
	.then((response)=>{
		log("HERE");
		if(response==true)
			return true;
		return new Error("Table does not exist");
	})
	.then((response)=>{
		log("Database with table fully setup now.");
		return users.getAllUsers();
	})
	.then((response)=>{
		json.users=response;
		return rules.getAccessLevels();
	})
	.then((response)=>{
		json.access_levels=response;
		return rules.getViews();
	})
	.then((result)=>{
		json.views=result;
		res.render("admin",json);
	})
	.catch((err)=>log(err));	
});
app.post("/generateReport",(req,res)=>{
	log(req.body);
	let response;
	users.run(constructSQL(req.body))
		.then((result)=>{
			response=result;
			const level=req.body.level;
			return rules.getRules(level);		
		})
		.then((result)=>{
			const ctc_view=result.some((val)=>{
				return val.can_view=="CTC";
			});
			const contact_view=result.some((val)=>{
				return val.can_view=="contact_info";
			})
			response.map((val)=>{
				delete val["Serial Number"];
				if(ctc_view);
				else {
					delete val["CTC"];
				}
				if(contact_view);
				else {
					delete val["Mobile No."];
					delete val["Email"];
				}
			});
			res.send(response);
		})
		.catch((err)=>log(err));
})
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
