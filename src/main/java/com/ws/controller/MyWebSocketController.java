package com.ws.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.ws.model.MyMessage;

@Controller
public class MyWebSocketController {
	
	/*
	 * @MessageMapping("/hello")
	 * 
	 * @SendTo("/topic/message") public MyMessage greet(@Payload MyMessage message)
	 * { return message; }
	 */
	
	//EndPoint where message is sent to 
	@MessageMapping("/room/{room}")	
	
	//this sends the value returned from funtion to the subscriber of this topic
	@SendTo("/topic/room/{room}")
	
	public MyMessage room(@Payload MyMessage message) {
		return message;
	}

}
