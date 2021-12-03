import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ResetPasswordComponent = class ResetPasswordComponent {
    constructor(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.resetModel = {
            Email: '',
            UserName: ''
        };
    }
    ngOnInit() {
    }
    forgotPassword(form) {
        this.service.login(form.value).subscribe((res) => {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/user/login');
        }, err => {
            if (err.status == 400)
                this.toastr.error('Incorrect Username or Email Address.', 'Password Generation failed');
            else
                console.log(err);
        });
    }
    toLogin() {
        this.router.navigateByUrl('/user/login');
    }
};
ResetPasswordComponent = __decorate([
    Component({
        selector: 'app-reset-password',
        templateUrl: './reset-password.component.html',
        styleUrls: ['./reset-password.component.css']
    })
], ResetPasswordComponent);
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map