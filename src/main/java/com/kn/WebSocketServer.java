package com.kn;
import com.kn.model.Message;
import com.kn.util.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.net.InetSocketAddress;
import java.time.Instant;
import java.util.*;


public class WebSocketServer extends org.java_websocket.server.WebSocketServer {

    private  static WebSocketServer instance;
    private static int TCP_PORT = 4444;
    private List<WebSocket> visitorConnections;
    private Map<String, Session> sessionMap;
    private List<String> onlineUsersByName;
    private List<Message> messageHistory;

    private WebSocketServer() {
        super(new InetSocketAddress(TCP_PORT));
        visitorConnections = new ArrayList<>();
        onlineUsersByName = new ArrayList<>();
        messageHistory = new ArrayList<>();
        sessionMap = new HashMap<>();
    }

    public static WebSocketServer getInstance() {
        if (WebSocketServer.instance == null) {
            WebSocketServer.instance = new WebSocketServer();
        }
        return WebSocketServer.instance;
    }


    public void addSession(String token, Session session) {
        sessionMap.put(token, session);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        visitorConnections.add(conn);
        log("New connection from " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        visitorConnections.remove(conn);
        log("Closed connection to " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String json) {
        Message message = Gson.fromJson(json, Message.class);
        message.setServerReceivedTime(Instant.now());
        String command = message.getCommand();

        switch(command)
        {
            case "login":
                addWebSocketToSession(message, conn);
                sendMessageHistory(conn);
                message.setContent("Login successful");
                message.setCommand("Login successful");
                conn.send(Gson.toJson(message));
                break;
            case "messageToRoom":
                addMessageToRoom(message);
                break;
            case "logout":
                logoutUser(message, conn);
                break;
            default:
                System.out.println("Missing command");
        }
    }

    private void addMessageToRoom(Message message) {
        message.setCommand("messageToChatRoom");
        for (WebSocket userConnection : visitorConnections) {
            userConnection.send(Gson.toJson(message));
        }
        messageHistory.add(message);
    }

    private void sendMessageHistory(WebSocket conn) {
        for (Message mess : messageHistory) {
            conn.send(Gson.toJson(mess));
        }
    }

    private void addWebSocketToSession(Message message, WebSocket conn) {
        String token = message.getToken();
        Session session = sessionMap.get(token);
        session.setWebSocket(conn);
        onlineUsersByName.add(message.getUsername());
    }

    private void logoutUser(Message message, WebSocket conn) {
        String token = message.getToken();
        sessionMap.remove(token);
        message.setCommand("Logged out");
        conn.send(Gson.toJson(message));
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    private void log(String text) {
        System.out.println(text);
    }
}