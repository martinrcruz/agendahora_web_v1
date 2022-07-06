import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  response: any;
  respuesta: any = 1;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.isLoggedIn()
      .subscribe({
        next: (res) => {
          this.response = res
          
          this.respuesta = this.response['estado'];
          console.log(this.response['estado'])
          if (this.response['estado'] == 0) {
            this.router.navigateByUrl('auth/login')
          }
        },
        error: (err) => {
          console.log(err)
        }
      })

    if (this.respuesta == 0) {
      this.router.navigateByUrl('auth/login')
      return false;
    }

    return true;
  }

}
