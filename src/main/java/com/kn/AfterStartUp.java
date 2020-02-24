package com.kn;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class AfterStartUp {

    @EventListener(ApplicationReadyEvent.class)
    public void startWebSocket(){

        DatabaseService.registeredUsers.add(new User("a", "a"));

        WebSocketServer webSocketServer = WebSocketServer.getInstance();

        new Thread(webSocketServer::start).start();
    }
}
