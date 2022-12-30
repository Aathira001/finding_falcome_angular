import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
  });

  it('should create the app', () => {    
    expect(component).toBeTruthy();
  });

  it(`should have as title 'falconeSearch'`, () => {
    expect(component.title).toEqual('falconeSearch');
  });

  it('should render have a header, screens and footer component', () => {
    fixture.detectChanges();
    expect(element.querySelector('app-header')).toBeTruthy();
    expect(element.querySelector('app-footer')).toBeTruthy();
    expect(element.querySelector('.screens')).toBeTruthy();
  });
});
