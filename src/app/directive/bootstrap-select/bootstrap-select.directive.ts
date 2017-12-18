import {Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {NgControl} from '@angular/forms';

declare const jQuery: any;

/**
 * Directive to wrap bootstrap-select
 */
@Directive({
    selector: '[appBootstrapSelect]'
})
export class BootstrapSelectDirective implements OnInit, OnDestroy, OnChanges {
    @Input('arroption')
    public arroption = [];
    private el;
    private subs: any;

    constructor(private elref: ElementRef, public model: NgControl) {
        this.el = elref.nativeElement;
    }

    ngOnInit() {
        const firstChangeSubs = this.model.valueChanges.subscribe(v => {
            jQuery(this.el).val(v);
            jQuery(this.el).selectpicker('refresh');
            firstChangeSubs.unsubscribe();
        });

        jQuery(this.el).selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check'
        });

        let options = '';
        jQuery.each(this.arroption, function (key, item) {
            options += '<option value=' + item.value + '>' + item.title + '</option>';
        });
        jQuery(this.el).empty();
        jQuery(this.el).append(options);
        jQuery(this.el).selectpicker('refresh');
    }

    ngOnChanges(changes) {

    }

    ngOnDestroy() {
        jQuery(this.el).selectpicker('destroy');
    }

    refresh() {
        jQuery(this.el).selectpicker('refresh');
    }
}
