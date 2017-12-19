import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpX} from '../lib/http';
import {apiUrl} from '../app.config';

@Injectable()
export class ChannelService {
    static instance: ChannelService;
    private module = 'channel';
    public search = {title: '', page_size: 20, page: 1};

    constructor(public http: HttpX) {
        return ChannelService.instance = ChannelService.instance || this;
    }

    public getLazProduct(sparams) {
        const url = apiUrl + this.module + '/lazada/products-synced';
        const params: URLSearchParams = new URLSearchParams();
        Object.keys(sparams).map((key) => {
            params.set(key, sparams[key]);
        });
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public getSignLazProduct(id) {
        const url = apiUrl + this.module + '/lazada/laz-product';
        const params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public syncLazProduct() {
        const url = apiUrl + this.module + '/lazada/sync-products';
        const body = JSON.stringify({});
        return this.http.post(url, body).map((res: Response) => res.json());
    }

    public syncLazOrder() {
        const url = apiUrl + this.module + '/lazada/sync-orders';
        const body = JSON.stringify({});
        return this.http.post(url, body).map((res: Response) => res.json());
    }
}
