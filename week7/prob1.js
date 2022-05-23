const express = require("express");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const argon2 = require("argon2");

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
  const { id, password } = req.body;
  conn.query(`SELECT * FROM user WHERE login_id LIKE ${conn.escape(id)}`, async (err, results) => {
    if (err || !(await argon2.verify(results[0].login_pw, password))) {
      res.sendStatus(401);
      res.end();
      return;
    }
    let userId = results[0].id;
    res.cookie("userId", userId, cookieConfig);
    res.redirect(301, "/");
  });
});

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.get("/secret", (req, res) => {
  const userId = req.signedCookies.userId;
  if (!userId) {
    res.sendStatus(401);
    res.end();
    return;
  }
  res.sendFile(__dirname + "/view/secret_file.html");
})

app.post("/signup", (req, res) => {
  const { id, password } = req.body;
  argon2.hash(password).then((data) => {
    conn.query(
      `INSERT INTO user (login_id, login_pw) VALUES ` +
      `(${conn.escape(id)}, ${conn.escape(data)})`,
      (err, _) => {
        if (err) throw err;
        res.end();
      },
    );
  })
});

app.post("/removeuser", (req, res) => {
  const { userId } = req.signedCookies;
  if (!userId) {
    res.sendStatus(401);
    res.end();
    return;
  }
  conn.query(`DELETE FROM user WHERE id=${conn.escape(userId)}`, () => {
    res.clearCookie("userId");
    res.redirect(301, "/");
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started");
});
