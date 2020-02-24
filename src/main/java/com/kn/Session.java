package com.kn;

import org.java_websocket.WebSocket;

import java.util.UUID;

public class Session {
    private WebSocket webSocket;
    private String username;
    private UUID token;

    public Session(WebSocket webSocket, String username, UUID token) {
        this.webSocket = webSocket;
        this.username = username;
        this.token = token;
    }

    public void setWebSocket(WebSocket webSocket) {
        this.webSocket = webSocket;
    }
}
