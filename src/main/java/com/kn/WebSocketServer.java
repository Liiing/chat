package com.kn;

import com.google.gson.Gson;
import com.kn.model.Message;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.net.InetSocketAddress;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;


public class WebSocketServer extends org.java_websocket.server.WebSocketServer {

    private static int TCP_PORT = 4444;

    private List<WebSocket> visiterConnections;
    private List<User> allOnlineUsers;
    private static Map<UUID, Session> sessionMap;
    private Gson gson;

    public static void addSession(UUID token, Session session) {
        sessionMap.put(token, session);
    }

    public WebSocketServer() {
        super(new InetSocketAddress(TCP_PORT));
        allOnlineUsers = new ArrayList<>();
        visiterConnections = new ArrayList<>();

        gson = new Gson();
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        visiterConnections.add(conn);
        log("New connection from " + conn.getRemoteSocketAddress().getAddress().getHostAddress());

        // conn.send("Hi");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        visiterConnections.remove(conn);
        log("Closed connection to " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String json) {
        Message message = gson.fromJson(json, Message.class);
        message.setServerReceivedTime(Instant.now());

        for (WebSocket userConnection : visiterConnections) {
            userConnection.send(gson.toJson(message));
        }
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    private void log(String text) {
        System.out.println(text);
    }
}