var user = '';
const audio = new Audio("/new.wav");
const caudio = new Audio("/connect.wav");
var room = '';
isConnected = false;
var user_Id = '';

function login() {

	user = document.getElementById('name').value;
	if (user == '') {
		return;
	}
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("roomScreen").style.display = "block";

}

function joinRoom() {
	room = document.getElementById('room').value;
	if (room == '') {
		return;
	}
	document.getElementById("roomScreen").style.display = "none";
	document.getElementById("mainScreen").style.display = "block";
	document.getElementById("roomNameHead").innerHTML = "Room: " + room;;
	user_id = ''+ new Date().getTime();
	connect();
	
}

function connect() {
	var socket = new SockJS('/chat'); //Send message to this endpoint
	stompClient = Stomp.over(socket);
	//user = 'User'+(String)(Math.floor((Math.random() * 10) + 1));

	stompClient.connect({}, //No header 
		function(frame) { // CallBack: - Called on successful connection	
			
			//for the disconnect button     
			console.log('StartLog Connected: ' + frame + 'end Log');
			console.log('Room : ' + '/topic/room/' + room);
			
			joinMessage();
			console.log('Joined the Room and broadcast sent')
			
			//subscribe to message topic
			stompClient.subscribe('/topic/room/' + room,
				function(messageOutput) {
					console.log(messageOutput);
					showMessageOutput(JSON.parse(messageOutput.body));
				});
			caudio.play();
		});
}

function joinMessage() {
	var user1 = user;
	stompClient.send("/app/room/" + room, {},
		JSON.stringify({ 'username': user, 'message': '', 'joinMessage': true,'userId':user_id }));
}

function sendMessage() {
	var message = document.getElementById('message').value;
	var user1 = user;
	stompClient.send("/app/room/" + room, {},
		JSON.stringify({ 'username': user, 'message': message, 'joinMessage': false,'userId':user_id }));
}

function showMessageOutput(data) {
	console.log("message log start");
	console.log(data.message);
	if (data.joinMessage) {
		setJoinMessage(data);
	}
	else {
		setText(data);
	}
	console.log("message log end");
}

function setJoinMessage(data1) {
	if(data1.userId==user_id)
		data1.username='You';
	var template = document.createElement('template');
	html = '<div class="chatMessage"><div class="container"><div class="row align-items-center"><div class="col-12 textContent text-center"><div class="messageContent p-0">'+data1.username+' has joined the room</div>				</div></div>			</div>	</div ></div > ';
	html = html.trim();
	template.innerHTML = html;
	var chatwindow = document.getElementById("chatWindow")
	chatwindow.appendChild(template.content);
	chatwindow.scrollTop = chatwindow.scrollHeight;

	console.log(audio);
	audio.play();
}


function setText(data1) {
	var template = document.createElement('template');
	html = '<div class="chatMessage"><div class="container"><div class="row align-items-center"><div class="col-1 p-0"><div class="userImage"></div></div><div class="col-11 textContent"><div class="row senderName">' + data1.username + '</div><div class="row"><div class="messageContent p-0">' + data1.message + '</div></div></div></div></div></div>';
	html = html.trim();
	template.innerHTML = html;
	var chatwindow = document.getElementById("chatWindow")
	chatwindow.appendChild(template.content);
	chatwindow.scrollTop = chatwindow.scrollHeight;

	console.log(audio);
	audio.play();

}