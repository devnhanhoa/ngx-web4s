import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {rootUri} from '../app.config';

@Component({
    selector: 'app-layouts-sidebar-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.css']
})

export class SubmenuComponent implements OnInit, OnChanges {
    public root = rootUri;

    @Input('menu')
    public menu: any;

    @Input('allmenu')
    public allmenu: any;

    @Input('show')
    public show = false;

    @Input('notify')
    public notify = [];

    public submenu = [];
    public arrallmenu = [];
    public parent = '0';

    constructor() {
    }

    ngOnInit() {
        this.parent = this.menu.Module.parent;
        this.getSubmenu();
    }

    ngOnChanges(changes) {
        if (changes.notify) {

        }
    }

    private getSubmenu() {
        Object.keys(this.allmenu).map((index) => {
            if ((this.allmenu[index].Module.parent === this.parent) && (this.allmenu[index].Module.group === this.menu.Module.group)) {
                this.submenu.push(this.allmenu[index]);
            } else {
                this.arrallmenu.push(this.allmenu[index]);
            }
        });
    }

    public showChildren(val) {
        this.show = val;
    }
}
