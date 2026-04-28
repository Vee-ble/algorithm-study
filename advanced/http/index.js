const net = require("net");

const PORT = 6969;

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);

  socket.on("data", function (data) {
    const s = data.toString();
    const r = s.slice(0, s.indexOf("\r\n"));
    const [METHOD, PATH, VERSION] = r.split(" ");
    console.log(METHOD, PATH, VERSION);
  });
});

server.listen(PORT, () => {
  console.log("TCP Server is running on port " + PORT + ".");
});
