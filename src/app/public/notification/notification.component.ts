import { Component, OnInit } from '@angular/core';
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
  reload() {
    window.location.reload();
  }

}
