import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorsComponent } from '../components/results/errors/errors.component';
import { FalconeService } from '../services/falcone.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private falconeService: FalconeService, private router: Router, private dialog: MatDialog) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.falconeService.tokenReceived()) {
      return true
    }
    this.dialog.open(ErrorsComponent, {
      data: {
        error: "Unathorized access! You have been redirected to home."
      },
    });
    this.router.navigateByUrl('home');
    return false;
  }
  
}
