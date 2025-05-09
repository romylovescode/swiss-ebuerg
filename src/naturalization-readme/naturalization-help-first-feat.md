# Implementierung eines Benutzerprofils für deine Einbürgerungs-App

Hier ist eine vollständige Implementierung für die Benutzerprofilseite deiner Einbürgerungs-App mit Angular Material.

## 1. Benutzermodell definieren

Zuerst erstellen wir ein Interface für das Benutzerprofil:

```typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  residenceStatus: "B" | "C" | "other";
  municipality: string;
  residenceDuration: number; // In Jahren
  profileCompleted: boolean;
}
```

## 2. Mock-Service für Benutzerdaten

Als nächstes erstellen wir einen Service mit Mock-Daten:

```typescript
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { UserProfile } from "../models/user-profile.model";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  // Mock-Benutzer
  private mockProfile: UserProfile = {
    id: "user123",
    name: "Maria Schmidt",
    email: "maria.schmidt@example.com",
    residenceStatus: "C",
    municipality: "Zürich",
    residenceDuration: 8,
    profileCompleted: true,
  };

  private profileSubject = new BehaviorSubject<UserProfile | null>(null);
  public profile$ = this.profileSubject.asObservable();

  constructor() {}

  /**
   * Lädt das Benutzerprofil
   * (In Produktion würde dies vom Backend geladen)
   */
  loadUserProfile(): Observable<UserProfile> {
    // Simuliere API-Anfrage mit Verzögerung
    return of(this.mockProfile).pipe(
      delay(800), // Simuliere Netzwerkverzögerung
    );
  }

  /**
   * Aktualisiert das Benutzerprofil
   */
  updateProfile(updatedProfile: Partial<UserProfile>): Observable<UserProfile> {
    // In Produktion würde hier ein PUT-Request zum Backend stattfinden

    if (!updatedProfile) {
      return throwError(() => new Error("Profildaten fehlen"));
    }

    // Aktualisiere Mock-Profil
    this.mockProfile = {
      ...this.mockProfile,
      ...updatedProfile,
      profileCompleted: true,
    };

    this.profileSubject.next(this.mockProfile);
    return of(this.mockProfile).pipe(delay(500));
  }

  /**
   * Initialisiert das Profil aus dem Service
   */
  initializeProfile(): void {
    this.loadUserProfile().subscribe((profile) => {
      this.profileSubject.next(profile);
    });
  }
}
```

## 3. Profilkomponente mit Angular Material

Jetzt erstellen wir die Profilkomponente:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../core/services/profile.service';
import { UserProfile } from '../../core/models/user-profile.model';
import { take } from 'rxjs/operators// filepath: src/app/features/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../core/services/profile.service';
import { UserProfile } from '../../core/models/user-profile.model';
import { take } from 'rxjs/operators
```
