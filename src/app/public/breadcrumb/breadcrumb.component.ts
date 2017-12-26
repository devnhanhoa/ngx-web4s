import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-public-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})

export class BreadCrumbComponent implements OnInit {
    @Input() public Breadcrumbs: any[] = [];

    constructor() {
    }

    ngOnInit() {
    }
}
