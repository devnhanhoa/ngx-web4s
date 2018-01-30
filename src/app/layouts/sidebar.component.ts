import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from '../service/app.service';
import {NotifyService} from '../service/notify.service';
import {rootUri} from '../app.config';
import {rootUrl} from '../app.config';

@Component({
    selector: 'app-layouts-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    private subs: Subscription;
    public allMenu = [];
    private group = '';
    public select = {Module: {id: ''}};
    private uri: string;
    public notify = [];
    private unover = true;
    public rootUrl = rootUrl;
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
                this.allMenu = data.data;
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
        this.checkUriActive(this.allMenu);
        for (let index = 0; index < this.allMenu.length; index++) {
            if (this.allMenu[index].Module.group === this.group) {
                this.selectItem(this.allMenu[index]);
                return true;
            }
        }
    }

    private checkUriActive(menus) {
        for (let index = 0; index < menus.length; index++) {
            if ((menus[index].Module.slug.trim() !== '') && this.uri.indexOf(menus[index].Module.slug.trim()) > -1) {
                this.group = menus[index].Module.group;
                return true;
            }
            if (menus[index].Module.child.length > 0) {
                this.checkUriActive(menus[index].Module.child);
            }
        }
    }

    public selectItem(item) {
        this.select = item;
    }

    public minMenu() {
        this.appService.minPreview = !this.appService.minPreview;
        this.select = {Module: {id: ''}};
    }

    public onHovering(item) {
        if (this.appService.minPreview) {
            this.unover = false;
            this.select = item;
        }
    }

    public onUnovering(item) {
        if (this.appService.minPreview) {
            this.unover = true;
            const myjs = this;
            setTimeout(function () {
                if (myjs.unover && (myjs.select === item)) {
                    myjs.select = {Module: {id: ''}};
                }
            }, 1000);
        }
    }
}
