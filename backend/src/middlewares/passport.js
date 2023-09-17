const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function register(app) {
  const user = {
    id: 1,
    username: "testo",
    password: "mesto",
  };

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "development-session",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy((username, password, done) => {
      return done(null, user);

      //   findUser(username, (err, user) => {
      //     if (err) {
      //       return done(err);
      //     }

      //     // User not found
      //     if (!user) {
      //       return done(null, false);
      //     }

      //     // Always use hashed passwords and fixed time comparison
      //     bcrypt.compare(password, user.passwordHash, (err, isValid) => {
      //       if (err) {
      //         return done(err);
      //       }
      //       if (!isValid) {
      //         return done(null, false);
      //       }
      //       return done(null, user);
      //     });
      //   });
    })
  );
}

module.exports = register;
