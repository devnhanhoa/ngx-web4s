import {Component, HostBinding} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import {location, rootUrl} from './app.config';

import {AppService} from './service/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    host: {
        '(window:scroll)': 'updateScrollBtn($event)'
    }
})
export class AppComponent {
    private subs: Subscription;
    isScrolled = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 200;
    constructor(private translate: TranslateService, public appService: AppService) {
        translate.addLangs([location]);
        translate.use(location);
        this.getSysSetting();

        setTimeout(() => {
           if (document.getElementById('to-top-button') !== null) {
               document.getElementById('to-top-button').addEventListener('click', () => {
                   window.scroll({ top: 0, left: 0, behavior: 'smooth' });
               });
           } }, 1);
    }
    updateScrollBtn(evt) {
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
            this.isScrolled = true;
        } else {
            this.isScrolled = false;
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
