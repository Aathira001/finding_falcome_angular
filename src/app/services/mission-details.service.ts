import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { findFalconeResponse } from '../dto/falcone.dto';
import { planets } from '../dto/planets.dto';
import { vehicles } from '../dto/vehicles.dto';

@Injectable({
  providedIn: 'root',
})
export class MissionDetailsService {
  missionStatus: findFalconeResponse;
  selectedPlanets: planets[] = [];
  selectedVehicles: vehicles[] = [];
  allPlanets: planets[] = [];
  allVehicles: vehicles[] = [];
  planetsSubject$ = new BehaviorSubject<planets[]>([]);
  vehiclesSubject$ = new BehaviorSubject<vehicles[]>([]);

  constructor() {}

  updatePlanetsStatus(updatedPlanet: planets, planetId: number) {
    this.selectedPlanets[planetId] = updatedPlanet;
    this.allPlanets.map((planet) => {
      planet.selected = updatedPlanet
        ? planet.name === updatedPlanet.name ||
          this.selectedPlanets.includes(planet)
        : this.selectedPlanets.includes(planet);
    });
    this.broadCastAllPlanets();
  }

  setAllPlanets(planets: planets[]) {
    this.allPlanets = planets;
    this.broadCastAllPlanets();
  }

  broadCastAllPlanets() {
    this.planetsSubject$.next(this.allPlanets);
  }

  getAllPlanets() {
    return this.planetsSubject$.asObservable();
  }

  getSelectedPlanetNames() {
    return this.selectedPlanets.map((planet) => planet.name);
  }

  updatedVehiclesStatus(updatedVehicle: vehicles, vehicleId: number) {
    const previousSelectedVehicle = this.selectedPlanets[vehicleId]
      ? this.selectedVehicles[vehicleId]
      : null;
    this.selectedVehicles[vehicleId] = updatedVehicle;
    this.decreaseVehicleCount(updatedVehicle);
    if (previousSelectedVehicle) {
      this.increaseVehicleCount(previousSelectedVehicle);
    }
    this.broadCastAllVechicles();
  }

  removeAndIncreaseVehicleCount(id: number) {
    if (this.selectedVehicles[id]) {
      this.increaseVehicleCount(this.selectedVehicles[id]);
      this.selectedVehicles[id] = null;
      this.broadCastAllVechicles();
    }
  }

  setAllVehicles(vechicles: vehicles[]) {
    this.allVehicles = vechicles;
    this.broadCastAllVechicles();
  }

  broadCastAllVechicles() {
    this.vehiclesSubject$.next(this.allVehicles);
  }

  getAllVehicles() {
    return this.vehiclesSubject$.asObservable();
  }

  increaseVehicleCount(previousSelectedVehicle: vehicles) {
    this.allVehicles.map((vehicle: vehicles) => {
      if (vehicle.name === previousSelectedVehicle.name) {
        vehicle.total_no++;
      }
    });
  }

  decreaseVehicleCount(vehicleSelected: vehicles) {
    this.allVehicles.map((vehicle: vehicles) => {
      if (vehicle.name === vehicleSelected.name) {
        vehicle.total_no--;
      }
    });
  }

  getSelectedVehicleNames() {
    return this.selectedVehicles.map((vehicle) => vehicle.name);
  }

  calculateTotalTime() {
    let totalTime = 0;
    this.selectedVehicles
      .filter((x) => x)
      .forEach((vehicle, index) => {
        const speed = this.selectedPlanets[index].distance / vehicle.speed;
        totalTime += speed;
      });
    return totalTime;
  }

  setMissionStatus(status) {
    this.missionStatus = status;
  }

  getMissionStatus() {
    return this.missionStatus;
  }

  resetMission() {
    this.selectedPlanets = [];
    this.selectedVehicles = [];
    this.allPlanets = [];
    this.allVehicles = [];
    this.planetsSubject$.next(this.allPlanets);
    this.vehiclesSubject$.next(this.allVehicles);
  }
}
