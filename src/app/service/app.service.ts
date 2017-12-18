import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpX} from '../lib/http';
import {apiUrl} from '../app.config';

@Injectable()
export class AppService {
    constructor(public http: HttpX) {

    }

    /**
     *
     * @returns {Observable<any>}
     */
    public getSidebar() {
        const url = apiUrl + 'layout/sidebar';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    /**
     *
     * @returns {Observable<any>}
     */
    public getProfile() {
        const url = apiUrl + 'auth/profile';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }
}
