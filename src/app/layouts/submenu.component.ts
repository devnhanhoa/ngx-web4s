import {Component, Input, OnInit} from '@angular/core';
import {rootUri} from '../app.config';
import {root} from 'rxjs/util/root';

@Component({
    selector: 'app-layouts-sidebar-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.css']
})

export class SubmenuComponent implements OnInit {
    public root = rootUri;

    @Input('menu')
    public menu: any;

    @Input('parent')
    public parent = '0';

    @Input('show')
    public show = false;

    public showchild = false;
    public select = {Module: {id: ''}};
    private unover = true;

    constructor() {
    }

    public ngOnInit() {

    }

    public showChildren(smenu) {
        this.select = smenu;
        this.showchild = true;
        this.unover = false;
    }

    public hideChildren(smenu) {
        this.unover = true;
        const myjs = this;
        setTimeout(function () {
            if (myjs.unover && (myjs.select === smenu)) {
                myjs.select = {Module: {id: ''}};
                myjs.showchild = false;
            }
        }, 1000);
    }
}
