import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';

import { VehiclesComponent } from './vehicles.component';
import { mockPlanets, mockvehicles } from 'src/testing/mockData';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesComponent ],
      imports: [ MatButtonToggleModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.vehicles = mockvehicles;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable the vehicle toggles only if a planet is selected', async () => {
    component.selectedPlanet = null;
    fixture.detectChanges();

    let matToggleElement = await loader.getHarness<MatButtonToggleHarness>(
      MatButtonToggleHarness
    );
    let isToggleDisabled = await matToggleElement.isDisabled();
    expect(isToggleDisabled).toBeTruthy();

    component.selectedPlanet = mockPlanets[0];
    fixture.detectChanges();

    matToggleElement = await loader.getHarness<MatButtonToggleHarness>(
      MatButtonToggleHarness
    );

    isToggleDisabled = await matToggleElement.isDisabled();
    expect(isToggleDisabled).toBeFalsy();
  });
  
  it('should emit the selected vehicle when user clicks on it', async () => {
    spyOn(component, 'vehicleSelected').and.callThrough();
    component.selectedPlanet = mockPlanets[0];
    fixture.detectChanges();
    
    let matToggleElements = await loader.getAllHarnesses<MatButtonToggleHarness>(
      MatButtonToggleHarness
    );
    expect(matToggleElements.length).toEqual(mockvehicles.length);

    const firstToggleOption = matToggleElements[0];
    await firstToggleOption.toggle();
    expect(component.vehicleSelected).toHaveBeenCalled();
  });

  it('should toggle the value in onchanges if not the firstchange', () => {
    let prev_value = 'prev';
    let new_value = 'new';
    let firstChange: boolean = false;

    component.ngOnChanges({
      selectedPlanet: new SimpleChange(prev_value, new_value, firstChange)
    });

    expect(component.toggleVal).toBeUndefined();

    component.toggleVal = '123';
    firstChange = true;
    component.ngOnChanges({
      selectedPlanet: new SimpleChange(prev_value, new_value, firstChange)
    });
    expect(component.toggleVal).toEqual('123');
  });
});
