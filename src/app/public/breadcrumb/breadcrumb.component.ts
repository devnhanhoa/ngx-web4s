import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
}

@Component({
    selector: 'app-public-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})

export class BreadCrumbComponent implements OnInit {
    public breadcrumbs: IBreadcrumb[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.breadcrumbs = [];
    }

    ngOnInit() {
        const  ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            const root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const  ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        const children: ActivatedRoute[] = route.children;
        // let label = '';
        if (children.length === 0) {
            return breadcrumbs;
        }
        for (const child of children) {
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            url += `/${routeURL}`;
            const breadcrumb: IBreadcrumb = {
                label: child.snapshot.data['breadcrumb'],
                params: child.snapshot.params,
                url: url
            };
            breadcrumbs.push(breadcrumb);
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }


}
