import {Component, OnInit} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Subscription} from 'rxjs/Subscription';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-channel',
    templateUrl: './laz.order.detail.component.html',
    styleUrls: ['./laz.order.detail.component.css']
})

export class LazOrderDetailComponent implements OnInit {
    private subs: Subscription;
    public lazorder: any;
    private id;
    public lazorderdetailArray: any[] = [
        {label: 'Đơn hàng', lazurl: ''},
        {label: 'Đơn hàng Lazada', lazurl: '/channel/laz-orders/'},
        {label: 'Chi tiết đơn hàng', lazurl: ''}
    ];
    constructor(public channelService: ChannelService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        if (this.id) {
            this.getSignLazOrder();
        }
    }

    private getSignLazOrder() {
        this.channelService.http.startLoad();
        this.subs = this.channelService.getSignLazOrder(this.id).subscribe(
            data => {
                this.lazorder = data.data;
                this.channelService.http.endLoad();
            },
            error => {
                this.channelService.http.endLoad();
            }
        );
    }

    public back = () => {
        this.channelService.http.loading.show = true;
        this.router.navigate([`/channel/laz-orders`]);
    }
}
