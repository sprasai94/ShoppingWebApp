import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  // canActivate(): Observable<boolean> {
  //   return this.auth.user$
  //   .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()),
  //    map(appUser => true));
  //  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map(appUser => appUser.isAdmin));
   }
}
