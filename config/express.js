"use strict";
const init=(app,express)=>{
	const bodyParser=require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	const cookieParser=require("cookie-parser");
	app.use(cookieParser());
  	app.use(bodyParser.json());
	app.set('view engine', 'ejs');
	express=express||require('express');
	app.use(express.static(__dirname + '/../public'));
  	app.set('views', __dirname + '/../public/views');
}
module.exports={
	initExpress:init
}