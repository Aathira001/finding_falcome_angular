import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { findFalconeReq } from 'src/app/dto/falcone.dto';
import { planets } from 'src/app/dto/planets.dto';
import { vehicles } from 'src/app/dto/vehicles.dto';
import { FalconeService } from 'src/app/services/falcone.service';
import { MissionDetailsService } from 'src/app/services/mission-details.service';
import { ErrorsComponent } from '../../results/errors/errors.component';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss'],
})
export class SearchHomeComponent implements OnInit, OnDestroy {
  planets: planets[];
  vehicles: vehicles[];
  selectedPlanets: Array<planets> = [];
  selectedVehicles: Array<vehicles> = [];
  selectedVehicleCount: number;
  selectedPlan = [];
  totalTime = 0;
  result: any;
  unsubscribe$: Subject<boolean> = new Subject();
  private missionDetails = {} as findFalconeReq;

  constructor(
    private dialog: MatDialog,
    private missionDetailsService: MissionDetailsService,
    private falconeService: FalconeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.selectedPlan.length = 4;
    this.missionDetailsService
      .getAllPlanets()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((planets) => {
        this.planets = planets;
      });
    this.missionDetailsService
      .getAllVehicles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
      });
  }

  updateSelectedPlanet(planetSelected: planets, position: number) {
    this.selectedPlanets[position] = planetSelected;
    this.missionDetailsService.updatePlanetsStatus(planetSelected, position);
    this.resetVehicleSelection(position)
  }

  updateSelectedVehicle(vehicleSelected: vehicles, position: number) {
    this.selectedVehicles[position] = vehicleSelected;
    this.selectedVehicleCount = this.selectedVehicles.filter(vehicles => vehicles).length;
    this.missionDetailsService.updatedVehiclesStatus(vehicleSelected, position);
    this.calculateTotalTime();
  }

  resetVehicleSelection(position: number) {
    this.missionDetailsService.removeAndIncreaseVehicleCount(position);
  }


  calculateTotalTime() {
    this.totalTime = this.missionDetailsService.calculateTotalTime();
  }

  findFalcone() {
    this.missionDetails.planet_names = this.missionDetailsService.getSelectedPlanetNames();
    this.missionDetails.vehicle_names = this.missionDetailsService.getSelectedVehicleNames();
    this.falconeService.findFalcone(this.missionDetails).subscribe((res) => {
      this.missionDetailsService.setMissionStatus(res);
      this.router.navigateByUrl('/success');
    }, (err) => {
      this.dialog.open(ErrorsComponent, {
        data: {
          err
        }
      })
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
