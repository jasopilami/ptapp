const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "/booking", component: () => import("pages/BookingPage.vue") },
      {
        path: "/booking/:id",
        component: () => import("pages/BookingTrainerPage.vue"),
        props: true,
      },
      { path: "/account", component: () => import("pages/AccountPage.vue") },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
    ],
  },
  {
    path: "/trainer",
    component: () => import("layouts/TrainerLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/TrainerPage.vue"),
        children: [
          {
            path: "createTrainer",
            component: () => import("pages/CreateTrainerPage.vue"),
          },
          {
            path: "createNews",
            component: () => import("pages/CreateNews.vue"),
          },
          {
            path: "createSession",
            component: () => import("pages/SessionUpsertPage.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
