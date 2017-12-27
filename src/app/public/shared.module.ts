import {ModuleWithProviders, NgModule} from '@angular/core';
import {BreadCrumbComponent} from './breadcrumb/breadcrumb.component';
import { NotificationComponent } from './notification/notification.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


import {BootstrapSelectDirective} from '../directive/bootstrap-select/bootstrap-select.directive';
import {SubLoadingDirective} from '../directive/sub-loading/sub-loading.directive';


@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [BreadCrumbComponent,
        BootstrapSelectDirective,
        SubLoadingDirective,
        NotificationComponent],
    exports: [BreadCrumbComponent,
        BootstrapSelectDirective,
        SubLoadingDirective,
        NotificationComponent],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

    constructor() {

    }
}
