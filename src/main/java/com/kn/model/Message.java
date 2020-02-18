package com.kn.model;

import java.time.Instant;

public class Message {
    private String sender;
    private Instant serverReceivedTime;
    private String token;
    private String message;

    public Message(String sender, Instant serverReceivedTime, String token, String message) {
        this.sender = sender;
        this.serverReceivedTime = serverReceivedTime;
        this.token = token;
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public Instant getServerReceivedTime() {
        return serverReceivedTime;
    }

    public void setServerReceivedTime(Instant serverReceivedTime) {
        this.serverReceivedTime = serverReceivedTime;
    }

    public String getMessage() {
        return message;
    }
}
