const { Booking, sequelize, Session, Trainer } = require("../db");

async function getAllBookingsByUserId(request, h) {
  const user = request.auth.credentials.toJSON();
  return await Booking.findAll({
    where: {
      UserId: user.id,
    },
    include: {
      model: Session,
      include: {
        model: Trainer,
        attributes: {
          exclude: ["password"],
        },
      },
    },
  });
}

async function bookSessionForUser(request, h) {
  const user = request.auth.credentials.toJSON();
  const { payload } = request;

  const t = await sequelize.transaction();
  try {
    for (let sessionId of payload.sessions) {
      Booking.create({
        UserId: user.id,
        SessionId: sessionId,
      });
    }
    await t.commit();
  } catch (err) {
    await t.rollback();
  }

  return payload;
}

module.exports = [
  {
    method: "GET",
    path: "/bookings",
    handler: getAllBookingsByUserId,
  },
  {
    method: "POST",
    path: "/buy",
    handler: bookSessionForUser,
  },
];
