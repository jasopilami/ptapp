const Hapi = require("@hapi/hapi");

const userRoutes = require("./routes/user");
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

  server.route([
    ...userRoutes,
    ...authRoutes,
    ...trainerRoutes,
    ...newsRoutes,
    ...bookingRoutes,
  ]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
