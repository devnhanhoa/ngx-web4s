import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-modal-sync-alert',
    templateUrl: './sync.alert.component.html',
    styleUrls: ['./sync.alert.component.css']
})
export class SyncAlertComponent implements OnInit {
    title: string;
    data: Array<any> = [];

    constructor(public bsModalRef: BsModalRef) {
    }

    ngOnInit() {
    }
}
