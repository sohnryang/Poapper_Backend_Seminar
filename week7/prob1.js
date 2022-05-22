const express = require("express");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");

const conn = mysql.createConnection({
  host: "localhost",
  user: "curling_grad",
  password: "",
  database: "poapper_backend",
});


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser("Hell world!"));

const cookieConfig = { httpOnly: true, maxAge: 10002, signed: true };
const _username = "poapper", _password = "1986";

app.get("/food", (_, res) => {
  conn.query("SELECT * FROM foods", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/food/isVegan", (_, res) => {
  conn.query("SELECT * FROM foods WHERE isVegan=1", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/food/:foodId", (req, res) => {
  conn.query(`SELECT * FROM foods WHERE id=${conn.escape(req.params.foodId)}`, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.post("/food", (req, res) => {
  const { username, password } = req.signedCookies;
  if (username != _username || password != _password) {
    res.sendStatus(401);
    res.end();
    return;
  }
  const { name, kcal, isVegan } = req.body;
  conn.query(
    `INSERT INTO foods (name, kcal, isVegan) VALUES ` +
    `(${conn.escape(name)}, ${conn.escape(kcal)}, ${conn.escape(isVegan)})`,
    (err, _) => {
      if (err) throw err;
      res.end();
    },
  );
});

app.put("/food/:foodId", (req, res) => {
  const { username, password } = req.signedCookies;
  if (username != _username || password != _password) {
    res.sendStatus(401);
    res.end();
    return;
  }
  const { name, kcal, isVegan } = req.body
  conn.query(
    `UPDATE foods SET ` +
    `name=${conn.escape(name)}, kcal=${conn.escape(kcal)}, isVegan=${conn.escape(isVegan)} ` +
    `WHERE id=${req.params.foodId}`,
    (err, _) => {
      if (err) throw err;
      res.end();
    },
  );
});

app.delete("/food/:foodId", (req, res) => {
  const { username, password } = req.signedCookies;
  if (username != _username || password != _password) {
    res.sendStatus(401);
    res.end();
    return;
  }
  conn.query(`DELETE FROM foods WHERE id=${conn.escape(req.params.foodId)}`, () => {
    res.end();
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == _username && password == _password) {
    res.cookie("username", username, cookieConfig);
    res.cookie("password", password, cookieConfig);
  } else {
    res.sendStatus(401);
  }
  res.end();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started");
});
