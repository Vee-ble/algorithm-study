const net = require("net");

const PORT = 6969;

const CRLF = "\r\n";
const HEADER_BODY_SEPARATOR = CRLF + CRLF;

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("CONNECTED:", socket.remoteAddress + ":" + socket.remotePort);

  let received = "";

  socket.on("data", (data) => {
    received += data.toString();

    const parsedRequest = parseHttpRequest(received);

    if (!parsedRequest.complete) {
      return;
    }

    logRequest(parsedRequest);

    const { statusLine, body } = routeRequest(parsedRequest);

    const response = buildHttpResponse(statusLine, body);

    socket.end(response);
  });
});

server.listen(PORT, () => {
  console.log("TCP Server is running on port " + PORT + ".");
});

/** TCP로 받은 문자열을 HTTP 요청 구조로 해석 */
function parseHttpRequest(rawRequest) {
  const headerEndIndex = rawRequest.indexOf(HEADER_BODY_SEPARATOR);

  if (headerEndIndex === -1) {
    return {
      complete: false,
    };
  }

  const headerSection = rawRequest.slice(0, headerEndIndex);
  const bodySection = rawRequest.slice(
    headerEndIndex + HEADER_BODY_SEPARATOR.length,
  );

  const lines = headerSection.split(CRLF);

  const requestLine = lines[0];
  const headerLines = lines.slice(1);

  const [method, path, version] = requestLine.split(" ");
  const headers = parseHeaders(headerLines);

  const expectedBodyLength =
    headers["content-length"] === undefined
      ? 0
      : Number(headers["content-length"]);
  const actualBodyLength = Buffer.byteLength(bodySection);

  const bodyComplete = actualBodyLength >= expectedBodyLength;

  if (!bodyComplete) {
    return {
      complete: false,
    };
  }

  return {
    complete: true,
    method,
    path,
    version,
    headers,
    bodySection,
    expectedBodyLength,
    actualBodyLength,
  };
}

/** 헤더 줄들을 객체로 변환 */
function parseHeaders(headerLines) {
  const headers = {};

  headerLines.forEach((line) => {
    const colonIndex = line.indexOf(":");

    if (colonIndex === -1) {
      return;
    }

    const name = line.slice(0, colonIndex).toLowerCase();
    const value = line.slice(colonIndex + 1).trim();

    headers[name] = value;
  });

  return headers;
}

/** method/path를 보고 어떤 응답을 줄지 결정 */
function routeRequest(request) {
  const { method, path } = request;

  if (method !== "GET") {
    return {
      statusLine: "HTTP/1.1 405 Method Not Allowed",
      body: "Method Not Allowed",
    };
  }

  if (path === "/") {
    return {
      statusLine: "HTTP/1.1 200 OK",
      body: "Home",
    };
  }

  if (path === "/hello") {
    return {
      statusLine: "HTTP/1.1 200 OK",
      body: "Hello",
    };
  }

  return {
    statusLine: "HTTP/1.1 404 Not Found",
    body: "Not Found",
  };
}

/** HTTP 응답 문자열 생성 */
function buildHttpResponse(statusLine, body) {
  const contentLength = Buffer.byteLength(body);

  return (
    `${statusLine}${CRLF}` +
    `Content-Type: text/plain; charset=utf-8${CRLF}` +
    `Content-Length: ${contentLength}${CRLF}` +
    `Connection: close${CRLF}` +
    `${CRLF}` +
    body
  );
}

function logRequest(request) {
  console.log("METHOD:", request.method);
  console.log("PATH:", request.path);
  console.log("VERSION:", request.version);
  console.log("HEADERS:", request.headers);
  console.log("BODY SECTION:", request.bodySection);
  console.log("EXPECTED BODY LENGTH:", request.expectedBodyLength);
  console.log("ACTUAL BODY LENGTH:", request.actualBodyLength);
  console.log("REQUEST COMPLETE:", request.complete);
}
