const Bcrypt = require("bcrypt");
const { User, Trainer } = require("../db");

module.exports = [
  {
    method: "GET",
    path: "/hello",
    handler: async (request, h) => {
      const user = request.auth.credentials.toJSON();
      return h
        .response({
          id: user.id,
          name: user.name,
          email: user.email,
          isTrainer: user.isTrainer || false,
        })
        .code(200);
    },
  },
  {
    method: "POST",
    path: "/register",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const { email, password } = request.payload;
      const user = await User.create({
        email,
        password: await Bcrypt.hash(password, 10),
      });
      return h.response(user.id).code(201);
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: async (request, h) => {
      const { email, password } = request.payload;

      let account = await User.findOne({
        where: { email },
      });

      if (!account) {
        account = await Trainer.findOne({
          where: { email },
        });
      }

      if (!account || !(await Bcrypt.compare(password, account.password))) {
        return h.response().code(401);
      }

      const payload = {
        id: account.id,
        email: account.email,
      };

      request.cookieAuth.set(payload);

      return h.response(payload).code(200);
    },
    options: {
      auth: {
        mode: "try",
      },
    },
  },
];
