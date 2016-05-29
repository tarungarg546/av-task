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
let createTable=(sql)=>{
	return new Promise((resolve,reject)=>{
		conn.query(sql).then((response)=>{
			console.log("Table Created!");
			resolve(response);	
		}).catch((err)=>reject(err));
	});
}

module.exports={
	exist:checkIfExist,
	create:createTable,
	
}