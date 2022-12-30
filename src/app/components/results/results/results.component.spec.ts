import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { falconeStatus } from 'src/app/enums/falcone-status.enum';
import { MissionDetailsService } from 'src/app/services/mission-details.service';
import { mockNotFoundFalconeResponse } from 'src/testing/mockData';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let element: any;

  let mockMissionDetailsService: MissionDetailsService;
  let mockRouter: Router;

  const mockResponse ={ planet_name: 'Eingen',
  status: falconeStatus.success}

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    mockMissionDetailsService = {} as MissionDetailsService;
    mockMissionDetailsService.resetMission = jasmine.createSpy();
    mockMissionDetailsService.calculateTotalTime = jasmine
      .createSpy()
      .and.returnValue(150);    
    mockMissionDetailsService.getMissionStatus = jasmine
      .createSpy()
      .and.returnValue({ planet_name: 'Eingen', status: falconeStatus.success });  

    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: MissionDetailsService, useValue: mockMissionDetailsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  const createComponent = () => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  };

  it('should display an error message if the queen was not found on the planets', () => {
    mockMissionDetailsService.getMissionStatus = jasmine
      .createSpy()
      .and.returnValue(mockNotFoundFalconeResponse);
    TestBed.overrideProvider(MissionDetailsService, {
      useValue: mockMissionDetailsService,
    });
    createComponent();

    expect(element.querySelector('.card-header').innerText).toContain(
      'DEFEATED'
    );

    expect(element.querySelector('h1').innerText).toContain(
      'Uh-oh looks like the queen got away this time!'
    );
  });

  it('should redirect the user to the home page when the play again button is clicked', () => {
    createComponent();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should get and show the planet and timetaken to reach that if mission status is successful', () => {
    createComponent();
    expect(component.missionStatus.status).toBeTruthy();
    expect(component.planet).toEqual(mockResponse.planet_name);
    expect(component.timeTaken).toEqual(150);

    expect(element.querySelector('.card-header').innerText).toContain(
      'SUCCESS!'
    );
    expect(element.querySelector('.card-body > h2').innerText).toContain(
      'Succcess! Congratulations on Finding Falcone. King Shah is mighty pleased!'
    );

    expect(element.querySelectorAll('.card-body h3')[0].innerText).toContain(
      component.timeTaken
    );
    expect(element.querySelectorAll('.card-body h3')[1].innerText).toContain(
      component.planet
    );
  });  
});
