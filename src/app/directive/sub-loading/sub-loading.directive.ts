import {Directive, ElementRef, Input, OnInit, OnChanges} from '@angular/core';

/**
 * Directive to wrap bootstrap-select
 */
@Directive({
    selector: '[appSubLoading]'
})
export class SubLoadingDirective implements OnInit, OnChanges {
    @Input('open')
    public open = false;
    private el;
    private id = 'subLoading';

    constructor(private elref: ElementRef) {
        this.el = elref.nativeElement;
    }

    ngOnInit() {
        this.id = Math.random().toString(36).substring(6);
        const htmlstr = '<div id="' + this.id + '" style="display: none;" class="data-loading"><span style="margin: 15% auto;">' +
            '<i class="fa fa-refresh fa-spin"></i></span></div>';
        this.el.insertAdjacentHTML('afterbegin', htmlstr);
        this.control();
    }

    ngOnChanges(changes) {
        if (changes.open) {
            this.control();
        }
    }

    private control() {
        if (this.open) {
            if (document.getElementById(this.id)) {
                document.getElementById(this.id).style.display = 'block';
            }
        } else {
            if (document.getElementById(this.id)) {
                document.getElementById(this.id).style.display = 'none';
            }
        }
    }
}
