angular.module(
  "MessagesApp",
  []
).controller(
  "MainController",
  [
    '$http',
    '$scope',
    '$timeout',
  function($http, self, $timeout) {

  self.socket = io();
  self.messages = [];

  self.loadMessages = function(){
    return $http.get('/api/Messages').then(response=>{
      self.messages = response.data;
    }).catch(e=>{
      console.error('Error loading messages: ',e.stack);
    });
  }

  self.sendMessage = function(message){
    self.socket.emit('NEW_MESSAGE',{
      user: message.user,
      message: message.text
    });
    self.loadMessages();
  }

  //Attach Socket Handlers
  self.socket.on('NEW_MESSAGE',function(oMessage){
    $timeout(function(){
      self.messages.push(oMessage);
    },0);
  });

  self.loadMessages();//Load Initial Messages via Rest API


}]);
