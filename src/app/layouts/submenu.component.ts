import {Component, Input} from '@angular/core';
import {rootUri} from '../app.config';

@Component({
    selector: 'app-layouts-sidebar-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.css']
})

export class SubmenuComponent {
    public root = rootUri;

    @Input('menu')
    public menu: any;

    @Input('parent')
    public parent = '0';

    @Input('show')
    public show = false;

    public showchil = false;

    constructor() {
    }

    public showChildren(val) {
        this.showchil = val;
    }
}
