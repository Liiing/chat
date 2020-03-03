package com.kn.model;

import org.java_websocket.WebSocket;

import java.util.UUID;

public class Session {
    private WebSocket webSocket;
    private String username;
    private String token;

    public Session(WebSocket webSocket, String username, String token) {
        this.webSocket = webSocket;
        this.username = username;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setWebSocket(WebSocket webSocket) {
        this.webSocket = webSocket;
    }
}
