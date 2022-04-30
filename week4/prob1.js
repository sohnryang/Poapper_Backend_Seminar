const http = require("http");

let db = {};

const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  const url = new URL(req.url || "", `https://${req.headers.host}`);
  const method = req.method;
  const pathname = url.pathname.toString();
  const pathElems = pathname.split("/").filter(x => x != "");

  if (method == "POST" || method == "PUT") {
    if (pathElems.length != 2) {
      res.statusCode = 400;
      res.end();
      return;
    }
    const key = pathElems[0];
    const value = pathElems[1];
    db[key] = value;
  } else if (method == "GET") {
    if (pathElems.length == 0) {
      res.write(JSON.stringify(db));
    } else {
      const key = pathElems[0];
      const value = db[key];
      if (value === undefined) {
        res.statusCode = 404;
        res.end();
        return;
      }
      res.write(value);
    }
  } else if (method == "DELETE") {
    if (pathElems.length != 1) {
      res.statusCode = 400;
      res.end();
      return;
    }
    delete db[pathElems[0]];
  }
  res.end();
});

server.listen(port);

server.on("listening", () => {
  console.log(`Server started on port ${port}`);
});
server.on("error", (error) => {
  console.log(`Error: ${error}`);
});
