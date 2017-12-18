import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ProductsService} from '../../../service/products.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-modal-content',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    action = 'back';
    title: string;
    private subs: Subscription;
    public products: Array<any> = [];
    public selproducts: Array<any> = [];
    public selproductsid: Array<any> = [];
    public loading = false;

    public maxSize = 5;
    public bigTotalItems = 0;

    constructor(public bsModalRef: BsModalRef, public productsService: ProductsService) {
    }

    ngOnInit() {
        this.productsService.search.title = '';
        this.getProducts();
    }

    public search() {
        this.productsService.search.page = 1;
        this.getProducts();
    }

    public getProducts() {
        this.loading = true;
        this.productsService.search.page_size = 10;
        this.subs = this.productsService.getProducts(this.productsService.search).subscribe(
            data => {
                this.products = data.data.result;
                this.bigTotalItems = data.data.paging.count;
                this.loading = false;
            },
            error => {
                this.loading = false;
            }
        );
    }

    public addProduct(product) {
        this.selproducts.push(product);
        this.selproductsid.push(product.id);
    }

    public removeProduct(product) {
        const index = this.selproducts.indexOf(product);
        this.selproducts.splice(index, 1);
        this.selproductsid.splice(index, 1);
    }


    public pageChanged(event: any): void {
        this.productsService.search.page = event.page;
        this.getProducts();
    }

    public sync() {
        this.loading = true;
        this.subs = this.productsService.syncProducts(this.selproductsid.join(',')).subscribe(
            data => {
                this.action = 'sync';
                this.loading = false;
                this.bsModalRef.hide();
            },
            error => {

            }
        );
    }
}
