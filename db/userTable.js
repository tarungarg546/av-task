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
		conn.query("Select `Name of the Candidate`,`access_level` from users")
			.spread((response)=>{
				resolve(response);
			})
			.catch((err)=>reject(err));
	})
}
let getAccessLevels=()=>{
	return new Promise((resolve,reject)=>{
		conn.query("Select distinct(access_level) from users")
			.spread((result)=>{
				resolve(result);
			})
			.catch((err)=>reject(err));
	})
}
module.exports={
	exist:checkIfExist,
	create:createTable,
	getAllUsers:getUsers,
	getAccessLevels:getAccessLevels
}