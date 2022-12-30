import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockvehicles } from 'src/testing/mockData';

import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VehiclesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get the planets', () => {
    service.getVehicles().subscribe((data) => {
      expect(data).toEqual(mockvehicles);
    });
    const req = httpMock.expectOne('https://findfalcone.herokuapp.com/vehicles');
    expect(req.request.method).toEqual('GET');
    req.flush(mockvehicles);
  });
});
