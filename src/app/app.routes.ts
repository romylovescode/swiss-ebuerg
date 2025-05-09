import { Routes } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./core/auth/services/user.service";
import { map } from "rxjs/operators";

export const routes: Routes = [
  {
    path: "canton-profile",
    loadComponent: () =>
      import("./features/canton-profile/canton-profile.component"),
    // canActivate: [() => inject(UserService).isAuthenticated],
  },
  // Route für canton-profile mit Code-Parameter
  {
    path: "canton-profile/:code",
    loadComponent: () =>
      import("./features/canton-profile/canton-profile.component"),
  },
  {
    path: "",
    loadComponent: () => import("./features/article/pages/home/home.component"),
  },
  {
    path: "login",
    loadComponent: () => import("./core/auth/auth.component"),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "register",
    loadComponent: () => import("./core/auth/auth.component"),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "settings",
    loadComponent: () => import("./features/settings/settings.component"),
    canActivate: [() => inject(UserService).isAuthenticated],
  },
  {
    path: "profile",
    loadChildren: () => import("./features/profile/profile.routes"),
  },
  {
    path: "editor",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./features/article/pages/editor/editor.component"),
        canActivate: [() => inject(UserService).isAuthenticated],
      },
      {
        path: ":slug",
        loadComponent: () =>
          import("./features/article/pages/editor/editor.component"),
        canActivate: [() => inject(UserService).isAuthenticated],
      },
    ],
  },
  {
    path: "article/:slug",
    loadComponent: () =>
      import("./features/article/pages/article/article.component"),
  },
];
