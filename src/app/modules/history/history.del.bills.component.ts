import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../../service/history.service';
import {Subscription} from 'rxjs/Subscription';
import {arrPageSize} from '../../lib/const';


@Component({
    selector: 'app-history',
    templateUrl: './history.del.bills.component.html',
    styleUrls: ['./history.del.bills.component.css']
})

export class HistoryDelBillsComponent implements OnInit {
    public historybillArray: any[] = [
        {label: 'Phiếu xóa', hisurl: ''},
        {label: 'Phiếu xuất nhập kho đã xóa', hisurl: ''}
    ];
    private subs: Subscription;
    public shops = [];
    public types: any;
    public receipts: any;
    public delbills: Array<any> = [];
    public maxSize = 5;
    public paging = {count: 0, page: 1, limit: 20};
    public arrPageSize = arrPageSize;
    constructor(public historyService: HistoryService) {
        this.getShop();
        this.getType();
        this.getTypeReceipt();
        this.getDelBill();
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
    private getDelBill() {
        this.subs = this.historyService.getDelBill().subscribe(
            data => {
                this.delbills = data.data.result;
                this.paging = data.data.paging;
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
    }
}
