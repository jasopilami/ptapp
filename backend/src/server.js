const Hapi = require("@hapi/hapi");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const initialSeed = require("./seed");
const auth = require("./routes/auth");

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

  server.route([...userRoutes, ...authRoutes]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
