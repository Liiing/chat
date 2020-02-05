public class Main {

    public static void main(String[] args ) {
        runAndRestartAfterException();
    }

    protected static boolean runAndRestartAfterException() {
        WebSocketServer webSocketServer = new WebSocketServer();

        System.out.println("Starting Websocket Server");
        webSocketServer.start();

        return true;
    }
}