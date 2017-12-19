import {Component, OnInit} from '@angular/core';
import {AppService} from '../service/app.service';
import {rootUri} from '../app.config';

@Component({
    selector: 'app-layouts-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    private subs: any;
    public menuRoot = [];
    public allMenu = [];
    public select = {Module: {id: ''}};
    private uri: string;

    constructor(public appService: AppService) {
        this.uri = rootUri + document.location.pathname;
        this.getSidebar();
    }

    ngOnInit() {
    }

    private getSidebar() {
        this.appService.http.startLoad();
        this.subs = this.appService.getSidebar().subscribe(
            data => {
                this.menuRoot = data.data.menu_root;
                this.allMenu = data.data.all_menu;
                this.setActive();
                this.appService.http.endLoad();
            },
            error => {
                this.appService.http.endLoad();
            }
        );
    }

    public setActive() {
        let group = '';
        Object.keys(this.allMenu).map((index) => {
            if ((this.allMenu[index].Module.slug.trim() !== '') && this.uri.indexOf(this.allMenu[index].Module.slug.trim()) > -1) {
                group = this.allMenu[index].Module.group;
            }
        });
        Object.keys(this.menuRoot).map((index) => {
            if (this.menuRoot[index].Module.group === group) {
                this.selectItem(this.menuRoot[index]);
            }
        });
    }

    public selectItem(item) {
        this.select = item;
    }
}
