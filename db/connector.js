"use strict";
const connect=(mysql,keys)=>{
	keys=keys||require("../creden");
	let connection = mysql.createConnection({
	  host     : keys.mysql.host,
	  user     : keys.mysql.user,
	  password : keys.mysql.password,
	  database : keys.mysql.database
	});
	connection.connect((err)=>{
		if(err) {
			console.error(`Error ocuured in connecting to DB : ${err}`);
			return ;
		} else {
			console.log(`Connected to DB ${connection}`)
		}
	});	
	return connection;
};
module.exports={
	connect:connect
}
