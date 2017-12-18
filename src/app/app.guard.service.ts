import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

@Injectable()
export class AppGuard implements CanActivate {
  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return true;
  }
}
