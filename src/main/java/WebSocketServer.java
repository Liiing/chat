
import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;


public class WebSocketServer extends org.java_websocket.server.WebSocketServer {

    private static int TCP_PORT = 4444;

    private List<WebSocket> userConnections;
    private List<User> allUsers;
    private Gson gson;

    public WebSocketServer() {
        super(new InetSocketAddress(TCP_PORT));
        userConnections = new ArrayList<>();
        gson = new Gson();
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        userConnections.add(conn);
        log("New connection from " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
       // conn.send("Hi");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        userConnections.remove(conn);
        log("Closed connection to " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String text) {
        for (WebSocket userConnection : userConnections) {
            userConnection.send(text);
        }

        gson.toJson(new Object());

        log(text);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    private void log(String text) {
        System.out.println(text);
    }
}