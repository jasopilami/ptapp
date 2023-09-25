const Hapi = require("@hapi/hapi");

const trainerRoutes = require("./routes/trainer");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const bookingRoutes = require("./routes/bookings");

const { User, Trainer } = require("./db");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  await registerHapiSessionCookies(server);

  registerServerRoutes(server);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

function registerServerRoutes(server) {
  server.route([
    ...authRoutes,
    ...trainerRoutes,
    ...newsRoutes,
    ...bookingRoutes,
  ]);
}

async function registerHapiSessionCookies(server) {
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "ptapp",
      password: process.env.COOKIE_SECRET || "R7tP9qK2XwNzV1mD5LgF3eA6UjC4oBvI",
      isSecure: false,
    },
    validate: async (request, session) => {
      let account = await User.findOne({
        where: {
          email: session.email,
        },
      });

      if (!account) {
        account = await Trainer.findOne({
          where: { email: session.email },
        });
      }

      if (!account) {
        return { isValid: false };
      }
      return { isValid: true, credentials: account };
    },
  });

  server.auth.default("session");
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
