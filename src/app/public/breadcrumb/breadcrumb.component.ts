import {Component, OnInit, Input} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-public-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})

export class BreadCrumbComponent implements OnInit {
    @Input() public Breadcrumbs: any[] = [];

    constructor() {
    }

    ngOnInit() {
    }
}
