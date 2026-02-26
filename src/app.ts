import express from "express";
import session from "express-session";

import * as authController from "./controllers/authController";
import * as todoController from "./controllers/todoController";
import { requireLogin } from "./middleware/requireLogin";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    }
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", authController.showLogin);

app.post("/login", authController.login);

app.get("/todos", requireLogin, todoController.showTodos);

app.post("/add", requireLogin, todoController.createTodo);

app.post("/delete", requireLogin, todoController.removeTodo);

app.post("/logout", requireLogin, authController.logout);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});