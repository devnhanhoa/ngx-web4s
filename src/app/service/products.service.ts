import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpX} from '../lib/http';
import {apiUrl} from '../app.config';

@Injectable()
export class ProductsService {
    static instance: ProductsService;
    private module = 'products';
    public search = {title: '', page_size: 20, page: 1};

    constructor(public http: HttpX) {
        return ProductsService.instance = ProductsService.instance || this;
    }

    public getProducts(sparams) {
        const url = apiUrl + this.module + '/getall';
        const params: URLSearchParams = new URLSearchParams();
        Object.keys(sparams).map((key) => {
            params.set(key, sparams[key]);
        });
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public syncProducts(products) {
        const url = apiUrl + 'channel/lazada/sync-product-to-lazada';
        const body = JSON.stringify({products: products});
        return this.http.post(url, body).map((res: Response) => res.json());
    }
}
