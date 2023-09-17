const Bcrypt = require("bcrypt");
const { User } = require("./db");

async function initialSeed() {
  User.findOrCreate({
    where: { email: "jascha@pt.app" },
    defaults: {
      name: "Jascha",
      password: await Bcrypt.hash("ptappadmin", 10),
    },
  });

  User.findOrCreate({
    where: { email: "oender@pt.app" },
    defaults: {
      name: "Önder",
      password: await Bcrypt.hash("ptappadmin", 10),
    },
  });
}

module.exports = initialSeed;
