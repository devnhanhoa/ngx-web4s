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
    public select = {Module: {id: ''}};
    private unover = true;

    constructor() {
    }

    public showChildren(smenu) {
        this.select = smenu;
        this.showchil = true;
        this.unover = false;
    }

    public hideChildren(smenu) {
        this.unover = true;
        const myjs = this;
        setTimeout(function () {
            if (myjs.unover && (myjs.select === smenu)) {
                myjs.select = {Module: {id: ''}};
                myjs.showchil = false;
            }
        }, 1000);
    }
}
