package com.kn.model;

import java.time.Instant;

public class Message {
    private String username;
    private Instant serverReceivedTime;

    public String getToken() {
        return token;
    }

    private String token;
    private String content;
    private String command;

    public Message(String username, Instant serverReceivedTime, String token, String content) {
        this.username = username;
        this.serverReceivedTime = serverReceivedTime;
        this.token = token;
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

    public String getUsername() {
        return username;
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
