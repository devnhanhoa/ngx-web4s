import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Http, Response} from '@angular/http';
import {apiUrl} from '../app.config';

@Injectable()
export class NotifyService {
    private data: Observable<any>;

    constructor(public http: Http) {
        this.data = Observable.interval(30000).switchMap(() => this.http.get(apiUrl + 'layout/notify')
            .map((res: Response) => res.json())).share();
    }

    getNotify(): Observable<any> {
        return this.data;
    }
}
