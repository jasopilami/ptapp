const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

const registerPassport = require("./middlewares/passport");
const passport = require("passport");

app.use(require("cookie-parser")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerPassport(app);

app.use("/api", apiRoutes);

app.post("/login", passport.authenticate("local"));

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
