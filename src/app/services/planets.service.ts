import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { planets } from '../dto/planets.dto';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private resourceUrl: string;

  constructor( private http: HttpClient) {
    this.resourceUrl = environment.apiRootUrl + 'planets';
   }

  getPlanets() :Observable<planets[]> {
    return this.http.get<planets[]>(this.resourceUrl);
  }
}
