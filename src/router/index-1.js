import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/index.vue";

import Meta from "vue-meta";
import auth from "@/router/auth";

Vue.use(VueRouter);

Vue.use(Meta, {
  keyName: "metaInfo", // the component option name that vue-meta looks for meta info on.
  attribute: "data-vue-meta", // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: "data-vue-meta-server-rendered", // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: "vmid", // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

const routes = [
  {
    path: "/",
    name: "home-index",
    component: Home,
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/login",
    name: "account-login",
    component: () => import("@/views/account/Login.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/register",
    name: "account-register",
    component: () => import("@/views/account/Register.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/account/ForgotPassword.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/change-password",
    name: "change-password",
    component: () => import("@/views/account/ChangePassword.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/change-password-success",
    name: "change-password-success",
    component: () => import("@/views/account/ChangePasswordSuccess.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer",
    name: "customer",
    redirect: "/customer/customer-lists",
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-lists",
    name: "customer-lists",
    component: () => import("@/views/customer/List.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-lists/create",
    name: "customer-lists-create",
    component: () => import("@/views/customer/ListCreate.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-lists/update/:id",
    name: "customer-lists-update",
    component: () => import("@/views/customer/ListUpdate.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-lists/detail/:id",
    name: "customer-lists-detail",
    component: () => import("@/views/customer/Detail.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-prices",
    name: "customer-prices",
    component: () => import("@/views/customer/Price.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-potentials",
    name: "customer-potentials",
    component: () => import("@/views/customer/Potential.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-levels",
    name: "customer-levels",
    component: () => import("@/views/customer/Level.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-levels",
    name: "customer-levels",
    component: () => import("@/views/customer/Level.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/customer/customer-levels",
    name: "customer-levels",
    component: () => import("@/views/customer/Level.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/administrator",
    name: "administrator",
    redirect: "/administrator/user-management",
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/administrator/user-management",
    name: "user-management",
    component: () => import("@/views/administrator/User.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/administrator/organization-management",
    name: "organization-management",
    component: () => import("@/views/administrator/Organization.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/administrator/department-management",
    name: "department-management",
    component: () => import("@/views/administrator/Department.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/administrator/role-management",
    name: "role-management",
    component: () => import("@/views/administrator/Role.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/others",
    name: "others",
    redirect: "/others/profile",
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/setting/profile",
    name: "profile-user",
    component: () => import("@/views/others/Profile.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  // Đơn hàng
  {
    path: "/order-list",
    name: "order-list",
    component: () => import("@/views/order/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/order-list/update/:order_id",
    name: "order-update",
    component: () => import("@/views/order/Update.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/order-list/detail/:order_id",
    name: "order-detail",
    component: () => import("@/views/order/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/order-list/add-pack/:order_id",
    name: "order-add-pack",
    component: () => import("@/views/order/AddPack.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/order-list/update-pack/:pack_id",
    name: "order-update-pack",
    component: () => import("@/views/order/UpdatePack.vue"),
    beforeEnter: auth.requireAuth,
  },
  // fines
  {
    path: "/fines",
    name: "fines",
    redirect: "/fines/fines-lists",
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/fines/fines-lists",
    name: "fines-lists",
    component: () => import("@/views/fines/List.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/fines/fines-lists/update/:fine_id",
    name: "fines-update",
    component: () => import("@/views/fines/Update.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/fines-create",
    name: "fines-create",
    component: () => import("@/views/fines/Create.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  // ewallet
  {
    path: "/ewallet-list",
    name: "ewallet-list",
    component: () => import("@/views/ewallet/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  // package
  {
    path: "/pack/list",
    name: "pack-list",
    component: () => import("@/views/pack/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/pack/create",
    name: "pack-create",
    component: () => import("@/views/pack/Create.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/pack/detail/:pack_id",
    name: "pack-detail",
    component: () => import("@/views/pack/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Khiếu nại
  {
    path: "/complain-list",
    name: "complain-list",
    component: () => import("@/views/complain/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/complain-list/detail/:complain_id",
    name: "complain-detail",
    component: () => import("@/views/complain/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Giao hàng
  {
    path: "/delivery-list",
    name: "delivery-list",
    component: () => import("@/views/delivery/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/delivery-list/create",
    name: "delivery-create",
    component: () => import("@/views/delivery/Create.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/delivery-list/update/:delivery_id",
    name: "delivery-update",
    component: () => import("@/views/delivery/Update.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/delivery-list/bill/:delivery_id",
    name: "delivery-bill",
    component: () => import("@/views/delivery/Bill.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/delivery-note/:delivery_id",
    name: "delivery-note",
    component: () => import("@/views/delivery/Note.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  // Quỹ
  {
    path: "/fund-list",
    name: "fund-list",
    component: () => import("@/views/fund/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Thu chi
  {
    path: "/fund-transaction",
    name: "fund-transaction",
    redirect: "/fund-transaction/list-vn",
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/fund-transaction/list-vn",
    name: "fund-transaction-list-vn",
    component: () => import("@/views/fund-transaction/ListVN.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Cấu hình
  {
    path: "/fund-type-pay",
    name: "fund-type-pay",
    redirect: "/fund-type-pay/list",
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/fund-type-pay/list",
    name: "fund-type-pay-list",
    component: () => import("@/views/fund-type-pay/List.vue"),
    beforeEnter: auth.requireAuth,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
