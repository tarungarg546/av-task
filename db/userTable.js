"use strict";
const mysql=require('mysql-promise')();
const conn=require("./connector.js").connect(mysql);
let checkIfExist=()=>{
	return new Promise((resolve, reject)=>{      
		conn.query("SHOW TABLES LIKE 'USERS'")
			.then((response)=>{
				if(response[0].length!=0) {
					console.log("User Table Exist :- ",response[0]);
					resolve(true);
				} else {
					resolve(false);
				}
			})
			.catch((err)=>reject(err));
    });
}
let createTable=(sql)=>{
	return new Promise((resolve,reject)=>{
		conn.query(sql).then((response)=>{
			console.log("Table Created!");
			resolve(response);	
		}).catch((err)=>reject(err));
	});
}
let getUsers=()=>{
	return new Promise((resolve,reject)=>{
		conn.query("Select `Serial Number`,`Name of the Candidate`,`access_level` from users")
			.spread((response)=>{
				resolve(response);
			})
			.catch((err)=>reject(err));
	})
}

let modify=(id,newVal)=>{
	return new Promise((resolve,reject)=>{
		console.log("Update users SET access_level=\""+newVal+"\" where `Serial Number`="+id);
		conn.query("Update users SET access_level=\""+newVal+"\" where `Serial Number`="+id)
			.spread((response)=>{
				resolve(response);
			})
			.catch((err)=>reject(err));
	})
}
let delet=(id)=>{
	return new Promise((resolve,reject)=>{
		conn.query("Delete from users where `Serial Number`="+id)
			.spread((response)=>{
				resolve(response);
			})
			.catch((err)=>reject(err));
	})
}
let runSQL=(sql)=>{
	return new Promise((resolve,reject)=>{
		conn.query(sql)
			.spread((response)=>{
				resolve(response);
			})
			.catch((err)=>{
				console.error(err);
				reject(err);
			})
	})
}
module.exports={
	exist:checkIfExist,
	create:createTable,
	getAllUsers:getUsers,
	delete:delet,
	modify:modify,
	run:runSQL
}