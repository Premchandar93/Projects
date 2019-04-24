const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = module.exports.io = require('socket.io')(http)

var socket_mappings = {};

var user_list = [];
var users_online = 0;

app.use( express.static(__dirname+ '/../../build'));

//io.configure(function () { 
 // io.set("transports", ["xhr-polling"]); 
 // io.set("polling duration", 10); 
//});

app.get('/', function(req,res){
  res.send('Its working');
})

//var nsp = io.of('/my-namespace');
io.on('connection', function (socket) {


  console.log('a user connected');
  users_online++;



  console.log('getting number of users online to all');
  io.emit('users_online', users_online);


  socket.on('get_users_online', function() {
    console.log('getting number of users online to all');
    io.emit('users_online', users_online);
  });

  socket.on('get_users', function(){
    console.log('getting names of users online');
    socket.emit('users_list', { list : user_list });
  })


  socket.on('setname', function(name){
    socket.username = name;
    user_list.push(socket.username);
    io.emit('users_list', { list: user_list});
    
    console.log('user has been set name as '+name);
    console.log('getting names of users online to all');
    
    socket_mappings[socket.username] = socket.id;
    console.log('socket name = '+socket.username + ' , socket id = '+socket.id);

  });

  //io.emit('client1', 'emitting from io')
  //socket.send('Trying send from server');

  socket.on('click', function (component) { 


    console.log(' user clicked button');

    console.log(JSON.stringify(socket_mappings));
    //io.sockets.emit('client2', 'sending msg to client2 on click')
    
    var opponent = component.receiver;
    
    var socket_id = socket_mappings[opponent];

    console.log('socket name = '+ opponent + ' , socket id = '+socket_id);

    var message = {
      username: socket.username,
      message: component.value,
    };

    console.log('socket.id ='+ socket.id +', socket_id = '+ socket_id);

    io.to(`${socket_id}`).emit('usermessage', message);

    //io.socket(socket_id).emit('usermessage', message);
    //io.to("/#" + socket_id).emit('usermessage', message);
  })


  socket.on('disconnect', function() {
    console.log('user disconnected');
    users_online--;

    var username = user_list.find(function(uname){
      return uname == socket.username;
    });
    var index = user_list.indexOf(username);

    user_list.splice(index,1);
    io.emit('users_list', { list: user_list});
    console.log('getting names of users online to all');

    io.emit('users_online', users_online);
    console.log('getting number of users online to all');
    console.log("a user disconnected");

    var socket_name = socket.username;
    delete socket_mappings.socket_name;

   // io.socket.delete(`${socket.id}`);

  })
})

const port = process.env.PORT || 8888;

http.listen( port , function() {
  console.log('Listening on port ' + port + '...')
});
