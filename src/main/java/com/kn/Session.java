package com.kn;

import org.java_websocket.WebSocket;

public class Session {
    private WebSocket webSocket;
    private User user;
    private String token;

    public Session(WebSocket webSocket, User user, String token) {
        this.webSocket = webSocket;
        this.user = user;
        this.token = token;
    }

    public Session(WebSocket webSocket, String token) {
        this.webSocket = webSocket;
        this.token = token;
    }
}
