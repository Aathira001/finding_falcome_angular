import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  falconeErrorResponse,
  findFalconeReq,
  findFalconeResponse,
  tokenResponse,
} from '../dto/falcone.dto';
import { planets } from '../dto/planets.dto';
import { vehicles } from '../dto/vehicles.dto';

@Injectable({
  providedIn: 'root',
})
export class FalconeService {
  private resourceUrl: string;
  private token;

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.apiRootUrl;
  }

  getToken(): Observable<tokenResponse> {
    const headers = new HttpHeaders().set('accept', 'application/json');
    return this.http.post<tokenResponse>(
      this.resourceUrl + 'token',
      {},
      {
        headers: headers,
      }
    );
  }

  setToken(token) {
    this.token = token.token;
  }
 
  tokenReceived() : boolean {
    return this.token ? true : false;
  }

  findFalcone(
    missionDetails
  ): Observable<findFalconeResponse | falconeErrorResponse> {
    const missionDetailsCopy = {...missionDetails, token: this.token}
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.post<findFalconeResponse | falconeErrorResponse>(
      this.resourceUrl + 'find',
      missionDetailsCopy,
      {
        headers: headers,
      }
    );
  }

}
