const { Booking, sequelize, Session, Trainer } = require("../db");

module.exports = [
  {
    method: "GET",
    path: "/bookings",
    handler: async (request, h) => {
      const user = request.auth.credentials.toJSON();
      return (
        await Booking.findAll({
          where: {
            UserId: user.id,
          },
          include: {
            model: Session,
            include: [Trainer],
          },
        })
      )
        .map((bookingVal) => bookingVal.toJSON())
        .map((booking) => {
          const { password, ...rest } = booking.Session.Trainer;
          return {
            ...booking,
            Session: {
              ...booking.Session,
              Trainer: {
                ...rest,
              },
            },
          };
        });
    },
  },
  {
    method: "POST",
    path: "/buy",
    handler: async (request, h) => {
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
    },
  },
];
