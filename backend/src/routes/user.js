const { User } = require("../db");

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      try {
        return await User.findAll();
      } catch (err) {
        console.log(err);
      }
    },
    options: { auth: false },
  },
];
