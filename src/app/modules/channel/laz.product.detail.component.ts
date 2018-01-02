import {Component, OnInit} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Subscription} from 'rxjs/Subscription';
import {Router, ActivatedRoute} from '@angular/router';
import {rootUrl} from '../../app.config';

@Component({
    selector: 'app-channel',
    templateUrl: './laz.product.detail.component.html',
    styleUrls: ['./laz.product.detail.component.css']
})

export class LazProductDetailComponent implements OnInit {
    private subs: Subscription;
    public lazproduct: any;
    private id;
    public lazproductdetailArray: any[] = [
        {label: 'Sản phẩm', lazurl: ''},
        {label: 'Sản phẩm Lazada', lazurl: '/channel/laz-products/'},
        {label: 'Chi tiết sản phẩm', lazurl: ''}
    ];
    public rootUrl = rootUrl;

    constructor(public channelService: ChannelService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        if (this.id) {
            this.getSignLazProduct();
        }
    }

    private getSignLazProduct() {
        this.channelService.http.startLoad();
        this.subs = this.channelService.getSignLazProduct(this.id).subscribe(
            data => {
                this.lazproduct = data.data;
                this.channelService.http.endLoad();
            },
            error => {
                this.channelService.http.endLoad();
            }
        );
    }

    public back = () => {
        // this.channelService.http.loading.show = true;
        this.router.navigate([`/channel/laz-products`]);
    }
}
