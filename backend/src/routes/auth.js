const Bcrypt = require("bcrypt");
const { User, Trainer } = require("../db");

async function returnUserInformation(request, h) {
  const user = request.auth.credentials.toJSON();
  return h
    .response({
      id: user.id,
      name: user.name,
      email: user.email,
      isTrainer: user.isTrainer || false,
    })
    .code(200);
}

async function registerUser(request, h) {
  const { email, password } = request.payload;
  const user = await User.create({
    email,
    password: await Bcrypt.hash(password, 10),
  });
  return h.response(user.id).code(201);
}

async function handleLogin(request, h) {
  const { email, password } = request.payload;

  // check if it is a user first
  let account = await User.findOne({
    where: { email },
  });

  if (!account) {
    // if not a user then maybe a trainer?
    account = await Trainer.findOne({
      where: { email },
    });
  }

  if (!account || !(await Bcrypt.compare(password, account.password))) {
    return h.response().code(401);
  }

  const payload = {
    id: account.id,
    email: account.email,
  };

  request.cookieAuth.set(payload);

  return h.response(payload).code(200);
}

module.exports = [
  {
    method: "GET",
    path: "/hello",
    handler: returnUserInformation,
  },
  {
    method: "POST",
    path: "/register",
    options: {
      auth: false,
    },
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/login",
    handler: handleLogin,
    options: {
      auth: {
        mode: "try",
      },
    },
  },
];
