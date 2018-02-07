import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HistoryDelProductsComponent} from './history.del.products.component';
import {HistoryDelBillsComponent} from './history.del.bills.component';

const routes: Routes = [
    {path: 'list', component: HistoryDelProductsComponent},
    {path: 'bill', component: HistoryDelBillsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class HistoryRoutingModule {
    constructor() {
    }
}
