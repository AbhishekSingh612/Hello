function connect(){
	var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);  
    
    stompClient.connect({}, //No header 
    	function(frame) { // CallBack: - Called on successful connection	
    		
    		//for the disconnect button
        	setConnected(true);
        	
            console.log('StartLog Connected: ' + frame + 'end Log');
            
            //subscribe to message topic
            stompClient.subscribe('/topic/message', 
            function(messageOutput) {
				console.log(messageOutput);
            	showMessageOutput(JSON.parse(messageOutput.body));
            });
       });
}

function showMessageOutput(data){
	console.log("message log start");
	console.log(data.message);
	setText(data);
	console.log("message log end");
}

function sendMessage(){
	var message = document.getElementById('message').value;
	var user = 'User'+(String)(Math.floor((Math.random() * 10) + 1));
	stompClient.send("/app/hello", {}, 
                  JSON.stringify({'username':user, 'message':message}));
}
function setText(data1){
	var template = document.createElement('template');
	html = '<div class="chatMessage"><div class="container"><div class="row align-items-center"><div class="col-1 p-0"><div class="userImage"></div></div><div class="col-11 textContent"><div class="row senderName">'+ data1.username +'</div><div class="row"><div class="messageContent p-0">'+data1.message+'</div></div></div></div></div></div>';
	html = html.trim();
	template.innerHTML = html;
	var chatwindow = document.getElementById("chatWindow")
	chatwindow.appendChild(template.content);

}

function setConnected(connected){
	 document.getElementById('connect').disabled = connected;
     document.getElementById('disconnect').disabled = !connected;
}