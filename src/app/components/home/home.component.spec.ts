import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FalconeService } from 'src/app/services/falcone.service';
import { MissionDetailsService } from 'src/app/services/mission-details.service';
import { PlanetsService } from 'src/app/services/planets.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { mockPlanets, mockToken, mockvehicles } from 'src/testing/mockData';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockMissionDetailsService: MissionDetailsService;
  let mockFalconeService: FalconeService;
  let mockPlanetService: PlanetsService;
  let mockVehiclesService: VehiclesService;

  beforeEach(async () => {
    mockPlanetService = {} as PlanetsService;
    mockPlanetService.getPlanets = jasmine
      .createSpy()
      .and.returnValue(of(mockPlanets));

    mockVehiclesService = {} as VehiclesService;
    mockVehiclesService.getVehicles = jasmine
      .createSpy()
      .and.returnValue(of(mockvehicles));

    mockMissionDetailsService = jasmine.createSpyObj<MissionDetailsService>(
      'MissionDetailsService',
      ['setAllPlanets', 'setAllVehicles']
    );

    mockFalconeService = jasmine.createSpyObj<FalconeService>(
      'FalconeService',
      ['setToken']
    );
    mockFalconeService.getToken = jasmine
      .createSpy('getToken')
      .and.returnValue(of(mockToken));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: PlanetsService, useValue: mockPlanetService },
        { provide: VehiclesService, useValue: mockVehiclesService },
        { provide: FalconeService, useValue: mockFalconeService },
        { provide: MissionDetailsService, useValue: mockMissionDetailsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a home component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the vehicles from the vehiclesService and pass it to missiondetails', () => {
    expect(mockVehiclesService.getVehicles).toHaveBeenCalled();
    expect(mockMissionDetailsService.setAllVehicles).toHaveBeenCalledWith(
      mockvehicles
    );
  });

  it('should get the planets from the planetsService and pass it to missiondetails', () => {
    expect(mockPlanetService.getPlanets).toHaveBeenCalled();
    expect(mockMissionDetailsService.setAllPlanets).toHaveBeenCalledWith(
      mockPlanets
    );
  });

  it('should get the token from the falconeService', () => {
    expect(mockFalconeService.getToken).toHaveBeenCalled();
    expect(mockFalconeService.setToken).toHaveBeenCalledWith(mockToken);
    expect(component.tokenReceived).toBeTruthy;
  });
});
