var express=require("express");
var app=express();
app.use(express.static("public"));
var socket=require("socket.io");

app.get("/",function(req,res){
	res.render("index.ejs");
})

var server = app.listen(3000,function(){
	console.log("working");
})

var io=socket(server);
io.on("connection",function(socket){
	console.log("socket connection is made "+socket.id);
	socket.on('chat',function(data){
		io.sockets.emit('chat',data);
	})
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	})
})