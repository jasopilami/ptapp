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
];

export default routes;
