import { Component, OnInit, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { CantonRulesService } from "./services/canton-rules.service";
import { Canton, CantonRules } from "./models/canton.model";

interface CantonOption {
  code: string;
  name: string;
}

@Component({
  selector: "app-canton-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./canton-profile.component.html",
  styleUrl: "./canton-profile.component.scss",
})
export default class CantonProfileComponent implements OnInit {
  canton = signal<(Canton & CantonRules) | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  cantonCode = signal<string>("ZH"); // Default to Zürich
  cantonsList = signal<CantonOption[]>([]);

  sortedCantonsList = computed(() => {
    return this.cantonsList().sort((a, b) => a.name.localeCompare(b.name));
  });

  constructor(
    private cantonRulesService: CantonRulesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Load all available cantons for the dropdown
    this.loadCantonsList();

    // Get canton code from route parameters
    this.route.paramMap.subscribe((params: ParamMap) => {
      const code = params.get("code");
      if (code) {
        this.cantonCode.set(code.toLocaleUpperCase());
      }
      this.loadCantonData();
    });
  }

  loadCantonsList(): void {
    this.cantonRulesService.getCantons().subscribe({
      next: (cantons) => {
        const cantonOptions = cantons.map((canton) => ({
          code: canton.code,
          name: canton.name,
        }));
        // Sort cantons alphabetically by name
        this.cantonsList.set(cantonOptions);
      },
      error: (error) => {
        console.error("Error loading cantons list:", error);
        this.error.set("Failed to load cantons list.");
      },
    });
  }

  loadCantonData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.cantonRulesService.getCantonDetails(this.cantonCode()).subscribe({
      next: (cantonData) => {
        this.canton.set(cantonData);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set("Failed to load canton data. Please try again.");
        this.isLoading.set(false);
        console.error("Error fetching canton data:", err);
      },
    });
  }

  onCantonChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newCantonCode = selectElement.value;
    console;
    // Navigate to new URL with selected canton code
    this.router.navigate(["/canton-profile", newCantonCode]);
  }

  // Füge diese Methoden zu deiner Komponente hinzu

  defaultFlagSrc(code: string | undefined): string {
    if (!code) return "assets/flags/placeholder-flag.svg";
    const name = this.canton()?.name;
    // Verwendung von Wikipedia Commons für Kantonswappen
    return `https://www.fahnenfabrik.ch/userfiles/upload/shop/U_KT_${code}.jpg`;
  }

  onFlagError(event: any): void {
    // Bei Ladefehlern alternative URL verwenden
    const code = this.canton()?.code;
    const name = this.canton()?.name;
    if (code) {
      // Versuch mit alternativen URL-Mustern
      event.target.src = `https://www.fahnenfabrik.ch/userfiles/upload/shop/U_KT_${code}.jpg`;

      // Hinzufügen eines weiteren Error-Handlers für den zweiten Versuch
      event.target.onerror = () => {
        // Letztendlich ein lokales Platzhalterbild verwenden
        event.target.src = "assets/flags/placeholder-flag.svg";
        // Fehlerhandler entfernen nach dem letzten Versuch
        event.target.onerror = null;
      };
    } else {
      // Wenn kein Code verfügbar ist, verwende das Platzhalterbild
      event.target.src = "assets/flags/placeholder-flag.svg";
    }
  }

  refreshCantonData(): void {
    this.loadCantonData();
  }
}
