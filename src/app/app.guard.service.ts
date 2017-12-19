import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {HttpX} from './lib/http';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private http: HttpX) {
    }

    canActivate(route: ActivatedRouteSnapshot) {
        return this.http.checkAccess();
    }
}
