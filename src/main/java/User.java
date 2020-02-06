import org.java_websocket.WebSocket;

public class User {
    private String userName;
    private String password;
    private WebSocket conn;

    public User(String userName, String password){
        this.userName = userName;
        this.password = password;
    }

    public User(String userName, String password, WebSocket conn){
        this.userName = userName;
        this.password = password;
        this.conn = conn;
    }


    public WebSocket getConn(){ return  conn; }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
