import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findFalconeResponse } from 'src/app/dto/falcone.dto';
import { planets } from 'src/app/dto/planets.dto';
import { falconeStatus } from 'src/app/enums/falcone-status.enum';
import { MissionDetailsService } from 'src/app/services/mission-details.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  missionStatus = {} as findFalconeResponse;
  planet: planets['name'];
  timeTaken: number;

  constructor(
    private missionDetailsService: MissionDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const missionDetailsStatus = this.missionDetailsService.getMissionStatus();
    this.missionStatus.status =
      missionDetailsStatus.status === falconeStatus.success;
    if (this.missionStatus.status) {
      this.planet = missionDetailsStatus.planet_name;
      this.timeTaken = this.missionDetailsService.calculateTotalTime();
    }
  }

  playAgain() {
    this.missionDetailsService.resetMission();
    this.router.navigateByUrl('/home');
  }
}
