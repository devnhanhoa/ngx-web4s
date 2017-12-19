import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

declare const jQuery: any;

/**
 * Directive to wrap bootstrap-select
 */
@Directive({
    selector: '[appNotify]'
})
export class NotifyDirective implements OnChanges {
    @Input('notify')
    public notify = [];
    private el;
    private subs: any;

    constructor(private elref: ElementRef) {
        this.el = elref.nativeElement;
    }

    ngOnChanges(changes) {
        if (changes.notify) {
            jQuery('span.badge', this.el).text('');
            jQuery.each(this.notify, function (index, value) {
                if (value > 0) {
                    jQuery('#' + index + ' span.badge', this.el).text(value);
                }
            });
            jQuery('li.sidebar-left', this.el).each(function () {
                let count = 0;
                jQuery('ul.submenu li span.badge', this).each(function () {
                    if (jQuery(this).text()) {
                        count += parseInt(jQuery(this).text(), 10);
                    }
                });
                if (count > 0) {
                    jQuery('span.badge:first', this).text(count);
                } else {
                    jQuery('span.badge:first', this).text('');
                }
            });
        }
    }
}
