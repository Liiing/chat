package com.kn;

import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;


public class WebSocketServer extends org.java_websocket.server.WebSocketServer {

    private static int TCP_PORT = 4444;

    private List<WebSocket> visiterConnections;
    private List<User> registeredUsers;
    private List<User> allOnlineUsers;
    private Map<String,Session> sessionMap;
    private Gson gson;

    public WebSocketServer() {
        super(new InetSocketAddress(TCP_PORT));
        allOnlineUsers = new ArrayList<>();
        visiterConnections = new ArrayList<>();
        registeredUsers = new ArrayList<>();

        registeredUsers.add(new User("t","t"));
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
    public void onMessage(WebSocket conn, String text) {
        log(text);
        String[] prefixSplitted = text.split("=");
        String command = prefixSplitted[0];
        if(command.equals("login")) {
            String[] userNameAndPasswordSplitted = prefixSplitted[1].split(";");
            String username = userNameAndPasswordSplitted[0];
            String password = userNameAndPasswordSplitted[1];

            for (User registeredUser : registeredUsers) {
                if(registeredUser.getUsername().equals(username) && registeredUser.getPassword().equals(password)){
                    log(username + password + conn.getRemoteSocketAddress().getAddress().getHostName());
                }
            }
        } else {
            for (WebSocket userConnection : visiterConnections) {
                userConnection.send(text);
            }
        }
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    private void log(String text) {
        System.out.println(text);
    }
}