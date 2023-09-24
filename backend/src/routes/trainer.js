const { Trainer, Session, News } = require("../db");

async function getAllTrainerSessions(request, h) {
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
}

async function createANewsEntry(request, h) {
  const trainer = request.auth.credentials.toJSON();
  if (!trainer.isTrainer) {
    return h.response().code(401);
  }

  const news = await News.create({
    ...request.payload,
  });
  return h.response(news).code(201);
}

async function createASession(request, h) {
  const trainer = request.auth.credentials.toJSON();
  if (!trainer.isTrainer) {
    return h.response().code(401);
  }

  const sessions = await Session.create({
    ...request.payload,
    TrainerId: trainer.id,
  });
  return h.response(sessions).code(200);
}

async function createATrainer(request, h) {
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
}

async function getAllTrainers(request, h) {
  return await Trainer.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
}

async function getTrainerById(request, h) {
  return await Trainer.findOne({
    where: {
      id: request.params.id,
    },
    include: [Session],
    attributes: {
      exclude: ["password"],
    },
  });
}

module.exports = [
  {
    method: "GET",
    path: "/trainer/sessions",
    handler: getAllTrainerSessions,
  },
  {
    method: "POST",
    path: "/trainer/news",
    handler: createANewsEntry,
  },
  {
    method: "POST",
    path: "/trainer/sessions",
    handler: createASession,
  },
  {
    method: "POST",
    path: "/trainer",
    handler: createATrainer,
  },
  {
    method: "GET",
    path: "/trainer",
    handler: getAllTrainers,
  },
  {
    method: "GET",
    path: "/trainer/{id}",
    handler: getTrainerById,
  },
];
