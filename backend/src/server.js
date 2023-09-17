const Hapi = require("@hapi/hapi");
const Bcrypt = require("bcrypt");

const { User } = require("./db");

async function initialSeed() {
  User.findOrCreate({
    where: { email: "jascha@pt.app" },
    defaults: {
      password: await Bcrypt.hash("ptappadmin", 10),
      role: "trainer",
    },
  });

  User.findOrCreate({
    where: { email: "oender@pt.app" },
    defaults: {
      password: await Bcrypt.hash("ptappadmin", 10),
      role: "trainer",
    },
  });
}

initialSeed();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "ptapp",
      password: process.env.COOKIE_SECRET || "R7tP9qK2XwNzV1mD5LgF3eA6UjC4oBvI",
      isSecure: false,
    },
    validate: async (request, session) => {
      const account = await users.find((user) => user.id === session.id);
      if (!account) {
        return { isValid: false };
      }
      return { isValid: true, credentials: account };
    },
  });

  server.auth.default("session");

  server.route([
    {
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        try {
          return await User.findAll();
        } catch (err) {
          console.log(err);
        }
      },
      options: { auth: false },
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
  ]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
