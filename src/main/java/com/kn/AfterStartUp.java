package com.kn;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.xml.crypto.Data;

@Component
public class AfterStartUp {

    @EventListener(ApplicationReadyEvent.class)
    public void startWebSocket(){
        WebSocketServer webSocketServer = new WebSocketServer();

        DatabaseService.registeredUsers.add(new User("a", "a"));

        new Thread(webSocketServer::start).start();
    }
}
