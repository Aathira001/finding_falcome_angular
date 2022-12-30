import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

import { PlanetsComponent } from './planets.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockPlanets } from 'src/testing/mockData';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;
  let loader: HarnessLoader;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetsComponent],
      imports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.planets = mockPlanets;
    fixture.detectChanges();
  });

  it('should have an autocomplete element that filters as user types in and call through if the form is valid', async () => {
    spyOn(component, 'planetSelected').and.callThrough();
    spyOn(component.selectedPlanet, 'emit');
    const planetOptions = component.planets.map((planet) => planet.name);

    const el = element.querySelector('input');
    el.dispatchEvent(new Event('focusin'));
    el.value = planetOptions[0];
    el.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    const matOptions = document.querySelectorAll('mat-option');
    const optionToClick = matOptions[0] as HTMLElement;
    optionToClick.click();

    await fixture.whenStable()

    expect(component.planetSelected).toHaveBeenCalledWith(planetOptions[0]);
    expect(component.selectedPlanet.emit).toHaveBeenCalledWith(mockPlanets[0]);
  });

  it('should not emit the chosen planets name when clicked if form is invalid', () => {
    spyOn(component.selectedPlanet, 'emit');
    component.planetFormControl.markAsTouched;
    const planetOptions = component.planets.map((planet) => planet.name);
    
    component.planetSelected(planetOptions[0]);
    fixture.detectChanges();

    expect(component.selectedPlanet.emit).not.toHaveBeenCalledWith(mockPlanets[0]);

    const el = element.querySelector('input');
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.selectedPlanet.emit).toHaveBeenCalledWith(null);
    expect(component.selectPlanet).toEqual('qstnmark');
  })
});
