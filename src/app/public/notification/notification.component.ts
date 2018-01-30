import {Component, OnInit} from '@angular/core';
import {AppService} from '../../service/app.service';

@Component({
    selector: 'app-public-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    constructor(public appService: AppService) {
    }

    ngOnInit() {
    }

    public closeAlert(item) {
        const index = this.appService.http.alertsys.indexOf(item);
        this.appService.http.alertsys.splice(index, 1);
    }
}
