import {Component, OnInit, ViewChild} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

import {arrPageSize} from '../../lib/const';

@Component({
    selector: 'app-channel',
    templateUrl: './laz.orders.component.html',
    styleUrls: ['./laz.orders.component.css']
})

export class LazOrdersComponent implements OnInit {
    @ViewChild('form') form: any;
    private subs: Subscription;
    public orders: Array<any> = [];
    public maxSize = 5;
    public paging = {count: 0, page: 1, limit: 20};
    public arrPageSize = arrPageSize;

    constructor(public channelService: ChannelService, private router: Router) {

    }

    ngOnInit() {
        this.getLazOrders();
    }

    public search() {
        this.channelService.search.page = 1;
        this.getLazOrders();
    }

    public resetForm() {
        this.form.reset();
        this.search();
    }

    public getLazOrders() {
        this.channelService.http.startLoad();
        this.subs = this.channelService.getLazOrder(this.channelService.search).subscribe(
            data => {
                this.orders = data.data.result;
                this.paging = data.data.paging;
                this.channelService.http.endLoad();
            },
            error => {
                this.channelService.http.endLoad();
            }
        );
    }

    public orderDownload() {
        this.channelService.http.startLoad();
        this.subs = this.channelService.syncLazOrder().subscribe(
            data => {
                this.channelService.http.endLoad();
            },
            error => {
                this.channelService.http.endLoad();
            }
        );
    }

    public pageChanged(event: any): void {
        this.channelService.search.page = event.page;
        this.getLazOrders();
    }

    public pageSizeChange() {
        this.getLazOrders();
    }

    public goDetail = order => {
        this.channelService.http.loading.show = true;
        this.router.navigate([`/channel/laz-orders/${order.id}`]);
    }
}
