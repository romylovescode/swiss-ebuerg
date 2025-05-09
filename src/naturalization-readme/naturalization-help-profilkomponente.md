# Implementierung eines Kanton-Selectors mit kantonsspezifischen Einbürgerungsregeln

Ich zeige dir einen umfassenden Ansatz für die Implementierung eines Kanton-Selectors mit automatischem Laden der Einbürgerungsregeln:

## 1. Datenmodell für Kantone und Regeln

Erstelle zunächst ein Interface für die Kantone und Regeln:

```typescript
export interface Canton {
  code: string;
  name: string;
}

export interface CantonRules {
  residenceRequirement: string;
  languageRequirement: string;
  additionalRequirements: string;
  naturalizedPersonsCount?: number;
  localAuthority?: string;
}
```

## 2. Service für kantonsspezifische Regeln

```typescript
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Canton, CantonRules } from "../models/canton.model";

@Injectable({
  providedIn: "root",
})
export class CantonRulesService {
  // Liste der Schweizer Kantone
  private readonly cantons: Canton[] = [
    { code: "ZH", name: "Zürich" },
    { code: "BE", name: "Bern" },
    { code: "LU", name: "Luzern" },
    { code: "UR", name: "Uri" },
    { code: "SZ", name: "Schwyz" },
    { code: "OW", name: "Obwalden" },
    { code: "NW", name: "Nidwalden" },
    { code: "GL", name: "Glarus" },
    { code: "ZG", name: "Zug" },
    { code: "FR", name: "Freiburg" },
    { code: "SO", name: "Solothurn" },
    { code: "BS", name: "Basel-Stadt" },
    { code: "BL", name: "Basel-Landschaft" },
    { code: "SH", name: "Schaffhausen" },
    { code: "AR", name: "Appenzell Ausserrhoden" },
    { code: "AI", name: "Appenzell Innerrhoden" },
    { code: "SG", name: "St. Gallen" },
    { code: "GR", name: "Graubünden" },
    { code: "AG", name: "Aargau" },
    { code: "TG", name: "Thurgau" },
    { code: "TI", name: "Tessin" },
    { code: "VD", name: "Waadt" },
    { code: "VS", name: "Wallis" },
    { code: "NE", name: "Neuenburg" },
    { code: "GE", name: "Genf" },
    { code: "JU", name: "Jura" },
  ];

  // Mock-Datenbank für kantonsspezifische Regeln
  private readonly cantonRulesMap: Record<string, CantonRules> = {
    ZH: {
      residenceRequirement: "2 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Deutsch)",
      additionalRequirements: "Integration in Gemeinschaft nachweisen, Grundkenntnisse über Schweizer Lebensverhältnisse",
      naturalizedPersonsCount: 3458,
      localAuthority: "Gemeindeamt des Kantons Zürich",
    },
    BE: {
      residenceRequirement: "2 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Deutsch oder Französisch)",
      additionalRequirements: "Teilnahme am sozialen und wirtschaftlichen Leben",
      naturalizedPersonsCount: 2140,
      localAuthority: "Amt für Migration und Personenstand",
    },
    LU: {
      residenceRequirement: "3 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Deutsch)",
      additionalRequirements: "Grundkenntnisse der geografischen, historischen, politischen und gesellschaftlichen Verhältnisse",
      naturalizedPersonsCount: 876,
      localAuthority: "Justiz- und Sicherheitsdepartement",
    },
    // Weitere Kantone könnten hier hinzugefügt werden
  };

  constructor() {}

  // Gibt alle Kantone zurück
  getCantons(): Canton[] {
    return this.cantons;
  }

  // Lädt die Regeln für einen spezifischen Kanton
  getCantonRules(cantonCode: string): Observable<CantonRules> {
    // Mock einer API-Anfrage mit einer Verzögerung
    return of(
      this.cantonRulesMap[cantonCode] || {
        residenceRequirement: "10 Jahre in der Schweiz",
        languageRequirement: "Kenntnisse einer Landessprache",
        additionalRequirements: "Integration, Respektierung der Rechtsordnung",
      },
    ).pipe(
      delay(800), // Simuliert Netzwerkverzögerung
    );
  }
}
```

## 3. Profilkomponente mit Kanton-Selector

```typescript
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs/operators";
import { CantonRulesService } from "../../core/services/canton-rules.service";
import { Canton, CantonRules } from "../../core/models/canton.model";

@Component({
  selector: "app-einbuergerung-profile",
  templateUrl: "./einbuergerung-profile.component.html",
  styleUrls: ["./einbuergerung-profile.component.scss"],
})
export class EinbuergerungProfileComponent implements OnInit {
  profileForm: FormGroup;
  cantons: Canton[] = [];
  cantonRules: CantonRules | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cantonRulesService: CantonRulesService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Formular initialisieren
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      canton: ["", Validators.required],
      residencePermit: ["", Validators.required],
      residenceYears: ["", [Validators.required, Validators.min(0), Validators.max(99)]],
    });

    // Kantone laden
    this.cantons = this.cantonRulesService.getCantons();
  }

  loadCantonSpecificRules(): void {
    const selectedCanton = this.profileForm.get("canton")?.value;
    if (!selectedCanton) {
      return;
    }

    this.isLoading = true;
    this.cantonRulesService
      .getCantonRules(selectedCanton)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (rules) => {
          this.cantonRules = rules;
        },
        error: (error) => {
          console.error("Fehler beim Laden der Kantonregeln:", error);
          this.snackBar.open("Die Einbürgerungsregeln für diesen Kanton konnten nicht geladen werden.", "Schließen", { duration: 5000 });
        },
      });
  }

  onCantonSelected(): void {
    this.loadCantonSpecificRules();
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      // Hier würde man normalerweise die Daten an das Backend senden
      console.log("Profildaten:", this.profileForm.value);
      this.snackBar.open("Profil erfolgreich gespeichert!", "Schließen", {
        duration: 3000,
        panelClass: ["success-snackbar"],
      });
    } else {
      this.snackBar.open("Bitte füllen Sie alle Pflichtfelder aus.", "Schließen", {
        duration: 3000,
        panelClass: ["error-snackbar"],
      });
    }
  }
}
```

## 4. HTML-Template für die Komponente

```html
<div class="profile-container">
  <mat-card>
    <mat-card-header>
      <mat-card-title>Mein Einbürgerungsprofil</mat-card-title>
      <mat-card-subtitle>Bitte füllen Sie Ihre persönlichen Daten aus</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <form [formGroup]="profileForm">
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Vorname</mat-label>
            <input matInput formControlName="firstName" placeholder="Vorname eingeben" />
            <mat-error *ngIf="profileForm.get('firstName')?.hasError('required')"> Vorname ist erforderlich </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Nachname</mat-label>
            <input matInput formControlName="lastName" placeholder="Nachname eingeben" />
            <mat-error *ngIf="profileForm.get('lastName')?.hasError('required')"> Nachname ist erforderlich </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>E-Mail</mat-label>
          <input matInput formControlName="email" placeholder="Email eingeben" />
          <mat-error *ngIf="profileForm.get('email')?.hasError('required')"> E-Mail ist erforderlich </mat-error>
          <mat-error *ngIf="profileForm.get('email')?.hasError('email')"> Bitte geben Sie eine gültige E-Mail-Adresse ein </mat-error>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Wohnkanton</mat-label>
            <mat-select formControlName="canton" (selectionChange)="onCantonSelected()">
              <mat-option *ngFor="let canton of cantons" [value]="canton.code"> {{ canton.name }} ({{ canton.code }}) </mat-option>
            </mat-select>
            <mat-error *ngIf="profileForm.get('canton')?.hasError('required')"> Wohnkanton ist erforderlich </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Aufenthaltsstatus</mat-label>
            <mat-select formControlName="residencePermit">
              <mat-option value="B">Aufenthaltsbewilligung B</mat-option>
              <mat-option value="C">Niederlassungsbewilligung C</mat-option>
              <mat-option value="other">Anderer Status</mat-option>
            </mat-select>
            <mat-error *ngIf="profileForm.get('residencePermit')?.hasError('required')"> Aufenthaltsstatus ist erforderlich </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Aufenthaltsdauer in der Schweiz (Jahre)</mat-label>
          <input matInput type="number" formControlName="residenceYears" />
          <mat-error *ngIf="profileForm.get('residenceYears')?.hasError('required')"> Aufenthaltsdauer ist erforderlich </mat-error>
          <mat-error *ngIf="profileForm.get('residenceYears')?.hasError('min')"> Die Aufenthaltsdauer kann nicht negativ sein </mat-error>
          <mat-error *ngIf="profileForm.get('residenceYears')?.hasError('max')"> Bitte geben Sie einen realistischen Wert ein </mat-error>
        </mat-form-field>
      </form>

      <!-- Ladeanimation -->
      <div *ngIf="isLoading" class="spinner-container">
        <mat-spinner diameter="40"></mat-spinner>
        <span>Lade Einbürgerungsregeln...</span>
      </div>

      <!-- Kantonspezifische Regeln -->
      <div *ngIf="cantonRules && !isLoading" class="canton-rules">
        <h3>Kantonale Einbürgerungsregeln</h3>

        <mat-divider></mat-divider>

        <div class="rules-grid">
          <div class="rule-item">
            <mat-icon color="primary">hourglass_empty</mat-icon>
            <div class="rule-content">
              <h4>Aufenthaltsdauer</h4>
              <p>{{ cantonRules.residenceRequirement }}</p>
            </div>
          </div>

          <div class="rule-item">
            <mat-icon color="primary">translate</mat-icon>
            <div class="rule-content">
              <h4>Sprachanforderungen</h4>
              <p>{{ cantonRules.languageRequirement }}</p>
            </div>
          </div>

          <div class="rule-item">
            <mat-icon color="primary">info</mat-icon>
            <div class="rule-content">
              <h4>Weitere Anforderungen</h4>
              <p>{{ cantonRules.additionalRequirements }}</p>
            </div>
          </div>

          <div *ngIf="cantonRules.localAuthority" class="rule-item">
            <mat-icon color="primary">account_balance</mat-icon>
            <div class="rule-content">
              <h4>Zuständige Behörde</h4>
              <p>{{ cantonRules.localAuthority }}</p>
            </div>
          </div>
        </div>

        <div *ngIf="cantonRules.naturalizedPersonsCount" class="statistics">
          <p><strong>{{ cantonRules.naturalizedPersonsCount }}</strong> Personen wurden letztes Jahr in diesem Kanton eingebürgert.</p>
        </div>
      </div>
    </mat-card-content>

    <mat-card-actions align="end">
      <button mat-button>Abbrechen</button>
      <button mat-raised-button color="primary" (click)="saveProfile()">Profil speichern</button>
    </mat-card-actions>
  </mat-card>
</div>
```

## 5. Styling für die Komponente

```scss
.profile-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 15px;

  mat-card {
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .form-row {
    display: flex;
    gap: 16px;

    mat-form-field {
      flex: 1;
    }
  }

  .full-width {
    width: 100%;
  }

  .spinner-container {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 20px 0;
    justify-content: center;
    color: #666;
  }

  .canton-rules {
    margin-top: 30px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f5f7fa;

    h3 {
      margin-top: 0;
      margin-bottom: 16px;
      color: #333;
      font-weight: 500;
    }

    mat-divider {
      margin-bottom: 20px;
    }

    .rules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }

    .rule-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;

      .rule-content {
        flex: 1;

        h4 {
          margin: 0 0 4px 0;
          font-weight: 500;
          color: #333;
        }

        p {
          margin: 0;
          color: #555;
        }
      }
    }

    .statistics {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
      font-style: italic;
      color: #666;
    }
  }
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .rules-grid {
    grid-template-columns: 1fr !important;
  }
}
```

## 6. Modul-Konfiguration und Routing

```typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router"; // filepath: src/app/features/profile/profile.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
```
