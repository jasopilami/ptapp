const { Sequelize, DataTypes } = require("sequelize");
const Bcrypt = require("bcrypt");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  transactionType: "IMMEDIATE",
  logging: false,
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  isTrainer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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

Trainer.hasMany(Session);
Session.belongsTo(Trainer);

User.hasMany(Booking);
Booking.belongsTo(User);

Session.hasMany(Booking);
Booking.belongsTo(Session);

function checkUniqueEmail(person) {
  if (person) throw new Error("Email already taken");
}

User.addHook("beforeValidate", "checkUniqueEmail", (user) => {
  return Trainer.findOne({
    where: { email: user.email },
  }).then(checkUniqueEmail);
});

Trainer.addHook("beforeValidate", "checkUniqueEmail", (trainer) => {
  return User.findOne({
    where: { email: trainer.email },
  }).then(checkUniqueEmail);
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables synced");
  console.log("Seeding...");

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
      avatar: "https://cdn.quasar.dev/img/avatar.png",
    },
  }).then(([trainerVal]) => {
    const trainer = trainerVal.get({ plain: true });

    Session.findOrCreate({
      where: { id: 1 },
      defaults: {
        title: "Grundlagentraining",
        description: "Notwendig",
        dateTime: "Jeden Montag, Mittwoch und Freitag ab 18 Uhr",
        price: 50,
        timeInMinutes: 60,
        TrainerId: trainer.id,
      },
    }).then(([sessionVal]) => {
      const session = sessionVal.get({ plain: true });

      User.findOrCreate({
        where: { email: "arnold@user.de" },
        defaults: {
          password: Bcrypt.hashSync("hey,arnold", 10),
        },
      }).then(([userVal]) => {
        const user = userVal.get({ plain: true });
        Booking.findOrCreate({
          where: { id: 1 },
          defaults: {
            UserId: user.id,
            SessionId: session.id,
          },
        }).then(() => {
          Session.findOrCreate({
            where: { id: 2 },
            defaults: {
              title: "Wettkampfvorbereitung",
              description: "Vorbereitung und Taktik",
              dateTime: "Jeden Dienstag, 19 Uhr",
              price: 100,
              timeInMinutes: 120,
              TrainerId: trainer.id,
            },
          }).then(([sessionVal]) => {
            const session = sessionVal.get({ plain: true });
            Booking.findOrCreate({
              where: { id: 2 },
              defaults: {
                UserId: user.id,
                SessionId: session.id,
              },
            });
          });
        });
      });
    });
  });
});

module.exports = {
  sequelize,
  User,
  News,
  Trainer,
  Session,
  Booking,
};
