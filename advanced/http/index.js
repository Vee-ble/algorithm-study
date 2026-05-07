const net = require("net");

const PORT = 6969;

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);

  socket.on("data", function (data) {
    const s = data.toString();
    const headerEndIndex = s.indexOf("\r\n\r\n");
    const headerSection = s.slice(0, headerEndIndex);
    const bodySection = s.slice(headerEndIndex + 4);
    const headers = {};

    const split = headerSection.split("\r\n");
    const requestLine = split[0];
    const headerLines = split.slice(1);

    headerLines.forEach((line) => {
      const colonIndex = line.indexOf(":");
      const name = line.slice(0, colonIndex).toLowerCase();
      const value = line.slice(colonIndex + 1).trim();
      headers[name] = value;
    });

    console.log(headers);
    console.log(bodySection);
    const [method, path, version] = requestLine.split(" ");

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

    socket.end();
  });
});

server.listen(PORT, () => {
  console.log("TCP Server is running on port " + PORT + ".");
});
