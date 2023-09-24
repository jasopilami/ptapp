const { News } = require("../db");

async function getAllNews(request, h) {
  try {
    return await News.findAll({
      order: [["updatedAt", "DESC"]],
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = [
  {
    method: "GET",
    path: "/news",
    handler: getAllNews,
    options: { auth: false },
  },
];
