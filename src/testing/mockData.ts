import { HttpErrorResponse } from '@angular/common/http';
import {
  falconeErrorResponse,
  findFalconeReq,
  findFalconeResponse,
  tokenResponse,
} from 'src/app/dto/falcone.dto';
import { planets } from 'src/app/dto/planets.dto';
import { vehicles } from 'src/app/dto/vehicles.dto';
import { falconeStatus } from 'src/app/enums/falcone-status.enum';

export const mockvehicles: vehicles[] = [
  { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2 },
  { name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4 },
  { name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5 },
  { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10 },
];

export const mockPlanets: planets[] = [
  { name: 'Donlon', distance: 100 },
  { name: 'Enchai', distance: 200 },
  { name: 'Jebing', distance: 300 },
  { name: 'Sapir', distance: 400 },
  { name: 'Lerbin', distance: 500 },
  { name: 'Pingasor', distance: 600 },
];

export const mockSelectedVehicles: vehicles[] = [
  { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2 },
  { name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4 },
  { name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5 },
  { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10 },
];

export const mockSelectedPlanets: planets[] = [
  { name: 'Donlon', distance: 100 },
  { name: 'Enchai', distance: 200 },
  { name: 'Jebing', distance: 300 },
  { name: 'Sapir', distance: 400 }
];

export const mockPlanetNames: planets['name'][] = [
  'Donlon',
  'Enchai',
  'Jebing',
  'Sapir',
];
export const mockVehiclesNames: vehicles['name'][] = [
  'Space pod',
  'Space rocket',
  'Space shuttle',
  'Space ship',
];

export const mockToken: tokenResponse = {
  token: 'randomToken',
};

export const mockFalconeErrorResponse: falconeErrorResponse = {
  error: 'something went wrong!',
};

export const mockFoundFalconeResponse: findFalconeResponse = {
  planet_name: mockPlanets[0].name,
  status: falconeStatus.success,
};

export const mockNotFoundFalconeResponse: findFalconeResponse = {
  status: falconeStatus.failure,
};

export const mockFindFalconeBody: findFalconeReq = {
  token: 'random token',
  planet_names: mockPlanetNames,
  vehicle_names: mockVehiclesNames
}

export const mockHttpErrorResponse = new HttpErrorResponse({
  error: { code: `some code`, message: `some message.` },
  status: 400,
  statusText: 'Bad Request',
});