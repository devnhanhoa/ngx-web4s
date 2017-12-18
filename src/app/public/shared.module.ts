import {ModuleWithProviders, NgModule} from '@angular/core';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

import {BootstrapSelectDirective} from '../directive/bootstrap-select/bootstrap-select.directive';
import {SubLoadingDirective} from '../directive/sub-loading/sub-loading.directive';

@NgModule({
    imports: [],
    declarations: [BreadcrumbComponent,
        BootstrapSelectDirective,
        SubLoadingDirective],
    exports: [BreadcrumbComponent,
        BootstrapSelectDirective,
        SubLoadingDirective],
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
