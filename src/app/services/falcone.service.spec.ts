import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { FalconeService } from './falcone.service';
import { findFalconeResponse, tokenResponse } from '../dto/falcone.dto';
import { mockFindFalconeBody, mockToken } from 'src/testing/mockData';

describe('FalconeService', () => {
  let service: FalconeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FalconeService); 
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to get the token', () => {
    service.getToken().subscribe(data => {
      expect(data).toEqual({} as tokenResponse)
    });
    const req = httpMock.expectOne('https://findfalcone.herokuapp.com/token');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('accept')).toEqual('application/json');
    req.flush({} as tokenResponse);
  })

  it('should set and return the token if present', () => {
    expect(service.tokenReceived()).toBeFalsy();

    service.setToken(mockToken);
    expect(service.tokenReceived()).toBeTruthy();
  })

  it('should return the token', () => {
    service.findFalcone(mockFindFalconeBody).subscribe((data) => {
      expect(data).toEqual({} as findFalconeResponse);
    });
    const req = httpMock.expectOne('https://findfalcone.herokuapp.com/find');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('accept')).toEqual('application/json');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    req.flush({} as tokenResponse);
  })
});
