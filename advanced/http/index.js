const net = require("net");

const PORT = 6969;

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);

  socket.on("data", function (data) {
    const s = data.toString();
    const r = s.slice(0, s.indexOf("\r\n"));
    const [method, path, version] = r.split(" ");

    console.log("METHOD:", method);
    console.log("PATH:", path);
    console.log("VERSION:", version);

    let body = "";
    let statusLine = "HTTP/1.1 200 OK";

    if (method !== "GET") {
      statusLine = "HTTP/1.1 405 Method Not Allowed";
      body = "Method Not Allowed";
    } else {
      if (path === "/") {
        body = "Home";
      } else if (path === "/hello") {
        body = "Hello";
      } else {
        statusLine = "HTTP/1.1 404 Not Found";
        body = "Not Found";
      }
    }

    const contentLength = Buffer.byteLength(body);

    socket.write(
      `${statusLine}\r\n` +
        "Content-Type: text/plain; charset=utf-8\r\n" +
        `Content-Length: ${contentLength}\r\n` +
        "\r\n" +
        body,
    );

    console.log(contentLength);
    socket.end();
  });
});

server.listen(PORT, () => {
  console.log("TCP Server is running on port " + PORT + ".");
});
