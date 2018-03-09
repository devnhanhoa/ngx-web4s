import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpX} from '../lib/http';
import {apiUrl} from '../app.config';

@Injectable()
export class HistoryService {
    static instance: HistoryService;
    private module = 'history';
    public search = {titledel: '', page_size: 20, page: 1};

    constructor(public http: HttpX) {
        return HistoryService.instance = HistoryService.instance || this;
    }

    public getShop() {
        const url = apiUrl + 'system/cachedata/CUA_HANG';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public getType() {
        const url = apiUrl + 'system/listdata/LOAI_XNK';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public getTypeReceipt() {
        const url = apiUrl + 'system/listdata/KIEU_PHIEU_XNK';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public getDelBill(sparams) {
        const url = apiUrl + this.module +  '/del/bill';
        const params: URLSearchParams = new URLSearchParams();
        Object.keys(sparams).map((key) => {
            params.set(key, sparams[key]);
        });
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }

    public getSupplier() {
        const url = apiUrl + '/partner/supplier';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }
    public getUser() {
        const url = apiUrl + '/user/getall';
        const params: URLSearchParams = new URLSearchParams();
        return this.http.get(url, {search: params}).map((res: Response) => res.json());
    }
}
