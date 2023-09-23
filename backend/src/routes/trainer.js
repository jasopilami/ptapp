const { Trainer, Session } = require("../db");

module.exports = [
  {
    method: "GET",
    path: "/trainer/sessions",
    handler: async (request, h) => {
      const trainer = request.auth.credentials.toJSON();
      if (!trainer.isTrainer) {
        return h.response().code(401);
      }
      const sessions = await Session.findAll({
        where: {
          TrainerId: trainer.id,
        },
      });
      return h.response(sessions).code(200);
    },
  },
  {
    method: "POST",
    path: "/trainer/sessions",
    handler: async (request, h) => {
      const trainer = request.auth.credentials.toJSON();
      if (!trainer.isTrainer) {
        return h.response().code(401);
      }
      const sessions = await Session.create({
        ...request.payload,
        TrainerId: trainer.id,
      });
      return h.response(sessions).code(200);
    },
  },
  {
    method: "POST",
    path: "/trainer",
    handler: async (request, h) => {
      const payload = request.payload;
      const trainer = Trainer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          ...payload,
        },
      });
      return h
        .response({
          id: trainer.id,
          email: trainer.email,
        })
        .code(201);
    },
  },
  {
    method: "GET",
    path: "/trainer",
    handler: async (request, h) => {
      try {
        return (
          await Trainer.findAll({
            raw: true,
          })
        ).map((trainer) => {
          const { password, ...rest } = trainer;
          return {
            ...rest,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  {
    method: "GET",
    path: "/trainer/{id}",
    handler: async (request, h) => {
      const trainerVal = await Trainer.findOne({
        where: {
          id: request.params.id,
        },
        include: [Session],
      });
      const { password, ...rest } = trainerVal.toJSON();
      return {
        ...rest,
      };
    },
  },
];
