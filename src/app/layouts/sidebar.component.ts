import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from '../service/app.service';
import {NotifyService} from '../service/notify.service';
import {rootUri} from '../app.config';

@Component({
    selector: 'app-layouts-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    private subs: Subscription;
    public menuRoot = [];
    public allMenu = [];
    public select = {Module: {id: ''}};
    private uri: string;
    public notify = [];

    constructor(public appService: AppService, private notifyService: NotifyService) {
        this.uri = rootUri + document.location.pathname;
        this.getSidebar();
    }

    ngOnInit() {

    }

    private _getNotify() {
        this.subs = this.notifyService.getNotify().subscribe(data => {
            this.notify = data.data.data;
        });
    }

    private getSidebar() {
        this.subs = this.appService.getSidebar().subscribe(
            data => {
                this.menuRoot = data.data.menu_root;
                this.allMenu = data.data.all_menu;
                this.setActive();
                this.subs = this.notifyService.getSerNotify().subscribe(
                    res => {
                        this.notify = res.data.data;
                        this._getNotify();
                    }
                );
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
        this.select = (this.select === item ? null : item);
    }

    public minMenu() {
        this.appService.minPreview = !this.appService.minPreview;
    }
}
