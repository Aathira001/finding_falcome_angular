import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { planets } from 'src/app/dto/planets.dto';
import { vehicles } from 'src/app/dto/vehicles.dto';
import { FalconeService } from 'src/app/services/falcone.service';
import { MissionDetailsService } from 'src/app/services/mission-details.service';
import { PlanetsService } from 'src/app/services/planets.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  tokenReceived = false;

  constructor(
    private planetsService: PlanetsService,
    private vehicleService: VehiclesService,
    private missionDetailsService: MissionDetailsService,
    private falconeService: FalconeService
  ) {}

  ngOnInit(): void {
    this.planetsService
      .getPlanets()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((planets: planets[]) => {
        this.missionDetailsService.setAllPlanets(planets)
      });
    this.vehicleService
      .getVehicles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((vehicles: vehicles[]) => {
        this.missionDetailsService.setAllVehicles(vehicles)
      });
    this.falconeService.getToken().subscribe(token => {
      this.falconeService.setToken(token);
      this.tokenReceived = true;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
