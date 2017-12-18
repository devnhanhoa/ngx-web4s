import {Component} from '@angular/core';
import {AppService} from '../service/app.service';
import {rootUrl} from '../app.config';

@Component({
    selector: 'app-layouts-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
    private subs: any;
    public rootUrl = rootUrl;
    public menuRoot = [];
    public allMenu = [];
    public select = {Module: {id: ''}};

    constructor(public appService: AppService) {
        this.getSidebar();
    }

    private getSidebar() {
        this.appService.http.startLoad();
        this.subs = this.appService.getSidebar().subscribe(
            data => {
                this.menuRoot = data.data.menu_root;
                this.allMenu = data.data.all_menu;
                this.appService.http.endLoad();
            },
            error => {
                this.appService.http.endLoad();
            }
        );
    }

    public selectItem(item) {
        if (this.select.Module.id !== item.Module.id) {
            this.select = item;
        } else {
            this.select = {Module: {id: ''}};
        }
    }
}
