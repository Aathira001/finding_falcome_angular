import { TestBed } from '@angular/core/testing';
import {
  mockFoundFalconeResponse,
  mockPlanetNames,
  mockPlanets,
  mockSelectedPlanets,
  mockSelectedVehicles,
  mockvehicles,
  mockVehiclesNames,
} from 'src/testing/mockData';

import { MissionDetailsService } from './mission-details.service';

describe('MissionDetailsService', () => {
  let service: MissionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set all planets', () => {
    spyOn(service, 'broadCastAllPlanets');
    service.setAllPlanets(mockPlanets);
    expect(service.allPlanets).toEqual(mockPlanets);
  });

  it('shoudld update the planets status', () => {
    spyOn(service, 'broadCastAllPlanets');
    service.allPlanets = mockPlanets;
    service.updatePlanetsStatus(mockPlanets[0], 0);
    expect(service.selectedPlanets[0]).toEqual(mockPlanets[0]);
    expect(service.allPlanets[0].selected).toBeTruthy();
    expect(service.broadCastAllPlanets).toHaveBeenCalled();
  });

  it('should emit all planets', () => {
    service.allPlanets = mockPlanets;
    spyOn(service.planetsSubject$, 'next');
    service.broadCastAllPlanets();
    expect(service.planetsSubject$.next).toHaveBeenCalledWith(mockPlanets);
  });

  it('should return the selected planet and vehicle names', () => {
    service.selectedPlanets = mockSelectedPlanets;
    service.selectedVehicles = mockSelectedVehicles;

    expect(service.getSelectedPlanetNames()).toEqual(mockPlanetNames);
    expect(service.getSelectedVehicleNames()).toEqual(mockVehiclesNames);
  });

  it('shoudl set, broadcast,increase and decrease vehicles', () => {
    service.setAllVehicles(mockvehicles);
    const previousCount = mockvehicles[0].total_no;
    service.increaseVehicleCount(mockvehicles[0]);
    expect(previousCount + 1).toEqual(mockvehicles[0].total_no);
    service.decreaseVehicleCount(mockvehicles[0]);
    expect(previousCount).toEqual(mockvehicles[0].total_no);
  });

  it('should set and get the missionstatus', () => {
    service.setMissionStatus(mockFoundFalconeResponse);
    expect(service.getMissionStatus()).toEqual(mockFoundFalconeResponse);
  });

  it('should reset all the stats', () => {
    spyOn(service.planetsSubject$, 'next');
    spyOn(service.vehiclesSubject$, 'next');
    service.resetMission();
    expect(service.selectedPlanets.length).toBe(0);
    expect(service.selectedVehicles.length).toBe(0);
    expect(service.allPlanets.length).toBe(0);
    expect(service.allVehicles.length).toBe(0);
    expect(service.planetsSubject$.next).toHaveBeenCalledWith([]);
    expect(service.vehiclesSubject$.next).toHaveBeenCalledWith([]);
  });

  it('should calculate the time take', () => {
    service.selectedPlanets = mockSelectedPlanets;
    service.selectedVehicles = mockSelectedVehicles;
    expect(service.calculateTotalTime()).toEqual(200);
  });

  it('should remove and increase the vehicle count', () => {
    spyOn(service, 'increaseVehicleCount').and.callThrough();
    spyOn(service, 'broadCastAllVechicles');

    service.selectedVehicles = mockSelectedVehicles;
    service.removeAndIncreaseVehicleCount(0);
    expect(service.increaseVehicleCount).toHaveBeenCalled();
    expect(service.selectedVehicles[0]).toBeNull();
    expect(service.broadCastAllVechicles).toHaveBeenCalled();
  });

  it('should update the vehicle status', () => {
    service.selectedPlanets = mockSelectedPlanets;
    service.selectedVehicles = mockSelectedVehicles;
    service.updatedVehiclesStatus(mockSelectedVehicles[1], 0);
    expect(service.selectedVehicles[0]).toEqual(mockSelectedVehicles[1])
  })
});
