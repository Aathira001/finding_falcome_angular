import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockFalconeErrorResponse } from 'src/testing/mockData';

import { ErrorsComponent } from './errors.component';

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsComponent ],
      imports: [MatDialogModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: mockFalconeErrorResponse}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message that is passed in', () => {
    expect(element.querySelector('.errorMessage').textContent).toContain(mockFalconeErrorResponse.error);
  })
});
