const http = require("http");
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "curling_grad",
  password: "",
  database: "poapper_backend",
});

const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  const url = new URL(req.url || "", `https://${req.headers.host}`);
  const method = req.method;
  const pathname = url.pathname.toString();
  const pathElemsFull = pathname.split("/").filter(x => x != "");
  if (pathElemsFull[0] != "food") {
    res.statusCode = 404;
    res.end();
    return;
  }
  const pathElems = pathElemsFull.slice(1);

  if (method == "GET") {
    if (pathElems.length > 1) {
      res.statusCode = 404;
      res.end();
    } else if (pathElems.length == 0) {
      conn.query("SELECT * FROM foods", (err, results) => {
        if (err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    } else {
      if (pathElems == "isVegan") {
        conn.query("SELECT * FROM foods WHERE isVegan=1", (err, results) => {
          if (err) throw err;
          res.write(JSON.stringify(results));
          res.end();
        });
        return;
      }
      const foodId = parseInt(pathElems[0]);
      if (isNaN(foodId)) {
        res.statusCode = 404;
        res.end();
        return;
      }
      conn.query(`SELECT * FROM foods WHERE id=${conn.escape(foodId)}`, (err, results) => {
        if (err) throw err;
        res.write(JSON.stringify(results[0]));
        res.end();
      });
    }
  } else if (method == "POST") {
    req.on("data", data => {
      const { name, kcal, isVegan } = JSON.parse(data);
      conn.query(
        `INSERT INTO foods (name, kcal, isVegan) VALUES ` +
        `(${conn.escape(name)}, ${conn.escape(kcal)}, ${conn.escape(isVegan)})`,
        (err, _) => {
          if (err) throw err;
          res.end();
        },
      );
    });
  } else if (method == "PUT") {
    if (pathElems.length != 1) {
      res.statusCode = 400;
      res.end();
      return;
    }
    const foodId = pathElems[0];
    req.on("data", data => {
      const { name, kcal, isVegan } = JSON.parse(data);
      conn.query(
        `UPDATE foods SET ` +
        `name=${conn.escape(name)}, kcal=${conn.escape(kcal)}, isVegan=${conn.escape(isVegan)} ` +
        `WHERE id=${foodId}`,
        (err, _) => {
          if (err) throw err;
          res.end();
        },
      );
    });
  } else if (method == "DELETE") {
    if (pathElems.length != 1) {
      res.statusCode = 400;
      res.end();
      return;
    }
    const foodId = pathElems[0];
    conn.query(`DELETE FROM foods WHERE id=${conn.escape(foodId)}`, () => {
      res.end();
    });
  }
});
server.listen(port);

server.on("listening", () => {
  console.log(`Server started on port ${port}`);
});
server.on("error", (error) => {
  console.log(`Error: ${error}`);
});