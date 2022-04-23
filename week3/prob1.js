const http = require("http");
const moment = require("moment");

const server = http.createServer((_, res) => {
  res.write(moment().format("YYYY-MM-DD HH:mm:ss"));
  res.end();
});
server.listen(8080);
