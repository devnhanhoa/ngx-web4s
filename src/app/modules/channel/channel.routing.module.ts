import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LazOrdersComponent} from './laz.orders.component';
import {LazProductsComponent} from './laz.products.component';
import {LazProductDetailComponent} from './laz.product.detail.component';
import {LazOrderDetailComponent} from './laz.order.detail.component';

const routes: Routes = [
    {path: '', component: LazProductsComponent},
    {path: 'laz-products', component: LazProductsComponent},
    {path: 'laz-products/:id', component: LazProductDetailComponent},
    {path: 'laz-orders', component: LazOrdersComponent, data: { breadcrumb: 'Sản phẩm Lazada new'} },
    {path: 'laz-orders/:id', component: LazOrderDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class ChannelRoutingModule {
    constructor() {
    }
}
