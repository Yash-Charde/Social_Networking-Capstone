import { __decorate } from "tslib";
import { Directive, HostListener } from '@angular/core';
let TextareaAutoresizeDirective = class TextareaAutoresizeDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    onInput() {
        this.resize();
    }
    ngOnInit() {
        if (this.elementRef.nativeElement.scrollHeight) {
            setTimeout(() => this.resize());
        }
    }
    resize() {
        this.elementRef.nativeElement.style.height = 'auto';
        this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
    }
};
__decorate([
    HostListener(':input')
], TextareaAutoresizeDirective.prototype, "onInput", null);
TextareaAutoresizeDirective = __decorate([
    Directive({
        selector: '[appTextareaAutoresize]'
    })
], TextareaAutoresizeDirective);
export { TextareaAutoresizeDirective };
//# sourceMappingURL=textarea-autoresize.directive.js.map