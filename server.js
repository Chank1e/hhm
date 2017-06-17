var express = require("express");
var app = express();
var mysql      = require('mysql');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hhm',
  password : '12345',
  database : 'hhm'
});

connection.connect();


io.on('connection', function(socket) {
    var data;
        connection.query('SELECT * from `comments` ', function (error, results, fields) {
          if (error) throw error;
          data=results;
          socket.emit('comments',data);
        });
    socket.on('newComment',function(data){
        connection.query('INSERT INTO `comments` (`name`, `mail`, `text`, `id`) VALUES ("'+data["name"]+'", "'+data["mail"]+'", "'+data["text"]+'", NULL);');
        socket.emit('newCommentFromDb',data)
    })
});


/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    res.sendFile( __dirname + req.params[0]);
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});