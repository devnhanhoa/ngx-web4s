import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HistoryRoutingModule} from './history.routing.module';
import {SharedModule} from '../../public/shared.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {TypeaheadModule} from 'ngx-bootstrap';

import {HistoryService} from '../../service/history.service';
import {HistoryDelProductsComponent} from './history.del.products.component';
import {HistoryDelBillsComponent} from './history.del.bills.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, HistoryRoutingModule, SharedModule,
        TooltipModule.forRoot(),
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TypeaheadModule.forRoot()
    ],
    declarations: [HistoryDelProductsComponent, HistoryDelBillsComponent],
    exports: [],
    providers: [HistoryService],
    entryComponents: []
})
export class HistoryModule {
}
