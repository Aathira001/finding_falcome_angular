import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { planets } from 'src/app/dto/planets.dto';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  planetFormControl = new FormControl('',[Validators.required]);
  filteredPlanets: Observable<planets[]>;
  selectPlanet:string = 'qstnmark';

  constructor() {}
  @Input()
  planets: Array<planets>;

  @Output()
  selectedPlanet = new EventEmitter<planets>();

  ngOnInit(): void {
    this.filteredPlanets = this.planetFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.planetFormControl.statusChanges.subscribe(stat => {
      if(this.planetFormControl.invalid) {
        this.selectedPlanet.emit(null);
        this.selectPlanet= 'qstnmark';
      }
    })
  }

  private _filter(value: string): planets[] {
    const filterValue = value.toLowerCase();

    return this.planets.filter((planet) =>
      planet.name.toLowerCase().includes(filterValue)
    );
  }

  planetSelected(chosenPlanet: planets['name']) {
    if(!this.planetFormControl.invalid) {
      const selectPlanet = this.planets.filter(
        (planet) => planet.name === chosenPlanet
      );
      this.selectPlanet = chosenPlanet;
      this.selectedPlanet.emit(selectPlanet[0]);
    }
  }
  
}
