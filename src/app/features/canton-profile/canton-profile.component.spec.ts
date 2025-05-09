import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CantonProfileComponent } from "./canton-profile.component";

describe("CantonProfileComponent", () => {
  let component: CantonProfileComponent;
  let fixture: ComponentFixture<CantonProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantonProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CantonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
