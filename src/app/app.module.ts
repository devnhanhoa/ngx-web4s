import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './layouts/header.component';
import {SidebarComponent} from './layouts/sidebar.component';
import {SubmenuComponent} from './layouts/submenu.component';
import {FooterComponent} from './layouts/footer.component';

import {routing} from './app.routing.module';
import {SharedModule} from './public/shared.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {AppGuard} from './app.guard.service';
import {HttpX} from './lib/http';
import {Auth} from './lib/auth';

import {AppService} from './service/app.service';

import {environment} from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, environment.basename + '/assets/i18n/', '.json?v=1.0.0');
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        SubmenuComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        routing,
        SharedModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        ModalModule.forRoot(),
        TooltipModule.forRoot()
    ],
    providers: [AppGuard, HttpX, Auth, AppService],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
}
