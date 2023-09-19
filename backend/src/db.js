const { Sequelize, DataTypes } = require("sequelize");
const Bcrypt = require("bcrypt");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  transactionType: "IMMEDIATE",
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const News = sequelize.define("New", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Trainer = sequelize.define("Trainer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timeInMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

Trainer.hasMany(Session, { as: "sessions" });
Session.belongsTo(Trainer);

User.hasMany(Booking, { as: "bookings" });
Booking.belongsTo(User);

Session.hasMany(Booking, { as: "bookings" });
Booking.belongsTo(Session);

function checkUniqueEmail(person) {
  if (person) throw new Error("Email already taken");
}

User.addHook("beforeValidate", "checkUniqueEmail", (user) => {
  return Trainer.findOne({ where: { email: user.email } }).then(
    checkUniqueEmail,
  );
});

Trainer.addHook("beforeValidate", "checkUniqueEmail", (trainer) => {
  return User.findOne({ where: { email: trainer.email } }).then(
    checkUniqueEmail,
  );
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables synced");
  console.log("Seeding...");

  User.findOrCreate({
    where: { email: "arnold@user.de" },
    defaults: {
      name: "Arnold",
      password: Bcrypt.hashSync("hey,arnold", 10),
    },
  });

  User.findOrCreate({
    where: { email: "oender@pt.app" },
    defaults: {
      name: "Önder",
      password: Bcrypt.hashSync("toendermoender", 10),
    },
  });

  News.findOrCreate({
    where: { id: 1 },
    defaults: {
      title: "Herzlich Willkommen",
      message: "Aktuell in Enwicklung",
    },
  });

  News.findOrCreate({
    where: { id: 2 },
    defaults: {
      title: "Testnachricht",
      message: "Aktuell in Enwicklung",
    },
  });

  Trainer.findOrCreate({
    where: { email: "jascha@pt.app" },
    defaults: {
      name: "Jascha",
      email: "jascha@pt.app",
      password: Bcrypt.hashSync("jaskobar", 10),
      description: "Erster und bester Trainer Kapuas",
    },
  });

  Session.findOrCreate({
    where: { id: 1 },
    defaults: {
      title: "Grundlagentraining",
      description: "Notwendig",
      dateTime: "Jeden Montag, Mittwoch und Freitag ab 18 Uhr",
      price: 50,
      timeInMinutes: 60,
    },
  });

  Session.findOrCreate({
    where: { id: 2 },
    defaults: {
      title: "Wettkampfvorbereitung",
      description: "Vorbereitung und Taktik",
      dateTime: "Jeden Dienstag, 19 Uhr",
      price: 100,
      timeInMinutes: 120,
    },
  });
});

module.exports = {
  User,
  News,
  Trainer,
  Session,
  Booking,
};
