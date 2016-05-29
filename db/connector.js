"use strict";
const connect=(mysql,keys)=>{
	keys=keys||require("../creden");
	mysql.configure({
		"host": keys.mysql.host,
		"user": keys.mysql.user,
		"password": keys.mysql.password,
		"database": keys.mysql.database
	});	
	return mysql;
};
module.exports={
	connect:connect
}
