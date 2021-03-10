import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   component: () => import(/* webpackChunkName: "home" */ "./views/home")
  //   // redirect: `${adminRoot}/piaf`,
  // },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      }
    ]
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/applications`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "applications",
        component: () =>
          import(
            /* webpackChunkName: "applications" */ "./views/app/applications"
          ),
        redirect: `${adminRoot}/applications/survey`,
        children: [
          {
            path: "survey",
            component: () =>
              import(
                /* webpackChunkName: "applications" */ "./views/app/applications/Survey"
              )
          },
          {
            path: "survey/:id",
            component: () =>
              import(
                /* webpackChunkName: "applications" */ "./views/app/applications/SurveyDetail"
              ),
            props: true
          },
          {
            path: "create-job",
            component: () =>
              import(
                /* webpackChunkName: "applications" */ "./views/app/applications/CreateJob"
              )
          },
          {
            path: "profile-setting",
            component: () =>
              import(
                /* webpackChunkName: "user" */ "./views/app/applications/Profile-Setting"
              )
          }
        ]
      }
    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});
router.beforeEach(AuthGuard);
export default router;
