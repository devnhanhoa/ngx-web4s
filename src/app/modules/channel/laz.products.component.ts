import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

import {ProductsComponent} from './modal/products.component';
import {SyncAlertComponent} from './modal/sync.alert.component';

import {arrPageSize} from '../../lib/const';
import {rootUrl} from '../../app.config';

@Component({
    selector: 'app-channel',
    templateUrl: './laz.products.component.html',
    styleUrls: ['./laz.products.component.css']
})

export class LazProductsComponent implements OnInit {
    @ViewChild('form') form: any;
    private subs: Subscription;
    public products: Array<any> = [];
    public bsModalRef: BsModalRef;
    public config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };
    public maxSize = 5;
    public paging = {count: 0, page: 1, limit: 20};
    public arrPageSize = arrPageSize;
    public lazproductArray: any[] = [
        {label: 'Sản phẩm', lazurl: ''},
        {label: 'Sản phẩm Lazada', lazurl: ''}
    ];
    public rootUrl = rootUrl;
    public hover = {id: ''};

    constructor(public channelService: ChannelService, private modalService: BsModalService, private router: Router) {

    }

    ngOnInit() {
        this.getLazProduct();
    }

    public search() {
        this.channelService.search.page = 1;
        this.getLazProduct();
    }

    public resetForm() {
        this.form.reset();
        this.search();
    }

    public getLazProduct() {
        this.channelService.http.startLoad();
        this.subs = this.channelService.getLazProduct(this.channelService.search).subscribe(
            data => {
                this.products = data.data.result;
                this.paging = data.data.paging;
                this.channelService.http.endLoad();
            },
            error => {
                this.channelService.http.endLoad();
            }
        );
    }

    public prodDownload() {
        this.channelService.http.startLoad();
        this.subs = this.channelService.syncLazProduct().subscribe(
            data => {
                this.channelService.http.endLoad();
                this.showRes(data.data);
            },
            error => {
                this.getLazProduct();
            }
        );
    }

    public prodUpload() {
        this.bsModalRef = this.modalService.show(ProductsComponent, Object.assign({}, this.config, {class: 'gray modal-90'}));
        this.bsModalRef.content.title = 'Chọn sản phẩm đồng bộ';
        this.subs = this.modalService.onHide.subscribe((reason: string) => {
            if (this.bsModalRef.content.action === 'sync') {
                this.showRes(this.bsModalRef.content.arrRes);
            }
        });
    }

    private showRes(data = []) {
        this.bsModalRef = this.modalService.show(SyncAlertComponent, Object.assign({}, this.config, {class: 'gray'}));
        this.bsModalRef.content.title = 'Kết quả đồng bộ';
        this.bsModalRef.content.data = data;
        this.subs = this.modalService.onHide.subscribe((reason: string) => {
            this.getLazProduct();
        });
    }

    public pageChanged(event: any): void {
        if (this.channelService.search.page !== event.page) {
            this.channelService.search.page = event.page;
            this.getLazProduct();
        }
    }

    public pageSizeChange() {
        this.getLazProduct();
    }

    public rowHover(row) {
        this.hover = row;
    }

    public goDetail = product => {
        this.router.navigate([`/channel/laz-products/${product.id}`]);
    }
}
