const express = require('express');
const app = express();
const apiai = require('apiai')('6a01a716ccc94de1a2c3024e84d0478d');



app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(5000);
const io = require('socket.io')(server)

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('chat message', (text) => {
  
        console.log(text)
      // Get a reply from API.AI
  
      let apiaiReq = apiai.textRequest(text, {
        sessionId: 'keysession1'
      });
  
      apiaiReq.on('response', (response) => {
          console.log(response)
        let aiText = response.result.fulfillment.speech;        
        console.log(aiText)
        socket.emit('bot reply', aiText); // Send the result back to the browser!
      });
  
      apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
      apiaiReq.end();
  
    });
  });

app.get('/', (req, res) => {
  res.sendFile('index.html');
});