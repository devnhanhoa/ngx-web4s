import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import {location, rootUrl} from './app.config';

import {AppService} from './service/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private subs: Subscription;

    constructor(private translate: TranslateService, public appService: AppService) {
        translate.addLangs([location]);
        translate.use(location);
        this.getSysSetting();
        if (document.getElementById('to-top-button') !== null) {
            document.getElementById('to-top-button').addEventListener('click', () => {
                setTimeout(() => window.scrollTo(0, 0), 1);
                console.log('click');
            });
        }
    }

    private getSysSetting() {
        this.subs = this.appService.getSysSetting().subscribe(
            data => {
                this.appService.http.syssetting = data.data;
                this.setting();
            }
        );
    }

    private setting() {
        const href = rootUrl + '/' + this.appService.http.syssetting.favicon;
        (<HTMLInputElement>document.querySelector(`link[rel*='icon']`)).setAttribute('href', href);
    }
}
