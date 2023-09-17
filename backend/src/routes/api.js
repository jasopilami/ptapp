const express = require("express");
const passport = require("passport");
const router = express.Router();

const userRouter = express.Router();
router.use("/users", userRouter);

userRouter.get("/", (req, res) => {
  res.send(req.session);
});

const trainerRouter = express.Router();
router.use("/trainers", trainerRouter);

module.exports = router;
