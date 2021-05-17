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

app.get("/", (req, res) => {
  res.sendFile(login);
});

app.get("/home", (req, res) => {
  res.sendFile(home);
});

app.get("/register", (req, res) => {
  res.sendFile(register);
});

app.post("/login", (req, res) => {
  const dato = req.body;
  let loginValido = false;

  for (let index = 0; index < users.length; index++) {
    if (dato.user === users[index].user && dato.pass === users[index].pass) {
      loginValido = true;
    } else {
      loginValido = false;
    }
  }

  if (loginValido) {
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
});

app.post("/register", (req, res) => {
  const dato = req.body;
  let usuarioExistente = false;
  if (dato.pass === dato.passrepeat) {
    for (let index = 0; index < users.length; index++) {
      if (dato.user === users[index].user) {
        usuarioExistente = true;
      } else {
        usuarioExistente = false;
      }
    }

    if (usuarioExistente) {
      res.redirect("/register");
    } else {
      users.push({ user: dato.user, pass: dato.pass });
      res.redirect("/");
    }
  } else {
    res.redirect("/register");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}...`);
});
