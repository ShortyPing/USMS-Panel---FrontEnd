import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../_services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LeitungGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise<boolean>(resolve => {
      this.authService.user.subscribe({
        next: user => resolve(user.specialPermissions.leitung == true),
        error: () => {
          resolve(false)
          this.router.navigate(['/dashboard'])
        }
      })
    });
  }

}
