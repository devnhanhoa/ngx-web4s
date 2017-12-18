import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-layouts-sidebar-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.css']
})

export class SubmenuComponent implements OnInit {
    @Input('allmenu')
    public allmenu: any;

    @Input('parent')
    public parent = '0';

    @Input('group')
    public group = '';

    @Input('show')
    public show = false;

    public submenu = [];
    public arrallmenu = [];

    constructor() {
    }

    ngOnInit() {
        this.getSubmenu();
    }

    private getSubmenu() {
        Object.keys(this.allmenu).map((index) => {
            if ((this.allmenu[index].Module.parent === this.parent) && (this.allmenu[index].Module.group === this.group)) {
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
