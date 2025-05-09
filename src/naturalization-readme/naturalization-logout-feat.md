Natürlich! Hier ist eine umformulierte Version deiner Frage:

**Frage:**  
_"Ich habe JWT für die Authentifizierung implementiert. Wie kann ich jetzt eine Logout-Funktion hinzufügen, die den Token entfernt und den Benutzer auf die Login-Seite weiterleitet? Kannst du mir den Ablauf und den Code dafür zeigen?"_

---

**Antwort:**

### **1. Ablauf für die Logout-Funktion**

- **Schritt 1:** Entferne den JWT-Token aus dem `localStorage` oder `sessionStorage`.
- **Schritt 2:** Aktualisiere den Authentifizierungsstatus im Frontend (z. B. über einen Service oder State Management).
- **Schritt 3:** Leite den Benutzer auf die Login-Seite weiter.

---

### **2. Beispiel-Implementierung in Angular**

#### **a. AuthService erweitern**

Füge eine `logout()`-Methode hinzu, die den Token entfernt und den Auth-Status aktualisiert.

```typescript
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private router: Router) {}

  // Entfernt den Token und leitet den Benutzer weiter
  logout(): void {
    localStorage.removeItem("jwtToken"); // Token entfernen
    this.router.navigate(["/login"]); // Auf Login-Seite weiterleiten
  }

  // Überprüft, ob der Benutzer eingeloggt ist
  isAuthenticated(): boolean {
    return !!localStorage.getItem("jwtToken"); // Token vorhanden?
  }
}
```

---

#### **b. Logout-Button in der Navigation**

Füge einen Logout-Button hinzu, der die `logout()`-Methode aufruft.

```html
<nav>
  <button mat-button (click)="onLogout()">Logout</button>
</nav>
```

```typescript
import { Component } from "@angular/core";
import { AuthService } from "src/app/core/auth/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout(); // Logout ausführen
  }
}
```

---

#### **c. AuthGuard für geschützte Routen**

Stelle sicher, dass geschützte Routen nur zugänglich sind, wenn der Benutzer eingeloggt ist.

```typescript
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]); // Weiterleitung zur Login-Seite
      return false;
    }
    return true;
  }
}
```

---

#### **d. Routing konfigurieren**

Schütze sensible Routen mit dem `AuthGuard`.

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

### **3. Tests für die Logout-Funktion**

Schreibe Unit-Tests mit Jest, um sicherzustellen, dass die `logout()`-Methode korrekt funktioniert.

```typescript
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let routerSpy = { navigate: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it("should remove the token and navigate to login on logout", () => {
    localStorage.setItem("jwtToken", "test-token");
    service.logout();
    expect(localStorage.getItem("jwtToken")).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"]);
  });
});
```

---

### **Zusammenfassung**

Mit diesen Schritten hast du eine vollständige Logout-Funktion implementiert:

1. Entferne den JWT-Token aus dem Speicher.
2. Aktualisiere den Authentifizierungsstatus.
3. Leite den Benutzer auf die Login-Seite weiter.
4. Schütze sensible Routen mit einem AuthGuard.

Das ermöglicht dir, die Authentifizierungslogik im Frontend unabhängig vom Backend zu testen und zu entwickeln.
