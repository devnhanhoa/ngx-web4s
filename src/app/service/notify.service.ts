import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Http, Response} from '@angular/http';
import {apiUrl} from '../app.config';

@Injectable()
export class NotifyService {
    private data: Observable<any>;

    constructor(public http: Http) {
        this.data = Observable.interval(30000).switchMap(() => this.getSerNotify()).share();
    }

    getNotify(): Observable<any> {
        return this.data;
    }

    public getSerNotify() {
        const url = apiUrl + 'layout/notify';
        return this.http.get(url).map((res: Response) => res.json());
    }
}
