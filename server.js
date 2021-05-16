const users = [
  {
    user: "admin",
    pass: "admin",
  },
];

const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const login = path.join(__dirname, "public", "login.html");
const register = path.join(__dirname, "public", "register.html");
const home = path.join(__dirname, "public", "home.html");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(login);
});

app.get("/home", function (req, res) {
  res.sendFile(home);
});

app.post("/login", function (req, res) {
  const dato = req.body;

  for (let index = 0; index < users.length; ) {
    if (dato.user === users[index].user && dato.pass === users[index].pass) {
      res.redirect("/home");
      break;
    } else {
      index++;
      if (index === users.length) {
        res.redirect("/");
      }
    }
  }
});

app.get("/register", function (req, res) {
  res.sendFile(register);
});

app.post("/register", function (req, res) {
  const dato = req.body;
  if (dato.pass === dato.passrepeat) {
    for (let index = 0; index < users.length; ) {
      if (dato.user === users[index].user) {
        res.sendFile(register);
        break;
      } else {
        index++;
        if (index === users.length) {
          users.push({ user: dato.user, pass: dato.pass });
          res.redirect("/");
          break;
        }
      }
    }
  } else {
    res.sendFile(register);
  }
});

app.listen(PORT, function () {
  console.log(`Servidor iniciado en puerto ${PORT}...`);
});
