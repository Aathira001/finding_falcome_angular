import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { planets } from 'src/app/dto/planets.dto';
import { vehicles } from 'src/app/dto/vehicles.dto';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit, OnChanges {
  toggleVal: any;

  @Input()
  vehicles: Array<vehicles>;

  @Input()
  selectedPlanet: planets;

  @Output()
  selectedVehicle = new EventEmitter<vehicles>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.selectedPlanet.firstChange) {
      this.toggleVal = undefined;
    }
  }

  vehicleSelected(vehicle: vehicles) {
    this.selectedVehicle.emit(vehicle);
  }
}
