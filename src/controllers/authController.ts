import { Request, Response } from "express";

const users = [
  { id: 1, username: "user1", password: "password1" }
];

export function showLogin(req: Request, res: Response) {
  res.render("index", { query: req.query });
}

export function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.redirect("/?q=invalid");
  }

  req.session.userId = user.id;
  req.session.username = user.username;

  res.redirect("/todos");
}

export function logout(req: Request, res: Response) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}