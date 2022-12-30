import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockPlanets } from 'src/testing/mockData';

import { PlanetsService } from './planets.service';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlanetsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get the planets', () => {
    service.getPlanets().subscribe((data) => {
      expect(data).toEqual(mockPlanets);
    });
    const req = httpMock.expectOne('https://findfalcone.herokuapp.com/planets');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPlanets);
  });
});
