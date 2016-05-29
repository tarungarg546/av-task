"use strict";
const mysql=require('mysql-promise')();
const conn=require("./connector.js").connect(mysql);
let checkIfExist=()=>{
	return new Promise((resolve, reject)=>{      
		conn.query("SHOW TABLES LIKE 'RULES'")
			.then((response)=>{
				if(response[0].length!=0) {
					console.log("Rules Table Exist :- ",response[0]);
					resolve(true);
				} else {
					resolve(false);
				}
			})
			.catch((err)=>reject(err));
    });
}
let getAccessLevels=()=>{
	return new Promise((resolve,reject)=>{
		conn.query("Select distinct(access_level) from rules")
			.spread((result)=>{
				resolve(result);
			})
			.catch((err)=>reject(err));
	})
}
let createTable=(sql)=>{
	return new Promise((resolve,reject)=>{
		conn.query(sql).then((response)=>{
			console.log("Table Created!");
			resolve(response);	
		}).catch((err)=>reject(err));
	});
}
let getDefinitions=(array)=>{
	return new Promise((resolve,reject)=>{
		array.forEach((val)=>{
			const level=val["access_level"];
			conn.query("select can_view from rules where access_level="+level)
				.spread((response)=>{
					resolve(response);
				})
				.catch((err)=>{
					reject(err);
				})
		})
	})
}
module.exports={
	exist:checkIfExist,
	create:createTable,
	getAccessLevels:getAccessLevels,
	getDefinitions:getDefinitions
}