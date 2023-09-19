const { News } = require("../db");

module.exports = [
  {
    method: "GET",
    path: "/news",
    handler: async (request, h) => {
      try {
        return await News.findAll();
      } catch (err) {
        console.log(err);
      }
    },
    options: { auth: false },
  },
];
