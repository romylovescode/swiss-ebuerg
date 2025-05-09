import { TestBed } from "@angular/core/testing";
import { CantonRulesService } from "./canton-rules.service";

describe("CantonRulesService", () => {
  let service: CantonRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantonRulesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return all 26 Swiss cantons", (done) => {
    service.getCantons().subscribe((cantons) => {
      expect(cantons.length).toBe(26);
      done();
    });
  });

  it("should return canton rules for ZH", (done) => {
    service.getCantonRules("ZH").subscribe((rules) => {
      expect(rules).toBeTruthy();
      expect(rules.languageRequirement).toContain("Deutsch");
      done();
    });
  });

  it("should return default rules for non-existent canton", (done) => {
    service.getCantonRules("XX").subscribe((rules) => {
      expect(rules).toBeTruthy();
      expect(rules.residenceRequirement).toBe("10 Jahre in der Schweiz");
      done();
    });
  });
});
