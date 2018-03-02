import {Component, OnInit, ViewChild} from '@angular/core';
import {HistoryService} from '../../service/history.service';
import {Subscription} from 'rxjs/Subscription';
import {arrPageSize} from '../../lib/const';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import 'rxjs/add/observable/of';

@Component({
    selector: 'app-history',
    templateUrl: './history.del.bills.component.html',
    styleUrls: ['./history.del.bills.component.css']
})

export class HistoryDelBillsComponent implements OnInit {
    @ViewChild('form') form: any;
    selected: string;
    public historybillArray: any[] = [
        {label: 'Phiếu xóa', hisurl: ''},
        {label: 'Phiếu xuất nhập kho đã xóa', hisurl: ''}
    ];
    private subs: Subscription;
    public shops = [];
    public types: any;
    public receipts: any;
    public suppliers: any[] = [];
    public users: any[] = [];
    public delbills: Array<any> = [];
    public maxSize = 5;
    public paging = {count: 0, page: 1, limit: 20};
    public arrPageSize = arrPageSize;
    minDate = new Date(2017, 5, 10);
    maxDate = new Date(2018, 9, 15);

    bsValue: Date = new Date();
    bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
    constructor(public historyService: HistoryService, private router: Router) {
        this.getShop();
        this.getType();
        this.getTypeReceipt();
        this.getSupplier();
        this.getUser();
    }
    private getShop() {
        this.subs = this.historyService.getShop().subscribe(
            data => {
                this.shops = data.data;
            }
        );
    }
    private getType() {
        this.subs = this.historyService.getType().subscribe(
            data => {
                this.types = data.data;
            }
        );
    }
    private getTypeReceipt() {
        this.subs = this.historyService.getTypeReceipt().subscribe(
            data => {
                this.receipts = data.data;
            }
        );
    }
    public getDelBill() {
        this.historyService.http.startLoad();
        this.subs = this.historyService.getDelBill(this.historyService.search).subscribe(
            data => {
                this.delbills = data.data.result;
                this.paging = data.data.paging;
                this.historyService.http.endLoad();
            }, error => {
                this.historyService.http.endLoad();
            }
        );
    }
    private getSupplier() {
        this.subs = this.historyService.getSupplier().subscribe(
          data => {
              this.suppliers = data.data;
          }
        );
    }
    private getUser() {
        this.subs = this.historyService.getUser().subscribe(
            data => {
                this.users = data.data;
            }
        );
    }
    public pageChanged(event: any): void {
        if (this.historyService.search.page !== event.page) {
            this.historyService.search.page = event.page;
            this.getDelBill();
        }
    }
    public pageSizeChange() {
        this.getDelBill();
    }
    ngOnInit() {
        this.getDelBill();
    }
    public search() {
        this.historyService.search.page = 1;
        this.getDelBill();
    }
    public resetForm() {
        this.form.reset();
        this.search();
    }
}
