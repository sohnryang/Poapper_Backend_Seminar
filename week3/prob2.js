const http = require("http");

const baseUrl = "http://localhost:8080";
const server = http.createServer((req, res) => {
  const url = new URL(req.url, baseUrl);
  const pathname = url.pathname.toString().replace(/^\/|\/$/g, "");
  const pathElems = pathname.split("/");
  if (pathElems.length != 3) { res.statusCode = 400; res.end(); return; }
  const cmd = pathElems[0];
  const num1 = parseInt(pathElems[1]);
  const num2 = parseInt(pathElems[2]);
  if (cmd == "add") res.write(String(num1 + num2));
  else if (cmd == "sub") res.write(String(num1 - num2));
  else if (cmd == "mul") res.write(String(num1 * num2));
  else if (cmd == "div") res.write(String(num1 / num2));
  else res.statusCode = 400;
  res.end();
});
server.listen(8080);
