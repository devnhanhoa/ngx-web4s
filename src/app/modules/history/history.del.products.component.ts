import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../../service/history.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.del.products.component.html',
    styleUrls: ['./history.del.products.component.css']
})

export class HistoryDelProductsComponent implements OnInit {
    public historylistArray: any[] = [
        {label: 'Sản phẩm xóa', hisurl: ''},
        {label: 'Sản phẩm xuất nhập kho đã xóa', hisurl: ''}
    ];
    private subs: any;
    public shops = [];
    public types: any;
    public receipts: any;
    constructor(public historyService: HistoryService) {
        this.getShop();
        this.getType();
        this.getTypeReceipt();
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
    ngOnInit() {
    }
}
