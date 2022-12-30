import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { falconeErrorResponse } from 'src/app/dto/falcone.dto';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  errorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: falconeErrorResponse) {}

  ngOnInit(): void {
    this.errorMessage = this.data.error;
  }
}
