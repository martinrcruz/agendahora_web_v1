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
          console.log(this.authService.getUserData());
          if (this.response == false) {
            this.router.navigateByUrl('auth/login')
          }
        },
        error: (err) => {
          console.log(err)
        }
      })

    // this.authService.user_data$
    //   .pipe(
    //     tap(user => {
    //       console.log('what')
    //       if (!user) {
    //         this.router.navigateByUrl('auth/login')
    //         return false;
    //       }
    //       return true;
    //     })
    //   )





    if (this.response === false) {
      this.router.navigateByUrl('auth/login')
      return false;
    }

    return true;
  }

}
