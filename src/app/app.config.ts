import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { JwtService } from "./core/auth/services/jwt.service";
import { UserService } from "./core/auth/services/user.service";
import { apiInterceptor } from "./core/interceptors/api.interceptor";
import { tokenInterceptor } from "./core/interceptors/token.interceptor";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { EMPTY } from "rxjs";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import localeDeExtra from "@angular/common/locales/extra/de-CH";

// Registriere das deutsche Locale
registerLocaleData(localeDe, "de-CH", localeDeExtra);

export function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor]),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true,
    },
    // Setze das deutsche Locale als Standard
    { provide: LOCALE_ID, useValue: "de-CH" },
  ],
};
