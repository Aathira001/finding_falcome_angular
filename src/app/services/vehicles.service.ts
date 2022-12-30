import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { vehicles } from '../dto/vehicles.dto';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private resourceUrl: string;

  constructor( private http: HttpClient) {
    this.resourceUrl = environment.apiRootUrl + 'vehicles';
   }

   getVehicles(): Observable<vehicles[]> {
      return this.http.get<vehicles[]>(this.resourceUrl);
   }
}
