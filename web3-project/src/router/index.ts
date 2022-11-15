import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: () => {
      return { name: "mintToken" };
    },
  },
  {
    path: "/mint-token",
    name: "mintToken",
    component: () =>
      import(
        /* webpackChunkName: "freeMintToken" */ "../views/FreeMintCrypto.vue"
      ),
  },
  {
    path: "/mint-nft",
    name: "mintNft",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "freeMintNft" */ "../views/FreeMintNft"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
