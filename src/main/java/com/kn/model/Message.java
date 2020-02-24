package com.kn.model;

import java.time.Instant;
import java.util.UUID;

public class Message {
    private String sender;
    private Instant serverReceivedTime;

    public UUID getToken() {
        return token;
    }

    private UUID token;
    private String content;
    private String command;

    public Message(String sender, Instant serverReceivedTime, String token, String content) {
        this.sender = sender;
        this.serverReceivedTime = serverReceivedTime;
        this.token = UUID.fromString(token);
        this.content = content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String getCommand() {
        return command;
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

    public String getContent() {
        return content;
    }
}
