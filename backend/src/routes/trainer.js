const { Trainer, Session } = require("../db");

module.exports = [
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
