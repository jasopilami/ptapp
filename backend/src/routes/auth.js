const Bcrypt = require("bcrypt");
const { User } = require("../db");

module.exports = [
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

      const account = await User.findOne({
        where: { email },
      });

      if (!account || !(await Bcrypt.compare(password, account.password))) {
        return h.response().code(401);
      }

      request.cookieAuth.set({ id: account.id });

      return h
        .response({
          id: account.id,
          email,
        })
        .code(200);
    },
    options: {
      auth: {
        mode: "try",
      },
    },
  },
];
