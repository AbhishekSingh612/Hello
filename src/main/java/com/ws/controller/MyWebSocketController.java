package com.ws.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.ws.model.MyMessage;

@Controller
public class MyWebSocketController {
	
	@MessageMapping("/hello")
	@SendTo("/topic/message")
	public MyMessage greet(@Payload MyMessage message) {
		return message;
	}

}
