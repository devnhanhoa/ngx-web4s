import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {location} from './app.config';

import {AppService} from './service/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private translate: TranslateService, public appService: AppService) {
        translate.addLangs([location]);
        translate.use(location);
    }
}
