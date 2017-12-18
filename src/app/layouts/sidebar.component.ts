import {Component} from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
    selector: 'app-layouts-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
    private subs: any;
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
        this.select = item;
    }
}
