import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { findFalconeReq } from 'src/app/dto/falcone.dto';
import { FalconeService } from 'src/app/services/falcone.service';
import { MissionDetailsService } from 'src/app/services/mission-details.service';
import { mockFoundFalconeResponse, mockHttpErrorResponse, mockPlanetNames, mockPlanets, mockvehicles, mockVehiclesNames } from 'src/testing/mockData';

import { SearchHomeComponent } from './search-home.component';

describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;
  let element: any;

  let mockMissionDetailsService: Partial<MissionDetailsService>;
  let mockFalconeService;
  let mockRouter: Router;
  let mockMatDialog: Partial<MatDialog>;

  beforeEach(async () => {
    mockMissionDetailsService = {
      getAllPlanets: jasmine
        .createSpy('getAllPlanets')
        .and.returnValue(of(mockPlanets)),
      getAllVehicles: jasmine
        .createSpy('getAllVehicles')
        .and.returnValue(of(mockvehicles)),
      updatePlanetsStatus: jasmine.createSpy('updatePlanetsStatus'),
      updatedVehiclesStatus: jasmine.createSpy('updatedVehiclesStatus'),
      removeAndIncreaseVehicleCount: jasmine.createSpy(
        'removeAndIncreaseVehicleCount'
      ),
      calculateTotalTime: jasmine
        .createSpy('calculateTotalTime')
        .and.returnValue(150),
      setMissionStatus: jasmine
        .createSpy('setMissionStatus'),
      getSelectedPlanetNames: jasmine
        .createSpy('getSelectedPlanetNames')
        .and.returnValue(mockPlanetNames),
      getSelectedVehicleNames: jasmine
        .createSpy('getSelectedVehicleNames')
        .and.returnValue(mockVehiclesNames),
    };
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockFalconeService = jasmine.createSpyObj('FalconeService', [
      'findFalcone',
    ]);
    mockFalconeService.findFalcone.and.returnValue(
      of(mockFoundFalconeResponse)
    );
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);


    await TestBed.configureTestingModule({
      declarations: [SearchHomeComponent],
      providers: [
        { provide: MissionDetailsService, useValue: mockMissionDetailsService },
        { provide: FalconeService, useValue: mockFalconeService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });  

  const createComponent = () => {
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  }

  beforeEach(() => {
    createComponent();
  });

  it('should have planets and vehicles components', () => {
    expect(element.querySelectorAll('app-planets').length).toBe(4);
    expect(element.querySelectorAll('app-vehicles').length).toBe(4);
  });

  it('should update the selectedplanets and resetvehicles', () => {
    spyOn(component, 'resetVehicleSelection');
    component.updateSelectedPlanet(mockPlanets[0], 0);
    expect(component.selectedPlanets[0]).toEqual(mockPlanets[0]);
    expect(mockMissionDetailsService.updatePlanetsStatus).toHaveBeenCalledWith(
      mockPlanets[0],
      0
    );
    expect(component.resetVehicleSelection).toHaveBeenCalledWith(0);
  });

  it('should update the selectedVehicle', () => {
    spyOn(component, 'calculateTotalTime');
    component.updateSelectedVehicle(mockvehicles[0],0);
    expect(component.selectedVehicles[0]).toEqual(mockvehicles[0]);
    expect(
      mockMissionDetailsService.updatedVehiclesStatus
    ).toHaveBeenCalledWith(mockvehicles[0], 0);
    expect(component.calculateTotalTime).toHaveBeenCalled();
  })

  it('should only enable findfalcone buttons if 4 vehicles are selected', () => {
    component.selectedVehicleCount = 2;
    expect(element.querySelector('button').disabled).toBeTruthy();

    component.selectedVehicleCount = 4;
    fixture.detectChanges();
    expect(element.querySelector('button').disabled).toBeFalsy();
  })

  it('should ask missionDetailsService to reset the vehicles at a particular index', () => {
    component.resetVehicleSelection(0);
    expect(mockMissionDetailsService.removeAndIncreaseVehicleCount).toHaveBeenCalledWith(0);
  });

  it('should get the total time from the missiondetailsservice', () => {
    component.calculateTotalTime();

    expect(component.totalTime).toEqual(150);
  });

  it('should call findfalcone and redirect', () => {
    component.findFalcone();
    expect(mockFalconeService.findFalcone).toHaveBeenCalledWith({
      planet_names: mockPlanetNames,
      vehicle_names: mockVehiclesNames
    } as findFalconeReq);
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

  it('should open matdialog with the error message when a http error is returned' , () => {
    mockFalconeService.findFalcone.and.returnValue(throwError(mockHttpErrorResponse));
    createComponent();
    component.findFalcone();
    expect(mockMatDialog.open).toHaveBeenCalled();
  });
});
